import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, ArrowUpRight, Play, CheckCircle2, Video, Clapperboard } from 'lucide-react';

interface WorkflowPrompt2VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
}

export const WorkflowPrompt2VideoModal: React.FC<WorkflowPrompt2VideoModalProps> = ({
  isOpen,
  onClose,
  whatsappUrl,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="workflow-prompt2video-modal-portal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-prompt2video-title"
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
            className="relative w-full max-w-3xl rounded-2xl bg-[#17120a] border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] p-5 sm:p-7 z-10 my-auto text-left"
          >
            {/* Sci-Fi HUD Corner Reticles */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-amber-400 z-20 pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-amber-400 z-20 pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-amber-400 z-20 pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-amber-400 z-20 pointer-events-none" />

            {/* Glowing Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/15 blur-3xl rounded-full pointer-events-none" />

            {/* Modal Header */}
            <div className="relative flex items-start justify-between gap-4 pb-4 border-b border-amber-500/20">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                    PROMPT2VIDEO
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold text-orange-300 bg-orange-950/90 border border-orange-500/40">
                    <Clapperboard className="w-3 h-3 text-orange-400" />
                    WAN 2.1 / COMFY
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-yellow-300 bg-yellow-950/60 border border-yellow-500/30">
                    <Video className="w-3 h-3 text-yellow-400" />
                    CINEMATOGRÁFICO
                  </span>
                </div>

                <h2
                  id="modal-prompt2video-title"
                  className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2"
                >
                  WORKFLOW PROMPT2VIDEO & ANIMAÇÃO DINÂMICA
                </h2>
                <p className="text-xs sm:text-sm text-amber-200 font-mono leading-relaxed">
                  (WORKFLOW PRONTO PARA USAR EXCLUSIVAMENTE NO SITE{' '}
                  <a
                    href="https://www.runninghub.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-amber-300 hover:text-amber-200 transition-colors font-semibold"
                  >
                    https://www.runninghub.ai/
                  </a>
                  )
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                id="btn-close-prompt2video-modal"
                onClick={onClose}
                aria-label="Fechar modal"
                className="p-2 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/50 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container */}
            <div className="relative mt-5 rounded-xl overflow-hidden border border-amber-500/30 bg-black/90 shadow-[0_0_25px_rgba(0,0,0,0.8)] aspect-video">
              <iframe
                id="workflow-prompt2video-video-iframe"
                src="https://www.youtube-nocookie.com/embed/IkanfUReMXw?autoplay=1&rel=0&modestbranding=1"
                title="Vídeo Exemplo Workflow Prompt2Video Dinâmico"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  Texto & Imagem p/ Vídeo
                </div>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Crie sequências dinâmicas a partir de textos e fotos com física e consistência corporal.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs">
                <div className="flex items-center gap-1.5 text-orange-300 font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                  Controle de Câmera Fluido
                </div>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Transições de zoom, pan, orbit e tomadas cinematográficas sem distorções anômalas.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs">
                <div className="flex items-center gap-1.5 text-yellow-300 font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                  Pronto p/ RunningHub
                </div>
                <p className="text-slate-400 text-[11px] leading-normal">
                  Fluxo pronto baseado em Wan 2.1 com estabilidade e desempenho garantidos na nuvem.
                </p>
              </div>
            </div>

            {/* Bottom Action Area with WhatsApp Button */}
            <div className="mt-6 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <span className="text-xs font-mono text-amber-300 flex items-center justify-center sm:justify-start gap-1.5">
                  <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                  Adquira o Workflow VIP
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fale diretamente conosco no WhatsApp e receba o fluxo pronto para uso.
                </p>
              </div>

              {/* Botão com o link do WhatsApp */}
              <a
                id="btn-modal-whatsapp-prompt2video"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-display font-bold text-sm sm:text-base text-white bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <div className="relative">
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                  </span>
                </div>
                <span>ADQUIRIR WORKFLOW VIP NO WHATSAPP</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
