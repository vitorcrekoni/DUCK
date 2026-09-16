import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, CheckCircle2, Unlock, Cpu } from 'lucide-react';

interface DecoderHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DecoderHelpModal: React.FC<DecoderHelpModalProps> = ({
  isOpen,
  onClose,
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
          id="decoder-help-modal-portal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-decoder-help-title"
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
            className="relative w-full max-w-2xl rounded-2xl bg-[#0d111d] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)] p-5 sm:p-7 z-10 my-auto text-left"
          >
            {/* Sci-Fi HUD Corner Reticles */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

            {/* Glowing Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none" />

            {/* Modal Header */}
            <div className="relative flex items-start justify-between gap-4 pb-4 border-b border-cyan-500/20">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                    DUVIDAS & INSTRUÇÕES
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-amber-300 bg-amber-950/60 border border-amber-500/30">
                    <Cpu className="w-3 h-3 text-amber-400" />
                    RUNNINGHUB & NORDY COMFYUI
                  </span>
                </div>

                <h2
                  id="modal-decoder-help-title"
                  className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2"
                >
                  PARA QUE SERVE O DECODIFICADOR?
                </h2>
              </div>

              {/* Close Button */}
              <button
                type="button"
                id="btn-close-decoder-help-modal"
                onClick={onClose}
                aria-label="Fechar modal"
                className="p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Explanation Banner */}
            <div className="mt-5 p-4 sm:p-5 rounded-xl bg-gradient-to-br from-cyan-950/50 via-[#0a1224]/80 to-teal-950/40 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.12)]">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-400/30 shrink-0 mt-0.5">
                  <Unlock className="w-5 h-5 text-cyan-300" />
                </div>
                <div className="space-y-2.5">
                  <p className="text-sm sm:text-base text-cyan-200 font-mono font-bold leading-relaxed tracking-wide">
                    O DECODIFICADOR DUCK SERVE PARA VOCÊ QUE USA WORKFLOW QUE GERA IMAGENS SEM CENSURA NAS PLATAFORMAS <span className="text-amber-300">RUNNINGHUB</span> E <span className="text-amber-300">NORDY COMFYUI</span>.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 font-mono leading-relaxed">
                    CERTOS FLUXOS GERAM IMAGEM CODIFICADA POIS O SITE NÃO ABRE CONTEÚDO +18, ENTÃO VOCÊ USA ESTA FERRAMENTA PARA COLOCAR ESTA IMAGEM GERADA E CONVERTER PARA A IMAGEM OU VÍDEO GERADO.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer / Close action */}
            <div className="mt-6 pt-4 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Compatível com formato LSB Duck / SS_tools
              </span>

              <button
                type="button"
                id="btn-confirm-decoder-help-understood"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono font-semibold text-xs text-white bg-cyan-600 hover:bg-cyan-500 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                ENTENDIDO, FECHAR
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
