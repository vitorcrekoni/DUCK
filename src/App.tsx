import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  Download,
  Trash2,
  Cpu,
  ShieldCheck,
  Zap,
  Info,
  MessageCircle,
  Instagram,
  RefreshCw,
  ExternalLink,
  Play,
  ArrowLeft,
  HelpCircle,
} from 'lucide-react';
import { Header } from './components/Header';
import { DropZone } from './components/DropZone';
import { DecodedItemCard } from './components/DecodedItemCard';
import { DecoderHelpModal } from './components/DecoderHelpModal';
import { WorkflowsPage } from './components/WorkflowsPage';
import { TtImgDecoderPage } from './components/TtImgDecoderPage';
import { GoogleProPage } from './components/GoogleProPage';
import { GoogleProCard } from './components/GoogleProCard';
import { AulasPage } from './components/AulasPage';
import { CrekoniDecoderPage } from './components/CrekoniDecoderPage';
import { PromptsPage } from './components/PromptsPage';
import { MarcaDaguaPage } from './components/MarcaDaguaPage';
import { WorkflowVideo18Modal } from './components/WorkflowVideo18Modal';
import { WorkflowDancinhasModal } from './components/WorkflowDancinhasModal';
import { WorkflowSemCensuraModal } from './components/WorkflowSemCensuraModal';
import { WorkflowUpscaleModal } from './components/WorkflowUpscaleModal';
import { WorkflowFaceSwapModal } from './components/WorkflowFaceSwapModal';
import { WorkflowLipSyncModal } from './components/WorkflowLipSyncModal';
import { WorkflowPrompt2VideoModal } from './components/WorkflowPrompt2VideoModal';
import { WorkflowDynoRemixModal } from './components/WorkflowDynoRemixModal';
import { WorkflowLegacyKrea2Modal } from './components/WorkflowLegacyKrea2Modal';
import { WorkflowMinimaxH3Modal } from './components/WorkflowMinimaxH3Modal';
import { WorkflowSuperUndressingV3Modal } from './components/WorkflowSuperUndressingV3Modal';
import { WorkflowFlux2TrocaRostoModal } from './components/WorkflowFlux2TrocaRostoModal';
import { WorkflowQwenAioModal } from './components/WorkflowQwenAioModal';
import { WorkflowLtxVideoRefModal } from './components/WorkflowLtxVideoRefModal';
import { ChangelogWidget } from './components/ChangelogWidget';
import { CustomCursor } from './components/CustomCursor';
import { DecodedResult, ContactConfig } from './types';
import {
  decodeDuckFile,
  getMimeType,
  downloadBlob,
  playCyberTone,
  formatBytes,
  DuckPasswordRequiredError,
  DuckInvalidPasswordError,
} from './utils/duckDecoder';

const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  whatsappNumber: '5544991840305',
  whatsappMessage: 'Olá! Vim pelo Duck Decoder e gostaria de tirar uma dúvida.',
  instagramHandle: 'crekoni.ia',
};

// Fixed destination URLs (protected against unauthorized edits)
const WF_UPSCALE_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 1 - Workflow Cria 5 Imagens +18')}`;
const WF_FACESWAP_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 2 - Workflow Modelo +18 Nua + Upscale')}`;
const WF_LIPSYNC_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 3 - Workflow Fotorrealista +18')}`;
const WF_VIDEO_18_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 4 - Workflow DaSiWa_Wan v11 Video +18')}`;
const WF_DANCINHAS_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 5 - 360 Rotacao Angulo Foto Qwen Manual +18')}`;
const WF_SEM_CENSURA_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 6 - Imagen Refine 8K Super Detalhes De Pele')}`;
const WF_DYNO_REMIX_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 7 - Wan2.2 Dyno Remix Vídeo +18')}`;
const WF_LEGACY_KREA2_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 8 - Legacy v2 KREA2 NSFW Imagem Qualidade UHD')}`;
const WF_MINIMAX_H3_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 9 - MinimaxH3 Vídeo +18 Com Áudio e Referencia')}`;
const WF_SUPER_UNDRESSING_V3_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 10 - Super Undressing V3 Upscale Removedor De Roupas')}`;
const WF_QWEN_AIO_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 11 - Workflow QWEN Aio Removedor De Roupas')}`;
const WF_FLUX2_TROCA_ROSTO_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 12 - Workflow Flux2 + Qwen Trocas de Rosto +18')}`;
const WF_LTX_VIDEO_REF_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Quadro 13 - Workflow LTX 2.3 Video Com Referencia Foto e Áudio')}`;
const WF_PROMPT2VIDEO_URL = `https://wa.me/5544991840305?text=${encodeURIComponent('Olá Vitor, quero comprar pelo WhatsApp: Workflow Prompt2Video & Animação')}`;

export default function App() {
  const [items, setItems] = useState<DecodedResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Active page: 'home' (Principal), 'decoder' (Decodificador LSB), 'workflows' (Central de Workflows), 'ttimg' (TT-IMG Decoder V1), 'googlepro' (Conta Google AI Pro), 'aulas' (Vídeo Aulas), 'crekonidecoder' (Sistema Unificado), or 'prompts' (Galeria de Prompts)
  const [currentPage, setCurrentPage] = useState<'home' | 'decoder' | 'workflows' | 'ttimg' | 'googlepro' | 'aulas' | 'crekonidecoder' | 'prompts'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#decoder') return 'decoder';
      if (window.location.hash === '#workflows') return 'workflows';
      if (window.location.hash === '#ttimg' || window.location.hash === '#tt-img') return 'ttimg';
      if (window.location.hash === '#googlepro' || window.location.hash === '#google-pro') return 'googlepro';
      if (window.location.hash === '#aulas' || window.location.hash === '#video-aulas') return 'aulas';
      if (window.location.hash === '#crekonidecoder' || window.location.hash === '#crekoni-decoder') return 'crekonidecoder';
      if (window.location.hash === '#prompts' || window.location.hash === '#prompt') return 'prompts';
    }
    return 'home';
  });

  // Listen to hash change for back/forward browser button navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#decoder') {
        setCurrentPage('decoder');
      } else if (window.location.hash === '#workflows') {
        setCurrentPage('workflows');
      } else if (window.location.hash === '#ttimg' || window.location.hash === '#tt-img') {
        setCurrentPage('ttimg');
      } else if (window.location.hash === '#googlepro' || window.location.hash === '#google-pro') {
        setCurrentPage('googlepro');
      } else if (window.location.hash === '#aulas' || window.location.hash === '#video-aulas') {
        setCurrentPage('aulas');
      } else if (window.location.hash === '#marcadagua' || window.location.hash === '#marca-dagua') {
        setCurrentPage('marcadagua');
      } else if (window.location.hash === '#crekonidecoder' || window.location.hash === '#crekoni-decoder') {
        setCurrentPage('crekonidecoder');
      } else if (window.location.hash === '#prompts' || window.location.hash === '#prompt') {
        setCurrentPage('prompts');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'decoder' | 'workflows' | 'ttimg' | 'googlepro' | 'aulas' | 'crekonidecoder' | 'prompts' | 'marcadagua') => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '#home' : `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playCyberTone('click', !soundEnabled);
  };

  // Sound preference stored in localStorage
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('duck_sound_enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  // Contact configuration
  const [contactConfig] = useState<ContactConfig>(DEFAULT_CONTACT_CONFIG);

  // Workflow Modals Popup State
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isVideo18ModalOpen, setIsVideo18ModalOpen] = useState(false);
  const [isDancinhasModalOpen, setIsDancinhasModalOpen] = useState(false);
  const [isSemCensuraModalOpen, setIsSemCensuraModalOpen] = useState(false);
  const [isUpscaleModalOpen, setIsUpscaleModalOpen] = useState(false);
  const [isFaceSwapModalOpen, setIsFaceSwapModalOpen] = useState(false);
  const [isLipSyncModalOpen, setIsLipSyncModalOpen] = useState(false);
  const [isPrompt2VideoModalOpen, setIsPrompt2VideoModalOpen] = useState(false);
  const [isDynoRemixModalOpen, setIsDynoRemixModalOpen] = useState(false);
  const [isLegacyKrea2ModalOpen, setIsLegacyKrea2ModalOpen] = useState(false);
  const [isMinimaxH3ModalOpen, setIsMinimaxH3ModalOpen] = useState(false);
  const [isSuperUndressingV3ModalOpen, setIsSuperUndressingV3ModalOpen] = useState(false);
  const [isFlux2ModalOpen, setIsFlux2ModalOpen] = useState(false);
  const [isQwenAioModalOpen, setIsQwenAioModalOpen] = useState(false);
  const [isLtxVideoRefModalOpen, setIsLtxVideoRefModalOpen] = useState(false);

  const wfVideo18Url = WF_VIDEO_18_URL;
  const wfDancinhasUrl = WF_DANCINHAS_URL;
  const wfSemCensuraUrl = WF_SEM_CENSURA_URL;
  const wfUpscaleUrl = WF_UPSCALE_URL;
  const wfFaceSwapUrl = WF_FACESWAP_URL;
  const wfLipSyncUrl = WF_LIPSYNC_URL;
  const wfPrompt2VideoUrl = WF_PROMPT2VIDEO_URL;
  const wfDynoRemixUrl = WF_DYNO_REMIX_URL;
  const wfLegacyKrea2Url = WF_LEGACY_KREA2_URL;
  const wfMinimaxH3Url = WF_MINIMAX_H3_URL;
  const wfSuperUndressingV3Url = WF_SUPER_UNDRESSING_V3_URL;
  const wfFlux2Url = WF_FLUX2_TROCA_ROSTO_URL;
  const wfQwenAioUrl = WF_QWEN_AIO_URL;
  const wfLtxVideoRefUrl = WF_LTX_VIDEO_REF_URL;

  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('duck_sound_enabled', JSON.stringify(next));
      } catch {
        // storage fallback
      }
      playCyberTone('click', !next);
      return next;
    });
  };

  const processFile = async (file: File, password?: string): Promise<DecodedResult> => {
    const tempId = Math.random().toString(36).substring(2, 9);
    try {
      const outcome = await decodeDuckFile(file, password);
      const mime = getMimeType(outcome.ext);
      const blob = new Blob([outcome.data], { type: mime });
      const blobUrl = URL.createObjectURL(blob);

      const isImage = /^(png|jpe?g|webp|gif|bmp|avif|svg)$/i.test(outcome.ext);
      const isVideo = /^(mp4|webm|mov|mkv)$/i.test(outcome.ext);
      const isAudio = /^(mp3|wav|ogg|aac|flac)$/i.test(outcome.ext);
      const isText = /^(txt|json|csv|html|xml|js|ts|py|md|log)$/i.test(outcome.ext);

      let textPreview: string | undefined;
      if (isText && outcome.data.length < 200000) {
        try {
          textPreview = new TextDecoder('utf-8', { fatal: false }).decode(outcome.data.slice(0, 1500));
        } catch {
          // ignore preview error
        }
      }

      return {
        id: tempId,
        originalFileName: file.name,
        originalFileSize: file.size,
        originalFile: file,
        extractedExt: outcome.ext,
        mimeType: mime,
        data: outcome.data,
        blobUrl,
        isImage,
        isVideo,
        isAudio,
        isText,
        textPreview,
        kBits: outcome.kBits,
        dimensions: outcome.dimensions,
        processingTimeMs: outcome.durationMs,
        status: 'success',
        timestamp: Date.now(),
      };
    } catch (err: unknown) {
      if (err instanceof DuckPasswordRequiredError) {
        return {
          id: tempId,
          originalFileName: file.name,
          originalFileSize: file.size,
          originalFile: file,
          extractedExt: err.ext ? err.ext.replace(/^\./, '') : 'bin',
          mimeType: 'application/octet-stream',
          data: new Uint8Array(),
          blobUrl: '',
          isImage: false,
          isVideo: false,
          isAudio: false,
          isText: false,
          processingTimeMs: 0,
          status: 'requires-password',
          requiresPassword: true,
          kBits: err.kBits,
          errorMessage: 'Este arquivo está protegido por senha. Digite a senha para decodificar.',
          timestamp: Date.now(),
        };
      }
      if (err instanceof DuckInvalidPasswordError) {
        return {
          id: tempId,
          originalFileName: file.name,
          originalFileSize: file.size,
          originalFile: file,
          extractedExt: err.ext ? err.ext.replace(/^\./, '') : 'bin',
          mimeType: 'application/octet-stream',
          data: new Uint8Array(),
          blobUrl: '',
          isImage: false,
          isVideo: false,
          isAudio: false,
          isText: false,
          processingTimeMs: 0,
          status: 'requires-password',
          requiresPassword: true,
          passwordError: 'Senha incorreta. Verifique e tente novamente.',
          kBits: err.kBits,
          errorMessage: 'Senha incorreta. Verifique e tente novamente.',
          timestamp: Date.now(),
        };
      }
      const msg = err instanceof Error ? err.message : String(err);
      return {
        id: tempId,
        originalFileName: file.name,
        originalFileSize: file.size,
        originalFile: file,
        extractedExt: 'bin',
        mimeType: 'application/octet-stream',
        data: new Uint8Array(),
        blobUrl: '',
        isImage: false,
        isVideo: false,
        isAudio: false,
        isText: false,
        processingTimeMs: 0,
        status: 'error',
        errorMessage: msg,
        timestamp: Date.now(),
      };
    }
  };

  const handleUnlockItem = async (id: string, password: string) => {
    const target = items.find((i) => i.id === id);
    if (!target || !target.originalFile) return;
    const res = await processFile(target.originalFile, password);
    if (res.status === 'success') {
      playCyberTone('success', !soundEnabled);
      setItems((prev) => prev.map((it) => (it.id === id ? { ...res, id } : it)));
    } else if (res.status === 'requires-password') {
      playCyberTone('error', !soundEnabled);
      throw new Error(res.passwordError || res.errorMessage || 'Senha incorreta.');
    } else {
      playCyberTone('error', !soundEnabled);
      throw new Error(res.errorMessage || 'Falha ao decodificar.');
    }
  };

  const handleFilesSelected = async (files: File[]) => {
    if (!files.length) return;
    setIsProcessing(true);
    playCyberTone('click', !soundEnabled);

    const newResults: DecodedResult[] = [];
    let hadError = false;

    for (const file of files) {
      const res = await processFile(file);
      newResults.push(res);
      if (res.status === 'error') hadError = true;
    }

    setItems((prev) => [...newResults, ...prev]);
    setIsProcessing(false);

    if (hadError) {
      playCyberTone('error', !soundEnabled);
    } else {
      playCyberTone('success', !soundEnabled);
    }
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.blobUrl) {
        URL.revokeObjectURL(target.blobUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleClearAll = () => {
    items.forEach((item) => {
      if (item.blobUrl) URL.revokeObjectURL(item.blobUrl);
    });
    setItems([]);
  };

  const handleDownloadAll = () => {
    const successItems = items.filter((i) => i.status === 'success');
    successItems.forEach((item, index) => {
      setTimeout(() => {
        const downloadFileName = `${item.originalFileName.replace(/\.png$/i, '')}_decoded.${item.extractedExt}`;
        downloadBlob(item.blobUrl, downloadFileName);
      }, index * 200);
    });
  };

  const successCount = items.filter((i) => i.status === 'success').length;
  const errorCount = items.filter((i) => i.status === 'error').length;

  return (
    <div className="relative min-h-screen flex flex-col bg-[#06080e] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Cybernetic Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-[120px] opacity-70" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-500/5 blur-[100px]" />
      </div>

      {/* Main Header */}
      <Header
        contactConfig={contactConfig}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {currentPage === 'home' ? (
          /* ========================================================================= */
          /* PÁGINA PRINCIPAL: FERRAMENTAS DISPONÍVEIS (SEM O DECODIFICADOR NO CORPO) */
          /* ========================================================================= */
          <div>
            {/* Hero Section da Página Principal */}
            <section className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>DECODIFICADORES & WORKFLOWS • CREKONI</span>
              </div>

              {/* 3D Cinematic Stage for CREKONI */}
              <div className="relative inline-block w-full max-w-3xl mx-auto pt-1 pb-4 sm:pb-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-12 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

                <h1 className="relative flex flex-col items-center justify-center select-none py-1">
                  {/* Linha de Cima: CREKONI em 3D Cromado Chanfrado com Luzes e Efeito Flash */}
                  <div className="relative group flex flex-col items-center">
                    <div className="relative px-1 py-0.5">
                      <div className="relative font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.18em] pl-[0.18em] chrome-3d-title leading-none transition-transform duration-300 hover:scale-[1.01]">
                        CREKONI
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 px-1 py-0.5 font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.18em] pl-[0.18em] leading-none chrome-flash-overlay pointer-events-none select-none"
                      >
                        CREKONI
                      </div>
                    </div>

                    {/* Reflexo Espelhado no Piso Escuro */}
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 left-0 right-0 font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.18em] pl-[0.18em] leading-none pointer-events-none select-none opacity-15"
                      style={{
                        transform: 'scaleY(-0.55) translateY(10%)',
                        filter: 'blur(1.5px)',
                        maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)',
                        WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)',
                        color: '#93c5fd',
                      }}
                    >
                      CREKONI
                    </div>

                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2/4 h-1.5 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-sm pointer-events-none" />
                  </div>

                  {/* Linha de Baixo: Central de Ferramentas & Workflows */}
                  <div className="relative mt-4 sm:mt-5 md:mt-6 flex items-center justify-center gap-2.5">
                    <span className="hidden sm:block w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                    <span className="font-display font-semibold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-cyan-200 to-slate-300 tracking-[0.18em] sm:tracking-[0.24em] uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.25)]">
                      Central de Ferramentas & Workflows
                    </span>
                    <span className="hidden sm:block w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent via-cyan-400/40 to-transparent" />
                  </div>
                </h1>
              </div>

              <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
                Acesse nossas ferramentas exclusivas, workflows profissionais de inteligência artificial e Decodificador
              </p>

              {/* Destaques / Atalhos */}
              <div className="mt-7 max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
                {/* Linha 1: Primeiro quadro WORKFLOWS IA e à direita VIDEO AULAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* 1. Primeiro Quadro: WORKFLOWS IA */}
                  <button
                    type="button"
                    id="hero-btn-enter-workflows"
                    onClick={() => handleNavigate('workflows')}
                    title="Clique para entrar na página de Workflows IA"
                    className="group relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 via-[#0e0c1f] to-purple-950/60 hover:from-purple-900/70 hover:to-purple-900/70 border border-purple-500/40 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-all duration-300 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-105 transition-transform shrink-0">
                        <span className="text-2xl select-none">⚡</span>
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-400 animate-ping opacity-75" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-purple-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-purple-200 transition-colors">
                            WORKFLOWS IA
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-purple-950 text-purple-300 border border-purple-500/30">
                            FLUXOS
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono mt-0.5">
                          Adquira Os Melhores Workflows De Imagens e Videos
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 group-hover:bg-purple-400 group-hover:text-black font-mono text-xs font-bold transition-all shrink-0 ml-2">
                      <span>ENTRAR</span>
                      <span className="group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </button>

                  {/* 2. À Direita: PROMPTS IA (Cor Esverdeada) */}
                  <button
                    type="button"
                    id="hero-card-prompts"
                    onClick={() => handleNavigate('prompts')}
                    title="Clique para acessar a Galeria de Prompts IA"
                    className="group relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#061e13] to-emerald-950/60 hover:from-emerald-900/70 hover:to-emerald-900/70 border border-emerald-500/40 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all duration-300 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-105 transition-transform shrink-0">
                        <span className="text-2xl select-none">✨</span>
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-emerald-200 transition-colors">
                            PROMPTS IA
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                            GALERIA
                          </span>
                        </div>
                        <p className="text-xs text-emerald-200/80 font-mono mt-0.5">
                          Galeria com fotos e vídeos reais, copie prompts com 1 clique
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 group-hover:bg-emerald-400 group-hover:text-black font-mono text-xs font-bold transition-all shrink-0 ml-2">
                      <span>ENTRAR</span>
                      <span className="group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </button>
                </div>

                {/* Quadro CREKONI DECODER: ABAIXO DELES, CENTRALIZADO AO MEIO */}
                <button
                  type="button"
                  id="hero-btn-enter-crekonidecoder"
                  onClick={() => handleNavigate('crekonidecoder')}
                  title="Entrar no Crekoni Decoder - Sistema Unificado Duck + TT-IMG"
                  className="group relative w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-[#0a1529] to-amber-950/80 hover:from-cyan-900/90 hover:to-amber-900/90 border-2 border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:shadow-[0_0_40px_rgba(6,182,212,0.45)] transition-all duration-300 cursor-pointer text-left overflow-hidden"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-cyan-950 via-slate-900 to-amber-950 border border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform shrink-0">
                      <div className="flex items-center -space-x-1.5">
                        <span className="text-xl sm:text-2xl select-none">🦆</span>
                        <span className="text-xl sm:text-2xl select-none">🖼️</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-orbitron font-extrabold text-base sm:text-lg text-white group-hover:text-cyan-200 transition-colors tracking-wide">
                          CREKONI DECODER
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-cyan-200 bg-cyan-950/90 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                          <Sparkles className="w-3 h-3 text-cyan-400 animate-pulse" />
                          <span>SISTEMA UNIFICADO</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>DUAL ENGINE ATIVO</span>
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                        Os dois juntos: <strong className="text-cyan-300">Duck LSB</strong> + <strong className="text-amber-300">TT-IMG V1</strong> para decodificar todo tipo de arquivo e Imagens Feitos Com IA
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-amber-400 text-black font-mono text-xs font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-all shrink-0 self-end sm:self-center">
                    <span>ENTRAR AGORA</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </div>
                </button>

                {/* Quadro MAIOR: CONTA GOOGLE AI PRO 18 MESES POR R$ 20,00 */}
                <GoogleProCard
                  onEnter={() => handleNavigate('googlepro')}
                  contactConfig={contactConfig}
                  soundEnabled={soundEnabled}
                />

                {/* Quadro VIDEO AULAS: Posicionado abaixo de GooglePro */}
                <button
                  type="button"
                  id="hero-card-video-aulas"
                  onClick={() => handleNavigate('aulas')}
                  title="Clique para acessar a página de Vídeo Aulas"
                  className="group relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-pink-950/50 via-[#1c0d18] to-pink-950/50 hover:from-pink-900/60 hover:to-pink-900/60 border border-pink-500/40 hover:border-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.15)] hover:shadow-[0_0_30px_rgba(244,63,94,0.35)] transition-all duration-300 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-pink-500/20 border border-pink-400/40 text-pink-300 shadow-[0_0_15px_rgba(244,63,94,0.2)] group-hover:scale-105 transition-transform shrink-0">
                      <span className="text-2xl select-none">🎬</span>
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-pink-200 transition-colors">
                          VIDEO AULAS
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-pink-950 text-pink-300 border border-pink-500/30">
                          TUTORIAIS
                        </span>
                      </div>
                      <p className="text-xs text-pink-200/80 font-mono mt-0.5">
                        Treinamentos e aulas práticas passo a passo Nordy e RunningHub
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/20 border border-pink-400/40 text-pink-300 group-hover:bg-pink-400 group-hover:text-black font-mono text-xs font-bold transition-all shrink-0 ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-400 group-hover:bg-black animate-pulse" />
                    <span>ASSISTIR</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </div>
                </button>

                {/* Quadro MARCA D'ÁGUA: Estilo Futurista Cyberpunk CREKONI */}
                <button
                  type="button"
                  id="hero-card-marca-dagua"
                  onClick={() => handleNavigate('marcadagua')}
                  title="Clique para acessar o removedor de marca d'água de vídeos e imagens"
                  className="group relative w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-[#071626] to-pink-950/50 hover:from-cyan-900/70 hover:to-pink-900/60 border border-cyan-500/40 hover:border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.18)] hover:shadow-[0_0_35px_rgba(6,182,212,0.38)] transition-all duration-300 text-left cursor-pointer overflow-hidden"
                >
                  {/* HUD Corner Accents */}
                  <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none group-hover:border-cyan-300 transition-colors" />
                  <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none group-hover:border-cyan-300 transition-colors" />
                  <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none group-hover:border-cyan-300 transition-colors" />
                  <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none group-hover:border-cyan-300 transition-colors" />

                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/25 to-pink-500/25 border border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-transform shrink-0 mt-0.5 sm:mt-0">
                      <span className="text-2xl select-none">✨</span>
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-orbitron font-bold text-sm sm:text-base text-white group-hover:text-cyan-200 transition-colors tracking-wide">
                          REMOVEDOR DE MARCA D'ÁGUA
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.25)]">
                          IA NEURAL
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-pink-950 text-pink-300 border border-pink-500/40 shadow-[0_0_10px_rgba(244,63,94,0.25)]">
                          VÍDEOS & FOTOS
                        </span>
                        <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>100% LOCAL</span>
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-300 font-mono mt-1">
                        Apague logos e marcas com reconstituição inteligente mantendo <strong className="text-cyan-300">resolução nativa</strong>, <strong className="text-pink-300">FPS</strong> e <strong className="text-emerald-300">áudio original</strong>
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-0 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 hover:from-cyan-300 hover:to-pink-300 text-black font-mono text-xs font-bold shadow-[0_0_18px_rgba(6,182,212,0.35)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] group-hover:scale-105 transition-all shrink-0 self-end sm:self-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    <span>ACESSAR</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </div>
                </button>
              </div>
            </section>
          </div>
        ) : currentPage === 'workflows' ? (
          <WorkflowsPage
            onBack={() => handleNavigate('home')}
            onOpenVideo18Modal={() => setIsVideo18ModalOpen(true)}
            onOpenDancinhasModal={() => setIsDancinhasModalOpen(true)}
            onOpenSemCensuraModal={() => setIsSemCensuraModalOpen(true)}
            onOpenUpscaleModal={() => setIsUpscaleModalOpen(true)}
            onOpenFaceSwapModal={() => setIsFaceSwapModalOpen(true)}
            onOpenLipSyncModal={() => setIsLipSyncModalOpen(true)}
            onOpenPrompt2VideoModal={() => setIsPrompt2VideoModalOpen(true)}
            onOpenDynoRemixModal={() => setIsDynoRemixModalOpen(true)}
            onOpenLegacyKrea2Modal={() => setIsLegacyKrea2ModalOpen(true)}
            onOpenMinimaxH3Modal={() => setIsMinimaxH3ModalOpen(true)}
            onOpenSuperUndressingV3Modal={() => setIsSuperUndressingV3ModalOpen(true)}
            onOpenFlux2Modal={() => setIsFlux2ModalOpen(true)}
            onOpenQwenAioModal={() => setIsQwenAioModalOpen(true)}
            onOpenLtxVideoRefModal={() => setIsLtxVideoRefModalOpen(true)}
            contactConfig={contactConfig}
          />
        ) : currentPage === 'ttimg' ? (
          <TtImgDecoderPage
            onBack={() => handleNavigate('home')}
            soundEnabled={soundEnabled}
          />
        ) : currentPage === 'googlepro' ? (
          <GoogleProPage
            onBack={() => handleNavigate('home')}
            contactConfig={contactConfig}
            soundEnabled={soundEnabled}
          />
        ) : currentPage === 'aulas' ? (
          <AulasPage onBack={() => handleNavigate('home')} />
        ) : currentPage === 'marcadagua' ? (
          <MarcaDaguaPage
            onBack={() => handleNavigate('home')}
            soundEnabled={soundEnabled}
          />
        ) : currentPage === 'crekonidecoder' ? (
          <CrekoniDecoderPage
            onBack={() => handleNavigate('home')}
            soundEnabled={soundEnabled}
          />
        ) : currentPage === 'prompts' ? (
          <PromptsPage
            onBack={() => handleNavigate('home')}
            soundEnabled={soundEnabled}
          />
        ) : (
          /* ========================================================================= */
          /* PÁGINA DO DECODIFICADOR ATUAL (DROPZONE E RESULTADOS)                     */
          /* ========================================================================= */
          <div>
            {/* Barra de Voltar no topo do Decodificador */}
            <div className="mb-6 flex items-center justify-between">
              <button
                type="button"
                id="btn-decoder-back-tools"
                onClick={() => handleNavigate('home')}
                className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/70 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>← VOLTAR PARA A PÁGINA PRINCIPAL</span>
              </button>
            </div>

            {/* Hero Section: Minimalist & Futuristic */}
            <section className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>ESTEGANOGRAFIA DIGITAL • FORMATO DUCK LSB</span>
              </div>

              {/* 3D Cinematic Stage for CREKONI & Duck Imagem e Video Decod */}
              <div className="relative inline-block w-full max-w-3xl mx-auto pt-1 pb-4 sm:pb-6">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-12 bg-sky-500/10 blur-3xl rounded-full pointer-events-none" />

                <h1 className="relative flex flex-col items-center justify-center select-none py-1">
                  {/* Linha de Cima: CREKONI em 3D Cromado Chanfrado com Luzes e Efeito Flash recortado nas letras */}
                  <div className="relative group flex flex-col items-center">
                    <div className="relative px-1 py-0.5">
                      <div className="relative font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.18em] pl-[0.18em] chrome-3d-title leading-none transition-transform duration-300 hover:scale-[1.01]">
                        CREKONI
                      </div>
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 px-1 py-0.5 font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.18em] pl-[0.18em] leading-none chrome-flash-overlay pointer-events-none select-none"
                      >
                        CREKONI
                      </div>
                    </div>

                    {/* Reflexo Espelhado no Piso Escuro */}
                    <div
                      aria-hidden="true"
                      className="absolute -bottom-3 sm:-bottom-4 md:-bottom-5 left-0 right-0 font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.18em] pl-[0.18em] leading-none pointer-events-none select-none opacity-15"
                      style={{
                        transform: 'scaleY(-0.55) translateY(10%)',
                        filter: 'blur(1.5px)',
                        maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)',
                        WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)',
                        color: '#93c5fd',
                      }}
                    >
                      CREKONI
                    </div>

                    <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-2/4 h-1.5 bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-sm pointer-events-none" />
                  </div>

                  {/* Linha de Baixo: Duck Imagem e Video Decod */}
                  <div className="relative mt-4 sm:mt-5 md:mt-6 flex items-center justify-center gap-2.5">
                    <span className="hidden sm:block w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                    <span className="font-display font-semibold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-cyan-200 to-slate-300 tracking-[0.18em] sm:tracking-[0.24em] uppercase drop-shadow-[0_0_8px_rgba(6,182,212,0.25)]">
                      Duck Imagem e Video Decod
                    </span>
                    <span className="hidden sm:block w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent via-cyan-400/40 to-transparent" />
                  </div>
                </h1>
              </div>

              <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-normal">
                Extraia arquivos ocultos em imagens PNG com precisão e velocidade. Compatível com o formato público SS_tools sem senha.
              </p>
            </section>

            {/* Drop Zone Component */}
            <section aria-label="Área de Envio">
              <DropZone onFilesSelected={handleFilesSelected} isProcessing={isProcessing} />
            </section>

            {/* Botão DÚVIDAS? logo após a janela de upload */}
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                id="btn-decoder-duvidas"
                onClick={() => setIsHelpModalOpen(true)}
                className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:shadow-[0_0_30px_rgba(6,182,212,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer select-none"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span className="tracking-wider">DÚVIDAS?</span>
                <span className="text-[11px] text-cyan-300/80 font-normal hidden sm:inline ml-1 font-mono">
                  (Para que serve o decodificador?)
                </span>
              </button>
            </div>

            {/* Results / Status Section */}
            {items.length > 0 && (
              <section className="mt-10">
                {/* Action Bar & Telemetry */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-display font-semibold text-white">
                        Resultados Decodificados
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        {items.length} {items.length === 1 ? 'item' : 'itens'}
                      </span>
                    </div>

                    {successCount > 0 && (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                        ✓ {successCount} recuperado(s)
                      </span>
                    )}
                    {errorCount > 0 && (
                      <span className="text-xs font-mono text-rose-400 flex items-center gap-1">
                        ✕ {errorCount} falha(s)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {successCount > 1 && (
                      <button
                        type="button"
                        onClick={handleDownloadAll}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Baixar Todos</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Limpar</span>
                    </button>
                  </div>
                </div>

                {/* Decoded Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <DecodedItemCard
                      key={item.id}
                      item={item}
                      onRemove={handleRemoveItem}
                      onUnlock={handleUnlockItem}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* Futuristic Minimal Footer */}
      <footer className="mt-auto border-t border-white/[0.06] bg-[#05070c] py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Site Desenvolvido Por Vitor Crekoni</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={`https://wa.me/${contactConfig.whatsappNumber.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/crekoni.ia/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors flex items-center gap-1"
            >
              <Instagram className="w-3.5 h-3.5" />
              Instagram
            </a>
          </div>
        </div>
      </footer>

      {/* Pop-up Modal Informativo DÚVIDAS? */}
      <DecoderHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Pop-up Modal Workflow Video +18 com Vídeo Exemplo e Botão WhatsApp */}
      <WorkflowVideo18Modal
        isOpen={isVideo18ModalOpen}
        onClose={() => setIsVideo18ModalOpen(false)}
        whatsappUrl={wfVideo18Url}
      />

      {/* Pop-up Modal Workflow Dancinhas com Vídeo Exemplo e Botão WhatsApp */}
      <WorkflowDancinhasModal
        isOpen={isDancinhasModalOpen}
        onClose={() => setIsDancinhasModalOpen(false)}
        whatsappUrl={wfDancinhasUrl}
      />

      {/* Pop-up Modal Workflow Motion Sem Censura +18 com Vídeo Exemplo e Botão WhatsApp */}
      <WorkflowSemCensuraModal
        isOpen={isSemCensuraModalOpen}
        onClose={() => setIsSemCensuraModalOpen(false)}
        whatsappUrl={wfSemCensuraUrl}
      />

      {/* Pop-up Modal Workflow Upscaler 4K Pro com Vídeo Exemplo e Botão WhatsApp */}
      <WorkflowUpscaleModal
        isOpen={isUpscaleModalOpen}
        onClose={() => setIsUpscaleModalOpen(false)}
        whatsappUrl={wfUpscaleUrl}
      />

      {/* Pop-up Modal Workflow FaceSwap com Vídeo Exemplo e Botão WhatsApp */}
      <WorkflowFaceSwapModal
        isOpen={isFaceSwapModalOpen}
        onClose={() => setIsFaceSwapModalOpen(false)}
        whatsappUrl={wfFaceSwapUrl}
      />

      {/* Pop-up Modal Workflow Lip Sync com Vídeo Exemplo e Botão WhatsApp */}
      <WorkflowLipSyncModal
        isOpen={isLipSyncModalOpen}
        onClose={() => setIsLipSyncModalOpen(false)}
        whatsappUrl={wfLipSyncUrl}
      />

      {/* Pop-up Modal Workflow Prompt2Video com Vídeo Exemplo e Botão WhatsApp */}
      <WorkflowPrompt2VideoModal
        isOpen={isPrompt2VideoModalOpen}
        onClose={() => setIsPrompt2VideoModalOpen(false)}
        whatsappUrl={wfPrompt2VideoUrl}
      />

      {/* Pop-up Modal Workflow Wan2.2 Dyno Remix Vídeo +18 (Quadro 7) */}
      <WorkflowDynoRemixModal
        isOpen={isDynoRemixModalOpen}
        onClose={() => setIsDynoRemixModalOpen(false)}
        whatsappUrl={wfDynoRemixUrl}
      />

      {/* Pop-up Modal Workflow Legacy v2 KREA2 NSFW Imagem Qualidade UHD (Quadro 8) */}
      <WorkflowLegacyKrea2Modal
        isOpen={isLegacyKrea2ModalOpen}
        onClose={() => setIsLegacyKrea2ModalOpen(false)}
        whatsappUrl={wfLegacyKrea2Url}
      />

      {/* Pop-up Modal Workflow MinimaxH3 Vídeo +18 Com Áudio e Referencia (Quadro 9) */}
      <WorkflowMinimaxH3Modal
        isOpen={isMinimaxH3ModalOpen}
        onClose={() => setIsMinimaxH3ModalOpen(false)}
        whatsappUrl={wfMinimaxH3Url}
      />

      {/* Pop-up Modal Workflow Super Undressing V3 Upscale Removedor De Roupas (Quadro 10) */}
      <WorkflowSuperUndressingV3Modal
        isOpen={isSuperUndressingV3ModalOpen}
        onClose={() => setIsSuperUndressingV3ModalOpen(false)}
        whatsappUrl={wfSuperUndressingV3Url}
      />

      {/* Pop-up Modal Workflow Flux2 Troca de Rosto +18 (Quadro 11) */}
      <WorkflowFlux2TrocaRostoModal
        isOpen={isFlux2ModalOpen}
        onClose={() => setIsFlux2ModalOpen(false)}
        whatsappUrl={wfFlux2Url}
      />

      {/* Pop-up Modal Workflow QWEN Aio (Quadro 12) */}
      <WorkflowQwenAioModal
        isOpen={isQwenAioModalOpen}
        onClose={() => setIsQwenAioModalOpen(false)}
        whatsappUrl={wfQwenAioUrl}
      />

      {/* Pop-up Modal Workflow LTX 2.3 Video Com Referencia Foto e Áudio (Quadro 13) */}
      <WorkflowLtxVideoRefModal
        isOpen={isLtxVideoRefModalOpen}
        onClose={() => setIsLtxVideoRefModalOpen(false)}
        whatsappUrl={wfLtxVideoRefUrl}
      />

      {/* Janela Flutuante à Esquerda com Notas de Atualização estilo Launcher */}
      <ChangelogWidget onNavigate={handleNavigate} />

      {/* Cursor Futurista Cyberpunk Azul com Rastro e Anel Interativo */}
      <CustomCursor />
    </div>
  );
}
