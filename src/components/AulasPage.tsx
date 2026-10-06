import React, { useState } from 'react';
import {
  ArrowLeft,
  Film,
  Play,
  X,
  Sparkles,
  ExternalLink,
  Mic,
  Globe,
} from 'lucide-react';

interface AulasPageProps {
  onBack: () => void;
}

interface SiteUsado {
  nome: string;
  url: string;
  colorClass?: string;
}

interface AulaItem {
  id: number;
  numero: string;
  badgeTopo: string;
  tags: { label: string; bgClass: string; textClass: string; borderClass: string }[];
  subinfo: string;
  titulo: string;
  descricao: string;
  videoEmbedUrl: string;
  sitesUsados: SiteUsado[];
}

export const AulasPage: React.FC<AulasPageProps> = ({ onBack }) => {
  const [selectedAula, setSelectedAula] = useState<AulaItem | null>(null);

  const aulas: AulaItem[] = [
    {
      id: 1,
      numero: '#1',
      badgeTopo: 'AULA PRÁTICA',
      tags: [
        { label: 'RunningHub', bgClass: 'bg-pink-950/80', textClass: 'text-pink-300', borderClass: 'border-pink-500/30' },
        { label: 'Nordy', bgClass: 'bg-cyan-950/80', textClass: 'text-cyan-300', borderClass: 'border-cyan-500/30' },
        { label: 'Passo a Passo', bgClass: 'bg-white/5', textClass: 'text-pink-400', borderClass: 'border-white/10' },
      ],
      subinfo: 'RunningHub • Nordy',
      titulo: 'Criando Contas Com Creditos No RunningHub',
      descricao:
        'Tutorial completo ensinando o procedimento detalhado para criar e configurar contas nos sites Nordy e RunningHub com créditos para execução dos seus workflows.',
      videoEmbedUrl:
        'https://odysee.com/%24/embed/%40CREKONI%3A9%2FAula-01-Como-Criar-Conta-nos-Sites-Nordy-e-Runninghub%3Ad?r=Du1MScs2qhpenuh9fhkyZkv5jEoUpS1d',
      sitesUsados: [
        {
          nome: 'PROTON EMAIL',
          url: 'https://account.proton.me/mail/signup',
          colorClass: 'bg-purple-950/70 hover:bg-purple-900 border-purple-500/40 text-purple-200 hover:text-white',
        },
        {
          nome: 'YAHOO EMAIL',
          url: 'https://login.yahoo.com/account/create?lang=pt-BR&src=ym&done=https%3A%2F%2Fbr.mail.yahoo.com%2F%3Fguce_referrer%3DaHR0cHM6Ly93d3cuYmluZy5jb20v%26guce_referrer_sig%3DAQAAAHo3yEw_OOALE1FUCDjokhN15hAZgl0MQy6UEksjfehmR7dhcpuVDrXm9Q_AErHMCgd9hKMa46nnR-uq5WGbQHyvx2QA-Udf7mGnbGFyP_ZnPXU5Q5JQQhHYfWJSr2v9F64SKjwaQ39zLfBPGgFOF5yPc7Fz6azOGeFVIEEvZY-G&specId=yidregsimplified',
          colorClass: 'bg-indigo-950/70 hover:bg-indigo-900 border-indigo-500/40 text-indigo-200 hover:text-white',
        },
        {
          nome: 'OUTLOOK',
          url: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=9199bf20-a13f-4107-85dc-02114787ef48&scope=https%3A%2F%2Foutlook.office.com%2F.default%20openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Foutlook.cloud.microsoft%2Fmail%2F&client-request-id=472015be-2759-b62d-1e99-b10b3db90d68&response_mode=fragment&client_info=1&clidata=1&prompt=select_account&nonce=01a0f146-eeed-7bd5-a5c4-f1e44f1b4d78&state=eyJpZCI6IjAxYTBmMTQ2LWVlZWQtNzkzYi1iZTJkLTNmZmY2YjM3YjBlZCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D%7CaHR0cHM6Ly9vdXRsb29rLmNsb3VkLm1pY3Jvc29mdC9tYWlsLw&claims=%7B%22id_token%22%3A%7B%22signin_state%22%3A%7B%22essential%22%3Afalse%7D%2C%22login_hint%22%3A%7B%22essential%22%3Afalse%7D%2C%22access_token%22%3A%7B%22xms_cc%22%3A%7B%22values%22%3A%5B%22CP1%22%5D%7D%7D%7D&x-client-SKU=msal.js.browser&x-client-VER=5.19.0&response_type=code&code_challenge=7h15RddA_oy8oZ6K3g6Ido_lK1_StEKg7fcpmUIlBeQ&code_challenge_method=S256',
          colorClass: 'bg-sky-950/70 hover:bg-sky-900 border-sky-500/40 text-sky-200 hover:text-white',
        },
        {
          nome: 'RUNNING HUB',
          url: 'https://www.runninghub.ai/pt-br',
          colorClass: 'bg-cyan-950/70 hover:bg-cyan-900 border-cyan-500/40 text-cyan-200 hover:text-white',
        },
      ],
    },
    {
      id: 2,
      numero: '#2',
      badgeTopo: 'AULA PRÁTICA',
      tags: [
        { label: 'Fish Audio', bgClass: 'bg-emerald-950/80', textClass: 'text-emerald-300', borderClass: 'border-emerald-500/30' },
        { label: 'Vozes IA', bgClass: 'bg-teal-950/80', textClass: 'text-teal-300', borderClass: 'border-teal-500/30' },
        { label: 'Ilimitado', bgClass: 'bg-purple-950/80', textClass: 'text-purple-300', borderClass: 'border-purple-500/30' },
      ],
      subinfo: 'Fish Audio • Vozes Ilimitadas',
      titulo: 'Criando Áudios Vozes Ilimitados Reais com FishAudio',
      descricao:
        'Aprenda o método prático para gerar áudios e vozes hiper-realistas ilimitadas de alta fidelidade no Fish Audio para utilizar nos seus vídeos e workflows de IA.',
      videoEmbedUrl:
        'https://odysee.com/%24/embed/%40CREKONI%3A9%2FAula-Criando-Audios-Vozes-Ilimitados-Reais%3A9?r=Du1MScs2qhpenuh9fhkyZkv5jEoUpS1d',
      sitesUsados: [
        {
          nome: 'FISH AUDIO',
          url: 'https://fish.audio/pt/app/text-to-speech/',
          colorClass: 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500/50 text-emerald-300 hover:text-white shadow-[0_0_12px_rgba(16,185,129,0.25)]',
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fadeIn">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <button
          type="button"
          id="btn-back-to-home-from-aulas"
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-pink-300 bg-pink-950/50 hover:bg-pink-900/70 border border-pink-500/40 hover:border-pink-400 shadow-[0_0_15px_rgba(244,63,94,0.15)] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>VOLTAR PARA PÁGINA PRINCIPAL</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-pink-300 bg-pink-950/60 border border-pink-500/40 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            <Film className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>VÍDEO AULAS PRÁTICAS</span>
          </span>
        </div>
      </div>

      {/* Hero Header Estilo CREKONI 3D */}
      <header className="text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-500/30 text-pink-300 text-xs font-mono mb-1 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
          <span>TREINAMENTOS PASSO A PASSO • 100% PRÁTICO</span>
        </div>

        <div className="relative inline-block w-full max-w-3xl mx-auto py-1">
          <div className="relative group flex flex-col items-center">
            <div className="relative px-1 py-0.5">
              <h1 className="relative font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.14em] sm:tracking-[0.16em] pl-[0.14em] sm:pl-[0.16em] chrome-3d-title leading-none uppercase">
                VÍDEO AULAS
              </h1>
              <div
                aria-hidden="true"
                className="absolute inset-0 px-1 py-0.5 font-orbitron font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.14em] sm:tracking-[0.16em] pl-[0.14em] sm:pl-[0.16em] leading-none chrome-flash-overlay pointer-events-none select-none uppercase"
              >
                VÍDEO AULAS
              </div>
            </div>

            {/* Linha de Subtítulo */}
            <div className="relative mt-3 sm:mt-4 flex items-center justify-center gap-2.5">
              <span className="hidden sm:block w-8 h-[1px] bg-gradient-to-r from-transparent via-pink-400/50 to-transparent" />
              <p className="font-display font-semibold text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-cyan-200 tracking-[0.18em] uppercase">
                Treinamentos e aulas práticas passo a passo Nordy, RunningHub e Ferramentas IA
              </p>
              <span className="hidden sm:block w-8 h-[1px] bg-gradient-to-l from-transparent via-cyan-400/50 to-transparent" />
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 font-mono max-w-2xl mx-auto">
          Aprenda a operar suas contas, gerar vozes hiper-realistas e utilizar os workflows profissionais com o máximo de eficiência e resultado.
        </p>
      </header>

      {/* Grid de Vídeo Aulas */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {aulas.map((aula) => (
          <div
            key={aula.id}
            className="relative group p-5 sm:p-6 rounded-2xl bg-[#140b18]/90 hover:bg-[#1b0e21] border border-pink-500/35 hover:border-pink-400/80 shadow-[0_0_25px_rgba(244,63,94,0.15)] hover:shadow-[0_0_35px_rgba(244,63,94,0.3)] transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Área de Capa do Vídeo com Botão Play (Abre a Pop Up para Assistir) */}
              <div
                onClick={() => setSelectedAula(aula)}
                className="relative aspect-video rounded-xl overflow-hidden border border-pink-500/50 shadow-[0_0_20px_rgba(244,63,94,0.25)] bg-gradient-to-br from-[#1c0c1e] via-[#100814] to-[#0a050d] cursor-pointer group/thumb select-none"
              >
                {/* Grid cibernético sutil de fundo */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(244, 63, 94, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(244, 63, 94, 0.15) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Sci-Fi HUD Corner Accents */}
                <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-pink-400 pointer-events-none z-10" />
                <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-pink-400 pointer-events-none z-10" />
                <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-pink-400 pointer-events-none z-10" />
                <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-pink-400 pointer-events-none z-10" />

                {/* Vinheta escura cibernética */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/45 pointer-events-none" />

                {/* Badge de Enumeração */}
                <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-pink-400/60 text-pink-300 font-mono font-bold text-xs shadow-[0_0_12px_rgba(244,63,94,0.5)] pointer-events-none">
                  <span className="text-pink-400 text-sm font-orbitron font-black">{aula.numero}</span>
                </div>

                {/* Badge Superior Direita */}
                <div className="absolute top-2.5 right-2.5 z-10 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-950/90 text-pink-300 border border-pink-500/50 shadow-[0_0_8px_rgba(244,63,94,0.4)] pointer-events-none">
                  {aula.badgeTopo}
                </div>

                {/* Botão Play centralizado */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 text-white flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.85)] group-hover/thumb:scale-110 transition-transform cursor-pointer border border-pink-200/40">
                    <Play className="w-6 h-6 ml-0.5 fill-current" />
                  </div>
                  <span className="mt-2.5 text-[11px] font-mono font-bold tracking-wider text-pink-200/90 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]">
                    CLIQUE PARA ASSISTIR
                  </span>
                </div>

                {/* Barra inferior da capa */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none text-[10px] font-mono">
                  <span className="text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    {aula.subinfo}
                  </span>
                  <span className="text-pink-300 bg-black/60 px-2 py-0.5 rounded border border-pink-500/30 flex items-center gap-1">
                    <Film className="w-3 h-3 text-pink-400" />
                    HD 1080p
                  </span>
                </div>
              </div>

              {/* Informações da Aula */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {aula.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono ${tag.bgClass} ${tag.textClass} border ${tag.borderClass}`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>

                <h2 className="mt-2 font-display font-bold text-lg text-white flex items-center gap-2">
                  <span className="font-mono text-pink-400 font-black">{aula.id}.</span>
                  <span>{aula.titulo}</span>
                </h2>

                <p className="text-xs text-slate-300 font-mono mt-1.5 leading-relaxed">
                  {aula.descricao}
                </p>
              </div>
            </div>

            {/* Botão de Ação */}
            <div className="mt-5 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
              <button
                type="button"
                id={`btn-open-aula-${aula.id}-modal`}
                onClick={() => setSelectedAula(aula)}
                className="w-full py-2.5 px-4 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)] active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>ASSISTIR AULA</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Modal / Lightbox em Modo Teatro para Assistir em Tela Maior */}
      {selectedAula && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedAula(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-[#0e0712] border border-pink-500/40 p-4 sm:p-6 shadow-[0_0_40px_rgba(244,63,94,0.3)] overflow-hidden space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-pink-950 text-pink-300 border border-pink-500/30">
                    AULA {selectedAula.numero}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    {selectedAula.subinfo}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base sm:text-xl text-white">
                  {selectedAula.titulo}
                </h3>
              </div>

              <button
                type="button"
                id="btn-close-aula-modal"
                onClick={() => setSelectedAula(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Iframe do Vídeo (Odysee) */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-pink-500/50 shadow-[0_0_25px_rgba(244,63,94,0.25)] bg-black">
              <iframe
                id="odysee-iframe"
                title={`${selectedAula.titulo} (Modo Expandido)`}
                style={{ width: '100%', aspectRatio: '16 / 9' }}
                src={selectedAula.videoEmbedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full aspect-video border-0"
              />
            </div>

            {/* Links dos Sites Usados na Aula */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-white/[0.08]">
              <div className="space-y-1.5 w-full sm:w-auto">
                <span className="text-[11px] font-mono font-bold tracking-wider text-pink-400 uppercase flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  SITES USADOS:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedAula.sitesUsados.map((site, index) => (
                    <a
                      key={index}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all group ${
                        site.colorClass ||
                        'bg-pink-950/70 hover:bg-pink-900 border-pink-500/40 text-pink-200 hover:text-white'
                      }`}
                    >
                      <span>{site.nome}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAula(null)}
                className="px-4 py-2 rounded-xl bg-pink-950/80 hover:bg-pink-900 border border-pink-500/40 text-pink-200 transition-all cursor-pointer font-mono text-xs font-bold shrink-0 self-end sm:self-auto"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
