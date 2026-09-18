import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Play, CheckCircle2, Sparkles, Cpu, CreditCard } from 'lucide-react';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

interface WorkflowUpscaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
}

export const HOTMART_CHECKOUT_QUADRO_1 = 'https://pay.hotmart.com/F107668242S?bid=1789746465666';

export const WorkflowUpscaleModal: React.FC<WorkflowUpscaleModalProps> = ({
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
            id="workflow-upscale-modal-portal"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-upscale-title"
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
              className="relative w-full max-w-3xl rounded-2xl bg-[#140b12] border border-rose-500/40 shadow-[0_0_50px_rgba(244,63,94,0.25)] p-5 sm:p-7 z-10 my-auto text-left"
            >
              {/* Sci-Fi HUD Corner Reticles */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-rose-400 z-20 pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-rose-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-rose-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-rose-400 z-20 pointer-events-none" />

              {/* Glowing Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-rose-500/15 blur-3xl rounded-full pointer-events-none" />

              {/* Modal Header */}
              <div className="relative flex items-start justify-between gap-4 pb-4 border-b border-rose-500/20">
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
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-rose-300 bg-rose-950/60 border border-rose-500/30">
                      <Cpu className="w-3 h-3 text-rose-400" />
                      IMAGEM +18
                    </span>
                  </div>

                  <h2
                    id="modal-upscale-title"
                    className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2"
                  >
                    WORKFLOW CRIA 5 IMAGENS +18
                  </h2>
                  <p className="text-xs sm:text-sm text-rose-200 font-mono leading-relaxed">
                    Usa Foto de Referencia e Cria 5 Imagens Sem Censura Perfeitas da Sua Modelo
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  id="btn-close-upscale-modal"
                  onClick={onClose}
                  aria-label="Fechar modal"
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Container */}
              <div className="relative mt-5 rounded-xl overflow-hidden border border-rose-500/30 bg-black/90 shadow-[0_0_25px_rgba(0,0,0,0.8)] aspect-video">
                <iframe
                  id="odysee-iframe"
                  src="https://odysee.com/%24/embed/%40CREKONI%3A9%2Fnordy-gera-5-fotos%3Ac?r=Du1MScs2qhpenuh9fhkyZkv5jEoUpS1d"
                  title="Vídeo Exemplo Workflow Cria 5 Imagens +18"
                  className="w-full h-full border-0"
                  style={{ width: '100%', aspectRatio: '16 / 9' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                    5 Imagens Simultâneas
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Gera 5 variações fotorrealistas de uma só vez a partir da mesma imagem base.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-rose-300 font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                    Sem Censura (+18)
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Liberdade completa na criação de conteúdo adulto sem bloqueios de prompt.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    Pronto p/ Nordy e RunningHub
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Fluxo totalmente configurado para execução rápida direto na nuvem tanto no Nordy quanto no RunningHub.
                  </p>
                </div>
              </div>

              {/* Bottom Action Area with Payment Popup Button */}
              <div className="mt-6 pt-4 border-t border-rose-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-mono text-rose-300 flex items-center justify-center sm:justify-start gap-1.5">
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
                  id="btn-modal-whatsapp-upscale"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:via-green-400 hover:to-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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

      {/* Pop-up Modal de Pagamento Hotmart para o Quadro 1 */}
      <PaymentCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutUrl={HOTMART_CHECKOUT_QUADRO_1}
        title="Adquirir Workflow Cria 5 Imagens +18 - Hotmart"
      />
    </>
  );
};
