import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Search,
  Sparkles,
  Flame,
  Crown,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ContactConfig } from '../types';
import { playCyberTone } from '../utils/duckDecoder';

interface ContasProPageProps {
  onBack: () => void;
  contactConfig: ContactConfig;
  soundEnabled?: boolean;
}

interface ContaCategory {
  id: string;
  name: string;
  emoji: string;
  color: string;
  borderColor: string;
  hoverBorderColor: string;
  bgColor: string;
  shadowColor: string;
  accentBadge: string;
  items: string[];
}

const CATEGORIES_DATA: ContaCategory[] = [
  {
    id: 'ia_apis',
    name: 'INTELIGÊNCIA ARTIFICIAL E APIS',
    emoji: '🤖',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    hoverBorderColor: 'hover:border-cyan-400',
    bgColor: 'from-cyan-950/40 via-[#071626] to-[#040914]',
    shadowColor: 'rgba(6,182,212,0.25)',
    accentBadge: 'bg-cyan-950 text-cyan-300 border-cyan-500/40',
    items: [
      '😐 Grok API 4.5 HIGH/XHIGH 15M Tokens 1 Day',
      '😐 Grok API 4.5 HIGH/XHIGH 100M Tokens 7 Days',
      '☁️ Claude API 100M Tokens 1 Day',
      '☁️ Claude API 50M Tokens 1 Day',
      '☁️ Claude API 100M Tokens 3 Days',
      '☁️ Claude API 10M Tokens 1D',
      '☁️ Image 100$ API Claude 30D',
      '☁️ Claude API Plans',
      '😊 API Kimi 15M Tokens 1D',
      '😊 API Kimi 100M Tokens 7D',
      '😊 API Kimi 300M Tokens 30D',
      '⭐ API QWEN Unlimited Tokens 7D',
      '👩‍💻 Codex API 10M Tokens 1 Day',
      '👩‍💻 Codex API 50M Tokens 1 Day',
      '👩‍💻 Codex API 100M Tokens 1 Day',
      'Muse AI Account 1B Tokens',
      'Muse AI Account 5 Billion Tokens',
      'Muse AI Account 31 Billion Tokens',
      '📦 ElevenLabs Free 10k Credits',
      '📦 ElevenLabs Redeem 300K Credits',
      'ElevenLabs Creator 3M',
      'Kling AI Standard Plan 1000+ Credits',
      'Leonardo AI 1M',
      'Gamma Pro 12M',
      'Gamma Plus 1M',
      'Google AI Plus 3M',
      'Perplexity Pro 1M',
      'Antigravity QR Verify',
      'Antigravity Slot x20 Ultra 1 Month',
    ],
  },
  {
    id: 'design_video',
    name: 'DESIGN, VÍDEO E CRIAÇÃO',
    emoji: '🎨',
    color: 'text-pink-400',
    borderColor: 'border-pink-500/40',
    hoverBorderColor: 'hover:border-pink-400',
    bgColor: 'from-pink-950/40 via-[#1c0c1e] to-[#0a050d]',
    shadowColor: 'rgba(236,72,153,0.25)',
    accentBadge: 'bg-pink-950 text-pink-300 border-pink-500/40',
    items: [
      '🥀 Canva Pro Add to Team 12 Months',
      'Canva 500 User Panel',
      'Canva 500 User Panel SM Warranty',
      'Canva Business + Leonardo AI 12M',
      'Canva EDU Pro 1 Year',
      '🎨 Figma EDU 12M',
      'Figma PRO-EDU 1-2 Year',
      '🖼 CapCut 6M Personal',
      'CapCut Pro 7D',
      'CapCut Pro 1 Month',
      'CapCut Pro Individual 1 Month',
      'CapCut Pro Team 1M',
      'CapCut Team 1M 1200 Credits',
      'Descript Creator 12M',
      'Adobe Express 12M',
      'Adobe Express 4M',
      'Runway Pro 12M',
      'Wispr Flow Pro 12M NW',
      'Wispr Flow 12M FW',
    ],
  },
  {
    id: 'produtividade',
    name: 'SOFTWARE E PRODUTIVIDADE',
    emoji: '💻',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40',
    hoverBorderColor: 'hover:border-purple-400',
    bgColor: 'from-purple-950/40 via-[#140a24] to-[#070310]',
    shadowColor: 'rgba(168,85,247,0.25)',
    accentBadge: 'bg-purple-950 text-purple-300 border-purple-500/40',
    items: [
      '👩‍💻 O365 Ready Account Random 6-12M',
      'Microsoft 365 Family 5U 12M',
      'Microsoft 365 Family 12 Month',
      'Microsoft 365 Personal 12M',
      'Microsoft 365 Premium 12M',
      'Office365 Lifetime Plan',
      '💻 Windows 10 / 11 Pro Permanent Key',
      'AutoCAD EDU 12M',
      'Cursor Pro 12 Months',
      'Bolt.new Pro 12M',
      'Grammarly Pro 1 Year',
      'Notion Business 3M',
      'Notion Business 3 Month (Link)',
      'Notion Plus 12M',
      'Account QuillBot Premium 1M',
      'LovePDF Premium 12M',
      'Wordwall Pro 1M',
      'Quizlet Plus Ultimate 12M',
      'Quizlet Plus 12M',
      'Scribd Premium 1M',
      'Duolingo Super 12M',
      'Super Duolingo Your Mail 12 Months',
      'Duolingo 2 Month (NW) Card Required',
    ],
  },
  {
    id: 'vpn_streaming',
    name: 'VPN, STREAMING E ENTRETENIMENTO',
    emoji: '🌐',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    hoverBorderColor: 'hover:border-emerald-400',
    bgColor: 'from-emerald-950/40 via-[#061e14] to-[#020b07]',
    shadowColor: 'rgba(16,185,129,0.25)',
    accentBadge: 'bg-emerald-950 text-emerald-300 border-emerald-500/40',
    items: [
      '🌚 Netflix 4K Private Slot 1M',
      '🌐 HMA Android/PC 20-30 Days',
      '🌐 ExpressVPN 3 Days',
      '🔐 NordVPN 10 Devices 3M',
      'Nord VPN 3M Activation Link',
      'Nord VPN 3 Month Shared',
      'Nord VPN 3 Month On Mail',
      '🍏 Spotify Individual 3M Activation Link',
      'Spotify Premium 3M',
      'Spotify 3M Redeem Link (Card Required)',
      'Amazon Prime Video 6M',
      'Amazon Prime 6 Month With Ads',
      'Crunchyroll Mega Fan 12M',
      'YouTube Premium 3 Months',
    ],
  },
  {
    id: 'redes_outros',
    name: 'REDES SOCIAIS E OUTROS SERVIÇOS',
    emoji: '📱',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    hoverBorderColor: 'hover:border-amber-400',
    bgColor: 'from-amber-950/40 via-[#1f1306] to-[#0a0601]',
    shadowColor: 'rgba(245,158,11,0.25)',
    accentBadge: 'bg-amber-950 text-amber-300 border-amber-500/40',
    items: [
      'LinkedIn Career 3M',
      'LinkedIn Career Premium 3 Months',
      'Link Disney Premium 7ESP Nupin',
      'Portugal WhatsApp OTP',
      'Intercom Advanced 12M',
      'Granola Business 12 Months',
      'Higgsfield Pro 12M',
      'Arto Pro 12M',
      'Supabase Pro 12M',
      'Hotmail Mail Accounts',
      'Wizpr Flow Pro 12M NW',
    ],
  },
];

export const ContasProPage: React.FC<ContasProPageProps> = ({
  onBack,
  contactConfig,
  soundEnabled = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const whatsappBaseUrl = `https://wa.me/${contactConfig.whatsappNumber.replace(/\D/g, '')}`;

  // Link geral para WhatsApp
  const generalWhatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(
    'Olá Crekoni, vi o catálogo de Contas Pro e gostaria de verificar disponibilidade e preços!'
  )}`;

  // Link para consultar item específico no WhatsApp
  const getItemWhatsAppUrl = (item: string) => {
    return `${whatsappBaseUrl}?text=${encodeURIComponent(
      `Olá Crekoni, vi no catálogo da Crekoni AI e gostaria de saber mais sobre: "${item}". Qual o valor e disponibilidade?`
    )}`;
  };

  // Filtra categorias e itens conforme a pesquisa e filtro selecionado
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return CATEGORIES_DATA.map((cat) => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return null;
      }

      if (!query) {
        return cat;
      }

      const matchingItems = cat.items.filter((item) =>
        item.toLowerCase().includes(query)
      );

      if (matchingItems.length === 0) {
        return null;
      }

      return {
        ...cat,
        items: matchingItems,
      };
    }).filter(Boolean) as ContaCategory[];
  }, [searchQuery, selectedCategory]);

  const totalMatchingItems = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  const totalAllItems = useMemo(() => {
    return CATEGORIES_DATA.reduce((acc, cat) => acc + cat.items.length, 0);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fade-in">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <button
          type="button"
          id="btn-back-to-home-from-contaspro"
          onClick={() => {
            playCyberTone('click', !soundEnabled);
            onBack();
          }}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>VOLTAR PARA PÁGINA PRINCIPAL</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Crown className="w-3.5 h-3.5 text-cyan-400" />
            <span>CONTAS PRO & APIS</span>
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>SERVIÇOS & LICENÇAS DIGITAIS VERIFICADAS</span>
        </div>

        <h1 className="font-orbitron font-extrabold text-2xl sm:text-4xl text-white tracking-wide">
          CONTAS PRO & APIS
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-mono leading-relaxed">
          Lista De Serviços de Contas Ativadas PRO, Clique no item desejado e consulte valores e ativação diretamente no WhatsApp. Valores Sofrem Alterações Diárias e Podem Não estar Disponíveis em Estoque.
        </p>

        {/* Search Bar & Quick Filters */}
        <div className="pt-2 max-w-2xl mx-auto space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar serviço (ex: Grok, Claude, Canva, CapCut, Duolingo, Netflix)..."
              className="w-full pl-10 pr-24 py-3 rounded-xl bg-[#080d19]/90 border border-cyan-500/40 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 text-white font-mono text-xs sm:text-sm placeholder:text-slate-500 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 rounded-md text-[10px] font-mono text-slate-400 hover:text-white bg-slate-800/80 cursor-pointer"
              >
                LIMPAR
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-1.5 pt-1">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                playCyberTone('click', !soundEnabled);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              TODAS ({totalAllItems})
            </button>
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  playCyberTone('click', !soundEnabled);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.6)] scale-105'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.name.split(' ')[0]}</span>
                <span className="sm:hidden">{cat.name.slice(0, 8)}...</span>
                <span className="text-[10px] opacity-75">({cat.items.length})</span>
              </button>
            ))}
          </div>

          {searchQuery && (
            <p className="text-xs font-mono text-cyan-400">
              Encontrados: <strong>{totalMatchingItems}</strong> serviços para &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
      </header>

      {/* Grade de Quadros Lado a Lado em Linhas (Conforme Solicitado) */}
      {filteredCategories.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-[#0a1120]/80 border border-slate-800 text-slate-400 font-mono space-y-3">
          <p className="text-sm">Nenhuma conta encontrada com o termo &ldquo;{searchQuery}&rdquo;.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono hover:bg-cyan-500/30 transition-all cursor-pointer"
          >
            Limpar filtros de pesquisa
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {filteredCategories.map((category, index) => {
            // Se for o 5º elemento e estiver no modo "all" com 5 categorias, pode ocupar largura total ou 1 coluna
            const isLastOdd =
              filteredCategories.length % 2 !== 0 &&
              index === filteredCategories.length - 1;

            return (
              <section
                key={category.id}
                className={`relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-gradient-to-br ${category.bgColor} border ${category.borderColor} ${category.hoverBorderColor} shadow-[0_0_25px_${category.shadowColor}] backdrop-blur-md overflow-hidden transition-all duration-300 ${
                  isLastOdd ? 'lg:col-span-2' : ''
                }`}
              >
                {/* HUD Corner Accents */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/30 pointer-events-none" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/30 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/30 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/30 pointer-events-none" />

                <div>
                  {/* Quadro Header: Emoji + Título */}
                  <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-white/[0.08]">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-black/40 border border-white/10 shrink-0">
                        <span className="text-2xl select-none">{category.emoji}</span>
                      </div>
                      <div>
                        <h2 className="font-orbitron font-bold text-sm sm:text-base text-white tracking-wide">
                          {category.name}
                        </h2>
                        <span className="text-[11px] font-mono text-slate-400">
                          {category.items.length} opções disponíveis
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Lista de Itens Dentro do Quadro (Clique redireciona para o WhatsApp sobre o item descrito) */}
                  <div
                    className={
                      isLastOdd
                        ? 'grid grid-cols-1 md:grid-cols-2 gap-2'
                        : 'space-y-1.5'
                    }
                  >
                    {category.items.map((item, idx) => (
                      <a
                        key={idx}
                        href={getItemWhatsAppUrl(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Clique para falar no WhatsApp sobre: ${item}`}
                        className="group flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl bg-black/40 hover:bg-emerald-950/40 border border-white/[0.06] hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <span className="text-cyan-400 group-hover:text-emerald-400 font-bold text-xs select-none mt-0.5 shrink-0 transition-colors">
                            •
                          </span>
                          {/* Texto todo do conteúdo informado visível (sem truncate, break-words) */}
                          <span className="font-mono text-xs sm:text-[13px] text-slate-200 group-hover:text-emerald-200 leading-relaxed break-words whitespace-normal transition-colors">
                            {item}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/25 border border-emerald-500/30 group-hover:border-emerald-400 text-emerald-400 font-mono text-[10px] font-bold transition-all">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                          <span className="hidden sm:inline">SABER MAIS</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* Banner de Aviso de Catálogo Atualizado (Conforme solicitado) */}
      <section className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/60 via-[#1f1008] to-orange-950/60 border-2 border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.25)] text-center space-y-4 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-32 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 font-mono text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>DISPONIBILIDADE EM TEMPO REAL</span>
        </div>

        <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide">
          🔥 CATÁLOGO ATUALIZADO – CONSULTE A DISPONIBILIDADE!
        </h3>

        <p className="text-xs sm:text-sm text-amber-100/90 font-mono max-w-2xl mx-auto leading-relaxed">
          Os estoques de contas, painéis e créditos de API são dinâmicos e atualizados frequentemente. Fale diretamente com o Crekoni para garantir o melhor preço, confirmar ativação e receber suporte personalizado.
        </p>

        {/* Big WhatsApp CTA Button (Solicitado: "E ABAIXO UM BOTAO PARA FALAR PELO WHATSAPP PARA VERIFICAR DISPONIBILIDADE E PREÇOS") */}
        <div className="pt-2 flex justify-center">
          <a
            id="btn-contaspro-whatsapp-principal"
            href={generalWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 rounded-2xl font-mono text-xs sm:text-sm font-black text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:from-emerald-300 hover:to-teal-200 border border-emerald-300 shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:shadow-[0_0_45px_rgba(16,185,129,0.85)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase tracking-wider"
          >
            <MessageCircle className="w-5 h-5 text-black fill-black/20 group-hover:scale-110 transition-transform" />
            <span>FALAR PELO WHATSAPP PARA VERIFICAR DISPONIBILIDADE E PREÇOS</span>
            <ExternalLink className="w-4 h-4 text-black/70 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};
