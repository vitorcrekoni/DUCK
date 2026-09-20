import React from 'react';
import { Instagram, ArrowLeft, MessageCircle, Sparkles } from 'lucide-react';
import { ContactConfig } from '../types';
import { MusicPlayer } from './MusicPlayer';

interface HeaderProps {
  contactConfig: ContactConfig;
  soundEnabled: boolean;
  onToggleSound: () => void;
  currentPage: 'home' | 'decoder' | 'workflows' | 'ttimg' | 'googlepro' | 'aulas' | 'crekonidecoder';
  onNavigate: (page: 'home' | 'decoder' | 'workflows' | 'ttimg' | 'googlepro' | 'aulas' | 'crekonidecoder') => void;
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
        {/* Lado Esquerdo: Botão Grupo WhatsApp e Botão Instagram (com botão de retorno se estiver em subpágina) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {currentPage !== 'home' && (
            <button
              type="button"
              id="header-btn-back-home"
              onClick={() => onNavigate('home')}
              title="Voltar para a Página Principal"
              className="group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all cursor-pointer mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold tracking-wide hidden sm:inline">INÍCIO</span>
            </button>
          )}

          {/* 1. Botão Oficial: Grupo WhatsApp */}
          <a
            id="header-btn-whatsapp"
            href="https://chat.whatsapp.com/L2ABna1xZECAHDJ2Q45inc"
            target="_blank"
            rel="noopener noreferrer"
            title="Entrar no Grupo Oficial do WhatsApp"
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-emerald-200 bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/50 hover:border-emerald-400 transition-all duration-200 shadow-[0_0_12px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline tracking-wide">GRUPO WHATSAPP</span>
            <span className="sm:hidden tracking-wide">WHATSAPP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </a>

          {/* 2. Botão Instagram */}
          <a
            id="header-btn-instagram"
            href={getInstagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            title="Ver perfil no Instagram"
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-pink-300 bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/40 hover:border-pink-400/60 transition-all duration-200 shadow-[0_0_10px_rgba(244,63,94,0.15)] hover:shadow-[0_0_18px_rgba(244,63,94,0.3)] cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline tracking-wide">INSTAGRAM</span>
            <span className="sm:hidden tracking-wide">INSTA</span>
          </a>
        </div>

        {/* Lado Direito: 3. Music Player mantido no mesmo local */}
        <div className="flex items-center shrink-0">
          <MusicPlayer
            videoId="nZOrhNlbFHc"
            isMuted={!soundEnabled}
            onToggleMute={onToggleSound}
          />
        </div>
      </div>
    </header>
  );
};


