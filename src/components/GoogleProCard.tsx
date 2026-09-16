import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  HardDrive,
  Video,
  ChevronRight,
  Flame,
  Award,
  Lock,
} from 'lucide-react';
import { ContactConfig } from '../types';

interface GoogleProCardProps {
  onEnter: () => void;
  contactConfig: ContactConfig;
  soundEnabled?: boolean;
}

export const GoogleProCard: React.FC<GoogleProCardProps> = ({
  onEnter,
}) => {
  return (
    <button
      type="button"
      id="hero-card-google-ai-pro"
      onClick={onEnter}
      title="Clique para ver todos os detalhes da Conta Google AI Pro 18 Meses"
      className="group relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b1329] via-[#0d1838] to-[#160c29] border-2 border-blue-500/50 hover:border-cyan-400 p-5 sm:p-7 md:p-8 shadow-[0_0_35px_rgba(59,130,246,0.2)] hover:shadow-[0_0_50px_rgba(6,182,212,0.45)] transition-all duration-300 text-left cursor-pointer"
    >
      {/* Retículas HUD nos cantos do card */}
      <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400/80 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400/80 pointer-events-none" />

      {/* Glows de ambientação futurista */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-blue-500/20 blur-[80px] pointer-events-none group-hover:bg-blue-400/30 transition-all duration-500" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-purple-500/20 blur-[80px] pointer-events-none group-hover:bg-purple-400/30 transition-all duration-500" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        {/* Lado Esquerdo: Identidade, Título e Badges */}
        <div className="flex-1 space-y-3.5">
          {/* Tags Superiores */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-amber-300 bg-amber-950/80 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>OFERTA EXCLUSIVA</span>
            </span>

            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40">
              18 MESES DE ACESSO
            </span>

            <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40">
              5 TB NUVEM
            </span>
          </div>

          {/* Título Principal Conforme Requisitado */}
          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black tracking-tight text-white group-hover:text-cyan-200 transition-colors">
              CONTA GOOGLE AI PRO 18 MESES POR R$ 20,00
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1.5 leading-relaxed max-w-2xl">
              Inteligência Artificial do Google para estudar, trabalhar e criar sem limites!
              Acesso completo aos modelos avançados, Veo 3, Google Flow, Gemini Pro, 5 TB de armazenamento e 1.000 créditos mensais.
            </p>
          </div>

          {/* Badges Rápidos das 4 Tecnologias */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            <div className="p-2 rounded-xl bg-black/40 border border-blue-500/30 flex items-center gap-2">
              <span className="text-lg">✨</span>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white font-mono truncate">Gemini Pro</div>
                <div className="text-[9px] text-blue-300 font-mono">IA Avançada</div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-black/40 border border-purple-500/30 flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white font-mono truncate">Google Flow</div>
                <div className="text-[9px] text-purple-300 font-mono">+1.000 cr/mês</div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-black/40 border border-pink-500/30 flex items-center gap-2">
              <span className="text-lg">🎬</span>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white font-mono truncate">Veo 3</div>
                <div className="text-[9px] text-pink-300 font-mono">Vídeos Cinema</div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-black/40 border border-cyan-500/30 flex items-center gap-2">
              <span className="text-lg">☁️</span>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-white font-mono truncate">5 TB Nuvem</div>
                <div className="text-[9px] text-cyan-300 font-mono">Google Drive</div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Ilustração dos Símbolos (Google, Flow, Veo3, Gemini) + Chamada de Preço */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:justify-between lg:justify-center gap-4 p-4 rounded-2xl bg-[#060a14]/90 border border-blue-500/30 group-hover:border-cyan-400/60 transition-all shrink-0 lg:w-80">
          {/* Composição Visual dos Símbolos: Google, Flow, Veo 3, Gemini */}
          <div className="relative w-full py-2 flex items-center justify-center gap-3">
            {/* Símbolo 1: Google G multicolor */}
            <div className="relative w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>

            {/* Símbolo 2: Google Flow (Nós de Conexão AI) */}
            <div className="relative w-11 h-11 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform">
              <span title="Google Flow">⚡</span>
            </div>

            {/* Símbolo 3: Veo 3 (Câmera Cinematográfica de IA) */}
            <div className="relative w-11 h-11 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(244,63,94,0.3)] group-hover:scale-110 transition-transform">
              <span title="Veo 3">🎬</span>
            </div>

            {/* Símbolo 4: Gemini (Estrela de Raciocínio) */}
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform">
              <span title="Gemini Pro">✨</span>
            </div>
          </div>

          {/* Preço e Botão */}
          <div className="w-full text-center sm:text-right lg:text-center space-y-2">
            <div className="flex items-center justify-center sm:justify-end lg:justify-center gap-2">
              <span className="text-xs font-mono text-slate-400 line-through">DE R$ 1.745</span>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">PAGAMENTO ÚNICO</span>
            </div>

            <div className="text-3xl sm:text-4xl font-display font-black text-emerald-400 leading-none">
              R$ 20<span className="text-xl font-normal">,00</span>
            </div>

            <div className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-black font-mono text-xs font-black tracking-wide group-hover:from-blue-400 group-hover:to-emerald-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
              <span>ACESSAR OFERTA COMPLETA</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
