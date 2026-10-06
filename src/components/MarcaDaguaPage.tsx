import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Video,
  Image as ImageIcon,
  Upload,
  Play,
  Pause,
  RotateCcw,
  Square,
  Trash2,
  Download,
  RefreshCw,
  Volume2,
  VolumeX,
  ShieldCheck,
  Eye,
  Sparkles,
  Zap,
  Cpu,
  Layers,
} from 'lucide-react';
import {
  BoundingBox,
  eraseBoxesFromCanvas,
} from '../utils/inpainting';

interface MarcaDaguaPageProps {
  onBack: () => void;
  soundEnabled?: boolean;
}

type TabMode = 'video' | 'image';

export const MarcaDaguaPage: React.FC<MarcaDaguaPageProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabMode>('video');

  // Media & state
  const [file, setFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  // Playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Selections & tools
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [currentDragBox, setCurrentDragBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [removalMode, setRemovalMode] = useState<'smart' | 'blur'>('smart');
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);

  // Export & Processing
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');

  // DOM Refs
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isExportingRef = useRef<boolean>(false);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (mediaUrl) URL.revokeObjectURL(mediaUrl);
    };
  }, [mediaUrl]);

  // Handle file upload
  const handleFile = (selected: File) => {
    const isVid = selected.type.startsWith('video/');
    const isImg = selected.type.startsWith('image/');

    if (!isVid && !isImg) {
      alert('Por favor selecione um arquivo de vídeo (MP4, WebM, MOV) ou imagem (JPG, PNG, WebP).');
      return;
    }

    if (isVid) setActiveTab('video');
    if (isImg) setActiveTab('image');

    if (mediaUrl) URL.revokeObjectURL(mediaUrl);

    setFile(selected);
    const url = URL.createObjectURL(selected);
    setMediaUrl(url);
    setBoxes([]);
    setCurrentDragBox(null);
    setDimensions(null);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Video loaded: force decoder to decode 1st frame immediately (no black screen!)
  const handleVideoReady = () => {
    if (videoRef.current) {
      const v = videoRef.current;
      const w = v.videoWidth || 1920;
      const h = v.videoHeight || 1080;
      setDimensions({ width: w, height: h });
      setDuration(v.duration || 0);

      // Force video decoder to decode the very first frame immediately
      if (v.currentTime < 0.001) {
        try {
          v.currentTime = 0.001;
        } catch {
          // fallback
        }
      }
      renderFrame();
      renderOverlay();
    }
  };

  // Image loaded
  const handleImageLoaded = () => {
    if (imageRef.current) {
      const img = imageRef.current;
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      setDimensions({ width: w, height: h });
      renderFrame();
      renderOverlay();
    }
  };

  // Core Inpainting Canvas: Draws base frame and reconstructs watermark pixels
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dimensions) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const { width, height } = dimensions;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    // 1. Draw original video frame or image
    if (activeTab === 'video' && videoRef.current) {
      const v = videoRef.current;
      if (v.readyState >= 1) {
        try {
          ctx.drawImage(v, 0, 0, width, height);
        } catch {
          // ignore
        }
      }
    } else if (activeTab === 'image' && imageRef.current) {
      try {
        ctx.drawImage(imageRef.current, 0, 0, width, height);
      } catch {
        // ignore
      }
    }

    // 2. Erase watermarks if not in "show original" mode
    if (!showOriginal && boxes.length > 0) {
      eraseBoxesFromCanvas(ctx, width, height, boxes, removalMode);
    }
  }, [dimensions, activeTab, boxes, removalMode, showOriginal]);

  // Cyberpunk Interactive Overlay Canvas: Draws selection boxes with HUD badges
  const renderOverlay = useCallback(() => {
    const overlay = overlayCanvasRef.current;
    if (!overlay || !dimensions) return;
    const ctx = overlay.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensions;
    if (overlay.width !== width || overlay.height !== height) {
      overlay.width = width;
      overlay.height = height;
    }

    ctx.clearRect(0, 0, width, height);

    // Draw existing bounding boxes with Futuristic HUD styling
    boxes.forEach((box, idx) => {
      ctx.save();

      // Neon fill
      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.fillRect(box.x, box.y, box.width, box.height);

      // Neon dashed border
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = Math.max(2, Math.round(width / 500));
      ctx.setLineDash([8, 5]);
      ctx.strokeRect(box.x, box.y, box.width, box.height);

      // HUD corner crosshairs
      const crossSize = Math.max(6, Math.round(width / 120));
      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = Math.max(2, Math.round(width / 400));
      ctx.setLineDash([]);

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(box.x, box.y + crossSize);
      ctx.lineTo(box.x, box.y);
      ctx.lineTo(box.x + crossSize, box.y);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(box.x + box.width - crossSize, box.y);
      ctx.lineTo(box.x + box.width, box.y);
      ctx.lineTo(box.x + box.width, box.y + crossSize);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(box.x, box.y + box.height - crossSize);
      ctx.lineTo(box.x, box.y + box.height);
      ctx.lineTo(box.x + crossSize, box.y + box.height);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(box.x + box.width - crossSize, box.y + box.height);
      ctx.lineTo(box.x + box.width, box.y + box.height);
      ctx.lineTo(box.x + box.width, box.y + box.height - crossSize);
      ctx.stroke();

      // Cyber HUD badge
      ctx.fillStyle = '#083344';
      const fontSize = Math.max(12, Math.round(width / 80));
      ctx.font = `bold ${fontSize}px "Orbitron", "JetBrains Mono", sans-serif`;
      const text = ` [TARGET_${idx + 1}] × `;
      const textWidth = ctx.measureText(text).width;
      const badgeH = fontSize + 8;
      const badgeY = Math.max(0, box.y - badgeH);

      // Badge container
      ctx.fillRect(box.x, badgeY, textWidth + 8, badgeH);
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1;
      ctx.strokeRect(box.x, badgeY, textWidth + 8, badgeH);

      // Badge text
      ctx.fillStyle = '#67e8f9';
      ctx.fillText(text, box.x + 4, badgeY + fontSize + 1);

      ctx.restore();
    });

    // Active drag box
    if (currentDragBox && currentDragBox.w > 2 && currentDragBox.h > 2) {
      ctx.save();
      ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
      ctx.fillRect(currentDragBox.x, currentDragBox.y, currentDragBox.w, currentDragBox.h);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = Math.max(2, Math.round(width / 500));
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(currentDragBox.x, currentDragBox.y, currentDragBox.w, currentDragBox.h);

      // Dimension HUD badge on active drag
      const fontSize = Math.max(12, Math.round(width / 85));
      ctx.font = `bold ${fontSize}px "Orbitron", monospace`;
      const sizeText = ` ${Math.round(currentDragBox.w)} × ${Math.round(currentDragBox.h)} px `;
      const textW = ctx.measureText(sizeText).width;
      const badgeH = fontSize + 6;
      const badgeY = currentDragBox.y > badgeH ? currentDragBox.y - badgeH : currentDragBox.y + currentDragBox.h + 2;

      ctx.fillStyle = '#4c0519';
      ctx.fillRect(currentDragBox.x, badgeY, textW + 6, badgeH);
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.strokeRect(currentDragBox.x, badgeY, textW + 6, badgeH);

      ctx.fillStyle = '#fecdd3';
      ctx.fillText(sizeText, currentDragBox.x + 3, badgeY + fontSize);
      ctx.restore();
    }
  }, [dimensions, boxes, currentDragBox]);

  // Video playback loop
  useEffect(() => {
    if (activeTab !== 'video' || !isPlaying) return;

    let animId: number;
    const loop = () => {
      if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
        setCurrentTime(videoRef.current.currentTime);
        renderFrame();
        animId = requestAnimationFrame(loop);
      }
    };
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, activeTab, renderFrame]);

  // Redraw whenever boxes, drag, time, or dimensions change
  useEffect(() => {
    if (dimensions) {
      renderFrame();
      renderOverlay();
    }
  }, [dimensions, boxes, currentDragBox, renderFrame, renderOverlay, currentTime, showOriginal]);

  // Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Convert pointer event directly into native media coordinate with letterbox offset correction
  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = overlayCanvasRef.current || canvasRef.current;
    if (!canvas || !dimensions) return null;
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;

    // Detect actual rendered area inside object-contain
    const canvasAspect = rect.width / rect.height;
    const mediaAspect = dimensions.width / dimensions.height;

    let renderW = rect.width;
    let renderH = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > mediaAspect) {
      // Letterbox on sides (empty space left & right)
      renderW = rect.height * mediaAspect;
      offsetX = (rect.width - renderW) / 2;
    } else {
      // Letterbox on top & bottom
      renderH = rect.width / mediaAspect;
      offsetY = (rect.height - renderH) / 2;
    }

    const clickX = e.clientX - rect.left - offsetX;
    const clickY = e.clientY - rect.top - offsetY;

    const clampedX = Math.max(0, Math.min(renderW, clickX));
    const clampedY = Math.max(0, Math.min(renderH, clickY));

    const nativeX = (clampedX / renderW) * dimensions.width;
    const nativeY = (clampedY / renderH) * dimensions.height;

    return {
      x: nativeX,
      y: nativeY,
    };
  };

  // Pointer Handlers with PointerCapture (Never releases when cursor exits frame)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isProcessing || !dimensions) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDraggingRef.current = true;

    const pt = getCanvasPoint(e);
    if (!pt) return;

    // Check if clicked inside any box's "x" badge to delete it
    const clickedBoxIdx = boxes.findIndex((b) => {
      const fontSize = Math.max(12, Math.round(dimensions.width / 80));
      const badgeH = fontSize + 8;
      const badgeY = Math.max(0, b.y - badgeH);
      return (
        pt.x >= b.x &&
        pt.x <= b.x + Math.max(130, dimensions.width * 0.15) &&
        pt.y >= badgeY &&
        pt.y <= badgeY + badgeH
      );
    });

    if (clickedBoxIdx !== -1) {
      setBoxes((prev) => prev.filter((_, idx) => idx !== clickedBoxIdx));
      isDraggingRef.current = false;
      return;
    }

    setDragStart(pt);
    setCurrentDragBox({ x: pt.x, y: pt.y, w: 0, h: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || isProcessing || !dragStart) return;
    e.preventDefault();

    const pt = getCanvasPoint(e);
    if (!pt) return;

    const x = Math.min(dragStart.x, pt.x);
    const y = Math.min(dragStart.y, pt.y);
    const w = Math.abs(pt.x - dragStart.x);
    const h = Math.abs(pt.y - dragStart.y);

    setCurrentDragBox({ x, y, w, h });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    if (currentDragBox && currentDragBox.w > 6 && currentDragBox.h > 6) {
      setBoxes((prev) => [
        ...prev,
        {
          id: `box-${Date.now()}`,
          x: currentDragBox.x,
          y: currentDragBox.y,
          width: currentDragBox.w,
          height: currentDragBox.h,
        },
      ]);
    }

    setDragStart(null);
    setCurrentDragBox(null);
  };

  // Undo & Clear
  const handleUndo = () => {
    if (boxes.length > 0) {
      setBoxes((prev) => prev.slice(0, -1));
    }
  };

  const handleClear = () => {
    setBoxes([]);
  };

  // Process & Download Image
  const handleProcessImage = () => {
    if (!canvasRef.current || !dimensions) return;
    renderFrame();

    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const baseName = file?.name.replace(/\.[^/.]+$/, '') || 'imagem';
      a.download = `${baseName}_neural_clean.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  // Process & Download Video
  const handleProcessVideo = async () => {
    if (!videoRef.current || !canvasRef.current || !dimensions || isProcessing) return;
    if (boxes.length === 0) {
      alert('Por favor, desenhe uma caixa de seleção sobre a marca d\'água antes de baixar.');
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const { width, height } = dimensions;

    setIsProcessing(true);
    setProgress(0);
    setStatusText('INICIANDO SÍNTESE NEURAL...');
    isExportingRef.current = true;

    try {
      // 1. Reset to start
      video.pause();
      setIsPlaying(false);

      if (video.currentTime > 0.05) {
        video.currentTime = 0;
        await new Promise<void>((res) => {
          const onSeek = () => {
            video.removeEventListener('seeked', onSeek);
            res();
          };
          video.addEventListener('seeked', onSeek, { once: true });
        });
      }

      // 2. Setup 30 FPS stream
      const stream = canvas.captureStream(30);

      // Attach audio track
      try {
        const anyVideo = video as unknown as { captureStream?: () => MediaStream; mozCaptureStream?: () => MediaStream };
        const vidStream = anyVideo.captureStream ? anyVideo.captureStream() : null;
        if (vidStream && vidStream.getAudioTracks().length > 0) {
          stream.addTrack(vidStream.getAudioTracks()[0]);
        }
      } catch {
        // audio capture fallback
      }

      const mimeTypes = [
        'video/mp4;codecs=avc1',
        'video/mp4',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
      ];
      const selectedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || 'video/webm';

      const recorder = new MediaRecorder(stream, {
        mimeType: selectedMime,
        videoBitsPerSecond: 8000000,
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      const recordFinished = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          resolve(new Blob(chunks, { type: selectedMime }));
        };
      });

      recorder.start(100);
      setStatusText('RENDERIZANDO QUADROS EM VELOCIDADE NATIVA (30 FPS)...');

      // 3. Play video at 1.0x normal speed
      video.playbackRate = 1.0;
      await video.play();

      const totalDuration = video.duration || 1;

      await new Promise<void>((resolve) => {
        const checkFrame = () => {
          if (!isExportingRef.current) {
            resolve();
            return;
          }

          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (ctx) {
            ctx.drawImage(video, 0, 0, width, height);
            eraseBoxesFromCanvas(ctx, width, height, boxes, removalMode);
          }

          const pct = Math.min(100, Math.round((video.currentTime / totalDuration) * 100));
          setProgress(pct);

          if (video.ended || video.currentTime >= totalDuration - 0.08) {
            resolve();
          } else {
            requestAnimationFrame(checkFrame);
          }
        };

        requestAnimationFrame(checkFrame);
      });

      video.pause();
      if (recorder.state !== 'inactive') {
        recorder.stop();
      }

      const finalBlob = await recordFinished;
      const finalUrl = URL.createObjectURL(finalBlob);
      setIsProcessing(false);
      setProgress(100);
      setStatusText('SÍNTESE CONCLUÍDA COM SUCESSO!');

      const a = document.createElement('a');
      a.href = finalUrl;
      const baseName = file?.name.replace(/\.[^/.]+$/, '') || 'video';
      const ext = selectedMime.includes('mp4') ? 'mp4' : 'webm';
      a.download = `${baseName}_neural_clean.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(finalUrl);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      setStatusText('FALHA NA SÍNTESE DO VÍDEO.');
      alert('Não foi possível exportar o vídeo.');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fadeIn">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/mp4,video/webm,video/quicktime,video/x-matroska,image/png,image/jpeg,image/webp"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        className="hidden"
      />

      {/* Top Cyberpunk Navigation Bar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-pink-300 bg-pink-950/50 hover:bg-pink-900/70 border border-pink-500/40 hover:border-pink-400 shadow-[0_0_15px_rgba(244,63,94,0.15)] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>VOLTAR PARA PÁGINA PRINCIPAL</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>PROTOCOLO NEURAL v2.4 • 100% LOCAL</span>
          </span>
        </div>
      </div>

      {/* Hero Header Estilo CREKONI 3D Chrome */}
      <header className="text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-1 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>RECONSTRUÇÃO NEURAL • PRESERVAÇÃO DE DURAÇÃO & 30 FPS</span>
        </div>

        <div className="relative inline-block w-full max-w-3xl mx-auto py-1">
          <div className="relative group flex flex-col items-center">
            <div className="relative px-1 py-0.5">
              <h1 className="relative font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.14em] sm:tracking-[0.16em] pl-[0.14em] sm:pl-[0.16em] chrome-3d-title leading-none uppercase">
                REMOVEDOR DE MARCA D'ÁGUA
              </h1>
              <div
                aria-hidden="true"
                className="absolute inset-0 px-1 py-0.5 font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.14em] sm:tracking-[0.16em] pl-[0.14em] sm:pl-[0.16em] leading-none chrome-flash-overlay pointer-events-none select-none uppercase"
              >
                REMOVEDOR DE MARCA D'ÁGUA
              </div>
            </div>

            {/* Subtitle Cyber Line */}
            <div className="relative mt-3 sm:mt-4 flex items-center justify-center gap-2.5">
              <span className="hidden sm:block w-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <p className="font-display font-semibold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-pink-200 tracking-[0.18em] uppercase">
                ALGORITMO DE RECONSTRUÇÃO NEURAL PARA VÍDEOS E IMAGENS
              </p>
              <span className="hidden sm:block w-8 h-[1px] bg-gradient-to-l from-transparent via-pink-400/50 to-transparent" />
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 font-mono max-w-2xl mx-auto">
          Remova logos, carimbos e marcas d'água indesejados mantendo a resolução, áudio e duração originais.
        </p>

        {/* Futuristic Tab Switcher */}
        <div className="pt-2 flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] backdrop-blur-md">
            <button
              type="button"
              onClick={() => {
                setActiveTab('video');
                if (file && !file.type.startsWith('video/')) {
                  setFile(null);
                  setMediaUrl(null);
                }
              }}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-cyan-400/50'
                  : 'text-slate-400 hover:text-cyan-300'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>VÍDEO HQ</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('image');
                if (file && !file.type.startsWith('image/')) {
                  setFile(null);
                  setMediaUrl(null);
                }
              }}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'image'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)] border border-pink-400/50'
                  : 'text-slate-400 hover:text-pink-300'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>IMAGEM HQ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Area: Upload or Futuristic Editor */}
      {!mediaUrl ? (
        /* Cyber Upload Zone */
        <div className="space-y-8">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="group relative p-10 sm:p-16 rounded-2xl border-2 border-dashed border-cyan-500/30 hover:border-cyan-400 bg-slate-950/60 hover:bg-slate-900/80 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.1)] hover:shadow-[0_0_40px_rgba(6,182,212,0.25)] transition-all cursor-pointer text-center space-y-4 max-w-3xl mx-auto overflow-hidden"
          >
            {/* HUD Corner Accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-orbitron font-bold text-white tracking-wide">
                {activeTab === 'video'
                  ? 'ARRASTE SEU VÍDEO OU CLIQUE PARA NAVEGAR'
                  : 'ARRASTE SUA IMAGEM OU CLIQUE PARA NAVEGAR'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {activeTab === 'video'
                  ? 'Formatos suportados: MP4, WebM, MOV. Sem perda de FPS ou alteração de tempo.'
                  : 'Formatos suportados: JPG, PNG, WebP em resolução nativa.'}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
              >
                SELECIONAR ARQUIVO
              </button>
            </div>
          </div>

          {/* 3 Steps Cyber HUD Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors space-y-1.5">
              <span className="text-cyan-400 font-bold text-xs font-mono">01 // UPLOAD</span>
              <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">Envie o Arquivo</h4>
              <p className="text-xs text-slate-400 font-mono">Carregue o vídeo ou foto que contém a logo indesejada.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors space-y-1.5">
              <span className="text-pink-400 font-bold text-xs font-mono">02 // SELEÇÃO</span>
              <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">Marque a Marca</h4>
              <p className="text-xs text-slate-400 font-mono">Desenhe o retângulo diretamente sobre a logo na tela.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors space-y-1.5">
              <span className="text-emerald-400 font-bold text-xs font-mono">03 // EXPORT</span>
              <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">Baixe Limpo</h4>
              <p className="text-xs text-slate-400 font-mono">Preservação exata de duração, FPS e áudio original.</p>
            </div>
          </div>
        </div>
      ) : (
        /* Cyberpunk Editor Workspace */
        <div className="space-y-4">
          {/* Cyber Toolbar */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shadow-[0_0_25px_rgba(6,182,212,0.1)]">
            {/* Tools on Left */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                <Square className="w-3.5 h-3.5 text-cyan-400" />
                <span>SELETOR HUD</span>
              </span>

              <div className="h-4 w-[1px] bg-cyan-500/30 mx-1" />

              {/* Mode switch */}
              <div className="flex items-center bg-slate-900 border border-cyan-500/30 rounded-lg p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setRemovalMode('smart')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                    removalMode === 'smart'
                      ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                  title="Reconstrução inteligente de fundo"
                >
                  Neural
                </button>
                <button
                  type="button"
                  onClick={() => setRemovalMode('blur')}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                    removalMode === 'blur'
                      ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-cyan-300'
                  }`}
                  title="Desfoque sobre a marca"
                >
                  Blur
                </button>
              </div>

              <div className="h-4 w-[1px] bg-cyan-500/30 mx-1" />

              {/* Compare Button */}
              <button
                type="button"
                onMouseDown={() => setShowOriginal(true)}
                onMouseUp={() => setShowOriginal(false)}
                onTouchStart={() => setShowOriginal(true)}
                onTouchEnd={() => setShowOriginal(false)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  showOriginal
                    ? 'bg-amber-500 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-slate-800'
                }`}
                title="Segure para comparar com o original"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showOriginal ? 'ORIGINAL' : 'SEGURE P/ COMPARAR'}</span>
              </button>

              <button
                type="button"
                onClick={handleUndo}
                disabled={boxes.length === 0}
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 disabled:opacity-30 transition-all cursor-pointer"
                title="Desfazer seleção"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={boxes.length === 0}
                className="p-1.5 rounded-lg text-slate-400 hover:text-pink-400 hover:bg-slate-900 border border-transparent hover:border-pink-500/30 disabled:opacity-30 transition-all cursor-pointer"
                title="Limpar seleções"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Right Side Stats & Export CTA */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-400/80 bg-cyan-950/40 border border-cyan-500/30 px-2 py-1 rounded-md">
                {dimensions ? `${dimensions.width}×${dimensions.height}` : 'CARREGANDO...'}
              </span>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 transition-colors cursor-pointer"
              >
                TROCAR ARQUIVO
              </button>

              {activeTab === 'image' ? (
                <button
                  type="button"
                  onClick={handleProcessImage}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider text-black bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>BAIXAR IMAGEM</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleProcessVideo}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-orbitron font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 hover:from-cyan-300 hover:to-pink-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>PROCESSANDO ({progress}%)...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>EXPORTAR VÍDEO</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Futuristic Stage Container with Corner HUD Accents */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-black border-2 border-cyan-500/30 shadow-[0_0_35px_rgba(6,182,212,0.18)] flex items-center justify-center min-h-[300px]">
            {/* Corner HUD brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

            {/* Exact Aspect Ratio Canvas Container */}
            <div
              style={{
                aspectRatio: dimensions ? `${dimensions.width} / ${dimensions.height}` : '16/9',
                maxHeight: '68vh',
              }}
              className="relative w-full max-w-full flex items-center justify-center overflow-hidden"
            >
              {/* Native Video Element: Displays 1st frame natively instantly (zero black screen!) */}
              {activeTab === 'video' && mediaUrl && (
                <video
                  ref={videoRef}
                  src={mediaUrl}
                  preload="auto"
                  playsInline
                  muted={isMuted}
                  onLoadedMetadata={handleVideoReady}
                  onLoadedData={handleVideoReady}
                  onCanPlay={handleVideoReady}
                  onSeeked={() => {
                    renderFrame();
                    renderOverlay();
                  }}
                  onTimeUpdate={() => {
                    if (!isPlaying) {
                      renderFrame();
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}

              {/* Native Image Element */}
              {activeTab === 'image' && mediaUrl && (
                <img
                  ref={imageRef}
                  src={mediaUrl}
                  onLoad={handleImageLoaded}
                  alt="Source"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              )}

              {/* Inpainted Canvas: Draws over the video when watermark boxes are active */}
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-100 ${
                  boxes.length > 0 && !showOriginal ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Interactive Overlay Canvas: Handles click-and-drag and renders HUD boxes */}
              <canvas
                ref={overlayCanvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="absolute inset-0 w-full h-full object-contain cursor-crosshair select-none touch-none z-10"
              />
            </div>
          </div>

          {/* Futuristic Timeline Controls (Video Mode) */}
          {activeTab === 'video' && (
            <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-cyan-500/30 flex items-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 ml-0.5 fill-current" />}
              </button>

              {/* Cyber Scrubber */}
              <input
                type="range"
                min="0"
                max={duration || 1}
                step="0.05"
                value={currentTime}
                onChange={(e) => {
                  const t = parseFloat(e.target.value);
                  setCurrentTime(t);
                  if (videoRef.current) {
                    videoRef.current.currentTime = t;
                    renderFrame();
                  }
                }}
                className="flex-1 accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />

              {/* Timecode in Glowing Font-Mono */}
              <span className="font-mono text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded-lg shrink-0">
                {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
              </span>

              <button
                type="button"
                onClick={() => {
                  const next = !isMuted;
                  setIsMuted(next);
                  if (videoRef.current) videoRef.current.muted = next;
                }}
                className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                title={isMuted ? 'Desmutar' : 'Mutar'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* Futuristic Tip */}
          <div className="flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 px-2 gap-2">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                <strong>Dica:</strong> Desenhe o retângulo sobre a marca d'água. Ela desaparece na mesma hora da tela!
              </span>
            </span>
            {boxes.length > 0 && (
              <span className="text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-500/40 px-2 py-0.5 rounded">
                {boxes.length} {boxes.length === 1 ? 'ALVO ATIVO' : 'ALVOS ATIVOS'} (Clique no '×' do alvo para remover)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Cyberpunk Holographic Export Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500/60 text-center space-y-4 shadow-[0_0_50px_rgba(6,182,212,0.4)]">
            {/* Corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none" />

            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/50 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-orbitron font-bold text-white tracking-wider">
                SÍNTESE NEURAL EM ANDAMENTO
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Reconstruindo quadros com duração ({duration.toFixed(1)}s) e áudio 100% preservados.
              </p>
            </div>

            {/* Glowing Cyber Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-cyan-300">
                <span>PROGRESSO</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 border border-cyan-500/30 overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-pink-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-100"
                />
              </div>
            </div>

            <p className="text-[11px] text-cyan-400/80 font-mono tracking-wider">{statusText}</p>
          </div>
        </div>
      )}
    </div>
  );
};
