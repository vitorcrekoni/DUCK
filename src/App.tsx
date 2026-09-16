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
} from 'lucide-react';
import ttDecoderImg from './assets/images/decodificador_tt_img_1789523020842.jpg';
import wfDancinhasImg from './assets/images/wf_dancinhas_1789523430926.jpg';
import wfSemCensuraImg from './assets/images/wf_sem_censura_1789523441883.jpg';
import { Header } from './components/Header';
import { DropZone } from './components/DropZone';
import { DecodedItemCard } from './components/DecodedItemCard';
import { FloatingContactBar } from './components/FloatingContactBar';
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
const TT_SITE_URL = 'https://tt-decoder.com';
const WF_DANCINHAS_URL = 'https://wa.me/5544991840305?text=Ol%C3%A1%2C+tenho+interesse+no+Workflow+Dancinhas';
const WF_SEM_CENSURA_URL = 'https://wa.me/5544991840305?text=Ol%C3%A1%2C+tenho+interesse+no+Workflow+Motion+Sem+Censura+%2B18';

export default function App() {
  const [items, setItems] = useState<DecodedResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const ttSiteUrl = TT_SITE_URL;
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
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section: Minimalist & Futuristic */}
        <section className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>ESTEGANOGRAFIA DIGITAL • FORMATO DUCK LSB</span>
          </div>

          <div className="relative inline-block animate-text-float">
            {/* Background cybernetic aura */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-emerald-500/20 blur-xl opacity-75 rounded-2xl pointer-events-none animate-cyber-pulse" />

            <h1 className="relative text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-tight select-none overflow-hidden py-1 px-3">
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 via-emerald-300 via-cyan-400 to-sky-300 animate-text-shimmer animate-glow-wave">
                CREKONI Duck IMG VIDEO Decod
              </span>

              {/* Holographic light sweep ray */}
              <span
                aria-hidden="true"
                className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-light-sweep blur-[1px]"
              />
            </h1>
          </div>

          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl mx-auto font-normal">
            Extraia arquivos ocultos em imagens PNG com precisão e velocidade. Compatível com o formato público SS_tools sem senha.
          </p>

          {/* Quick Instagram link */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              id="hero-instagram-btn"
              href={`https://instagram.com/${contactConfig.instagramHandle.replace(/^@/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-pink-300 bg-pink-950/30 border border-pink-500/30 hover:bg-pink-900/40 hover:border-pink-400/60 transition-all shadow-[0_0_15px_rgba(244,63,94,0.12)] cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Seguir no Instagram (@{contactConfig.instagramHandle.replace(/^@/, '')})</span>
            </a>
          </div>
        </section>

        {/* Drop Zone Component */}
        <section aria-label="Área de Envio">
          <DropZone onFilesSelected={handleFilesSelected} isProcessing={isProcessing} />
        </section>

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

        {/* Quadrados Botões com Imagem - Ecossistema & Workflows */}
        <section aria-label="Acesso aos Sistemas e Workflows" className="mt-12">
          <div className="text-center mb-8 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-mono font-bold tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>MAIS FERRAMENTAS DISPONIVEIS</span>
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto justify-items-center">
            {/* 1. DECODIFICADOR TT IMG */}
            <div className="relative group w-full max-w-[340px] sm:max-w-[360px] min-h-[410px] aspect-square flex flex-col">
              {/* Retícula HUD nos 4 cantos */}
              <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />

              {/* Glowing Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-teal-500/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <a
                id="btn-decodificador-tt-img"
                href={ttSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir DECODIFICADOR TT IMG em nova aba"
                className="relative w-full h-full flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl bg-[#0a0e1a]/95 hover:bg-[#0d1222] border border-cyan-500/30 group-hover:border-cyan-400/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-300 text-center select-none overflow-hidden cursor-pointer"
              >
                {/* Header HUD Tag */}
                <div className="w-full flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    DECODER
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    ONLINE
                  </div>
                </div>

                {/* Centro: Imagem */}
                <div className="relative my-auto flex items-center justify-center py-2">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:scale-105 group-hover:border-cyan-300 transition-all duration-300">
                    <img
                      src={ttDecoderImg}
                      alt="DECODIFICADOR TT IMG"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Rodapé do Quadrado */}
                <div className="w-full z-10 flex flex-col items-center">
                  <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-display font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                    <span>DECODIFICADOR TT IMG</span>
                    <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs sm:text-[13px] font-mono text-slate-300/90 mt-2 leading-relaxed px-1 text-center">
                    Acesse a plataforma de decodificação e extração esteganográfica avançada TT IMG
                  </p>
                </div>
              </a>
            </div>

            {/* 2. WORKFLOW DANCINHAS */}
            <div className="relative group w-full max-w-[340px] sm:max-w-[360px] min-h-[410px] aspect-square flex flex-col">
              {/* Retícula HUD nos 4 cantos */}
              <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-purple-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-purple-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-purple-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-purple-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />

              {/* Glowing Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/5 to-cyan-500/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <a
                id="btn-workflow-dancinhas"
                href={wfDancinhasUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Adquira Workflow de Motion Control Para Criar Dancinhas e Copiar Movimentos De Videos"
                className="relative w-full h-full flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl bg-[#0d0a1a]/95 hover:bg-[#120e24] border border-purple-500/30 group-hover:border-purple-400/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] transition-all duration-300 text-center select-none overflow-hidden cursor-pointer"
              >
                {/* Header HUD Tag */}
                <div className="w-full flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-purple-950/80 text-purple-300 border border-purple-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                    MOTION CONTROL
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-300 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/20">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    WORKFLOW
                  </div>
                </div>

                {/* Centro: Imagem */}
                <div className="relative my-auto flex items-center justify-center py-2">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.25)] group-hover:scale-105 group-hover:border-purple-300 transition-all duration-300">
                    <img
                      src={wfDancinhasImg}
                      alt="WORKFLOW DANCINHAS"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Rodapé do Quadrado */}
                <div className="w-full z-10 flex flex-col items-center">
                  <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-display font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
                    <span>WORKFLOW DANCINHAS</span>
                    <ExternalLink className="w-4 h-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs sm:text-[13px] font-mono text-slate-200 mt-2 leading-relaxed px-1 text-center font-normal">
                    Adquira Workflow de Motion Control Para Criar Dancinhas e Copiar Movimentos De Videos
                  </p>
                </div>
              </a>
            </div>

            {/* 3. WORKFLOW MOTION SEM CENSURA +18 */}
            <div className="relative group w-full max-w-[340px] sm:max-w-[360px] min-h-[410px] aspect-square flex flex-col">
              {/* Retícula HUD nos 4 cantos */}
              <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-rose-500 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-rose-500 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-rose-500 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-rose-500 z-20 pointer-events-none group-hover:scale-110 transition-transform" />

              {/* Glowing Backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-red-500/5 to-amber-500/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <a
                id="btn-workflow-sem-censura"
                href={wfSemCensuraUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Adquira Workflow de Motion Control Para Copiar Movimentos em Video de Sua Modelo Sem Censura"
                className="relative w-full h-full flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl bg-[#140a0e]/95 hover:bg-[#1a0e13] border border-rose-500/30 group-hover:border-rose-400/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_35px_rgba(244,63,94,0.25)] transition-all duration-300 text-center select-none overflow-hidden cursor-pointer"
              >
                {/* Header HUD Tag */}
                <div className="w-full flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-rose-950/80 text-rose-300 border border-rose-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    MOTION CONTROL
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30 font-bold">
                    +18 VIP
                  </div>
                </div>

                {/* Centro: Imagem */}
                <div className="relative my-auto flex items-center justify-center py-2">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.25)] group-hover:scale-105 group-hover:border-rose-400 transition-all duration-300">
                    <img
                      src={wfSemCensuraImg}
                      alt="WORKFLOW MOTION SEM CENSURA +18"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Rodapé do Quadrado */}
                <div className="w-full z-10 flex flex-col items-center">
                  <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-display font-bold text-white tracking-wide group-hover:text-rose-400 transition-colors">
                    <span>WORKFLOW MOTION SEM CENSURA +18</span>
                    <ExternalLink className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs sm:text-[13px] font-mono text-slate-200 mt-2 leading-relaxed px-1 text-center font-normal">
                    Adquira Workflow de Motion Control Para Copiar Movimentos em Video de Sua Modelo Sem Censura
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Quick Action Contacts Bar */}
      <FloatingContactBar
        contactConfig={contactConfig}
      />

      {/* Futuristic Minimal Footer */}
      <footer className="mt-auto border-t border-white/[0.06] bg-[#05070c] py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>🦆 Duck Decoder</span>
            <span>•</span>
            <span>LSB Audio/Video/Payload Unpacker</span>
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
    </div>
  );
}
