import React from 'react';
import { Instagram, MessageCircle, Sliders, Volume2, VolumeX, ShieldCheck, Sparkles } from 'lucide-react';
import { ContactConfig } from '../types';

interface HeaderProps {
  contactConfig: ContactConfig;
  onOpenSettings: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  contactConfig,
  onOpenSettings,
  soundEnabled,
  onToggleSound,
}) => {
  const getWhatsAppUrl = () => {
    const cleanNumber = contactConfig.whatsappNumber.replace(/\D/g, '');
    const encodedMsg = encodeURIComponent(contactConfig.whatsappMessage);
    return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
  };

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

        {/* Contact Buttons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Direct Contact Button */}
          <a
            id="header-btn-whatsapp"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            title="Falar no WhatsApp"
            className="group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 hover:border-emerald-400/50 transition-all duration-200 shadow-[0_0_10px_rgba(16,185,129,0.1)] hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline font-mono tracking-wide">WhatsApp</span>
          </a>

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

          {/* Sound Toggle */}
          <button
            id="header-btn-sound"
            type="button"
            onClick={onToggleSound}
            title={soundEnabled ? 'Silenciar áudio' : 'Ativar feedback sonoro'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-cyan-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Settings / Contact Config */}
          <button
            id="header-btn-settings"
            type="button"
            onClick={onOpenSettings}
            title="Configurar contatos (WhatsApp / Instagram)"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-colors font-mono"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">Contatos</span>
          </button>
        </div>
      </div>
    </header>
  );
};
