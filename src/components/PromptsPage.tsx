import React, { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  Search,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  Camera,
  Film,
} from 'lucide-react';
import { PROMPTS_DATA, PROMPT_CATEGORIES, PromptItem } from '../data/promptsData';
import { playCyberTone } from '../utils/duckDecoder';

interface PromptsPageProps {
  onBack: () => void;
  soundEnabled?: boolean;
}

export const PromptsPage: React.FC<PromptsPageProps> = ({ onBack, soundEnabled = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [modalItem, setModalItem] = useState<PromptItem | null>(null);
  const [modalMediaTab, setModalMediaTab] = useState<'image' | 'video'>('image');
  const [cardMediaMode, setCardMediaMode] = useState<Record<string, 'image' | 'video'>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 16;
  const carouselRef = useRef<HTMLDivElement>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Scroll horizontal da barra de categorias
  const handleScrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Contagem de posts por categoria
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: PROMPTS_DATA.length,
    };
    PROMPTS_DATA.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
      if (
        item.category === 'video' ||
        item.category === 'videos' ||
        item.additionalCategories?.includes('videos') ||
        item.additionalCategories?.includes('video')
      ) {
        counts['videos'] = (counts['videos'] || 0) + 1;
      }
    });
    return counts;
  }, []);

  // Filtragem dos prompts
  const filteredPrompts = useMemo(() => {
    return PROMPTS_DATA.filter((item) => {
      // Filtro de categoria
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'videos' || selectedCategory === 'video') {
          const isVideoCategory =
            item.category === 'videos' ||
            item.category === 'video' ||
            item.additionalCategories?.includes('videos') ||
            item.additionalCategories?.includes('video');
          if (!isVideoCategory) {
            return false;
          }
        } else if (
          item.category !== selectedCategory &&
          !item.additionalCategories?.includes(selectedCategory)
        ) {
          return false;
        }
      }
      // Filtro de busca
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = item.title.toLowerCase().includes(q);
        const inPrompt = item.prompt.toLowerCase().includes(q);
        const inCategory = item.categoryLabel.toLowerCase().includes(q);
        const inModel = item.recommendedModel.toLowerCase().includes(q);
        const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!inTitle && !inPrompt && !inCategory && !inModel && !inTags) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory]);

  // Paginação: 16 posts por página
  const totalPages = Math.ceil(filteredPrompts.length / ITEMS_PER_PAGE) || 1;
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedPrompts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredPrompts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredPrompts, safeCurrentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (safeCurrentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (safeCurrentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const copyToClipboard = async (text: string, id: string, label = 'Prompt') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      playCyberTone('success', !soundEnabled);
      showToast(`${label} copiado com sucesso!`);
      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2500);
    } catch {
      // Fallback para navegadores sem permissão de clipboard direto
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(id);
      playCyberTone('success', !soundEnabled);
      showToast(`${label} copiado com sucesso!`);
      setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 2500);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2600);
  };

  const handleOpenModal = (item: PromptItem) => {
    setModalItem(item);
    // Definir tab inicial baseada no tipo ou modo atual
    const currentMode = cardMediaMode[item.id] || item.mediaType;
    setModalMediaTab(currentMode);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16 min-h-screen text-white">
      {/* Botão Superior Voltar */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          id="btn-prompts-back-home"
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-zinc-300 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar à Página Principal</span>
        </button>

        {/* Busca Compacta */}
        <div className="relative w-48 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input
            type="text"
            id="search-prompts-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Buscar prompts..."
            className="w-full pl-8 pr-7 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              title="Limpar busca"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Header Central: Galeria de Prompts (Estilo idêntico ao CREKONI DECODER da página crekonidecoder) */}
      <section className="text-center pt-2 pb-4 space-y-2">
        <div className="relative inline-block w-full max-w-3xl mx-auto py-1">
          <div className="relative group flex flex-col items-center">
            <div className="relative px-1 py-0.5">
              <h1 className="relative font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.14em] sm:tracking-[0.16em] pl-[0.14em] sm:pl-[0.16em] chrome-3d-title leading-none uppercase">
                GALERIA DE PROMPTS
              </h1>
              <div
                aria-hidden="true"
                className="absolute inset-0 px-1 py-0.5 font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.14em] sm:tracking-[0.16em] pl-[0.14em] sm:pl-[0.16em] leading-none chrome-flash-overlay pointer-events-none select-none uppercase"
              >
                GALERIA DE PROMPTS
              </div>
            </div>

            {/* Linha de Subtítulo com detalhes metálicos */}
            <div className="relative mt-3 sm:mt-4 flex items-center justify-center gap-2.5">
              <span className="hidden sm:block w-8 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
              <p className="font-display font-semibold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-amber-200 tracking-[0.2em] uppercase">
                Inspire-se e crie conteúdos incríveis com um clique
              </p>
              <span className="hidden sm:block w-8 h-[1px] bg-gradient-to-l from-transparent via-amber-400/50 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Carrossel de Categorias com Setas < e > (Igual ao Capturar.PNG) */}
      <div className="relative flex items-center gap-2 max-w-5xl mx-auto px-1">
        {/* Seta Esquerda < */}
        <button
          type="button"
          id="btn-carousel-left"
          onClick={() => handleScrollCarousel('left')}
          className="w-8 h-8 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm"
          title="Rolar para esquerda"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Lista Horizontal de Categorias (Pills) */}
        <div
          ref={carouselRef}
          className="flex items-center gap-2.5 overflow-x-auto pt-3 pb-2 scroll-smooth no-scrollbar scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PROMPT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            const badgeText = cat.badge || cat.tag || (cat.isNew ? 'NOVO' : null);
            const isExclusivo = badgeText?.toLowerCase() === 'exclusivo';
            return (
              <div key={cat.id} className="relative shrink-0 pt-1.5">
                {/* Badge flutuante sobre a categoria (Tag em cima) */}
                {badgeText && (
                  <span
                    className={`absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-mono font-black tracking-wider shadow-md z-10 pointer-events-none uppercase whitespace-nowrap ${
                      isExclusivo
                        ? 'bg-[#ccff00] text-black ring-1 ring-black/20 shadow-[0_0_10px_rgba(204,255,0,0.35)]'
                        : 'bg-white text-black'
                    }`}
                  >
                    {badgeText}
                  </span>
                )}
                <button
                  type="button"
                  id={`cat-btn-${cat.id}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? 'bg-[#ccff00] text-black border-[#ccff00] font-semibold shadow-[0_0_15px_rgba(204,255,0,0.35)]'
                      : 'bg-zinc-900/90 text-zinc-300 hover:text-white border-zinc-800/90 hover:border-zinc-700'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none min-w-[18px] transition-colors ${
                      isActive
                        ? 'bg-black/20 text-black'
                        : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Seta Direita > */}
        <button
          type="button"
          id="btn-carousel-right"
          onClick={() => handleScrollCarousel('right')}
          className="w-8 h-8 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm"
          title="Rolar para direita"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Marcador para rolagem suave ao trocar de página */}
      <div ref={gridTopRef} className="scroll-mt-4" />

      {/* Grid de 4 Posts por Fila (Todos do mesmo tamanho) */}
      {filteredPrompts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-zinc-950/60 border border-zinc-800/80 my-8">
          <p className="text-sm font-mono text-zinc-400 mb-3">
            Nenhum prompt encontrado para esta categoria ou busca.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-black bg-[#ccff00] hover:bg-[#b8e600] transition-all cursor-pointer"
          >
            Ver Todos os Prompts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5 pt-2">
          {paginatedPrompts.map((item, index) => {
            const isCopied = copiedId === item.id;
            const globalIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE + index;
            const postNumber = globalIndex + 1;
            const postNumberStr = item.postNumber || String(postNumber).padStart(2, '0');
            // Se o card tem tanto foto quanto vídeo, permitir alternar
            const currentMode = cardMediaMode[item.id] || item.mediaType;
            const isVideoActive = currentMode === 'video';
            const effectiveVideoSrc = item.videoUrl || (item.mediaType === 'video' ? item.mediaUrl : undefined);

            return (
              <div
                key={item.id}
                id={`card-prompt-${item.id}`}
                className="group flex flex-col h-full rounded-2xl bg-[#121214] border border-[#232328] hover:border-zinc-700/90 transition-all duration-200 p-2.5 sm:p-3 shadow-md"
              >
                {/* 
                  QUADRO DE MÍDIA FIXO (MESMO TAMANHO EM TODOS OS CARDS)
                  - Proporção aspect-[4/5] uniforme em todos os cards da grade
                  - Se a imagem for 16:9, ela fica no centro (object-contain) sem esticar e sem diminuir o quadro!
                */}
                <div
                  className="relative w-full aspect-[4/5] rounded-xl bg-[#09090b] overflow-hidden flex items-center justify-center cursor-pointer select-none"
                  onClick={() => handleOpenModal(item)}
                  title="Clique para ver prompt completo e expandir"
                >
                  {isVideoActive && effectiveVideoSrc ? (
                    <video
                      key={effectiveVideoSrc}
                      src={effectiveVideoSrc}
                      poster={item.posterUrl || item.mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`max-w-full max-h-full ${
                        item.aspectRatio === '16:9'
                          ? 'w-full h-auto object-contain my-auto'
                          : 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                      }`}
                    />
                  ) : failedImages[item.id] ? (
                    <div className="flex flex-col items-center justify-center p-4 text-center text-zinc-500 gap-2 h-full w-full bg-zinc-950/80">
                      <Camera className="w-8 h-8 text-zinc-600" />
                      <span className="text-[11px] font-mono text-zinc-300 font-bold">{item.mediaUrl.replace('/', '')}</span>
                      <span className="text-[10px] font-sans text-zinc-500 max-w-[150px] leading-tight">
                        Coloque o arquivo na pasta public
                      </span>
                    </div>
                  ) : (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (item.mediaUrl.startsWith('/imagensprompt/') && !target.dataset.triedFallback) {
                          target.dataset.triedFallback = 'true';
                          target.src = item.mediaUrl.replace('/imagensprompt/', '/');
                          return;
                        }
                        setFailedImages((prev) => ({ ...prev, [item.id]: true }));
                      }}
                      className={`max-w-full max-h-full transition-transform duration-500 ${
                        item.aspectRatio === '16:9'
                          ? 'w-full h-auto object-contain my-auto'
                          : 'w-full h-full object-cover group-hover:scale-105'
                      }`}
                    />
                  )}

                  {/* 
                    BADGES SUPERIOR ESQUERDO:
                    1. NÚMERO DO POST (#01, #02, etc.)
                    2. TIPO DE MÍDIA (IMAGEM ou VÍDEO)
                  */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-black/85 text-white text-[10px] font-mono font-black border border-white/20 shadow-md">
                      #{postNumberStr}
                    </span>
                    {item.videoUrl ? (
                      <div
                        className="flex items-center bg-black/80 rounded-md p-0.5 border border-zinc-700/60"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setCardMediaMode((prev) => ({ ...prev, [item.id]: 'image' }))}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-black tracking-wider uppercase transition-all cursor-pointer ${
                            !isVideoActive
                              ? 'bg-[#ccff00] text-black shadow-sm'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          IMAGEM
                        </button>
                        <button
                          type="button"
                          onClick={() => setCardMediaMode((prev) => ({ ...prev, [item.id]: 'video' }))}
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-black tracking-wider uppercase transition-all cursor-pointer ${
                            isVideoActive
                              ? 'bg-[#ccff00] text-black shadow-sm'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          VÍDEO
                        </button>
                      </div>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-[#ccff00] text-black text-[10px] font-mono font-black tracking-wider uppercase shadow-md pointer-events-none">
                        {item.mediaType === 'video' ? 'VÍDEO' : 'IMAGEM'}
                      </span>
                    )}
                  </div>

                  {/* Botão Superior Direito: Expandir (Circular igual ao Capturar.PNG) */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(item);
                    }}
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white/90 border border-white/20 hover:border-white/40 flex items-center justify-center transition-all cursor-pointer shadow-sm z-10"
                    title="Expandir em tela cheia"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Tag indicativa se for 16:9 no centro */}
                  {item.aspectRatio === '16:9' && (
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-mono bg-black/80 text-zinc-400 border border-zinc-800">
                      16:9 Centralizado
                    </span>
                  )}
                </div>

                {/* Identificação Numérica e Texto do Prompt abaixo da mídia */}
                <div className="py-2.5 px-0.5 flex-1 flex flex-col justify-start">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono font-bold text-[#ccff00] flex items-center gap-1.5">
                      <span>POST #{postNumberStr}</span>
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {item.categoryLabel}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-zinc-300 font-mono line-clamp-3 leading-relaxed select-text">
                    {item.prompt}
                  </p>
                </div>

                {/* 
                  Apenas o Botão "Copiar Prompt" 
                  (O botão "Usar no Studio" foi omitido conforme instrução explícita do usuário)
                */}
                <div className="pt-1 mt-auto">
                  <button
                    type="button"
                    id={`btn-copy-prompt-${item.id}`}
                    onClick={() => copyToClipboard(item.prompt, item.id, `Prompt do Post #${postNumberStr}`)}
                    className={`w-full py-2.5 px-3 rounded-xl font-mono text-xs transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer border ${
                      isCopied
                        ? 'bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-[0_0_15px_rgba(204,255,0,0.4)] scale-[1.01]'
                        : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800 hover:border-zinc-700 active:scale-[0.99]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>PROMPT COPIADO!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copiar Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Controles de Paginação com Numeração (16 posts por página) */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2 px-2 border-t border-zinc-800/80">
          <div className="text-xs font-mono text-zinc-400 text-center sm:text-left">
            Mostrando <span className="text-white font-semibold">{(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}</span>-
            <span className="text-white font-semibold">{Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredPrompts.length)}</span> de{' '}
            <span className="text-[#ccff00] font-semibold">{filteredPrompts.length}</span> posts • Página <span className="text-white font-semibold">{safeCurrentPage}</span> de{' '}
            <span className="text-white font-semibold">{totalPages}</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {/* Botão Anterior */}
            <button
              type="button"
              id="btn-pagination-prev"
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage <= 1}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono transition-all border border-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-95 cursor-pointer disabled:pointer-events-none"
              title="Página Anterior"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Anterior</span>
            </button>

            {/* Números das Páginas */}
            {getPageNumbers().map((page, idx) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-1 text-xs font-mono text-zinc-500 select-none"
                  >
                    ...
                  </span>
                );
              }
              const pageNum = Number(page);
              const isActive = pageNum === safeCurrentPage;
              return (
                <button
                  key={`page-${pageNum}`}
                  type="button"
                  id={`btn-page-${pageNum}`}
                  onClick={() => handlePageChange(pageNum)}
                  className={`min-w-[38px] h-9 px-2 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                    isActive
                      ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-[0_0_12px_rgba(204,255,0,0.35)] scale-105'
                      : 'bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-800 active:scale-95'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Botão Próxima */}
            <button
              type="button"
              id="btn-pagination-next"
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage >= totalPages}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-mono transition-all border border-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-95 cursor-pointer disabled:pointer-events-none"
              title="Próxima Página"
            >
              <span className="hidden sm:inline">Próxima</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal / Lightbox Completo para Visualizar Detalhes e Copiar */}
      {modalItem && (
        <div
          id="prompt-modal-backdrop"
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalItem(null);
          }}
        >
          <div
            id="prompt-modal-content"
            className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#121214] border border-[#2e2e36] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* Topo do Modal */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                {(() => {
                  const modalIndex = filteredPrompts.findIndex((p) => p.id === modalItem.id);
                  if (modalIndex !== -1) {
                    return (
                      <span className="px-2.5 py-0.5 rounded-md bg-[#ccff00] text-black font-mono font-black text-xs shadow-sm">
                        POST #{modalItem.postNumber || String(modalIndex + 1).padStart(2, '0')}
                      </span>
                    );
                  }
                  return <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00]" />;
                })()}
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  {modalItem.title}
                </h3>
              </div>
              <button
                type="button"
                id="btn-close-prompt-modal"
                onClick={() => setModalItem(null)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer"
                title="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corpo do Modal */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin scrollbar-thumb-zinc-700">
              {/* Se o item tem tanto imagem quanto vídeo, abas no modal */}
              {modalItem.videoUrl && (
                <div className="flex items-center justify-center gap-2 pb-1">
                  <button
                    type="button"
                    onClick={() => setModalMediaTab('image')}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer border ${
                      modalMediaTab === 'image'
                        ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-sm'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>VER IMAGEM</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalMediaTab('video')}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer border ${
                      modalMediaTab === 'video'
                        ? 'bg-[#ccff00] text-black border-[#ccff00] shadow-sm'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>VER VÍDEO</span>
                  </button>
                </div>
              )}

              {/* Visualização de Mídia */}
              <div className="relative w-full max-h-[460px] rounded-2xl bg-black overflow-hidden flex items-center justify-center border border-zinc-800">
                {(modalMediaTab === 'video' && (modalItem.videoUrl || modalItem.mediaType === 'video')) ||
                modalItem.mediaType === 'video' ? (
                  <video
                    src={modalItem.videoUrl || modalItem.mediaUrl}
                    poster={modalItem.posterUrl || modalItem.mediaUrl}
                    controls
                    autoPlay
                    loop
                    className="max-h-[440px] w-auto max-w-full object-contain mx-auto"
                  />
                ) : failedImages[modalItem.id] ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 gap-3 h-64 w-full bg-zinc-950/80">
                    <Camera className="w-10 h-10 text-zinc-600" />
                    <span className="text-xs font-mono text-zinc-300 font-bold">{modalItem.mediaUrl.replace('/', '')}</span>
                    <span className="text-xs font-sans text-zinc-500 max-w-xs leading-relaxed">
                      Arraste ou envie a foto diretamente para a pasta <strong className="text-zinc-400">public/</strong> no explorador de arquivos.
                    </span>
                  </div>
                ) : (
                  <img
                    src={modalItem.mediaUrl}
                    alt={modalItem.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (modalItem.mediaUrl.startsWith('/imagensprompt/') && !target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = modalItem.mediaUrl.replace('/imagensprompt/', '/');
                        return;
                      }
                      setFailedImages((prev) => ({ ...prev, [modalItem.id]: true }));
                    }}
                    className="max-h-[440px] w-auto max-w-full object-contain mx-auto"
                  />
                )}
              </div>

              {/* Informações de Categoria e Proporção */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ccff00] text-black">
                  {modalItem.categoryLabel}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800">
                  Proporção: {modalItem.aspectRatio}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold text-zinc-300 bg-zinc-900 border border-zinc-800">
                  {modalItem.videoUrl ? 'Imagem + Vídeo' : modalItem.mediaType === 'video' ? 'Vídeo' : 'Imagem'}
                </span>
              </div>

              {/* Caixa Principal do Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#ccff00] uppercase tracking-wider">
                    PROMPT COMPLETO:
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(modalItem.prompt, `modal-${modalItem.id}`, 'Prompt')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-black/80 border border-zinc-800 text-zinc-200 font-mono text-xs leading-relaxed select-all">
                  {modalItem.prompt}
                </div>
              </div>

              {/* Negative Prompt (se houver) */}
              {modalItem.negativePrompt && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                      NEGATIVE PROMPT RECOMENDADO:
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(modalItem.negativePrompt!, `modal-neg-${modalItem.id}`, 'Negative Prompt')
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-zinc-400 font-mono text-xs leading-relaxed select-all">
                    {modalItem.negativePrompt}
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé do Modal com Botão Copiar */}
            <div className="p-4 sm:p-5 border-t border-zinc-800 flex items-center justify-end gap-3 bg-[#0e0e10]">
              <button
                type="button"
                onClick={() => setModalItem(null)}
                className="px-4 py-2.5 rounded-xl font-mono text-xs text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  const modalIndex = filteredPrompts.findIndex((p) => p.id === modalItem.id);
                  const label = modalIndex !== -1 ? `Prompt do Post #${String(modalIndex + 1).padStart(2, '0')}` : 'Prompt';
                  copyToClipboard(modalItem.prompt, `modal-footer-${modalItem.id}`, label);
                }}
                className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-[#ccff00] hover:bg-[#b8e600] text-black transition-all cursor-pointer shadow-lg shadow-[#ccff00]/10 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                <span>COPIAR PROMPT</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Flutuante de Feedback */}
      {toastMessage && (
        <div
          id="prompts-toast-notification"
          className="fixed bottom-6 right-6 z-[130] flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-zinc-900 text-white border border-[#ccff00]/60 shadow-[0_0_25px_rgba(204,255,0,0.25)] animate-slide-up font-mono text-xs"
        >
          <Sparkles className="w-4 h-4 text-[#ccff00]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
