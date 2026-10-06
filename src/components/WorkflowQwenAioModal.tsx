import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Play, CheckCircle2, ShieldCheck, UserCheck, CreditCard, MessageCircle, Cpu } from 'lucide-react';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';

interface WorkflowQwenAioModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
}

export const HOTMART_CHECKOUT_QWEN_AIO = 'https://pay.hotmart.com/G107860098H';

export const WorkflowQwenAioModal: React.FC<WorkflowQwenAioModalProps> = ({
  isOpen,
  onClose,
  whatsappUrl,
}) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const finalWhatsappUrl =
    whatsappUrl ||
    `https://wa.me/5544991840305?text=${encodeURIComponent(
      'Olá Vitor, quero comprar pelo WhatsApp: Quadro 11 - Workflow QWEN Aio Removedor De Roupas'
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
            id="workflow-qwenaio-modal-portal"
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-qwenaio-title"
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
              className="relative w-full max-w-3xl rounded-2xl bg-[#0e1024] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] p-5 sm:p-7 z-10 my-auto text-left"
            >
              {/* Sci-Fi HUD Corner Reticles */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

              {/* Glowing Accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none" />

              {/* Modal Header */}
              <div className="relative flex items-start justify-between gap-4 pb-4 border-b border-cyan-500/20">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-rose-950/80 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.2)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                      SEM CENSURA
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-cyan-300 bg-cyan-950/90 border border-cyan-500/40">
                      RUNNINGHUB
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-indigo-300 bg-indigo-950/60 border border-indigo-500/30">
                      <ShieldCheck className="w-3 h-3 text-indigo-400" />
                      IMAGEM +18
                    </span>
                  </div>

                  <h2
                    id="modal-qwenaio-title"
                    className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2"
                  >
                    WORKFLOW QWEN AIO REMOVEDOR DE ROUPAS
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-200 font-mono leading-relaxed">
                    Workflow All-in-One no RunningHub com modelos e nodes integrados, consistência LoRA e remoção de roupas sem censura com altíssima qualidade.
                  </p>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  id="btn-close-qwenaio-modal"
                  onClick={onClose}
                  aria-label="Fechar modal"
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Container (Atualizado com link oficial Odysee Qwen AIO) */}
              <div className="relative mt-5 rounded-xl overflow-hidden border border-cyan-500/30 bg-black/90 shadow-[0_0_25px_rgba(0,0,0,0.8)] aspect-video">
                <iframe
                  id="odysee-iframe"
                  src="https://odysee.com/%24/embed/%40CREKONI%3A9%2FWorkflow-Qwen-AIO-Remove----CREKONI%3Ac?r=Du1MScs2qhpenuh9fhkyZkv5jEoUpS1d"
                  title="Vídeo Exemplo Workflow QWEN Aio Removedor De Roupas"
                  className="w-full h-full border-0"
                  style={{ width: '100%', aspectRatio: '16 / 9' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
                <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    AIO QWEN Integrado
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Modelos e nodes All-in-One configurados para máxima velocidade e praticidade.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-purple-300 font-semibold mb-1">
                    <UserCheck className="w-3.5 h-3.5 text-purple-400" />
                    Consistência LoRA
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Preserva traços, fisionomia e identidade anatômica da modelo em qualquer pose.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-300 font-semibold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    RunningHub Nuvem
                  </div>
                  <p className="text-slate-400 text-[11px] leading-normal">
                    Execute 100% online no RunningHub com altíssimo desempenho e sem censura.
                  </p>
                </div>
              </div>

              {/* Bottom Action Area with Payment Popup Button & WhatsApp Button */}
              <div className="mt-6 pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs font-mono text-cyan-300 flex items-center justify-center sm:justify-start gap-1.5">
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
                    id="btn-modal-hotmart-qwenaio"
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
                    id="btn-modal-whatsapp-qwenaio"
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

      {/* Pop-up Modal de Pagamento Hotmart para o QWEN Aio Removedor De Roupas */}
      <PaymentCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        checkoutUrl={HOTMART_CHECKOUT_QWEN_AIO}
        title="Adquirir Workflow QWEN Aio Removedor De Roupas - Hotmart"
      />
    </>
  );
};
