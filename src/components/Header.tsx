import React from 'react';
import { Instagram, ShieldCheck } from 'lucide-react';
import { ContactConfig } from '../types';
import { MusicPlayer } from './MusicPlayer';

interface HeaderProps {
  contactConfig: ContactConfig;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  contactConfig,
  soundEnabled,
  onToggleSound,
}) => {
  const getInstagramUrl = () => {
    const cleanHandle = contactConfig.instagramHandle.replace(/^@/, '').trim();
    return `https://instagram.com/${cleanHandle}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#06080e]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="text-lg select-none">🦆</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold tracking-tight text-base text-white">
                DUCK<span className="text-cyan-400">.</span>DECODER
              </span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-medium bg-cyan-950/60 text-cyan-300 border border-cyan-500/20">
                LSB 2·6·8
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              100% Processamento Local • SS_tools Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
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

