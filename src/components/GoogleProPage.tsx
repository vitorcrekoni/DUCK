import React, { useState } from 'react';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  MessageCircle,
  ExternalLink,
  HardDrive,
  Video,
  Bot,
  FileText,
  Mail,
  Calendar,
  Layers,
  Code2,
  Gift,
  CheckCircle2,
  Lock,
  Clock,
  TrendingUp,
  Palette,
  Award,
  Check,
  Copy,
  Info,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { ContactConfig } from '../types';
import { playCyberTone } from '../utils/duckDecoder';

interface GoogleProPageProps {
  onBack: () => void;
  contactConfig: ContactConfig;
  soundEnabled?: boolean;
}

export const GoogleProPage: React.FC<GoogleProPageProps> = ({
  onBack,
  contactConfig,
  soundEnabled = true,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const cleanNumber = contactConfig.whatsappNumber.replace(/\D/g, '') || '5544991840305';
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'Olá! Tenho interesse na Conta Google AI Pro 18 Meses por R$ 20,00. Como faço para ativar?'
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    playCyberTone('success', !soundEnabled);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleWhatsAppClick = () => {
    playCyberTone('click', !soundEnabled);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10 animate-fade-in text-white">
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <button
          type="button"
          id="btn-back-to-home-from-googlepro"
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
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
            title="Copiar link da página"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Link Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Compartilhar</span>
              </>
            )}
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>OFERTA LIMITADA</span>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO SECTION: OFERTA ESPECIAL GOOGLE AI PRO                               */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-[#070b16] via-[#091124] to-[#0d091a] p-6 sm:p-10 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
        {/* Glows de Fundo */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-purple-600/20 blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

        {/* Retículas HUD nos cantos */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-blue-400/60 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-blue-400/60 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-blue-400/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-blue-400/60 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Lado Esquerdo: Título, Proposta e Recursos Principais */}
          <div className="lg:col-span-7 space-y-5">
            {/* Tag Oferta Especial */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>OFERTA ESPECIAL EXCLUSIVA</span>
            </div>

            {/* Título Principal */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
                  GOOGLE
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  AI PRO
                </span>
              </h1>
              <p className="mt-2 text-xl sm:text-2xl font-bold font-display text-emerald-300 tracking-wide flex items-center gap-2 flex-wrap">
                <span>ACESSO POR 18 MESES</span>
                <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  18 MESES COMPLETOS
                </span>
              </p>
            </div>

            {/* Descrição */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-xl">
              Inteligência Artificial de última geração do Google para estudar, trabalhar e criar sem limites!
              Acesse os modelos mais poderosos, geração avançada de vídeos com <strong className="text-cyan-300">Veo 3</strong>, automações no <strong className="text-purple-300">Google Flow</strong>, <strong className="text-amber-300">Gemini Pro</strong> e <strong className="text-emerald-300">5 TB de armazenamento na nuvem</strong>.
            </p>

            {/* Badges de Destaque Visual */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-black/40 border border-blue-500/30 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">5 TB</div>
                  <div className="text-[10px] text-slate-400">Nuvem Google</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-purple-500/30 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shrink-0">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">VEO 3 + IMAGEN</div>
                  <div className="text-[10px] text-slate-400">Vídeos & Imagens</div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-black/40 border border-emerald-500/30 flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono">1.000 CRÉDITOS</div>
                  <div className="text-[10px] text-slate-400">Mensais no Flow</div>
                </div>
              </div>
            </div>

            {/* Ativação Segura */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Ativação na sua própria conta</span>
              </div>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Lock className="w-4 h-4" />
                <span>Sem compartilhamento de senha</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Caixa de Preço e Ação Direta */}
          <div className="lg:col-span-5">
            <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#11192e] to-[#090e1a] border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.25)] flex flex-col justify-between space-y-6">
              {/* Badge no topo do card */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                  PAGAMENTO ÚNICO
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Sem renovação oculta
                </span>
              </div>

              {/* Preço */}
              <div className="space-y-1">
                <div className="text-xs sm:text-sm font-mono text-slate-400 line-through flex items-center gap-2">
                  <span>DE R$ 1.745,00</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-950/80 text-red-300 border border-red-500/30">
                    -98% OFF
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">POR APENAS:</div>
                <div className="flex items-baseline gap-1 text-emerald-400">
                  <span className="text-2xl sm:text-3xl font-display font-bold">R$</span>
                  <span className="text-5xl sm:text-6xl font-display font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    20<span className="text-3xl font-normal text-emerald-400">,00</span>
                  </span>
                </div>
                <div className="text-xs font-mono text-emerald-300/90 pt-1">
                  Acesso completo por 18 meses (1 ano e meio)
                </div>
              </div>

              {/* Destaque 18 Meses */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/70 to-blue-950/70 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">⏳</span>
                  <div>
                    <div className="text-xs font-bold text-white font-mono">18 MESES ATIVO</div>
                    <div className="text-[11px] text-slate-300">Tempo de uso integral (18 meses)</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-500/40">
                  INDIVIDUAL
                </span>
              </div>

              {/* Botão de Chamada para Ação WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                id="btn-buy-google-pro-whatsapp"
                className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-black font-display font-extrabold text-base sm:text-lg tracking-wide shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-6 h-6 fill-black shrink-0 group-hover:scale-110 transition-transform" />
                <span>APROVEITE AGORA!</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <p className="text-center text-[11px] font-mono text-slate-400">
                Ativação rápida e suporte direto com Vitor Crekoni via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VITRINE VISUAL: GOOGLE, FLOW, VEO 3 E GEMINI                              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080d1a] p-6 sm:p-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-blue-300 bg-blue-950/60 border border-blue-500/40">
            <span>MOTOR MULTIMODAL UNIFICADO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            As Tecnologias Mais Avançadas do Google
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Acesso integrado às quatro potências que lideram a revolução da inteligência artificial
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Google Gemini */}
          <div className="relative group p-5 rounded-2xl bg-gradient-to-b from-[#0e1629] to-[#090d18] border border-blue-500/30 hover:border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/30 to-indigo-600/20 border border-blue-400/50 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(59,130,246,0.3)] mb-4 group-hover:scale-105 transition-transform">
              ✨
            </div>
            <div className="text-xs font-mono font-bold text-blue-400 mb-1">INTELIGÊNCIA MULTIMODAL</div>
            <h3 className="text-lg font-bold text-white mb-2">Gemini Pro</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Resolução de problemas complexos, raciocínio lógico avançado, análise de grandes volumes de dados e código sem limitações.
            </p>
          </div>

          {/* Card 2: Google Flow */}
          <div className="relative group p-5 rounded-2xl bg-gradient-to-b from-[#180e29] to-[#0d0918] border border-purple-500/30 hover:border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-600/20 border border-purple-400/50 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(168,85,247,0.3)] mb-4 group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div className="text-xs font-mono font-bold text-purple-400 mb-1">PIPELINES CRIATIVOS</div>
            <h3 className="text-lg font-bold text-white mb-2">Google Flow</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Crie fluxos de trabalho autônomos, conecte modelos de IA, encadeie prompts e automatize rotinas inteiras com 1.000 créditos/mês inclusos.
            </p>
          </div>

          {/* Card 3: Veo 3 Video AI */}
          <div className="relative group p-5 rounded-2xl bg-gradient-to-b from-[#241118] to-[#12090d] border border-pink-500/30 hover:border-pink-400 shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:shadow-[0_0_25px_rgba(244,63,94,0.3)] transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-600/20 border border-pink-400/50 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(244,63,94,0.3)] mb-4 group-hover:scale-105 transition-transform">
              🎬
            </div>
            <div className="text-xs font-mono font-bold text-pink-400 mb-1">CINEMATOGRAFIA IA</div>
            <h3 className="text-lg font-bold text-white mb-2">Veo 3 & Vídeo</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Geração de vídeos em alta definição e fidelidade visual cinematográfica, controle de câmera, iluminação e movimentos ultra-realistas.
            </p>
          </div>

          {/* Card 4: Google Cloud 5 TB */}
          <div className="relative group p-5 rounded-2xl bg-gradient-to-b from-[#0b1b1c] to-[#071012] border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-teal-600/20 border border-cyan-400/50 flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(6,182,212,0.3)] mb-4 group-hover:scale-105 transition-transform">
              ☁️
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400 mb-1">ARMAZENAMENTO MASSIVO</div>
            <h3 className="text-lg font-bold text-white mb-2">5 TB na Nuvem</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Espaço gigantesco no Google Drive para guardar renders pesados, projetos em 4K, modelos, backups e arquivos sem se preocupar com espaço.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TUDO O QUE VOCÊ TEM ACESSO: GRADE COMPLETA (BASEADA NA IMAGEM)            */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-white/[0.08]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              ECOSSISTEMA INTEGRADO
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
              Tudo o que Você Tem Acesso no Plano Pro
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Ativado diretamente na sua conta individual
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Item 1 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f1d] border border-blue-500/25 hover:border-blue-400/60 transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-xl shrink-0">
              ✨
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Gemini Pro</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Recursos avançados de IA para redação, pesquisa, análise profunda de documentos e conversação inteligente.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f1d] border border-pink-500/25 hover:border-pink-400/60 transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-xl shrink-0">
              🎨
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Geração de Imagens e Vídeos</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Criação visual de alta definição com Veo 3 e Imagen 3 através de comandos simples em linguagem natural.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f1d] border border-purple-500/25 hover:border-purple-400/60 transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-xl shrink-0">
              ⚡
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Google Flow</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Ambiente de montagem de fluxos e nós de inteligência artificial com 1.000 créditos mensais já inclusos.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f1d] border border-amber-500/25 hover:border-amber-400/60 transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shrink-0">
              📑
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">NotebookLM</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Seu copiloto de anotações e pesquisas. Sintetiza PDFs, notas, livros e gera áudios e resumos instantâneos.
              </p>
            </div>
          </div>

          {/* Item 5 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f1d] border border-cyan-500/25 hover:border-cyan-400/60 transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-xl shrink-0">
              💻
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Ferramentas de Criação & Dev</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Assistência e geração de código em Python, JavaScript, TypeScript, automações e depuração rápida.
              </p>
            </div>
          </div>

          {/* Item 6 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f1d] border border-emerald-500/25 hover:border-emerald-400/60 transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-xl shrink-0">
              💾
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Google Drive (5 TB)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Capacidade massiva para armazenar vídeos, fotos em resolução total, arquivos raw e dados de projetos.
              </p>
            </div>
          </div>

          {/* Item 7 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f1d] border border-blue-500/25 hover:border-blue-400/60 transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-xl shrink-0">
              📝
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Documentos Inteligentes (Docs)</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Escrita assistida no Google Docs com geração de rascunhos, revisão de tom, tradução e reescrita fluida.
              </p>
            </div>
          </div>

          {/* Item 8 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f1d] border border-rose-500/25 hover:border-rose-400/60 transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-xl shrink-0">
              ✉️
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Gmail com IA</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Escreva respostas formais ou informais em segundos, resuma tópicos longos de conversas e priorize mensagens.
              </p>
            </div>
          </div>

          {/* Item 9 */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0a0f1d] border border-indigo-500/25 hover:border-indigo-400/60 transition-all flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-xl shrink-0">
              📅
            </div>
            <div>
              <h4 className="font-bold text-white text-sm sm:text-base">Google Agenda Inteligente</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Otimização inteligente de horários, preparação automática para reuniões e integração com as tarefas do dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DESTAQUE DE CRÉDITOS MENSAIS E VANTAGENS                                  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bloco de Créditos */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/60 via-[#130d24] to-[#0c0918] border border-purple-500/40 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-3xl shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            🎁
          </div>
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-purple-400 tracking-wider uppercase">
              BÔNUS RECORRENTE
            </div>
            <div className="text-2xl sm:text-3xl font-display font-black text-white">
              +1.000 CRÉDITOS / MÊS
            </div>
            <p className="text-xs text-slate-300">
              1.000 créditos mensais renovados para rodar automações e gerações no Google Flow.
            </p>
          </div>
        </div>

        {/* Bloco 5 TB de Armazenamento */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/60 via-[#0a1824] to-[#071118] border border-cyan-500/40 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-3xl shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            ☁️
          </div>
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase">
              ESPAÇO INFINITO
            </div>
            <div className="text-2xl sm:text-3xl font-display font-black text-white">
              5 TB NA SUA NUVEM
            </div>
            <p className="text-xs text-slate-300">
              Espaço compartilhado entre Drive, Gmail e Fotos para nunca mais ver o aviso de armazenamento cheio.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* COMO FUNCIONA A ATIVAÇÃO & SEGURANÇA TOTAL                                 */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#090e1a] border border-white/[0.08] space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
            Segurança, Privacidade e Ativação Descomplicada
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Processo 100% oficial e individual. Você mantém o controle total da sua conta Google.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-lg">
              ⚡
            </div>
            <h4 className="font-bold text-white text-sm">Ativação na sua Conta Google</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              O acesso individual é habilitado diretamente no seu próprio e-mail Google, sem precisar de e-mails aleatórios.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-cyan-500/30 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-lg">
              🔒
            </div>
            <h4 className="font-bold text-white text-sm">Sem Compartilhamento de Senha</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Você NUNCA precisa fornecer sua senha. Sua privacidade, dados pessoais e arquivos continuam 100% protegidos.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-blue-500/30 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 text-lg">
              ✉️
            </div>
            <h4 className="font-bold text-white text-sm">Receba seu Acesso por E-mail</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instruções simples, didáticas e imediatas enviadas após a confirmação do pagamento.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PILARES: MAIS PRODUTIVIDADE, CRIATIVIDADE E RESULTADOS                    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-[#090e1a] border border-cyan-500/30 flex items-center justify-center gap-3">
          <TrendingUp className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="font-display font-bold text-sm text-cyan-200">MAIS PRODUTIVIDADE</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#090e1a] border border-purple-500/30 flex items-center justify-center gap-3">
          <Palette className="w-5 h-5 text-purple-400 shrink-0" />
          <span className="font-display font-bold text-sm text-purple-200">MAIS CRIATIVIDADE</span>
        </div>
        <div className="p-4 rounded-2xl bg-[#090e1a] border border-emerald-500/30 flex items-center justify-center gap-3">
          <Award className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-display font-bold text-sm text-emerald-200">MAIS RESULTADOS</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TABELAS LADO A LADO: RECURSOS INCLUSOS vs CONDIÇÕES DA OFERTA             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Recursos Inclusos */}
        <div className="p-6 rounded-2xl bg-[#080d19] border border-blue-500/30 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>RECURSOS INCLUSOS</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              <span>Gemini com recursos avançados de IA</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              <span>5 TB de armazenamento na nuvem</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              <span>Google Flow com pipeline de automações</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              <span>Geração de imagens e vídeos com IA (Veo 3 & Imagen 3)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              <span>NotebookLM para pesquisa e síntese de fontes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              <span>Ferramentas avançadas para produtividade</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              <span>Recursos de IA para criação e programação</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              <span>1.000 créditos mensais no Google Flow*</span>
            </li>
          </ul>
        </div>

        {/* Condições da Oferta */}
        <div className="p-6 rounded-2xl bg-[#080d19] border border-amber-500/30 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Info className="w-4 h-4 text-amber-400" />
              <span>CONDIÇÕES DA OFERTA</span>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✔</span>
                <span>Acesso válido por 18 meses completos*</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✔</span>
                <span>5 TB de armazenamento na nuvem*</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✔</span>
                <span>Ativação vinculada à conta Google informada*</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✔</span>
                <span>Recursos sujeitos às condições e limites do serviço</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400">✔</span>
                <span>Disponibilidade de recursos pode variar conforme região e conta</span>
              </li>
            </ul>
          </div>

          {/* Suporte Dedicado */}
          <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">⚡</span>
              <div>
                <div className="text-xs font-bold text-white font-mono">SUPORTE DEDICADO</div>
                <div className="text-[10px] text-slate-400">Atendimento e ativação direta via WhatsApp</div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
              100% SEGURO
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BANNER CTA FINAL: WHATSAPP DIRETO                                         */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-[#0a1820] via-[#091e1d] to-[#071317] p-6 sm:p-10 text-center space-y-6 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40">
            <span>ÚLTIMAS VAGAS COM VALOR PROMOCIONAL</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
            Adquira Sua Conta Google AI Pro por R$ 20,00
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Acesso completo por 18 meses com 5 TB, Veo 3, Gemini Pro e 1.000 créditos Flow mensais.
            Pagamento único via PIX com ativação rápida e suporte direto.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-display font-extrabold text-base shadow-[0_0_25px_rgba(16,185,129,0.6)] transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-black" />
            <span>FALAR NO WHATSAPP</span>
          </a>

          <button
            type="button"
            onClick={() => {
              playCyberTone('click', !soundEnabled);
              onBack();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 font-mono text-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Menu</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* AVISO LEGAL & DISCLAIMER (IGUAL À IMAGEM)                                  */}
      {/* ========================================================================= */}
      <footer className="pt-4 border-t border-white/[0.08] text-center text-[11px] font-mono text-slate-500 space-y-2">
        <p>
          *Oferta comercial independente. Google, Gemini, Google Drive, Flow, Veo e demais marcas mencionadas pertencem aos seus respectivos proprietários.
        </p>
        <p>
          Recursos, limites e disponibilidade estão sujeitos às condições do serviço e da conta informada.
        </p>
      </footer>
    </div>
  );
};
