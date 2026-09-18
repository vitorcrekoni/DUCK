import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ShieldCheck, Lock, CreditCard } from 'lucide-react';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl: string;
  title?: string;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  onClose,
  checkoutUrl,
  title = 'Finalizar Pagamento Seguro - Hotmart',
}) => {
  // Fecha com a tecla ESC
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
          id="payment-checkout-modal-portal"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-checkout-title"
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl h-[90vh] sm:h-[85vh] max-h-[850px] rounded-2xl bg-[#080d19] border border-rose-500/40 shadow-[0_0_60px_rgba(244,63,94,0.3)] flex flex-col z-10 overflow-hidden"
          >
            {/* HUD Reticles */}
            <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-rose-400 z-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-rose-400 z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-rose-400 z-20 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-rose-400 z-20 pointer-events-none" />

            {/* Modal Topbar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a1122] border-b border-rose-500/20 shrink-0">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-500/40 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-rose-400" />
                </div>
                <div className="truncate">
                  <h3
                    id="payment-checkout-title"
                    className="text-xs sm:text-sm font-orbitron font-bold text-white tracking-wide truncate"
                  >
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400" /> Conexão Criptografada SSL
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <ShieldCheck className="w-3 h-3 text-rose-400" /> Hotmart Checkout Oficial
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Botão de abrir em nova aba como opção extra */}
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir checkout em tela cheia / nova aba"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  <span>Nova Aba</span>
                </a>

                {/* Fechar Modal */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fechar checkout"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 text-slate-400 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iframe Hotmart Checkout com Fallback Bar */}
            <div className="relative flex-1 w-full bg-[#050811] overflow-hidden">
              <iframe
                src={checkoutUrl}
                title="Checkout de Pagamento Seguro Hotmart"
                className="w-full h-full border-0"
                allow="payment; encrypted-media; fullscreen"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation"
              />
            </div>

            {/* Footer Informativo */}
            <div className="px-4 py-2.5 bg-[#0a1122] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono shrink-0">
              <span className="truncate text-[#d9042c]">
                Após a aprovação na Hotmart, o acesso ao workflow é liberado imediatamente.
              </span>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-rose-400 hover:text-rose-300 font-bold ml-2 underline shrink-0 inline-flex items-center gap-1"
              >
                Problemas no carregamento? Clique aqui <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
