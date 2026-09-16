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
import { WorkflowVideo18Modal } from './components/WorkflowVideo18Modal';
import { WorkflowDancinhasModal } from './components/WorkflowDancinhasModal';
import { WorkflowSemCensuraModal } from './components/WorkflowSemCensuraModal';
import { DecodedResult, ContactConfig } from './types';
import {
  decodeDuckFile,
  getMimeType,
  downloadBlob,
  playCyberTone,
  formatBytes,
} from './utils/duckDecoder';

const DEFAULT_CONTACT_CONFIG: ContactConfig = {
  whatsappNumber: '5544991840305',
  whatsappMessage: 'Olá! Vim pelo Duck Decoder e gostaria de tirar uma dúvida.',
  instagramHandle: 'vitorcrekonii',
};

// Fixed destination URLs (protected against unauthorized edits)
const WF_VIDEO_18_URL = 'https://wa.me/5544991840305?text=Ol%C3%A1%2C+tenho+interesse+no+Workflow+Video+%2B18';
const WF_DANCINHAS_URL = 'https://wa.me/5544991840305?text=Ol%C3%A1%2C+tenho+interesse+no+Workflow+Dancinhas';
const WF_SEM_CENSURA_URL = 'https://wa.me/5544991840305?text=Ol%C3%A1%2C+tenho+interesse+no+Workflow+Motion+Sem+Censura+%2B18';

export default function App() {
  const [items, setItems] = useState<DecodedResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Active page: 'home' (Principal), 'decoder' (Decodificador LSB), or 'workflows' (Central de Workflows)
  const [currentPage, setCurrentPage] = useState<'home' | 'decoder' | 'workflows'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#decoder') return 'decoder';
      if (window.location.hash === '#workflows') return 'workflows';
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
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'decoder' | 'workflows') => {
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

  const wfVideo18Url = WF_VIDEO_18_URL;
  const wfDancinhasUrl = WF_DANCINHAS_URL;
  const wfSemCensuraUrl = WF_SEM_CENSURA_URL;

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

  const processFile = async (file: File): Promise<DecodedResult> => {
    const tempId = Math.random().toString(36).substring(2, 9);
    try {
      const outcome = await decodeDuckFile(file);
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
      const msg = err instanceof Error ? err.message : String(err);
      return {
        id: tempId,
        originalFileName: file.name,
        originalFileSize: file.size,
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

              {/* Destaques / Atalhos: Duck Decoder e Workflows IA na linha superior, TT-IMG Decoder abaixo */}
              <div className="mt-7 max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
                {/* Linha 1: Os dois primeiros quadros mantendo o tamanho original */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                  {/* 1. Quadro Duck Decoder */}
                  <button
                    type="button"
                    id="hero-btn-enter-decoder"
                    onClick={() => handleNavigate('decoder')}
                    title="Clique para entrar na ferramenta Duck Decoder"
                    className="group relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-[#0a1428] to-cyan-950/60 hover:from-cyan-900/70 hover:to-cyan-900/70 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:scale-105 transition-transform shrink-0">
                        <span className="text-2xl select-none">🦆</span>
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm sm:text-base text-white group-hover:text-cyan-200 transition-colors">
                            DUCK DECODER
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            DECODER
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono mt-0.5">
                          Clique aqui ou no topo da página para entrar no decodificador
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-black font-mono text-xs font-bold transition-all shrink-0 ml-2">
                      <span>ENTRAR</span>
                      <span className="group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </button>

                  {/* 2. Quadro Workflows IA */}
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
                            WORKFLOWS
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 font-mono mt-0.5">
                          Clique aqui para entrar na central de workflows e ferramentas
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 group-hover:bg-purple-400 group-hover:text-black font-mono text-xs font-bold transition-all shrink-0 ml-2">
                      <span>ENTRAR</span>
                      <span className="group-hover:translate-x-1 transition-transform">➔</span>
                    </div>
                  </button>
                </div>

                {/* Linha 2: Quadro TT-IMG DECODER abaixo dos primeiros com a mesma largura */}
                <div className="flex justify-center">
                  <div className="w-full md:w-[calc(50%-0.5rem)]">
                    <div
                      id="hero-card-tt-img-decoder"
                      className="relative w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-950/50 via-[#181208] to-amber-950/50 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.12)] transition-all duration-300 text-left select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] shrink-0">
                          <span className="text-2xl select-none">🖼️</span>
                          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-sm sm:text-base text-white">
                              TT-IMG DECODER
                            </span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider bg-amber-950 text-amber-300 border border-amber-500/30">
                              DECODER
                            </span>
                          </div>
                          <p className="text-xs text-amber-200/80 font-mono mt-0.5">
                            Em breve no ar
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold tracking-wider shrink-0 ml-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                        <span>EM BREVE NO AR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : currentPage === 'workflows' ? (
          <WorkflowsPage
            onBack={() => handleNavigate('home')}
            onOpenVideo18Modal={() => setIsVideo18ModalOpen(true)}
            onOpenDancinhasModal={() => setIsDancinhasModalOpen(true)}
            onOpenSemCensuraModal={() => setIsSemCensuraModalOpen(true)}
            contactConfig={contactConfig}
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
            <span>Site Desenvolvido Pro Vitor Crekoni</span>
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
              href={`https://instagram.com/${contactConfig.instagramHandle.replace(/^@/, '')}`}
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
    </div>
  );
}
