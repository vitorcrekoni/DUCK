import React from 'react';
import {
  ArrowLeft,
  Sparkles,
  Play,
  Download,
  ShieldCheck,
  Zap,
  MessageCircle,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { ContactConfig } from '../types';
import ttDecoderImg from '../assets/images/decodificador_tt_img_1789523020842.jpg';
import wfDancinhasImg from '../assets/images/wf_dancinhas_1789523430926.jpg';
import wfSemCensuraImg from '../assets/images/wf_sem_censura_1789523441883.jpg';

interface WorkflowsPageProps {
  onBack: () => void;
  onOpenVideo18Modal: () => void;
  onOpenDancinhasModal: () => void;
  onOpenSemCensuraModal: () => void;
  contactConfig: ContactConfig;
}

export const WorkflowsPage: React.FC<WorkflowsPageProps> = ({
  onBack,
  onOpenVideo18Modal,
  onOpenDancinhasModal,
  onOpenSemCensuraModal,
  contactConfig,
}) => {
  const whatsappBaseUrl = `https://wa.me/${contactConfig.whatsappNumber.replace(/\D/g, '')}`;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fade-in">
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
          WORKFLOWS & FERRAMENTAS EXCLUSIVAS
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-mono">
          Explore nossos fluxos profissionais de inteligência artificial de alta definição, modelos geradores e automações completas.
        </p>
      </header>

      {/* Workflows Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {/* Card 1: Video +18 */}
        <div className="relative group p-6 rounded-2xl bg-[#0a0e1a]/90 hover:bg-[#0d1222] border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:shadow-[0_0_35px_rgba(6,182,212,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-cyan-500/40">
              <img
                src={ttDecoderImg}
                alt="Workflow Vídeo +18"
                className="w-full h-full object-cover"
              />
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
              <h2 className="mt-2 font-display font-bold text-lg text-white">
                Workflow Vídeo +18
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
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>

        {/* Card 2: Dancinhas */}
        <div className="relative group p-6 rounded-2xl bg-[#0a0e1a]/90 hover:bg-[#0d1222] border border-purple-500/30 hover:border-purple-400/80 shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-purple-500/40">
              <img
                src={wfDancinhasImg}
                alt="Workflow Dancinhas"
                className="w-full h-full object-cover"
              />
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
              <h2 className="mt-2 font-display font-bold text-lg text-white">
                Workflow Dancinhas
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
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>VER VÍDEO & ADQUIRIR</span>
            </button>
          </div>
        </div>

        {/* Card 3: Motion Sem Censura */}
        <div className="relative group p-6 rounded-2xl bg-[#0a0e1a]/90 hover:bg-[#0d1222] border border-pink-500/30 hover:border-pink-400/80 shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)] transition-all flex flex-col justify-between">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-pink-500/40">
              <img
                src={wfSemCensuraImg}
                alt="Workflow Motion Sem Censura"
                className="w-full h-full object-cover"
              />
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
              <h2 className="mt-2 font-display font-bold text-lg text-white">
                Motion Sem Censura
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
              className="w-full py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
    </div>
  );
};
