import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Play,
  ShieldCheck,
  Zap,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  X,
  Users,
  LayoutGrid,
  Image as ImageIcon,
  Video,
  Flame,
} from 'lucide-react';
import { ContactConfig } from '../types';
import ttDecoderImg from '../assets/images/decodificador_tt_img_1789523020842.jpg';
import wfDancinhasImg from '../assets/images/wf_dancinhas_1789523430926.jpg';
import wfSemCensuraImg from '../assets/images/wf_sem_censura_1789523441883.jpg';
import wfUpscaleImg from '../assets/images/wf_cria_5_imagens.svg';
import wfModelo18NuaUpscaleImg from '../assets/images/wf_modelo_18_nua_upscale.svg';
import wfFotorrealista18Img from '../assets/images/wf_fotorrealista_18.svg';
import wfDasiwaWan11Img from '../assets/images/wf_dasiwa_wan_v11.svg';
import wfQwenRotacao360Img from '../assets/images/wf_qwen_rotacao_360.svg';
import wfUpscaleSemCensuraImg from '../assets/images/wf_upscale_sem_censura.svg';
import wfFaceSwapImg from '../assets/images/wf_faceswap_1789583433199.jpg';
import wfLipSyncImg from '../assets/images/wf_lipsync_voice_1789583443465.jpg';
import wfWan22DynoRemixImg from '../assets/images/wf_wan22_dyno_remix.svg';
import wfLegacyV2Krea2Img from '../assets/images/wf_legacy_v2_krea2.svg';
import wfMinimaxH3Img from '../assets/images/wf_minimax_h3.svg';
import wfSuperUndressingV3Img from '../assets/images/wf_super_undressing_v3.svg';
import wfFlux2TrocaRostoImg from '../assets/images/wf_flux2_troca_rosto.svg';
import wfQwenAioImg from '../assets/images/wf_qwen_aio.svg';
import wfLtxVideoRefImg from '../assets/images/wf_ltx_video_ref.svg';

interface WorkflowsPageProps {
  onBack: () => void;
  onOpenVideo18Modal: () => void;
  onOpenDancinhasModal: () => void;
  onOpenSemCensuraModal: () => void;
  onOpenUpscaleModal: () => void;
  onOpenFaceSwapModal: () => void;
  onOpenLipSyncModal: () => void;
  onOpenPrompt2VideoModal?: () => void;
  onOpenDynoRemixModal: () => void;
  onOpenLegacyKrea2Modal: () => void;
  onOpenMinimaxH3Modal: () => void;
  onOpenSuperUndressingV3Modal: () => void;
  onOpenFlux2Modal: () => void;
  onOpenQwenAioModal: () => void;
  onOpenLtxVideoRefModal: () => void;
  contactConfig: ContactConfig;
}

export type WorkflowCategory = 'todos' | 'imagem' | 'video' | 'sem_censura';

export const WorkflowsPage: React.FC<WorkflowsPageProps> = ({
  onBack,
  onOpenVideo18Modal,
  onOpenDancinhasModal,
  onOpenSemCensuraModal,
  onOpenUpscaleModal,
  onOpenFaceSwapModal,
  onOpenLipSyncModal,
  onOpenDynoRemixModal,
  onOpenLegacyKrea2Modal,
  onOpenMinimaxH3Modal,
  onOpenSuperUndressingV3Modal,
  onOpenFlux2Modal,
  onOpenQwenAioModal,
  onOpenLtxVideoRefModal,
  contactConfig,
}) => {
  const [showWarningModal, setShowWarningModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<WorkflowCategory>('todos');

  // Regras de visibilidade dos quadros por categoria
  // Quadro 1: Imagem +18 Sem Censura
  const isCard1Visible = selectedCategory === 'todos' || selectedCategory === 'imagem' || selectedCategory === 'sem_censura';
  // Quadro 2: Imagem +18 Sem Censura
  const isCard2Visible = selectedCategory === 'todos' || selectedCategory === 'imagem' || selectedCategory === 'sem_censura';
  // Quadro 3: Imagem +18 Sem Censura
  const isCard3Visible = selectedCategory === 'todos' || selectedCategory === 'imagem' || selectedCategory === 'sem_censura';
  // Quadro 4: Vídeo +18 Sem Censura
  const isCard4Visible = selectedCategory === 'todos' || selectedCategory === 'video' || selectedCategory === 'sem_censura';
  // Quadro 5: Foto / Rotação de Ângulo 360 +18 Sem Censura
  const isCard5Visible = selectedCategory === 'todos' || selectedCategory === 'imagem' || selectedCategory === 'sem_censura';
  // Quadro 6: Imagen Refine 8K Super Detalhes De Pele +18 Sem Censura
  const isCard6Visible = selectedCategory === 'todos' || selectedCategory === 'imagem' || selectedCategory === 'sem_censura';
  // Quadro 7: Wan2.2 Dyno Remix Vídeo +18
  const isCard7Visible = selectedCategory === 'todos' || selectedCategory === 'video' || selectedCategory === 'sem_censura';
  // Quadro 8: Legacy v2 KREA2 NSFW Imagem Qualidade UHD
  const isCard8Visible = selectedCategory === 'todos' || selectedCategory === 'imagem' || selectedCategory === 'sem_censura';
  // Quadro 9: MinimaxH3 Vídeo +18 Com Áudio e Referencia
  const isCard9Visible = selectedCategory === 'todos' || selectedCategory === 'video' || selectedCategory === 'sem_censura';
  // Quadro 10: Super Undressing V3 Upscale Removedor De Roupas
  const isCard10Visible = selectedCategory === 'todos' || selectedCategory === 'imagem' || selectedCategory === 'sem_censura';
  // Quadro 11: Flux2 Troca de Rosto +18 (RunningHub)
  const isCard11Visible = selectedCategory === 'todos' || selectedCategory === 'imagem' || selectedCategory === 'sem_censura';
  // Quadro 12: QWEN Aio (RunningHub)
  const isCard12Visible = selectedCategory === 'todos' || selectedCategory === 'imagem' || selectedCategory === 'sem_censura';
  // Quadro 13: LTX 2.3 Video Com Referencia Foto e Áudio (Nordy / Sem Censura / Vídeo)
  const isCard13Visible = selectedCategory === 'todos' || selectedCategory === 'video' || selectedCategory === 'sem_censura';

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
      <header className="text-center max-w-4xl mx-auto space-y-4">
        {/* Mini Menu com Categorias para Selecionar os Quadros */}
        <div className="flex justify-center">
          <div
            id="mini-menu-workflow-categorias"
            className="inline-flex items-center flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-[#080d19]/90 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] backdrop-blur-md"
          >
            <button
              type="button"
              id="btn-cat-todos"
              onClick={() => setSelectedCategory('todos')}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'todos'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>TODOS</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  selectedCategory === 'todos' ? 'bg-black/20 text-black' : 'bg-white/10 text-slate-400'
                }`}
              >
                12
              </span>
            </button>

            <button
              type="button"
              id="btn-cat-imagem"
              onClick={() => setSelectedCategory('imagem')}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'imagem'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)] scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>WORKFLOW IMAGEM</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  selectedCategory === 'imagem' ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                }`}
              >
                9
              </span>
            </button>

            <button
              type="button"
              id="btn-cat-video"
              onClick={() => setSelectedCategory('video')}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'video'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>WORKFLOW VÍDEO</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  selectedCategory === 'video' ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                }`}
              >
                3
              </span>
            </button>

            <button
              type="button"
              id="btn-cat-sem-censura"
              onClick={() => setSelectedCategory('sem_censura')}
              className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === 'sem_censura'
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.6)] scale-105'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span>WORKFLOW SEM CENSURA</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                  selectedCategory === 'sem_censura' ? 'bg-black/30 text-white' : 'bg-white/10 text-slate-400'
                }`}
              >
                12
              </span>
            </button>
          </div>
        </div>

        <h1 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-wide">
          WORKFLOWS EXCLUSIVOS
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-mono leading-relaxed">
          Workflows Editados e Melhorados Com Todo Suporte em Portugues Mais Praticos e Facil de Usar, Todos Testados Aprovados e Com VideoAulas de Como Usar
        </p>
      </header>

      {/* Workflows Grid - 6 Workflows Enumerados com Cores Visuais Alternadas */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {/* Quadro 1: Ciano Cyber (Workflow Cria 5 Imagens +18) */}
        {isCard1Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#07131d]/90 hover:bg-[#0a1c2b] border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <img
                src={wfUpscaleImg}
                alt="Workflow Cria 5 Imagens +18"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 1 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-400/60 text-cyan-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                <span className="text-cyan-400 text-sm font-orbitron font-black">#1</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenUpscaleModal}
                  className="w-12 h-12 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                  Nordy
                </span>
                <span className="text-xs font-mono text-cyan-400">Imagem +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-black">1.</span>
                <span>Workflow Cria 5 Imagens +18.</span>
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
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 2: Roxo Neon (Workflow Modelo +18 Nua + Upscale) */}
        {isCard2Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#120a1f]/90 hover:bg-[#180e2a] border border-purple-500/30 hover:border-purple-400/80 shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <img
                src={wfModelo18NuaUpscaleImg}
                alt="Workflow Modelo +18 Nua + Upscale"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-purple-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-purple-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-purple-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-purple-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 2 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-purple-400/60 text-purple-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                <span className="text-purple-400 text-sm font-orbitron font-black">#2</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenFaceSwapModal}
                  className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
                  Nordy
                </span>
                <span className="text-xs font-mono text-purple-400">Imagem +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-purple-400 font-black">2.</span>
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
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 3: Verde Matrix (Workflow Fotorrealista +18) */}
        {isCard3Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#071710]/90 hover:bg-[#0c2218] border border-emerald-500/30 hover:border-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.15)] hover:shadow-[0_0_35px_rgba(16,185,129,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <img
                src={wfFotorrealista18Img}
                alt="Workflow Fotorrealista +18"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-emerald-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-emerald-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-emerald-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-emerald-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 3 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-emerald-400/60 text-emerald-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                <span className="text-emerald-400 text-sm font-orbitron font-black">#3</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenLipSyncModal}
                  className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Nordy
                </span>
                <span className="text-xs font-mono text-emerald-400">Imagem +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-emerald-400 font-black">3.</span>
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
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 4: Laranja Solar (Workflow DaSiWa_Wan v11 Video +18) */}
        {isCard4Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#190f05]/90 hover:bg-[#231508] border border-amber-500/30 hover:border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <img
                src={wfDasiwaWan11Img}
                alt="Workflow DaSiWa_Wan v11 Video +18"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 4 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/60 text-amber-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                <span className="text-amber-400 text-sm font-orbitron font-black">#4</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenVideo18Modal}
                  className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-500/30">
                  RunningHub
                </span>
                <span className="text-xs font-mono text-amber-400">Vídeo +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-amber-400 font-black">4.</span>
                <span>Workflow DaSiWa_Wan v11 Video +18</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Crie vídeos realistas de alta definição de sua modelo +18 com movimentos fluidos, sem censura e máxima perfeição.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenVideo18Modal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 5: Rosa / Crimson (360 Rotacao Angulo Foto Qwen Manual +18 - CREKONI) */}
        {isCard5Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#170911]/90 hover:bg-[#200d18] border border-rose-500/30 hover:border-rose-400/80 shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.25)]">
              <img
                src={wfQwenRotacao360Img}
                alt="360 Rotacao Angulo Foto Qwen Manual +18"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-rose-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-rose-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-rose-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-rose-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 5 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-rose-400/60 text-rose-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(244,63,94,0.5)]">
                <span className="text-rose-400 text-sm font-orbitron font-black">#5</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenDancinhasModal}
                  className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-500/30">
                  RunningHub
                </span>
                <span className="text-xs font-mono text-rose-400">Foto +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-rose-400 font-black">5.</span>
                <span>360 Rotacao Angulo Foto Qwen Manual +18</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Gere novas fotos no mesmo local com nova pose e controle manual de rotação de ângulo 360° da sua modelo +18 sem censura.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenDancinhasModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 6: Azul Elétrico 8K (Imagen Refine 8K Super Detalhes De Pele) */}
        {isCard6Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#061022]/90 hover:bg-[#091833] border border-blue-500/30 hover:border-blue-400/80 shadow-[0_0_25px_rgba(59,130,246,0.15)] hover:shadow-[0_0_35px_rgba(59,130,246,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
              <img
                src={wfUpscaleSemCensuraImg}
                alt="Upscale Sem Censura - Imagen Refine 8K Super Detalhes De Pele"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents (Copiado do Quadro 5) */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-blue-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-blue-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-blue-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-blue-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette (Copiado do Quadro 5) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 6 (Copiado do Quadro 5) */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-blue-400/60 text-blue-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(59,130,246,0.5)]">
                <span className="text-blue-400 text-sm font-orbitron font-black">#6</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-950/90 text-blue-300 border border-blue-500/50 shadow-[0_0_8px_rgba(59,130,246,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenSemCensuraModal}
                  className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-500/30">
                  RunningHub
                </span>
                <span className="text-xs font-mono text-blue-400 font-semibold">Upscale Sem Censura</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-blue-400 font-black">6.</span>
                <span>Imagen Refine 8K Super Detalhes De Pele</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Refinamento e upscale de imagem em 8K com máxima nitidez, super detalhes de textura de pele, poros anatômicos e iluminação hiper-realista sem censura.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenSemCensuraModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 7: Laranja / Âmbar Cyber (Wan2.2 Dyno Remix Vídeo +18 - Copiado do Quadro 4) */}
        {isCard7Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#190f05]/90 hover:bg-[#231508] border border-amber-500/30 hover:border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <img
                src={wfWan22DynoRemixImg}
                alt="Wan2.2 Dyno Remix Vídeo +18"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 7 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/60 text-amber-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                <span className="text-amber-400 text-sm font-orbitron font-black">#7</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenDynoRemixModal}
                  className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-500/30">
                  RunningHub
                </span>
                <span className="text-xs font-mono text-amber-400">Vídeo +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-amber-400 font-black">7.</span>
                <span>Wan2.2 Dyno Remix Vídeo +18</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Transforme e remixe vídeos com o poderoso Wan 2.2 Dyno no RunningHub. Geração de vídeo ultrarrealista sem censura com consistência impressionante e qualidade cinematográfica.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenDynoRemixModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-500 hover:via-orange-500 hover:to-rose-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 8: Roxo Neon / KREA2 UHD (Legacy v2 KREA2 NSFW Imagem Qualidade UHD - Copiado do Quadro 2) */}
        {isCard8Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#120a1f]/90 hover:bg-[#180e2a] border border-purple-500/30 hover:border-purple-400/80 shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
              <img
                src={wfLegacyV2Krea2Img}
                alt="Legacy v2 KREA2 NSFW Imagem Qualidade UHD"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-purple-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-purple-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-purple-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-purple-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 8 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-purple-400/60 text-purple-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                <span className="text-purple-400 text-sm font-orbitron font-black">#8</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenLegacyKrea2Modal}
                  className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-300 border border-purple-500/30">
                  RunningHub
                </span>
                <span className="text-xs font-mono text-purple-400">Imagem +18 UHD</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-purple-400 font-black">8.</span>
                <span>Legacy v2 KREA2 NSFW Imagem Qualidade UHD</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Crie e aperfeiçoe imagens sem censura com fotorrealismo extremo, textura de pele anatômica e super resolução UHD no poderoso padrão KREA2.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenLegacyKrea2Modal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 9: MinimaxH3 Vídeo +18 Com Áudio e Referencia (Copiado do Quadro 7) */}
        {isCard9Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#0f0c1d]/90 hover:bg-[#16122a] border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <img
                src={wfMinimaxH3Img}
                alt="MinimaxH3 Vídeo +18 Com Áudio e Referencia"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 9 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-400/60 text-cyan-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                <span className="text-cyan-400 text-sm font-orbitron font-black">#9</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenMinimaxH3Modal}
                  className="w-12 h-12 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Nordy
                </span>
                <span className="text-xs font-mono text-cyan-400">Vídeo +18 Com Áudio</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-black">9.</span>
                <span>MinimaxH3 Vídeo +18 Com Áudio e Referencia</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Gere vídeos cinematográficos ultrarrealistas sem censura com áudio imersivo integrado e controle avançado de referência facial e corporal simultânea no MinimaxH3.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenMinimaxH3Modal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:via-teal-300 hover:to-emerald-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.35)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 10: Roxo/Rosa Neon (Super Undressing V3 Upscale Removedor De Roupas - Copiado do Quadro 2) */}
        {isCard10Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#120a1f]/90 hover:bg-[#180e2a] border border-pink-500/30 hover:border-pink-400/80 shadow-[0_0_25px_rgba(236,72,153,0.15)] hover:shadow-[0_0_35px_rgba(236,72,153,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.25)]">
              <img
                src={wfSuperUndressingV3Img}
                alt="Super Undressing V3 Upscale Removedor De Roupas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-pink-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-pink-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-pink-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-pink-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 10 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-pink-400/60 text-pink-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(236,72,153,0.5)]">
                <span className="text-pink-400 text-sm font-orbitron font-black">#10</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenSuperUndressingV3Modal}
                  className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  RunningHub
                </span>
                <span className="text-xs font-mono text-pink-400">Imagem +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-pink-400 font-black">10.</span>
                <span>Super Undressing V3 Upscale Removedor De Roupas</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Remova roupas mantendo pose, iluminação e identidade original com reconstituição anatômica perfeita e upscale ultra-nítido 4K no RunningHub.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenSuperUndressingV3Modal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-500 hover:via-rose-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 11: QWEN Aio Remove Roupas (RunningHub - Copiado do Modelo do Quadro 2) */}
        {isCard12Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#0a1520]/90 hover:bg-[#0f1d2c] border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <img
                src={wfQwenAioImg}
                alt="Workflow QWEN Aio Removedor De Roupas"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 11 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-400/60 text-cyan-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                <span className="text-cyan-400 text-sm font-orbitron font-black">#11</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenQwenAioModal}
                  className="w-12 h-12 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  RunningHub
                </span>
                <span className="text-xs font-mono text-cyan-400">Imagem +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-black">11.</span>
                <span>QWEN Aio Removedor De Roupas</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Workflow All-in-One no RunningHub com modelos e nodes integrados, consistência LoRA e remoção de roupas sem censura com altíssima qualidade.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenQwenAioModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 hover:from-cyan-500 hover:via-teal-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 12: Flux2 + Qwen Trocas de Rosto +18 (RunningHub - Copiado do Modelo do Quadro 2) */}
        {isCard11Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#120a1f]/90 hover:bg-[#180e2a] border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <img
                src={wfFlux2TrocaRostoImg}
                alt="Workflow Flux2 + Qwen Trocas de Rosto +18"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 12 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-cyan-400/60 text-cyan-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                <span className="text-cyan-400 text-sm font-orbitron font-black">#12</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenFlux2Modal}
                  className="w-12 h-12 rounded-full bg-cyan-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  RunningHub
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                  2 Workflows Inclusos
                </span>
                <span className="text-xs font-mono text-cyan-400">Imagem +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-black">12.</span>
                <span>Flux2 + Qwen Trocas de Rosto +18</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                São 2 workflows completos para troca de rostos (Flux 2 e Qwen) no RunningHub, com máxima fidelidade, iluminação realista e perfeição sem censura.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenFlux2Modal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 hover:from-cyan-500 hover:via-teal-500 hover:to-indigo-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}

        {/* Quadro 13: LTX 2.3 Video Com Referencia Foto e Áudio (Nordy / Sem Censura - Copiado do Modelo do Quadro 7) */}
        {isCard13Visible && (
        <div className="relative group p-5 sm:p-6 rounded-2xl bg-[#190f05]/90 hover:bg-[#231508] border border-amber-500/30 hover:border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <img
                src={wfLtxVideoRefImg}
                alt="Workflow LTX 2.3 Video Com Referencia Foto e Áudio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Sci-Fi HUD Corner Accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-amber-400 pointer-events-none z-10" />
              <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-amber-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-amber-400 pointer-events-none z-10" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-amber-400 pointer-events-none z-10" />

              {/* Futuristic Cyber Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

              {/* Badge de Enumeração 13 */}
              <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-amber-400/60 text-amber-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                <span className="text-amber-400 text-sm font-orbitron font-black">#13</span>
              </div>
              <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                SEM CENSURA
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  type="button"
                  onClick={onOpenLtxVideoRefModal}
                  className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.8)] group-hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-5 h-5 ml-0.5 fill-current" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-950 text-amber-300 border border-amber-500/40">
                  Nordy
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-500/30">
                  SEM CENSURA
                </span>
                <span className="text-xs font-mono text-amber-400">Vídeo +18</span>
              </div>
              <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                <span className="font-mono text-amber-400 font-black">13.</span>
                <span>LTX 2.3 Video Com Referencia Foto e Áudio</span>
              </h2>
              <p className="text-xs text-slate-300 font-mono mt-1 leading-relaxed">
                Workflow completo no Nordy usando o modelo LTX 2.3 com foto e áudio de referência. Crie vídeos ultra-realistas com sincronia perfeita, movimentos naturais e sem nenhuma censura.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={onOpenLtxVideoRefModal}
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-500 hover:via-orange-500 hover:to-rose-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>
        )}
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowWarningModal(false);
            }
          }}
        >
          <div
            id="workflows-warning-modal"
            className="relative w-full max-w-[320px] sm:max-w-[340px] rounded-2xl bg-gradient-to-b from-[#250404] via-[#150303] to-[#0a0101] border border-red-500/80 shadow-[0_0_25px_rgba(239,68,68,0.35),inset_0_0_15px_rgba(239,68,68,0.15)] p-3.5 text-center space-y-2.5 overflow-hidden animate-scale-up"
          >
            {/* Linha decorativa de perigo superior */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />

            {/* Botão de Fechar no topo */}
            <button
              type="button"
              id="btn-close-workflows-warning"
              onClick={() => setShowWarningModal(false)}
              className="absolute top-2 right-2 p-1 rounded-md text-red-300/80 hover:text-white hover:bg-red-500/20 border border-red-500/30 transition-all cursor-pointer"
              title="Fechar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Ícone de Alerta Animado Compacto */}
            <div className="mx-auto w-8 h-8 rounded-full bg-red-950/80 border border-red-500/80 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
            </div>

            {/* Cabeçalho */}
            <div className="space-y-0.5">
              <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest text-red-200 bg-red-900/60 border border-red-500/50 uppercase shadow-[0_0_6px_rgba(239,68,68,0.2)]">
                AVISO IMPORTANTE
              </span>
              <h2 className="text-sm sm:text-base font-orbitron font-black text-red-500 tracking-wide">
                ATENÇÃO!
              </h2>
            </div>

            {/* Texto de Aviso Compacto */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-red-950/40 border border-red-500/30 shadow-inner">
              <p className="font-mono text-[11px] sm:text-xs font-bold text-red-100 leading-snug uppercase tracking-wide">
                ATENÇÃO VEJA OS VÍDEOS DE CADA WORKFLOW PARA TER CERTEZA DE QUE VOCÊ JÁ NÃO TENHA ELE, NÃO FAZEMOS ESTORNO PÓS COMPRA. OBRIGADO.
              </p>
            </div>

            {/* Links e Ações */}
            <div className="pt-0.5 space-y-1.5">
              <a
                href="https://chat.whatsapp.com/L2ABna1xZECAHDJ2Q45inc?s=cl&p=a&mlu=0&ilr=4"
                target="_blank"
                rel="noopener noreferrer"
                id="btn-whatsapp-group-link"
                className="w-full py-2 px-3 rounded-xl font-mono font-bold text-xs text-black bg-emerald-400 hover:bg-emerald-300 active:scale-[0.99] border border-emerald-300 shadow-[0_0_14px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase"
              >
                <Users className="w-3.5 h-3.5 fill-black shrink-0" />
                <span>PARTICIPE DO NOSSO GRUPO</span>
                <ExternalLink className="w-3 h-3 ml-0.5 shrink-0" />
              </a>

              {/* Botão para Fechar / Continuar */}
              <button
                type="button"
                id="btn-understand-workflows-warning"
                onClick={() => setShowWarningModal(false)}
                className="w-full py-1.5 px-2.5 rounded-xl font-mono font-medium text-[10px] sm:text-[11px] text-red-200 hover:text-white bg-red-950/50 hover:bg-red-900/60 border border-red-500/30 hover:border-red-400/60 transition-all cursor-pointer"
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
