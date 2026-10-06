import React, { useState } from 'react';
import { X, Bell, Sparkles } from 'lucide-react';

interface ChangelogItem {
  id: string;
  badge: string;
  badgeBg: string;
  titulo: string;
  data: string;
  paginaDestino?: 'workflows' | 'aulas' | 'prompts' | 'crekonidecoder' | 'home' | 'marcadagua';
}

interface ChangelogWidgetProps {
  onNavigate?: (page: 'home' | 'decoder' | 'workflows' | 'ttimg' | 'googlepro' | 'aulas' | 'crekonidecoder' | 'prompts' | 'marcadagua') => void;
}

export const ChangelogWidget: React.FC<ChangelogWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(true);

  const updates: ChangelogItem[] = [
    {
      id: '1',
      badge: 'WORKFLOW',
      badgeBg: 'bg-[#2979ff]', // Azul do print
      titulo: 'LTX 2.3 Ref Foto & Áudio...',
      data: '06. Out. 2026',
      paginaDestino: 'workflows',
    },
    {
      id: '2',
      badge: 'AULA',
      badgeBg: 'bg-[#aa00ff]', // Roxo / Magenta do print
      titulo: 'Aula Fish Audio Vozes...',
      data: '06. Out. 2026',
      paginaDestino: 'aulas',
    },
    {
      id: '3',
      badge: 'WORKFLOW',
      badgeBg: 'bg-[#2979ff]', // Azul do print
      titulo: 'Flux2 + Qwen 2 Workflows...',
      data: '05. Out. 2026',
      paginaDestino: 'workflows',
    },
    {
      id: '4',
      badge: 'WORKFLOW',
      badgeBg: 'bg-[#2979ff]',
      titulo: 'QWEN Removedor Roupas...',
      data: '02. Out. 2026',
      paginaDestino: 'workflows',
    },
    {
      id: '5',
      badge: 'PROMPT',
      badgeBg: 'bg-[#ff6d00]', // Laranja cyber
      titulo: 'Galeria Prompts Novos...',
      data: '01. Out. 2026',
      paginaDestino: 'prompts',
    },
    {
      id: '6',
      badge: 'NOVA PÁGINA',
      badgeBg: 'bg-[#00c853]', // Verde clássico do print
      titulo: 'Removedor de Marca D\'água...',
      data: '28. Set. 2026',
      paginaDestino: 'marcadagua',
    },
    {
      id: '7',
      badge: 'NOVA PÁGINA',
      badgeBg: 'bg-[#00b4d8]', // Ciano
      titulo: 'Crekoni Decoder Unificado...',
      data: '26. Set. 2026',
      paginaDestino: 'crekonidecoder',
    },
  ];

  if (!isOpen) {
    return (
      <button
        type="button"
        id="btn-reopen-changelog"
        onClick={() => setIsOpen(true)}
        title="Ver notas de atualizações do site"
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 px-3 py-2 rounded-xl bg-black/90 hover:bg-black text-cyan-300 border border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer font-mono text-xs font-bold animate-fadeIn"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Bell className="w-3.5 h-3.5 text-cyan-400" />
        <span>ATUALIZAÇÕES ({updates.length})</span>
      </button>
    );
  }

  return (
    <aside
      id="changelog-floating-card"
      aria-label="Janela de Notas de Atualizações"
      className="fixed bottom-4 sm:bottom-6 left-3 sm:left-4 z-40 w-[310px] sm:w-[330px] rounded-xl bg-black/95 border border-zinc-800 shadow-[0_0_25px_rgba(0,0,0,0.95),0_0_15px_rgba(6,182,212,0.2)] p-3 sm:p-3.5 text-white font-sans select-none animate-fadeIn backdrop-blur-md"
    >
      {/* Top Header com Título e Botão X */}
      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#00c853]" />
          <span className="font-orbitron font-extrabold text-xs sm:text-[13px] tracking-wider text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            NOTAS DE ATUALIZAÇÃO
          </span>
        </div>

        {/* Botão X para fechar a janela */}
        <button
          type="button"
          id="btn-close-changelog"
          onClick={() => setIsOpen(false)}
          className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/40 border border-transparent transition-all cursor-pointer"
          title="Fechar janela de notas"
          aria-label="Fechar janela"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Lista de Notas idêntica ao estilo do print */}
      <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
        {updates.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.paginaDestino && onNavigate) {
                onNavigate(item.paginaDestino);
              }
            }}
            className={`flex items-center justify-between gap-2 px-1.5 py-1 rounded transition-colors group ${
              item.paginaDestino ? 'cursor-pointer hover:bg-zinc-900/90' : ''
            }`}
            title={item.paginaDestino ? `Ir para a seção ${item.paginaDestino}` : undefined}
          >
            {/* Lado Esquerdo: Badge estilo print */}
            <span
              className={`shrink-0 px-1.5 py-0.5 rounded-[3px] text-[10px] font-mono font-black text-white tracking-wide shadow-sm ${item.badgeBg}`}
            >
              {item.badge}
            </span>

            {/* Centro: Texto da atualização */}
            <span className="flex-1 text-[11px] sm:text-xs font-medium text-slate-200 truncate group-hover:text-cyan-300 transition-colors">
              {item.titulo}
            </span>

            {/* Lado Direito: Data em azul ciano elétrico igual ao print */}
            <span className="shrink-0 text-[10.5px] font-mono font-bold text-[#00b0ff] tracking-tight">
              {item.data}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};
