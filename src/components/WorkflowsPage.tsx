import React from 'react';
import {
  ArrowLeft,
  Sparkles,
  Play,
  ShieldCheck,
  Zap,
  MessageCircle,
  ExternalLink,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  X,
  Users,
} from 'lucide-react';
import { ContactConfig } from '../types';
import ttDecoderImg from '../assets/images/decodificador_tt_img_1789523020842.jpg';
import wfDancinhasImg from '../assets/images/wf_dancinhas_1789523430926.jpg';
import wfSemCensuraImg from '../assets/images/wf_sem_censura_1789523441883.jpg';
import wfUpscaleImg from '../assets/images/wf_cria_5_imagens.svg';
import wfModelo18NuaUpscaleImg from '../assets/images/wf_modelo_18_nua_upscale.svg';
import wfFotorrealista18Img from '../assets/images/wf_fotorrealista_18.svg';
import wfFaceSwapImg from '../assets/images/wf_faceswap_1789583433199.jpg';
import wfLipSyncImg from '../assets/images/wf_lipsync_voice_1789583443465.jpg';

interface WorkflowsPageProps {
  onBack: () => void;
  onOpenVideo18Modal: () => void;
  onOpenDancinhasModal: () => void;
  onOpenSemCensuraModal: () => void;
  onOpenUpscaleModal: () => void;
  onOpenFaceSwapModal: () => void;
  onOpenLipSyncModal: () => void;
  onOpenPrompt2VideoModal?: () => void;
  contactConfig: ContactConfig;
}

export const WorkflowsPage: React.FC<WorkflowsPageProps> = ({
  onBack,
  onOpenVideo18Modal,
  onOpenDancinhasModal,
  onOpenSemCensuraModal,
  onOpenUpscaleModal,
  onOpenFaceSwapModal,
  onOpenLipSyncModal,
  contactConfig,
}) => {
  const [showWarningModal, setShowWarningModal] = React.useState(true);
  const whatsappBaseUrl = `https://wa.me/${contactConfig.whatsappNumber.replace(/\D/g, '')}`;

  const getWorkflowWhatsAppUrl = (wfName: string) => {
    const text = `Olá Vitor, estou na página de Workflows IA e gostaria de adquirir o ${wfName}! Como faço para obter?`;
    return `${whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fade-in">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <button
          type="button"
          id="btn-back-to-home-from-workflows"
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>VOLTAR PARA PÁGINA PRINCIPAL</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-purple-300 bg-purple-950/60 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>CENTRAL DE WORKFLOWS IA</span>
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/30">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>RUNNINGHUB & NORDY COMFYUI READY</span>
        </div>

        <h1 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-wide">
          WORKFLOWS EXCLUSIVOS
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-mono leading-relaxed">
          Workflows Editados e Melhorados Com Todo Suporte em Portugues Mais Praticos e Facil de Usar, Todos Testados Aprovados e Com VideoAulas de Como Usar
        </p>
      </header>

      {/* Workflows Grid - 6 Workflows Enumerados */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {/* Quadro 1: Workflow Cria 5 Imagens +18 */}
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#0a0e1a]/90 hover:bg-[#0d1222] border border-rose-500/30 hover:border-rose-400/80 shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.25)]">
              <img
                src={wfUpscaleImg}
                alt="Workflow Cria 5 Imagens +18"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-rose-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-rose-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-rose-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-rose-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 1 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-rose-400/60 text-rose-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                <span className="text-rose-400 text-sm font-orbitron font-black">#1</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenUpscaleModal}
                  className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950/80 text-rose-300 border border-rose-500/30">
                  Nordy
                </span>
                <span className="text-xs font-mono text-rose-400">Imagem +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-rose-400 font-black">1.</span>
                <span>Workflow Cria 5 Imagens +18</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Usa Foto de Referencia e Cria 5 Imagens Sem Censura Perfeitas da Sua Modelo
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenUpscaleModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>

        {/* Quadro 2: Workflow Modelo +18 Nua + Upscale */}
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#0a0e1a]/90 hover:bg-[#0d1222] border border-rose-500/30 hover:border-rose-400/80 shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.25)]">
              <img
                src={wfModelo18NuaUpscaleImg}
                alt="Workflow Modelo +18 Nua + Upscale"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-rose-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-rose-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-rose-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-rose-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 2 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-rose-400/60 text-rose-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                <span className="text-rose-400 text-sm font-orbitron font-black">#2</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenFaceSwapModal}
                  className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-500/30">
                  Nordy
                </span>
                <span className="text-xs font-mono text-rose-400">Imagem +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-rose-400 font-black">2.</span>
                <span>Workflow Modelo +18 Nua + Upscale</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Use Sua Foto de referencia e Crie Quantas Fotos Quiser, Sem Censura Com Qualidade Alta e Perfeição
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenFaceSwapModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>

        {/* Quadro 3: Workflow Fotorrealista +18 */}
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#0a0e1a]/90 hover:bg-[#0d1222] border border-rose-500/30 hover:border-rose-400/80 shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-rose-500/40">
              <img
                src={wfFotorrealista18Img}
                alt="Workflow Fotorrealista +18"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Badge de Enumeração 3 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-rose-400/60 text-rose-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                <span className="text-rose-400 text-sm font-orbitron font-black">#3</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenLipSyncModal}
                  className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-500/30">
                  Nordy
                </span>
                <span className="text-xs font-mono text-rose-400">Imagem +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-rose-400 font-black">3.</span>
                <span>Workflow Fotorrealista +18</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Crie Sua Modelo com a Aparencia que quiser Sem Censura Fazendo o Que Quiser, Coloque Oculos,Tatuagens,Placas,Brinquedos tudo que imaginar com Prompt
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenLipSyncModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>

        {/* Quadro 4: Video +18 */}
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#0a0e1a]/90 hover:bg-[#0d1222] border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/40">
              <img
                src={ttDecoderImg}
                alt="Workflow Vídeo +18"
                className="w-full h-full object-cover"
              />
              {/* Badge de Enumeração 4 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-400/60 text-cyan-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                <span className="text-cyan-400 text-sm font-orbitron font-black">#4</span>
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenVideo18Modal}
                  className="w-12 h-12 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  VÍDEO +18
                </span>
                <span className="text-xs font-mono text-emerald-400">Ultra Realismo</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-black">4.</span>
                <span>Workflow EM BREVE</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Crie vídeos realistas de alta definição de sua modelo +18 com movimentos fluidos e sem censura.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenVideo18Modal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>

        {/* Quadro 5: Dancinhas */}
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#0a0e1a]/90 hover:bg-[#0d1222] border border-purple-500/30 hover:border-purple-400/80 shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-purple-500/40">
              <img
                src={wfDancinhasImg}
                alt="Workflow Dancinhas"
                className="w-full h-full object-cover"
              />
              {/* Badge de Enumeração 5 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-purple-400/60 text-purple-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                <span className="text-purple-400 text-sm font-orbitron font-black">#5</span>
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenDancinhasModal}
                  className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
                  DANCINHAS
                </span>
                <span className="text-xs font-mono text-purple-400">Trend & Motion</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-purple-400 font-black">5.</span>
                <span>Workflow EM BREVE</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Workflow ideal para criar danças virais para TikTok, Instagram Reels e plataformas de monetização.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenDancinhasModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>

        {/* Quadro 6: Motion Sem Censura */}
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#0a0e1a]/90 hover:bg-[#0d1222] border border-pink-500/30 hover:border-pink-400/80 shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-pink-500/40">
              <img
                src={wfSemCensuraImg}
                alt="Workflow Motion Sem Censura"
                className="w-full h-full object-cover"
              />
              {/* Badge de Enumeração 6 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-pink-400/60 text-pink-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                <span className="text-pink-400 text-sm font-orbitron font-black">#6</span>
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenSemCensuraModal}
                  className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-pink-950 text-pink-300 border border-pink-500/30">
                  MOTION SEM CENSURA
                </span>
                <span className="text-xs font-mono text-pink-400">Total Freedom</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-pink-400 font-black">6.</span>
                <span>Workflow EM BREVE</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Fluxo completo para gerar animações corporais e expressões sem bloqueios, 100% compativel com decodificador Duck.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenSemCensuraModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
      </section>

      {/* WhatsApp Direct Assistance Banner */}
      <section className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0b151e] to-cyan-950/40 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/40">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>SUPORTE DIRETO COM VITOR CREKONI</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold font-orbitron text-white">
            Dúvidas sobre os Workflows ou Instalação?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 font-mono max-w-xl">
            Entre em contato pelo WhatsApp para tirar dúvidas sobre configurações no RunningHub, nós customizados ou suporte passo a passo.
          </p>
        </div>

        <a
          href={`${whatsappBaseUrl}?text=${encodeURIComponent('Olá Vitor, vim pela página de workflows e gostaria de mais informações!')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-xl font-mono font-bold text-xs sm:text-sm text-black bg-emerald-400 hover:bg-emerald-300 border border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>FALAR NO WHATSAPP</span>
        </a>
      </section>

      {/* Pop-up de Aviso Vermelho ao abrir Workflows */}
      {showWarningModal && (
        <div
          id="workflows-warning-modal-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowWarningModal(false);
            }
          }}
        >
          <div
            id="workflows-warning-modal"
            className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#2e0505] via-[#1a0404] to-[#0d0101] border-2 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5),inset_0_0_25px_rgba(239,68,68,0.2)] p-6 sm:p-8 text-center space-y-6 overflow-hidden animate-scale-up"
          >
            {/* Linha decorativa de perigo superior */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-[0_0_12px_rgba(244,63,94,0.8)]" />

            {/* Botão de Fechar no topo */}
            <button
              type="button"
              id="btn-close-workflows-warning"
              onClick={() => setShowWarningModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-red-300/80 hover:text-white hover:bg-red-500/20 border border-red-500/30 transition-all cursor-pointer"
              title="Fechar aviso"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Ícone de Alerta Animado */}
            <div className="mx-auto w-16 h-16 rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.6)]">
              <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
            </div>

            {/* Cabeçalho */}
            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-red-200 bg-red-900/60 border border-red-500/50 uppercase shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                AVISO IMPORTANTE
              </span>
              <h2 className="text-xl sm:text-2xl font-orbitron font-black text-red-500 tracking-wide pt-1">
                ATENÇÃO!
              </h2>
            </div>

            {/* Texto de Aviso Solicitado */}
            <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 shadow-inner">
              <p className="font-mono text-sm sm:text-base font-bold text-red-100 leading-relaxed uppercase tracking-wide">
                ATENÇÃO VEJA OS VÍDEOS DE CADA WORKFLOW PARA TER CERTEZA DE QUE VOCÊ JÁ NÃO TENHA ELE, NÃO FAZEMOS ESTORNO PÓS COMPRA. OBRIGADO.
              </p>
            </div>

            {/* Link do Grupo de WhatsApp Solicitado */}
            <div className="pt-2 space-y-3">
              <a
                href="https://chat.whatsapp.com/L2ABna1xZECAHDJ2Q45inc?s=cl&p=a&mlu=0&ilr=4"
                target="_blank"
                rel="noopener noreferrer"
                id="btn-whatsapp-group-link"
                className="w-full py-3.5 px-5 rounded-xl font-mono font-black text-xs sm:text-sm text-black bg-emerald-400 hover:bg-emerald-300 hover:scale-[1.02] active:scale-[0.98] border border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase"
              >
                <Users className="w-5 h-5 fill-black" />
                <span>PARTICIPE DO NOSSO GRUPO</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              {/* Botão para Fechar / Continuar */}
              <button
                type="button"
                id="btn-understand-workflows-warning"
                onClick={() => setShowWarningModal(false)}
                className="w-full py-2.5 px-4 rounded-xl font-mono font-semibold text-xs text-red-200 hover:text-white bg-red-950/50 hover:bg-red-900/60 border border-red-500/30 hover:border-red-400/60 transition-all cursor-pointer"
              >
                ENTENDI E QUERO CONTINUAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
