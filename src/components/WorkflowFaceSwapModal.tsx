import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Play, CheckCircle2, ShieldCheck, UserCheck, CreditCard } from 'lucide-react';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

interface WorkflowFaceSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
}

export const HOTMART_CHECKOUT_QUADRO_2 = 'https://pay.hotmart.com/V107668208I?bid=1789746172828';

export const WorkflowFaceSwapModal: React.FC<WorkflowFaceSwapModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
            id="workflow-faceswap-modal-portal"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-faceswap-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl rounded-2xl bg-[#0e1024] border border-indigo-500/40 shadow-[0_0_50px_rgba(99,102,241,0.25)] p-5 sm:p-7 z-10 my-auto text-left"
            >
              {/* Sci-Fi HUD Corner Reticles */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-indigo-400 z-20 pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-indigo-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-indigo-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-indigo-400 z-20 pointer-events-none" />

              {/* Glowing Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-indigo-500/15 blur-3xl rounded-full pointer-events-none" />

              {/* Modal Header */}
              <div className="relative flex items-start justify-between gap-4 pb-4 border-b border-indigo-500/20">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                      SEM CENSURA
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-amber-300 bg-amber-950/90 border border-amber-500/40">
                      NORDY
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-500/30">
                      <ShieldCheck className="w-3 h-3 text-indigo-400" />
                      IMAGEM +18
                    </span>
                  </div>

                  <h2
                    id="modal-faceswap-title"
                    className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2"
                  >
                    WORKFLOW MODELO +18 NUA + UPSCALE
                  </h2>
                  <p className="text-xs sm:text-sm text-indigo-200 font-mono leading-relaxed">
                    Use Sua Foto de referencia e Crie Quantas Fotos Quiser, Sem Censura Com Qualidade Alta e Perfeição
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  id="btn-close-faceswap-modal"
                  onClick={onClose}
                  aria-label="Fechar modal"
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Container */}
              <div className="relative mt-5 rounded-xl overflow-hidden border border-indigo-500/30 bg-black/90 shadow-[0_0_25px_rgba(0,0,0,0.8)] aspect-video">
                <iframe
                  id="odysee-iframe"
                  src="https://odysee.com/%24/embed/%40CREKONI%3A9%2Fcria-fotos-18-sem-censura-ilimitado%3A7?r=Du1MScs2qhpenuh9fhkyZkv5jEoUpS1d"
                  title="Vídeo Exemplo Workflow Modelo +18 Nua + Upscale"
                  className="w-full h-full border-0"
                  style={{ width: '100%', aspectRatio: '16 / 9' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-indigo-300 font-semibold mb-1">
                    <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                    Foto de Referência
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Mantenha a identidade exata da modelo em infinitas novas fotos geradas.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                    Sem Censura
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Gere fotos de modelo nua sem filtros ou bloqueios de plataforma.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Upscale &amp; Perfeição
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Upscale 4K com restauração de pele e máxima nitidez visual.
                  </p>
                </div>
              </div>

              {/* Bottom Action Area with Payment Popup Button */}
              <div className="mt-6 pt-4 border-t border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-mono text-indigo-300 flex items-center justify-center sm:justify-start gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    Adquira o Workflow VIP
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pagamento seguro com liberação imediata via Hotmart.
                  </p>
                </div>

                {/* Botão de pagamento Hotmart popup */}
                <button
                  type="button"
                  id="btn-modal-whatsapp-faceswap"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <div className="relative">
                    <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                  </div>
                  <span>COMPRAR O WORKFLOW R$ 5,00</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pop-up Modal de Pagamento Hotmart para o Quadro 2 */}
      <PaymentCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutUrl={HOTMART_CHECKOUT_QUADRO_2}
        title="Adquirir Workflow Modelo +18 Nua + Upscale - Hotmart"
      />
    </>
  );
};
