import React from 'react';
import { Sparkles, Play } from 'lucide-react';
import ttDecoderImg from '../assets/images/decodificador_tt_img_1789523020842.jpg';
import wfDancinhasImg from '../assets/images/wf_dancinhas_1789523430926.jpg';
import wfSemCensuraImg from '../assets/images/wf_sem_censura_1789523441883.jpg';

interface ToolsGridProps {
  onOpenVideo18Modal: () => void;
  onOpenDancinhasModal: () => void;
  onOpenSemCensuraModal: () => void;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({
  onOpenVideo18Modal,
  onOpenDancinhasModal,
  onOpenSemCensuraModal,
}) => {
  return (
    <section aria-label="Acesso aos Sistemas e Workflows" className="mt-8 sm:mt-12">
      <div className="text-center mb-8 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-mono font-bold tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.25)]">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>QUADROS DE WORKFLOW DISPONÍVEIS</span>
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto justify-items-center">
        {/* 1. WORKFLOW VIDEO +18 */}
        <div className="relative group w-full max-w-[340px] sm:max-w-[360px] min-h-[410px] aspect-square flex flex-col">
          {/* Retícula HUD nos 4 cantos */}
          <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />

          {/* Glowing Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-teal-500/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <button
            type="button"
            id="btn-workflow-video-18"
            onClick={onOpenVideo18Modal}
            title="Clique para ver o vídeo exemplo e adquirir o Workflow Video +18"
            className="relative w-full h-full flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl bg-[#0a0e1a]/95 hover:bg-[#0d1222] border border-cyan-500/30 group-hover:border-cyan-400/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] transition-all duration-300 text-center select-none overflow-hidden cursor-pointer"
          >
            {/* Header HUD Tag */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                VÍDEO +18
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                VÍDEO DEMO
              </div>
            </div>

            {/* Centro: Imagem com Play Overlay */}
            <div className="relative my-auto flex items-center justify-center py-2">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.25)] group-hover:scale-105 group-hover:border-cyan-300 transition-all duration-300">
                <img
                  src={ttDecoderImg}
                  alt="WORKFLOW VIDEO +18"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Play Badge Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/25 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-cyan-600/90 group-hover:bg-cyan-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8)] group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 ml-0.5 fill-white text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do Quadrado */}
            <div className="w-full z-10 flex flex-col items-center">
              <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-display font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                <span>WORKFLOW VIDEO +18</span>
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/50 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs sm:text-[13px] font-mono text-slate-200 mt-2 leading-relaxed px-1 text-center font-normal">
                Adquira Workflow Para Criar Vídeos Realistas de Alta Definição de Sua Modelo +18
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-mono text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                <span>▶ Ver vídeo & adquirir</span>
              </span>
            </div>
          </button>
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

          <button
            type="button"
            id="btn-workflow-dancinhas"
            onClick={onOpenDancinhasModal}
            title="Clique para ver o vídeo exemplo e adquirir o Workflow Dancinhas"
            className="relative w-full h-full flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl bg-[#0d0a1a]/95 hover:bg-[#120e24] border border-purple-500/30 group-hover:border-purple-400/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_35px_rgba(168,85,247,0.25)] transition-all duration-300 text-center select-none overflow-hidden cursor-pointer"
          >
            {/* Header HUD Tag */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-purple-950/80 text-purple-300 border border-purple-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
                MOTION
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-purple-300 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-500/20">
                <Sparkles className="w-3 h-3 text-purple-400" />
                VÍDEO DEMO
              </div>
            </div>

            {/* Centro: Imagem com Play Overlay */}
            <div className="relative my-auto flex items-center justify-center py-2">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-purple-400/40 shadow-[0_0_20px_rgba(168,85,247,0.25)] group-hover:scale-105 group-hover:border-purple-300 transition-all duration-300">
                <img
                  src={wfDancinhasImg}
                  alt="WORKFLOW DANCINHAS"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Play Badge Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/25 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-purple-600/90 group-hover:bg-purple-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 ml-0.5 fill-white text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do Quadrado */}
            <div className="w-full z-10 flex flex-col items-center">
              <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-display font-bold text-white tracking-wide group-hover:text-purple-300 transition-colors">
                <span>WORKFLOW DANCINHAS</span>
                <Play className="w-4 h-4 text-purple-400 fill-purple-400/50 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs sm:text-[13px] font-mono text-slate-200 mt-2 leading-relaxed px-1 text-center font-normal">
                Adquira Workflow de Motion Control Para Criar Dancinhas e Copiar Movimentos De Videos
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-mono text-cyan-300 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30 group-hover:border-cyan-400 transition-colors">
                <span>▶ Ver vídeo & adquirir</span>
              </span>
            </div>
          </button>
        </div>

        {/* 3. WORKFLOW MOTION SEM CENSURA +18 */}
        <div className="relative group w-full max-w-[340px] sm:max-w-[360px] min-h-[410px] aspect-square flex flex-col">
          {/* Retícula HUD nos 4 cantos */}
          <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-rose-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-rose-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-rose-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-rose-400 z-20 pointer-events-none group-hover:scale-110 transition-transform" />

          {/* Glowing Backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-red-500/5 to-amber-500/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <button
            type="button"
            id="btn-workflow-sem-censura"
            onClick={onOpenSemCensuraModal}
            title="Clique para ver o vídeo exemplo e adquirir o Workflow Motion Sem Censura +18"
            className="relative w-full h-full flex flex-col items-center justify-between p-5 sm:p-6 rounded-2xl bg-[#140a0e]/95 hover:bg-[#1a0e13] border border-rose-500/30 group-hover:border-rose-400/80 shadow-[0_4px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_35px_rgba(244,63,94,0.25)] transition-all duration-300 text-center select-none overflow-hidden cursor-pointer"
          >
            {/* Header HUD Tag */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-rose-950/80 text-rose-300 border border-rose-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                MOTION +18
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-rose-300 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-500/20 font-bold">
                SEM CENSURA
              </div>
            </div>

            {/* Centro: Imagem com Play Overlay */}
            <div className="relative my-auto flex items-center justify-center py-2">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.25)] group-hover:scale-105 group-hover:border-rose-400 transition-all duration-300">
                <img
                  src={wfSemCensuraImg}
                  alt="WORKFLOW MOTION SEM CENSURA +18"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                {/* Play Badge Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/25 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-rose-600/90 group-hover:bg-rose-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.8)] group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 ml-0.5 fill-white text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé do Quadrado */}
            <div className="w-full z-10 flex flex-col items-center">
              <div className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-display font-bold text-white tracking-wide group-hover:text-rose-400 transition-colors">
                <span>WORKFLOW MOTION SEM CENSURA +18</span>
                <Play className="w-4 h-4 text-rose-400 fill-rose-400/50 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <p className="text-xs sm:text-[13px] font-mono text-slate-200 mt-2 leading-relaxed px-1 text-center font-normal">
                Adquira Workflow de Motion Control Para Copiar Movimentos em Video de Sua Modelo Sem Censura
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] font-mono text-rose-300 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-500/30 group-hover:border-rose-400 transition-colors">
                <span>▶ Ver vídeo & adquirir</span>
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
