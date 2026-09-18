import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

export const OnlineUsersCounter: React.FC = () => {
  // Inicializa com um número natural e dinâmico de visitantes online
  const [onlineCount, setOnlineCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('crekoni_online_count');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 12 && parsed <= 68) return parsed;
      }
    }
    // Faixa realista entre 23 e 37 usuários
    return Math.floor(Math.random() * (37 - 23 + 1)) + 23;
  });

  useEffect(() => {
    // Oscilação suave e realista a cada 8 a 16 segundos
    const updateCount = () => {
      setOnlineCount((prev) => {
        // Delta de -2 a +2 usuários
        const delta = Math.floor(Math.random() * 5) - 2;
        let next = prev + delta;
        // Limites orgânicos para o site
        if (next < 16) next = 17 + Math.floor(Math.random() * 3);
        if (next > 54) next = 52 - Math.floor(Math.random() * 3);

        if (typeof window !== 'undefined') {
          sessionStorage.setItem('crekoni_online_count', next.toString());
        }
        return next;
      });
    };

    // Intervalo aleatório para parecer totalmente natural
    const interval = setInterval(() => {
      updateCount();
    }, 9000 + Math.random() * 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="header-online-users"
      title={`${onlineCount} usuários online agora`}
      className="group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-200 shadow-[0_0_12px_rgba(16,185,129,0.15)] select-none cursor-default"
    >
      {/* Indicador pulsante verde live */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      <Users className="w-3.5 h-3.5 text-emerald-400" />

      <span className="font-mono text-xs font-bold text-emerald-300 tracking-wider">
        {onlineCount}
      </span>

      <span className="hidden sm:inline font-mono text-[10px] text-emerald-400/80 uppercase tracking-widest font-semibold">
        online
      </span>
    </div>
  );
};
