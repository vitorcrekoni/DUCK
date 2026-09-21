import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Download,
  Trash2,
  UploadCloud,
  FileCheck,
  AlertTriangle,
  Eye,
  X,
  Play,
  CheckCircle2,
  Layers,
  Cpu,
  RefreshCw,
  Sliders,
  ShieldCheck,
  FileText,
  Music,
  Video,
  Image as ImageIcon,
  Archive,
  Lock,
  Unlock,
  Key,
  EyeOff,
} from 'lucide-react';
import {
  UnifiedDecodedResult,
  decodeUnifiedFile,
  formatBytes,
  downloadBlob,
  getFileCategoryIcon,
} from '../utils/crekoniUnifiedDecoder';
import { playCyberTone } from '../utils/duckDecoder';

interface CrekoniDecoderPageProps {
  onBack: () => void;
  soundEnabled: boolean;
}

export const CrekoniDecoderPage: React.FC<CrekoniDecoderPageProps> = ({
  onBack,
  soundEnabled,
}) => {
  const [items, setItems] = useState<UnifiedDecodedResult[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [cropWatermark, setCropWatermark] = useState<boolean>(true);
  const [activeModalItem, setActiveModalItem] = useState<UnifiedDecodedResult | null>(null);
  const [processingProgress, setProcessingProgress] = useState<{ current: number; total: number } | null>(null);

  // Estados de desbloqueio com senha
  const [itemPasswords, setItemPasswords] = useState<Record<string, string>>({});
  const [itemShowPassword, setItemShowPassword] = useState<Record<string, boolean>>({});
  const [unlockingIds, setUnlockingIds] = useState<Record<string, boolean>>({});
  const [itemPasswordErrors, setItemPasswordErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manipular evento de colar imagem (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const clipboardItems = e.clipboardData?.items;
      if (!clipboardItems) return;

      const files: File[] = [];
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }

      if (files.length > 0) {
        handleProcessFiles(files);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [cropWatermark, soundEnabled]);

  const handleProcessFiles = async (files: File[]) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    setProcessingProgress({ current: 0, total: files.length });
    playCyberTone('click', !soundEnabled);

    const newResults: UnifiedDecodedResult[] = [];
    let hasError = false;
    let hasPasswordRequired = false;

    for (let i = 0; i < files.length; i++) {
      setProcessingProgress({ current: i + 1, total: files.length });
      const file = files[i];
      const result = await decodeUnifiedFile(file, { cropWatermark });
      newResults.push(result);
      if (result.status === 'error') hasError = true;
      if (result.status === 'requires-password') hasPasswordRequired = true;
    }

    setItems((prev) => [...newResults, ...prev]);
    setIsProcessing(false);
    setProcessingProgress(null);

    if (hasPasswordRequired) {
      playCyberTone('click', !soundEnabled);
    } else if (hasError) {
      playCyberTone('error', !soundEnabled);
    } else {
      playCyberTone('success', !soundEnabled);
    }
  };

  const handleUnlockItem = async (item: UnifiedDecodedResult) => {
    const password = (itemPasswords[item.id] || '').trim();
    if (!password) {
      setItemPasswordErrors((prev) => ({ ...prev, [item.id]: 'Digite a senha para decodificar.' }));
      playCyberTone('error', !soundEnabled);
      return;
    }
    if (!item.originalFile) {
      setItemPasswordErrors((prev) => ({ ...prev, [item.id]: 'Arquivo original indisponível para desbloqueio.' }));
      return;
    }

    setUnlockingIds((prev) => ({ ...prev, [item.id]: true }));
    setItemPasswordErrors((prev) => ({ ...prev, [item.id]: '' }));
    playCyberTone('click', !soundEnabled);

    try {
      const updated = await decodeUnifiedFile(item.originalFile, {
        cropWatermark,
        password,
      });

      if (updated.status === 'success') {
        playCyberTone('success', !soundEnabled);
        setItems((prev) =>
          prev.map((it) => (it.id === item.id ? { ...updated, id: item.id } : it))
        );
      } else if (updated.status === 'requires-password') {
        playCyberTone('error', !soundEnabled);
        const errMsg = updated.passwordError || 'Senha incorreta. Verifique e tente novamente.';
        setItemPasswordErrors((prev) => ({ ...prev, [item.id]: errMsg }));
      } else {
        playCyberTone('error', !soundEnabled);
        setItemPasswordErrors((prev) => ({
          ...prev,
          [item.id]: updated.errorMessage || 'Falha ao decodificar com esta senha.',
        }));
      }
    } catch (err: unknown) {
      playCyberTone('error', !soundEnabled);
      const msg = err instanceof Error ? err.message : 'Erro ao descriptografar.';
      setItemPasswordErrors((prev) => ({ ...prev, [item.id]: msg }));
    } finally {
      setUnlockingIds((prev) => ({ ...prev, [item.id]: false }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const updateItemDimensions = (id: string, width: number, height: number) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          if (!it.dimensions || it.dimensions.width !== width || it.dimensions.height !== height) {
            return {
              ...it,
              dimensions: { width, height },
              resolution: `${width}x${height} px`,
            };
          }
        }
        return it;
      })
    );

    setActiveModalItem((current) => {
      if (current && current.id === id) {
        if (!current.dimensions || current.dimensions.width !== width || current.dimensions.height !== height) {
          return {
            ...current,
            dimensions: { width, height },
            resolution: `${width}x${height} px`,
          };
        }
      }
      return current;
    });
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.blobUrl) {
        URL.revokeObjectURL(target.blobUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
    playCyberTone('click', !soundEnabled);
  };

  const handleClearAll = () => {
    items.forEach((item) => {
      if (item.blobUrl) {
        URL.revokeObjectURL(item.blobUrl);
      }
    });
    setItems([]);
    playCyberTone('click', !soundEnabled);
  };

  const handleDownloadAll = () => {
    const successfulItems = items.filter((item) => item.status === 'success');
    if (successfulItems.length === 0) return;

    playCyberTone('click', !soundEnabled);
    successfulItems.forEach((item, index) => {
      setTimeout(() => {
        downloadBlob(item.blobUrl, item.name);
      }, index * 200);
    });
  };

  const successfulCount = items.filter((i) => i.status === 'success').length;
  const lockedCount = items.filter((i) => i.status === 'requires-password').length;
  const errorCount = items.filter((i) => i.status === 'error').length;
  const duckCount = items.filter((i) => i.status === 'success' && i.engine === 'duck').length;
  const ttImgCount = items.filter((i) => i.status === 'success' && i.engine === 'ttimg').length;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
      {/* Botão Superior para Voltar */}
      <div className="mb-5 flex items-center justify-between">
        <button
          type="button"
          id="btn-crekoni-back-home"
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/70 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.1)]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← VOLTAR PARA A PÁGINA PRINCIPAL</span>
        </button>

        {/* Indicador de Status dos Motores */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>DUCK LSB</span>
          </div>
          <span className="text-slate-500 text-xs">+</span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/40 text-[11px] font-mono text-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>TT-IMG V1</span>
          </div>
        </div>
      </div>

      {/* Hero Central: CREKONI DECODER UNIFICADO */}
      <section className="text-center mb-7 sm:mb-9">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-950/70 via-indigo-950/60 to-amber-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
          <span className="tracking-wide">SISTEMA UNIFICADO DUAL ENGINE • 100% NO NAVEGADOR</span>
        </div>

        <div className="relative inline-block w-full max-w-3xl mx-auto py-1">
          <div className="relative group flex flex-col items-center">
            <div className="relative px-1 py-0.5">
              <div className="relative font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.16em] pl-[0.16em] chrome-3d-title leading-none">
                CREKONI DECODER
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 px-1 py-0.5 font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.16em] pl-[0.16em] leading-none chrome-flash-overlay pointer-events-none select-none"
              >
                CREKONI DECODER
              </div>
            </div>

            {/* Linha de Subtítulo */}
            <div className="relative mt-3 sm:mt-4 flex items-center justify-center gap-2.5">
              <span className="hidden sm:block w-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <span className="font-display font-semibold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-amber-200 tracking-[0.2em] uppercase">
                Duck Decoder + TT-IMG Integrados em Uma Só Ferramenta
              </span>
              <span className="hidden sm:block w-8 h-[1px] bg-gradient-to-l from-transparent via-amber-400/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Quadro simples arredondado com o texto informativo (igual ao de baixo dele) */}
        <div className="mt-4 max-w-xl mx-auto p-3 sm:p-3.5 rounded-2xl bg-[#0a101f]/80 border border-white/10 backdrop-blur-md text-center">
          <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
            Decodifique <strong className="text-white">qualquer tipo de arquivo</strong> suportado por ambos os decodificadores:
            vídeos <span className="text-cyan-300">MP4, WEBM, MKV</span>, imagens <span className="text-cyan-300">PNG, JPG, WEBP</span>, áudios e documentos.
            O sistema detecta automaticamente se a imagem foi codificada pelo <span className="text-cyan-300 font-semibold">Duck Decoder (LSB 2/6/8)</span> ou pelo <span className="text-amber-300 font-semibold">TT-IMG (V1 ComfyUI/RunningHub)</span>.
          </p>
        </div>

        {/* Barra de Ajustes & Modo */}
        <div className="mt-3.5 max-w-xl mx-auto flex flex-wrap items-center justify-center gap-3 p-2.5 rounded-2xl bg-[#0a101f]/80 border border-white/10 backdrop-blur-md">
          {/* Toggle Marca-d'água TT-Tools */}
          <label className="inline-flex items-center gap-2.5 cursor-pointer text-xs font-mono text-slate-300 hover:text-white transition-colors select-none px-2 py-1">
            <input
              type="checkbox"
              checked={cropWatermark}
              onChange={(e) => setCropWatermark(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-900 border-white/20 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 cursor-pointer"
            />
            <span className="flex items-center gap-1.5">
              <span>Remover Marca-d'água 20% (TT-Tools / RunningHub)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                RECOMENDADO
              </span>
            </span>
          </label>
        </div>
      </section>

      {/* Input File Oculto */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Área Unificada de Upload (DropZone) */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative rounded-3xl border-2 border-dashed p-7 sm:p-10 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
          isDragging
            ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_40px_rgba(6,182,212,0.35)] scale-[1.01]'
            : 'border-white/15 bg-gradient-to-b from-[#090e1a]/90 to-[#060913]/90 hover:border-cyan-500/50 hover:bg-[#0c1424]/90 shadow-[0_0_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Fundo Cibernético com Efeito de Luz */}
        <div className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-cyan-500/20 via-indigo-500/10 to-transparent blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-72 h-36 bg-amber-500/15 blur-3xl" />
        </div>

        <div className="relative flex flex-col items-center justify-center gap-3.5 select-none">
          {/* Ícone Pulsante Dual Engine */}
          <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-cyan-950 via-slate-900 to-amber-950 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.25)] group-hover:scale-105 group-hover:border-cyan-400 transition-all">
            <div className="flex items-center -space-x-2">
              <span className="text-2xl sm:text-3xl filter drop-shadow">🦆</span>
              <span className="text-2xl sm:text-3xl filter drop-shadow">🖼️</span>
            </div>
            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#06080e] animate-pulse" />
          </div>

          <div>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white group-hover:text-cyan-200 transition-colors">
              Arraste e solte imagens aqui ou <span className="text-cyan-400 underline decoration-cyan-500/40">clique para selecionar</span>
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Compatível com imagens codificadas em Duck Decoder (PNG) e TT-IMG (PNG, JPG, WEBP).
              Também suporta colar da área de transferência (<kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded">Ctrl+V</kbd>).
            </p>
          </div>

          {/* Badges de Formatos Suportados */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
              🎬 VÍDEOS: MP4 • WEBM • MKV • AVI
            </span>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium text-amber-300 bg-amber-950/60 border border-amber-500/30">
              🖼️ IMAGENS: PNG • JPG • WEBP • GIF
            </span>
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30">
              📦 ARQUIVOS: ZIP • ÁUDIO • DADOS
            </span>
          </div>
        </div>
      </div>

      {/* Indicador de Progresso / Carregando */}
      {isProcessing && (
        <div className="mt-5 p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center justify-between gap-4 animate-pulse">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
            <div>
              <div className="font-mono text-xs font-bold text-cyan-200">
                DECODIFICANDO COM MOTORES DUCK + TT-IMG...
              </div>
              <div className="text-[11px] text-slate-300 font-mono">
                {processingProgress
                  ? `Processando arquivo ${processingProgress.current} de ${processingProgress.total}`
                  : 'Analisando dados nos canais LSB e protocolos esteganográficos...'}
              </div>
            </div>
          </div>
          <div className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
            DUAL PASS
          </div>
        </div>
      )}

      {/* Seção de Resultados */}
      {items.length > 0 && (
        <section className="mt-8">
          {/* Barra de Estatísticas e Ações em Lote */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0a101f] border border-white/10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
              <span className="text-slate-300">Total: <strong className="text-white">{items.length}</strong></span>
              <span className="w-1 h-3 bg-white/10" />
              <span className="text-emerald-400">Sucessos: <strong>{successfulCount}</strong></span>
              {duckCount > 0 && (
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px]">
                  🦆 Duck: {duckCount}
                </span>
              )}
              {ttImgCount > 0 && (
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 text-[10px]">
                  🖼️ TT-IMG: {ttImgCount}
                </span>
              )}
              {lockedCount > 0 && (
                <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40 text-[10px] inline-flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5 text-amber-400" />
                  Com Senha: <strong>{lockedCount}</strong>
                </span>
              )}
              {errorCount > 0 && (
                <span className="text-rose-400">Falhas: <strong>{errorCount}</strong></span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {successfulCount > 0 && (
                <button
                  type="button"
                  onClick={handleDownloadAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>BAIXAR TODOS ({successfulCount})</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleClearAll}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>LIMPAR</span>
              </button>
            </div>
          </div>

          {/* Grid de Cards Decodificados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 transition-all duration-300 ${
                  item.status === 'success'
                    ? item.engine === 'duck'
                      ? 'bg-gradient-to-b from-[#091322] to-[#060a14] border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.12)]'
                      : 'bg-gradient-to-b from-[#161208] to-[#0a0804] border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.12)]'
                    : item.status === 'requires-password'
                    ? 'bg-gradient-to-b from-[#1a1204] via-[#100b02] to-[#0a0701] border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
                    : 'bg-gradient-to-b from-[#180a0a] to-[#0e0505] border-rose-500/30'
                }`}
              >
                <div>
                  {/* Cabeçalho do Card */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl select-none">
                        {item.status === 'requires-password' ? '🔐' : getFileCategoryIcon(item.mimeType, item.extractedExt)}
                      </span>
                      <div>
                        {item.status === 'success' ? (
                          <div className="flex items-center gap-1.5">
                            {item.engine === 'duck' ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                                <span>🦆</span>
                                <span>DUCK LSB</span>
                                {item.kBits && <span className="text-cyan-400/80 font-normal">({item.kBits}-bit)</span>}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                                <span>🖼️</span>
                                <span>TT-IMG V1</span>
                              </span>
                            )}
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-white/10 text-white uppercase">
                              {item.extractedExt}
                            </span>
                          </div>
                        ) : item.status === 'requires-password' ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                            <Lock className="w-3 h-3 text-amber-400 animate-pulse" />
                            <span>REQUER SENHA</span>
                            {item.kBits && <span className="text-amber-400/80 font-normal">({item.kBits}-bit LSB)</span>}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
                            <AlertTriangle className="w-3 h-3 text-rose-400" />
                            FALHA NA EXTRAÇÃO
                          </span>
                        )}
                        <h4
                          className="font-mono text-xs font-semibold text-white mt-1 truncate max-w-[200px]"
                          title={item.name}
                        >
                          {item.name}
                        </h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      title="Remover este item"
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Prévia Multimídia ou Formulário de Senha */}
                  {item.status === 'requires-password' ? (
                    <div className="rounded-xl border border-amber-500/30 bg-black/60 p-4 mb-3 flex flex-col items-center text-center">
                      <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-2.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <Key className="w-5 h-5 text-amber-400" />
                      </div>
                      <h5 className="font-mono text-xs font-bold text-amber-200 mb-1">
                        Arquivo Protegido por Senha
                      </h5>
                      <p className="font-mono text-[11px] text-amber-300/80 mb-3 leading-tight max-w-[240px]">
                        Este payload esteganográfico requer uma senha para ser descriptografado.
                      </p>

                      <div className="w-full space-y-2">
                        <div className="relative">
                          <input
                            type={itemShowPassword[item.id] ? 'text' : 'password'}
                            value={itemPasswords[item.id] || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setItemPasswords((prev) => ({ ...prev, [item.id]: val }));
                              if (itemPasswordErrors[item.id]) {
                                setItemPasswordErrors((prev) => ({ ...prev, [item.id]: '' }));
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleUnlockItem(item);
                              }
                            }}
                            placeholder="Digite a senha..."
                            disabled={unlockingIds[item.id]}
                            className="w-full pl-3 pr-9 py-2 rounded-xl bg-black/70 border border-amber-500/40 text-amber-100 placeholder-amber-500/40 font-mono text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setItemShowPassword((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                            }
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 transition-colors cursor-pointer"
                          >
                            {itemShowPassword[item.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        {itemPasswordErrors[item.id] && (
                          <div className="flex items-center gap-1.5 text-[10px] font-mono text-rose-400 bg-rose-950/50 border border-rose-500/30 rounded-lg px-2.5 py-1 text-left">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            <span>{itemPasswordErrors[item.id]}</span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => handleUnlockItem(item)}
                          disabled={unlockingIds[item.id]}
                          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-mono text-xs font-bold text-black bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 active:scale-[0.98] shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer disabled:opacity-50"
                        >
                          {unlockingIds[item.id] ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>DESCRIPTOGRAFANDO...</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              <span>DESBLOQUEAR & DECODIFICAR</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : item.status === 'success' ? (
                    <div className="relative rounded-xl overflow-hidden bg-black/60 border border-white/10 aspect-video flex items-center justify-center mb-3">
                      {item.isVideo ? (
                        <video
                          src={item.blobUrl}
                          controls
                          playsInline
                          onLoadedMetadata={(e) => {
                            const v = e.currentTarget;
                            if (v.videoWidth && v.videoHeight) {
                              updateItemDimensions(item.id, v.videoWidth, v.videoHeight);
                            }
                          }}
                          className="w-full h-full object-contain bg-black"
                        />
                      ) : item.isImage ? (
                        <img
                          src={item.blobUrl}
                          alt={item.name}
                          onLoad={(e) => {
                            const img = e.currentTarget;
                            if (img.naturalWidth && img.naturalHeight) {
                              updateItemDimensions(item.id, img.naturalWidth, img.naturalHeight);
                            }
                          }}
                          className="w-full h-full object-contain cursor-pointer hover:scale-105 transition-transform"
                          onClick={() => setActiveModalItem(item)}
                        />
                      ) : item.isAudio ? (
                        <div className="flex flex-col items-center justify-center p-3 w-full">
                          <Music className="w-8 h-8 text-cyan-400 mb-2 animate-bounce" />
                          <audio src={item.blobUrl} controls className="w-full max-w-[240px]" />
                        </div>
                      ) : item.isText && item.textPreview ? (
                        <div className="w-full h-full p-2.5 font-mono text-[10px] text-slate-300 overflow-hidden select-text text-left bg-[#050810]">
                          <pre className="whitespace-pre-wrap line-clamp-6">{item.textPreview}</pre>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <Archive className="w-8 h-8 text-slate-400 mb-1" />
                          <span className="font-mono text-[11px] text-slate-300">
                            Arquivo binário / compactado
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl p-3 bg-rose-950/20 border border-rose-500/20 text-[11px] font-mono text-rose-300/90 mb-3">
                      {item.errorMessage}
                    </div>
                  )}

                  {/* Metadados Técnicos */}
                  <div className="space-y-1 text-[10px] font-mono text-slate-400 border-t border-white/[0.06] pt-2 mb-3">
                    <div className="flex justify-between">
                      <span>Origem:</span>
                      <span className="text-slate-300 truncate max-w-[140px]" title={item.originalFileName}>
                        {item.originalFileName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tamanho Original:</span>
                      <span className="text-slate-300">{formatBytes(item.originalFileSize)}</span>
                    </div>
                    {item.status === 'requires-password' && (
                      <div className="flex justify-between items-center py-0.5">
                        <span className="text-slate-300">Status:</span>
                        <span className="text-amber-400 font-bold inline-flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Aguardando senha
                        </span>
                      </div>
                    )}
                    {item.status === 'success' && (
                      <>
                        <div className="flex justify-between">
                          <span>Extraído:</span>
                          <span className="text-emerald-400 font-bold">
                            {formatBytes(item.data.length || item.blob.size)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-0.5">
                          <span className="text-slate-300 font-medium">Resolução:</span>
                          <span className="text-cyan-300 font-bold">
                            {item.dimensions
                              ? `${item.dimensions.width}x${item.dimensions.height} px`
                              : item.resolution || (item.isImage || item.isVideo ? 'Detectando...' : 'Não aplicável')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tempo de Análise:</span>
                          <span className="text-cyan-300">{item.processingTimeMs} ms</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Botões de Ação do Card */}
                {item.status === 'success' && (
                  <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => {
                        downloadBlob(item.blobUrl, item.name);
                        playCyberTone('click', !soundEnabled);
                      }}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        item.engine === 'duck'
                          ? 'text-black bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                          : 'text-black bg-amber-400 hover:bg-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Baixar .{item.extractedExt}</span>
                    </button>

                    {(item.isImage || item.isVideo) && (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModalItem(item);
                          playCyberTone('click', !soundEnabled);
                        }}
                        title={item.isVideo ? 'Reproduzir em tela cheia' : 'Ampliar imagem'}
                        className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Modal de Visualização Ampliada (Imagem ou Vídeo) */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl rounded-2xl bg-[#090d16] border border-white/20 p-4 sm:p-5 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {getFileCategoryIcon(activeModalItem.mimeType, activeModalItem.extractedExt)}
                </span>
                <div>
                  <h3 className="font-mono text-sm font-bold text-white truncate max-w-[280px] sm:max-w-md">
                    {activeModalItem.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      Motor: {activeModalItem.engineLabel}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {formatBytes(activeModalItem.data.length || activeModalItem.blob.size)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
                      <span>Resolução:</span>
                      <strong className="text-white">
                        {activeModalItem.dimensions
                          ? `${activeModalItem.dimensions.width}x${activeModalItem.dimensions.height} px`
                          : activeModalItem.resolution || (activeModalItem.isImage || activeModalItem.isVideo ? 'Detectando...' : 'Não aplicável')}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadBlob(activeModalItem.blobUrl, activeModalItem.name)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Container do Player / Imagem */}
            <div className="flex-1 overflow-auto flex items-center justify-center rounded-xl bg-black p-2 min-h-[300px]">
              {activeModalItem.isVideo ? (
                <video
                  src={activeModalItem.blobUrl}
                  controls
                  autoPlay
                  playsInline
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    if (v.videoWidth && v.videoHeight) {
                      updateItemDimensions(activeModalItem.id, v.videoWidth, v.videoHeight);
                    }
                  }}
                  className="max-w-full max-h-[68vh] object-contain rounded-lg"
                />
              ) : activeModalItem.isImage ? (
                <img
                  src={activeModalItem.blobUrl}
                  alt={activeModalItem.name}
                  onLoad={(e) => {
                    const img = e.currentTarget;
                    if (img.naturalWidth && img.naturalHeight) {
                      updateItemDimensions(activeModalItem.id, img.naturalWidth, img.naturalHeight);
                    }
                  }}
                  className="max-w-full max-h-[68vh] object-contain rounded-lg"
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
