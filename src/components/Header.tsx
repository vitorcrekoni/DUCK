import React from 'react';
import { Instagram, ArrowLeft } from 'lucide-react';
import { ContactConfig } from '../types';
import { MusicPlayer } from './MusicPlayer';

interface HeaderProps {
  contactConfig: ContactConfig;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentPage: 'home' | 'decoder' | 'workflows' | 'ttimg' | 'googlepro' | 'aulas';
  onNavigate: (page: 'home' | 'decoder' | 'workflows' | 'ttimg' | 'googlepro' | 'aulas') => void;
}

export const Header: React.FC<HeaderProps> = ({
  contactConfig,
  soundEnabled,
  onToggleSound,
  currentPage,
  onNavigate,
}) => {
  const getInstagramUrl = () => {
    const cleanHandle = contactConfig.instagramHandle.replace(/^@/, '').trim();
    return `https://instagram.com/${cleanHandle}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#06080e]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand & Entry Point */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentPage !== 'home' ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Return to Home / Tools Button */}
              <button
                type="button"
                id="header-btn-back-home"
                onClick={() => onNavigate('home')}
                title="Voltar para a Página Principal de Ferramentas"
                className="group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-semibold tracking-wide">PÁGINA PRINCIPAL</span>
              </button>

              {/* Active Indicator */}
              <div className="hidden sm:flex items-center gap-2 pl-1 border-l border-white/10">
                <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                  <span className="text-sm select-none">
                    {currentPage === 'decoder' ? '🦆' : currentPage === 'ttimg' ? '🖼️' : currentPage === 'googlepro' ? '💎' : currentPage === 'aulas' ? '🎬' : '⚡'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold tracking-tight text-sm text-white">
                    {currentPage === 'decoder' ? (
                      <>DUCK<span className="text-cyan-400">.</span>DECODER</>
                    ) : currentPage === 'ttimg' ? (
                      <>TT-IMG<span className="text-amber-400">.</span>DECODER</>
                    ) : currentPage === 'googlepro' ? (
                      <>GOOGLE<span className="text-blue-400">.</span>AI PRO</>
                    ) : currentPage === 'aulas' ? (
                      <>VÍDEO<span className="text-pink-400">.</span>AULAS</>
                    ) : (
                      <>WORKFLOWS<span className="text-purple-400">.</span>IA</>
                    )}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                    {currentPage === 'decoder' ? 'LSB 2·6·8' : currentPage === 'ttimg' ? 'V1 MOTOR' : currentPage === 'googlepro' ? '18 MESES' : currentPage === 'aulas' ? 'EM BREVE' : 'COMFYUI'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ATIVO
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <nav aria-label="Navegação do site" className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              {/* Tag / Botão: Página Principal */}
              <button
                type="button"
                id="header-tag-home"
                onClick={() => onNavigate('home')}
                className={`group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  currentPage === 'home'
                    ? 'bg-slate-800 text-white border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                    : 'bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-white border border-white/10 hover:border-white/25'
                }`}
              >
                <span className="text-sm select-none">🏠</span>
                <span className="tracking-wide">INÍCIO</span>
              </button>

              {/* Tag / Botão: Duck Decoder */}
              <button
                type="button"
                id="header-tag-decoder"
                onClick={() => onNavigate('decoder')}
                className={`group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  currentPage === 'decoder'
                    ? 'bg-cyan-950 text-cyan-200 border border-cyan-400 shadow-[0_0_14px_rgba(6,182,212,0.35)]'
                    : 'bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-cyan-100 border border-cyan-500/30 hover:border-cyan-400/60'
                }`}
              >
                <span className="text-sm select-none">🦆</span>
                <span className="tracking-wide">DUCK DECODER</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="Online" />
              </button>

              {/* Tag / Botão: TT-IMG Decoder */}
              <button
                type="button"
                id="header-tag-ttimg"
                onClick={() => onNavigate('ttimg')}
                className={`group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  currentPage === 'ttimg'
                    ? 'bg-amber-950 text-amber-200 border border-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.35)]'
                    : 'bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 hover:text-amber-100 border border-amber-500/30 hover:border-amber-400/60'
                }`}
              >
                <span className="text-sm select-none">🖼️</span>
                <span className="tracking-wide">TT-IMG</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" title="Online" />
              </button>

              {/* Tag / Botão: Workflows IA */}
              <button
                type="button"
                id="header-tag-workflows"
                onClick={() => onNavigate('workflows')}
                className={`group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  currentPage === 'workflows'
                    ? 'bg-purple-950 text-purple-200 border border-purple-400 shadow-[0_0_14px_rgba(168,85,247,0.35)]'
                    : 'bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 hover:text-purple-100 border border-purple-500/30 hover:border-purple-400/60'
                }`}
              >
                <span className="text-sm select-none">⚡</span>
                <span className="tracking-wide">WORKFLOWS</span>
              </button>

              {/* Tag / Botão: Google AI Pro */}
              <button
                type="button"
                id="header-tag-googlepro"
                onClick={() => onNavigate('googlepro')}
                className={`group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  currentPage === 'googlepro'
                    ? 'bg-blue-950 text-blue-200 border border-blue-400 shadow-[0_0_14px_rgba(59,130,246,0.35)]'
                    : 'bg-blue-950/40 hover:bg-blue-900/60 text-blue-300 hover:text-blue-100 border border-blue-500/30 hover:border-blue-400/60'
                }`}
              >
                <span className="text-sm select-none">💎</span>
                <span className="tracking-wide hidden sm:inline">GOOGLE AI PRO</span>
                <span className="tracking-wide sm:hidden">GOOGLE PRO</span>
              </button>
            </nav>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Music Player with Mute Button directly beside it */}
          <MusicPlayer
            videoId="nZOrhNlbFHc"
            isMuted={!soundEnabled}
            onToggleMute={onToggleSound}
          />

          {/* Instagram Direct Contact Button */}
          <a
            id="header-btn-instagram"
            href={getInstagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver perfil no Instagram"
            className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-pink-300 bg-pink-950/40 border border-pink-500/30 hover:bg-pink-900/50 hover:border-pink-400/50 transition-all duration-200 shadow-[0_0_10px_rgba(244,63,94,0.1)] hover:shadow-[0_0_15px_rgba(244,63,94,0.25)]"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline font-mono tracking-wide">Instagram</span>
          </a>
        </div>
      </div>
    </header>
  );
};


