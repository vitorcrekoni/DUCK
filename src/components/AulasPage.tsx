import React from 'react';
import { ArrowLeft, Clock, Film } from 'lucide-react';

interface AulasPageProps {
  onBack: () => void;
}

export const AulasPage: React.FC<AulasPageProps> = ({ onBack }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-pink-300 bg-pink-950/40 hover:bg-pink-900/60 border border-pink-500/40 hover:border-pink-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.15)]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>VOLTAR PARA A PÁGINA PRINCIPAL</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-pink-300 bg-pink-950/60 border border-pink-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            <Film className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>VÍDEO AULAS</span>
          </span>
        </div>
      </div>

      {/* Main Container with EM BREVE Notice */}
      <section className="relative rounded-3xl p-8 sm:p-14 text-center bg-gradient-to-b from-[#180d19]/90 via-[#0e0a14]/90 to-[#0a0710]/95 border border-pink-500/40 shadow-[0_0_40px_rgba(244,63,94,0.2)] overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-pink-500/15 border border-pink-400/40 text-pink-300 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <Clock className="w-10 h-10 text-pink-400 animate-pulse" />
          </div>

          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-pink-300 bg-pink-950/80 border border-pink-500/50 uppercase shadow-[0_0_15px_rgba(244,63,94,0.25)]">
              Módulo em Produção
            </span>
            <h1 className="font-orbitron font-black text-3xl sm:text-5xl text-white tracking-wide">
              EM BREVE
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-mono leading-relaxed">
              Estamos preparando vídeo aulas completas, passo a passo e 100% práticas para você dominar todas as ferramentas e workflows de IA.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold text-white bg-pink-600 hover:bg-pink-500 transition-colors shadow-[0_0_20px_rgba(244,63,94,0.4)] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETORNAR ÀS FERRAMENTAS</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
