import React from 'react';
import { Instagram, ArrowLeft, MessageCircle } from 'lucide-react';
import { ContactConfig } from '../types';
import { MusicPlayer } from './MusicPlayer';
import { OnlineUsersCounter } from './OnlineUsersCounter';

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
            <nav aria-label="Navegação do site" className="flex items-center gap-1.5 sm:gap-2">
              {/* Botão Único: GRUPO WHATSAPP */}
              <a
                id="header-btn-grupo-whatsapp"
                href="https://chat.whatsapp.com/L2ABna1xZECAHDJ2Q45inc"
                target="_blank"
                rel="noopener noreferrer"
                title="Entrar no Grupo Oficial do WhatsApp"
                className="group relative inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-xl text-xs font-mono font-bold text-emerald-200 bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/50 hover:border-emerald-400 transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_22px_rgba(16,185,129,0.45)] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="tracking-wide">GRUPO WHATSAPP</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </a>
            </nav>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Contador de Usuários Online */}
          <OnlineUsersCounter />

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


