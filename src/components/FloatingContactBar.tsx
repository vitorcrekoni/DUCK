import React from 'react';
import { Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';
import { ContactConfig } from '../types';

interface FloatingContactBarProps {
  contactConfig: ContactConfig;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({
  contactConfig,
}) => {
  const cleanNumber = contactConfig.whatsappNumber.replace(/\D/g, '');
  const encodedMsg = encodeURIComponent(contactConfig.whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
  const instagramUrl = `https://instagram.com/${contactConfig.instagramHandle.replace(/^@/, '')}`;

  return (
    <aside
      aria-label="Canais de Contato Rápido"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[#0c101c]/90 border border-white/10 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    >
      {/* WhatsApp Button */}
      <a
        id="floating-btn-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Conversar pelo WhatsApp"
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/30 hover:border-emerald-400 text-emerald-400 transition-all duration-200 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
      </a>

      {/* Instagram Button */}
      <a
        id="floating-btn-instagram"
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Acessar Instagram"
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-pink-500/10 hover:bg-pink-500/25 border border-pink-500/30 hover:border-pink-400 text-pink-400 transition-all duration-200 shadow-[0_0_15px_rgba(244,63,94,0.15)] hover:shadow-[0_0_20px_rgba(244,63,94,0.4)]"
      >
        <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </a>
    </aside>
  );
};
