import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, CheckCircle2, Flame, CreditCard, Video, MessageCircle, Music, Sparkles } from 'lucide-react';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

interface WorkflowLtxVideoRefModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl?: string;
}

export const HOTMART_CHECKOUT_LTX_VIDEO_REF = 'https://pay.hotmart.com/S107915113M';

export const WorkflowLtxVideoRefModal: React.FC<WorkflowLtxVideoRefModalProps> = ({
  isOpen,
  onClose,
  whatsappUrl,
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const finalWhatsappUrl =
    whatsappUrl ||
    `https://wa.me/5544991840305?text=${encodeURIComponent(
      'Olá Vitor, quero comprar pelo WhatsApp: Quadro 13 - Workflow LTX 2.3 Video Com Referencia Foto e Áudio'
    )}`;

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isCheckoutOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, isCheckoutOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div
            id="workflow-ltx-video-ref-modal-portal"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-ltx-video-ref-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl rounded-2xl bg-gradient-to-b from-[#18120a] via-[#100c06] to-[#0a0704] border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] p-5 sm:p-6 md:p-7 z-10 my-auto overflow-hidden"
            >
              {/* Sci-Fi Decorative Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/15 blur-3xl rounded-full pointer-events-none" />

              {/* Modal Header */}
              <div className="relative flex items-start justify-between gap-4 pb-4 border-b border-amber-500/20">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                      SEM CENSURA
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-amber-300 bg-amber-950/90 border border-amber-500/40">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      NORDY
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
                      <Video className="w-3 h-3 text-cyan-400" />
                      VÍDEO +18
                    </span>
                  </div>

                  <h2
                    id="modal-ltx-video-ref-title"
                    className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2"
                  >
                    WORKFLOW LTX 2.3 VIDEO COM REFERENCIA FOTO E ÁUDIO
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-200/90 font-mono leading-relaxed">
                    Criação de vídeo profissional usando foto e áudio de referência com o modelo LTX 2.3 sem censura, máxima consistência facial e movimentação labial realista.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  id="btn-close-ltx-video-ref-modal"
                  onClick={onClose}
                  aria-label="Fechar modal"
                  className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/50 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Container - Com o iframe exato solicitado */}
              <div className="relative mt-5 rounded-xl overflow-hidden border border-amber-500/30 bg-black/90 shadow-[0_0_25px_rgba(0,0,0,0.8)] aspect-video">
                <iframe
                  id="odysee-iframe"
                  style={{ width: '100%', aspectRatio: '16 / 9' }}
                  src="https://odysee.com/%24/embed/Workflow-LTX-Video-Com-Referencia-Foto-e-Audio%3Aa?r=Du1MScs2qhpenuh9fhkyZkv5jEoUpS1d"
                  title="Vídeo Exemplo Workflow LTX 2.3 Video Com Referencia Foto e Áudio"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Foto & Áudio de Referência
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Carregue qualquer imagem e áudio para criar animações hiper-realistas sincronizadas com fala e movimentos naturais.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                    Sem Censura (+18)
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Gere vídeos de modelos e personagens sem filtros ou censura com fidelidade anatômica impecável.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    LTX 2.3 &amp; Nordy
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Motor LTX 2.3 com nodes otimizados e traduzidos por Crekoni para máxima velocidade e resolução 1080p.
                  </p>
                </div>
              </div>

              {/* Bottom Action Area with Payment Popup Button & WhatsApp Button */}
              <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-mono text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    Adquira o Workflow VIP
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pagamento seguro com liberação imediata via Hotmart ou atendimento direto no WhatsApp.
                  </p>
                </div>

                {/* Botões de Compra: Hotmart e WhatsApp */}
                <div className="flex flex-col gap-2.5 w-full sm:w-auto shrink-0">
                  {/* Botão de pagamento Hotmart popup */}
                  <button
                    type="button"
                    id="btn-modal-hotmart-ltx-video-ref"
                    onClick={() => setIsCheckoutOpen(true)}
                    className="group relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-display font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
                      </span>
                    </div>
                    <span className="text-black font-extrabold tracking-wide">COMPRAR PELA HOTMART</span>
                    <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  {/* Botão de compra pelo WhatsApp */}
                  <a
                    href={finalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="btn-modal-whatsapp-ltx-video-ref"
                    className="group relative w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-display font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <div className="relative">
                      <MessageCircle className="w-4 h-4 text-black group-hover:scale-110 transition-transform" />
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
                      </span>
                    </div>
                    <span className="text-black font-extrabold tracking-wide">COMPRAR PELO WHATSAPP</span>
                    <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pop-up Modal de Pagamento Hotmart para o Quadro 13 */}
      <PaymentCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutUrl={HOTMART_CHECKOUT_LTX_VIDEO_REF}
        title="Adquirir Workflow LTX 2.3 Video Com Referencia Foto e Áudio - Hotmart"
      />
    </>
  );
};
