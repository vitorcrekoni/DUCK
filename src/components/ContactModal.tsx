import React, { useState } from 'react';
import { X, Instagram, MessageCircle, Save, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { ContactConfig } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ContactConfig;
  onSaveConfig: (newConfig: ContactConfig) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [whatsappNumber, setWhatsappNumber] = useState(config.whatsappNumber);
  const [whatsappMessage, setWhatsappMessage] = useState(config.whatsappMessage);
  const [instagramHandle, setInstagramHandle] = useState(config.instagramHandle);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      whatsappNumber: whatsappNumber.trim(),
      whatsappMessage: whatsappMessage.trim(),
      instagramHandle: instagramHandle.trim().replace(/^@/, ''),
    });
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const encodedMsg = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
  const instagramUrl = `https://instagram.com/${instagramHandle.replace(/^@/, '')}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b0f19] p-6 shadow-2xl text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reticles */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-500/50" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-500/50" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-500/50" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-500/50" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-display font-semibold text-white">
                Canais de Contato
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                WhatsApp e Instagram integrados
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Direct Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/50 hover:border-emerald-400 transition-all text-xs font-medium"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Abrir WhatsApp</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-pink-950/40 border border-pink-500/30 text-pink-300 hover:bg-pink-900/50 hover:border-pink-400 transition-all text-xs font-medium"
          >
            <Instagram className="w-4 h-4 text-pink-400" />
            <span>Abrir Instagram</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 pb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Configurar links e mensagens padrão</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Número do WhatsApp (com DDI e DDD)
            </label>
            <div className="relative">
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="Ex: 5544991840305"
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              Link gerado: wa.me/{cleanNumber || '55...'}
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Mensagem inicial pré-preenchida
            </label>
            <textarea
              rows={2}
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              placeholder="Mensagem ao clicar no WhatsApp"
              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Usuário do Instagram
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs font-mono text-slate-500">@</span>
              <input
                type="text"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                placeholder="vitorcrekonii"
                className="w-full pl-7 pr-3 py-2 rounded-lg bg-black/50 border border-white/10 text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">
              Link: instagram.com/{instagramHandle.replace(/^@/, '') || 'vitorcrekonii'}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              {savedNotice ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span>Salvo!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-black" />
                  <span>Salvar Dados</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
