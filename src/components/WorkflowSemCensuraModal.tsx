import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, CheckCircle2, Flame, Sparkles, Compass, CreditCard } from 'lucide-react';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

interface WorkflowSemCensuraModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl?: string;
}

export const HOTMART_CHECKOUT_QUADRO_6 = 'https://pay.hotmart.com/I107686620S';

export const WorkflowSemCensuraModal: React.FC<WorkflowSemCensuraModalProps> = ({
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
          id="workflow-sem-censura-modal-portal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-sem-censura-title"
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

          {/* Modal Card - Estilo futurista no tema Azul 8K com métricas do Quadro 5 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl rounded-2xl bg-[#061022] border border-blue-500/40 shadow-[0_0_50px_rgba(59,130,246,0.25)] p-5 sm:p-7 z-10 my-auto text-left"
          >
            {/* Sci-Fi HUD Corner Reticles */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-400 z-20 pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-blue-400 z-20 pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-blue-400 z-20 pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-blue-400 z-20 pointer-events-none" />

            {/* Glowing Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-blue-500/15 blur-3xl rounded-full pointer-events-none" />

            {/* Modal Header */}
            <div className="relative flex items-start justify-between gap-4 pb-4 border-b border-blue-500/20">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-blue-950/80 text-blue-300 border border-blue-500/40 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
                    SEM CENSURA
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-amber-300 bg-amber-950/90 border border-amber-500/40">
                    <Flame className="w-3 h-3 text-amber-400" />
                    UPSCALE SEM CENSURA
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    SUPER DETALHES DE PELE
                  </span>
                </div>

                <h2
                  id="modal-sem-censura-title"
                  className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2"
                >
                  Imagen Refine 8K Super Detalhes De Pele
                </h2>
                <p className="text-xs sm:text-sm text-blue-200 font-mono leading-relaxed">
                  Refinamento e upscale de imagem em 8K com máxima nitidez, super detalhes de textura de pele, poros anatômicos e iluminação hiper-realista sem censura.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                id="btn-close-sem-censura-modal"
                onClick={onClose}
                aria-label="Fechar modal"
                className="p-2 rounded-xl bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-400/50 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative mt-5 rounded-xl overflow-hidden border border-blue-500/30 bg-black/90 shadow-[0_0_25px_rgba(0,0,0,0.8)] aspect-video">
              <iframe
                id="odysee-iframe"
                src="https://odysee.com/%24/embed/%40CREKONI%3A9%2FImagen-Refine-8K-Super-Detalhes-De-Pele---CREKONI%3Af?r=Du1MScs2qhpenuh9fhkyZkv5jEoUpS1d"
                title="Vídeo Exemplo Workflow Imagen Refine 8K Super Detalhes De Pele"
                className="w-full h-full border-0"
                style={{ width: '100%', aspectRatio: '16 / 9' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Highlights Grid (Métricas das janelas pop up) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/20 text-xs">
                <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  Rotação 360° & Upscale
                </div>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Controle de ângulo horizontal, vertical e zoom 3D com precisão milimétrica de câmera.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/20 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Sem Censura (+18)
                </div>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Gere poses e ângulos íntimos sem restrições ou filtros no ComfyUI e RunningHub.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-500/20 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Mesmo Local & Pose Nova
                </div>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Consistência impecável do mesmo ambiente e iluminação mantendo a identidade da modelo.
                </p>
              </div>
            </div>

            {/* Bottom Action Area with Payment Popup Button (igual Quadro 5) */}
            <div className="mt-6 pt-4 border-t border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <span className="text-xs font-mono text-blue-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                  Adquira o Workflow VIP
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pagamento seguro com liberação imediata via Hotmart.
                </p>
              </div>

              {/* Botão de pagamento Hotmart popup (igual Quadro 5) */}
              <button
                type="button"
                id="btn-modal-sem-censura-comprar"
                onClick={() => setIsCheckoutOpen(true)}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-bold text-sm sm:text-base text-black bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="relative">
                  <CreditCard className="w-5 h-5 text-black group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black/40 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
                  </span>
                </div>
                <span className="text-black font-extrabold">COMPRAR O WORKFLOW R$ 5,50</span>
                <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

    {/* Pop-up Modal de Pagamento Hotmart para o Quadro 6 (igual Quadro 5) */}
    <PaymentCheckoutModal
      isOpen={isCheckoutOpen}
      onClose={() => setIsCheckoutOpen(false)}
      checkoutUrl={HOTMART_CHECKOUT_QUADRO_6}
      title="Adquirir Imagen Refine 8K Super Detalhes De Pele - Hotmart"
    />
  </>
  );
};
