import React from 'react';
import { Instagram, ShieldCheck, ArrowLeft, Sparkles, Clock } from 'lucide-react';
import { ContactConfig } from '../types';
import { MusicPlayer } from './MusicPlayer';

interface HeaderProps {
  contactConfig: ContactConfig;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentPage: 'home' | 'decoder' | 'workflows' | 'ttimg';
  onNavigate: (page: 'home' | 'decoder' | 'workflows' | 'ttimg') => void;
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
                    {currentPage === 'decoder' ? '🦆' : currentPage === 'ttimg' ? '🖼️' : '⚡'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold tracking-tight text-sm text-white">
                    {currentPage === 'decoder' ? (
                      <>DUCK<span className="text-cyan-400">.</span>DECODER</>
                    ) : currentPage === 'ttimg' ? (
                      <>TT-IMG<span className="text-amber-400">.</span>DECODER</>
                    ) : (
                      <>WORKFLOWS<span className="text-purple-400">.</span>IA</>
                    )}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-medium bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                    {currentPage === 'decoder' ? 'LSB 2·6·8' : currentPage === 'ttimg' ? 'V1 MOTOR' : 'COMFYUI'}
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ATIVO
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Button on Home page: DUCK.DECODER LSB 2·6·8 as entry point */}
              <button
                type="button"
                id="header-btn-duck-decoder-entry"
                onClick={() => onNavigate('decoder')}
                title="Clique para entrar na página do Decodificador Duck LSB"
                className="group relative flex items-center gap-2 sm:gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-cyan-950/30 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300 cursor-pointer text-left"
              >
                {/* Icon */}
                <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:scale-105 transition-transform shrink-0">
                  <span className="text-base sm:text-lg select-none">🦆</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                {/* Text & Badge */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-display font-bold tracking-tight text-xs sm:text-sm md:text-base text-white group-hover:text-cyan-200 transition-colors">
                      DUCK<span className="text-cyan-400">.</span>DECODER
                    </span>

                    {/* Pulsing "ONLINE" Tag */}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)] group-hover:bg-emerald-900/80 transition-all">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>ONLINE</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-cyan-400/90 hidden sm:flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span className="group-hover:underline">Clique para abrir o Decodificador</span>
                  </p>
                </div>
              </button>

              {/* Quadro ao lado: TT-IMG DECODER (Agora clicável e ativo!) */}
              <button
                type="button"
                id="header-card-tt-img-decoder"
                onClick={() => onNavigate('ttimg')}
                title="Clique para abrir o TT-IMG Decoder V1"
                className="group relative hidden sm:flex items-center gap-2 sm:gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-amber-950/30 hover:bg-amber-900/50 border border-amber-500/40 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-300 cursor-pointer text-left"
              >
                {/* Icon */}
                <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/10 border border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:scale-105 transition-transform shrink-0">
                  <span className="text-base sm:text-lg select-none">🖼️</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                </div>

                {/* Text & Badge */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-display font-bold tracking-tight text-xs sm:text-sm md:text-base text-white group-hover:text-amber-200 transition-colors">
                      TT<span className="text-amber-400">-</span>IMG DECODER
                    </span>

                    {/* Tag "V1 ATIVO" */}
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold text-amber-300 bg-amber-950/80 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>ONLINE</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-amber-300/80 hidden md:flex items-center gap-1 font-mono">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span className="group-hover:underline">Clique para abrir o Decodificador V1</span>
                  </p>
                </div>
              </button>
            </div>
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


