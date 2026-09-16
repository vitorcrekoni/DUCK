import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  UploadCloud,
  FileCode2,
  Trash2,
  Download,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  Layers,
  Cpu,
  Eye,
  ExternalLink,
  Lock,
  Maximize2,
  X,
} from 'lucide-react';
import {
  decodeTtImageFile,
  TtDecodedItem,
  iconForFileType,
} from '../utils/ttImgDecoder';
import { formatBytes, playCyberTone } from '../utils/duckDecoder';
import ttDecoderImg from '../assets/images/decodificador_tt_img_1789523020842.jpg';

interface TtImgDecoderPageProps {
  onBack: () => void;
  soundEnabled: boolean;
}

interface SelectedFileWithPreview {
  id: string;
  file: File;
  previewUrl: string;
}

export const TtImgDecoderPage: React.FC<TtImgDecoderPageProps> = ({
  onBack,
  soundEnabled,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileWithPreview[]>([]);
  const [decodedResults, setDecodedResults] = useState<TtDecodedItem[]>([]);
  const [cropWatermark, setCropWatermark] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeZoomItem, setActiveZoomItem] = useState<TtDecodedItem | null>(null);

  // Progress tracking
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [progressText, setProgressText] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: 'info' | 'success' | 'error';
  }>({
    text: 'Pronto. Nenhuma imagem foi selecionada.',
    type: 'info',
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChooseFilesClick = () => {
    fileInputRef.current?.click();
  };

  const addFiles = (incoming: File[]) => {
    const images = incoming.filter((f) => f.type.startsWith('image/'));
    if (!images.length) {
      setStatusMessage({
        text: 'Nenhum arquivo de imagem válido foi selecionado.',
        type: 'error',
      });
      playCyberTone('error', !soundEnabled);
      return;
    }

    const uniqueFiles = images.filter(
      (newFile) =>
        !selectedFiles.some(
          (s) =>
            s.file.name === newFile.name &&
            s.file.size === newFile.size &&
            s.file.lastModified === newFile.lastModified
        )
    );

    if (!uniqueFiles.length) {
      setStatusMessage({
        text: 'Os arquivos selecionados já foram adicionados.',
        type: 'info',
      });
      return;
    }

    const newWrappers: SelectedFileWithPreview[] = uniqueFiles.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedFiles((prev) => [...prev, ...newWrappers]);
    setStatusMessage({
      text: `${uniqueFiles.length} imagem(ns) adicionada(s) à fila.`,
      type: 'info',
    });
    playCyberTone('click', !soundEnabled);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleRemoveFile = (id: string) => {
    setSelectedFiles((prev) => {
      const filtered = prev.filter((item) => {
        if (item.id === id) {
          URL.revokeObjectURL(item.previewUrl);
          return false;
        }
        return true;
      });
      return filtered;
    });
    playCyberTone('click', !soundEnabled);
  };

  const handleClearAll = () => {
    selectedFiles.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    decodedResults.forEach((item) => URL.revokeObjectURL(item.blobUrl));
    setSelectedFiles([]);
    setDecodedResults([]);
    setProgressPercent(0);
    setProgressText('');
    setStatusMessage({
      text: 'Pronto. Nenhuma imagem foi selecionada.',
      type: 'info',
    });
    playCyberTone('click', !soundEnabled);
  };

  const handleDecodeAll = async () => {
    if (!selectedFiles.length || isProcessing) return;

    setIsProcessing(true);
    playCyberTone('click', !soundEnabled);
    setProgressPercent(0);
    setProgressText('Inicializando motor V1...');

    const recoveredItems: TtDecodedItem[] = [];
    let ok = 0;
    let failed = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const item = selectedFiles[i];
      const percent = Math.round((i / selectedFiles.length) * 100);
      setProgressPercent(percent);
      setProgressText(`Decodificando ${item.file.name}...`);

      try {
        const result = await decodeTtImageFile(item.file, cropWatermark);
        if (result) {
          recoveredItems.push(result);
          ok++;
        } else {
          failed++;
        }
      } catch (err) {
        console.error('Erro na decodificação:', err);
        failed++;
      }

      const nextPercent = Math.round(((i + 1) / selectedFiles.length) * 100);
      setProgressPercent(nextPercent);
      setProgressText(`${i + 1} de ${selectedFiles.length} processado(s)`);

      // Breve pausa para UI respirar e atualizar o render
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    setDecodedResults((prev) => [...recoveredItems, ...prev]);
    setIsProcessing(false);

    if (ok > 0 && failed === 0) {
      setStatusMessage({
        text: `${ok} arquivo(s) decodificado(s) com sucesso!`,
        type: 'success',
      });
      playCyberTone('success', !soundEnabled);
    } else if (ok > 0 && failed > 0) {
      setStatusMessage({
        text: `${ok} decodificado(s) e ${failed} não encontrado(s).`,
        type: 'info',
      });
      playCyberTone('success', !soundEnabled);
    } else {
      setStatusMessage({
        text: 'Nenhum arquivo oculto reconhecido foi encontrado. Verifique se a imagem foi codificada pelo formato V1 compatível.',
        type: 'error',
      });
      playCyberTone('error', !soundEnabled);
    }
  };

  const handleDownloadItem = (item: TtDecodedItem) => {
    const url = item.blobUrl;
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    playCyberTone('click', !soundEnabled);
  };

  const handleDownloadAll = async () => {
    if (!decodedResults.length) return;
    playCyberTone('click', !soundEnabled);
    for (const item of decodedResults) {
      handleDownloadItem(item);
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fade-in">
      {/* Barra de Navegação Superior / Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <button
          type="button"
          id="btn-back-to-home-from-ttimg"
          onClick={onBack}
          className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>VOLTAR PARA PÁGINA PRINCIPAL</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-amber-300 bg-amber-950/70 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>TT-IMG DECODER V1</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono text-emerald-300 bg-emerald-950/70 border border-emerald-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>ONLINE</span>
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <span>🔓 DECODIFICADOR V1</span>
        </div>

        <h1 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white tracking-wide flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-[0_0_15px_rgba(245,158,11,0.4)]">
            TT-IMG DECODER
          </span>
          <span className="text-xs sm:text-sm font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
            V1
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 font-mono leading-relaxed">
          Extraia arquivos ocultos em imagens usando processamento local no navegador. Compatível com a leitura esteganográfica V1 RGB e escala de cinza.
        </p>
      </header>

      {/* Card Principal de Seleção e Controle */}
      <section className="relative rounded-2xl bg-[#0d121c]/90 border border-amber-500/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-5 sm:p-7 overflow-hidden">
        {/* Retículas HUD nos cantos */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

        {/* Drop Zone */}
        <div
          id="tt-drop-zone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleChooseFilesClick}
          className={`relative border-2 border-dashed rounded-xl min-h-[220px] sm:min-h-[240px] flex flex-col items-center justify-center text-center p-6 sm:p-8 cursor-pointer transition-all duration-200 select-none ${
            isDragging
              ? 'border-amber-400 bg-amber-950/40 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
              : 'border-[#2f3d53] hover:border-amber-400/80 bg-[#090e17]/80 hover:bg-[#0c131f]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/bmp"
            multiple
            onChange={handleFileInputChange}
            className="hidden"
          />

          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-amber-500/15 border border-amber-400/40 text-amber-300 mb-3 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h2 className="text-base sm:text-lg font-display font-bold text-white mb-1">
            Clique ou arraste as imagens aqui
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-mono mb-4">
            Vários arquivos são aceitos (PNG, JPG, WEBP, BMP)
          </p>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleChooseFilesClick();
            }}
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-amber-200 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 hover:border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all cursor-pointer"
          >
            Selecionar imagens
          </button>
        </div>

        {/* Opção: Remover marca-d'água */}
        <div className="mt-5 p-4 rounded-xl bg-[#090e17] border border-[#253246]">
          <label className="flex items-center justify-between gap-4 cursor-pointer select-none">
            <div className="flex-1">
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Remover marca-d'água</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/30">
                  CROP 20%
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-1 leading-relaxed">
                Ignora os 20% superiores e os 20% inferiores da imagem durante a leitura esteganográfica.
              </p>
            </div>

            {/* Futuristic Switch Toggle */}
            <div className="relative inline-flex items-center shrink-0">
              <input
                type="checkbox"
                checked={cropWatermark}
                onChange={(e) => {
                  setCropWatermark(e.target.checked);
                  playCyberTone('click', !soundEnabled);
                }}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-[#1e293b] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 peer-checked:after:bg-black peer-checked:after:border-amber-300 shadow-inner" />
            </div>
          </label>
        </div>

        {/* Toolbar de Ações */}
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <button
            type="button"
            id="btn-tt-decode"
            onClick={handleDecodeAll}
            disabled={selectedFiles.length === 0 || isProcessing}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Cpu className="w-4 h-4 animate-spin text-black" />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <span>🔍 Decodificar imagens</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="btn-tt-clear"
            onClick={handleClearAll}
            disabled={(selectedFiles.length === 0 && decodedResults.length === 0) || isProcessing}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-mono font-medium text-slate-300 hover:text-white bg-transparent hover:bg-white/[0.05] border border-[#303d51] hover:border-slate-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Limpar</span>
          </button>
        </div>

        {/* Contador de Seleção */}
        <div className="mt-4 text-xs font-mono text-slate-400">
          {selectedFiles.length} arquivo{selectedFiles.length === 1 ? '' : 's'} selecionado{selectedFiles.length === 1 ? '' : 's'}
        </div>

        {/* Lista de Arquivos Selecionados */}
        {selectedFiles.length > 0 && (
          <div className="mt-3 grid gap-2 max-h-60 overflow-y-auto pr-1">
            {selectedFiles.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#090e17] border border-[#222e3e]"
              >
                <img
                  src={item.previewUrl}
                  alt={item.file.name}
                  className="w-11 h-11 object-cover rounded-lg bg-black/40 border border-white/10 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm font-medium text-white truncate">
                    {item.file.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    {formatBytes(item.file.size)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(item.id)}
                  disabled={isProcessing}
                  title="Remover imagem"
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Barra de Progresso */}
        {isProcessing && (
          <div className="mt-5 p-4 rounded-xl bg-[#090e17] border border-amber-500/40 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-2">
              <span>{progressText || 'Processando...'}</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#17202d] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-200"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Mensagem de Status */}
        <div
          className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm font-mono flex items-center gap-2.5 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-500/40'
              : statusMessage.type === 'error'
              ? 'bg-rose-950/50 text-rose-300 border border-rose-500/40'
              : 'bg-[#101c2b] text-cyan-300 border border-cyan-500/30'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : statusMessage.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      </section>

      {/* Card de Resultados */}
      <section className="relative rounded-2xl bg-[#0d121c]/90 border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase">
              RESULTADOS
            </span>
            <h2 className="text-lg sm:text-xl font-orbitron font-bold text-white flex items-center gap-2">
              <span>📦 Arquivos decodificados</span>
              {decodedResults.length > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30">
                  {decodedResults.length}
                </span>
              )}
            </h2>
          </div>

          <button
            type="button"
            id="btn-tt-download-all"
            onClick={handleDownloadAll}
            disabled={decodedResults.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-amber-200 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 hover:border-amber-300 disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>💾 Baixar todos</span>
          </button>
        </div>

        {decodedResults.length === 0 ? (
          <div className="min-h-[160px] flex flex-col items-center justify-center text-center p-6 border border-dashed border-[#2b3748] rounded-xl text-slate-400 font-mono">
            <div className="text-3xl mb-2">📭</div>
            <p className="text-xs sm:text-sm">Os arquivos recuperados aparecerão aqui após a decodificação.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {decodedResults.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#090e17] border border-amber-500/30 hover:border-amber-400/80 shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all duration-300 p-3.5"
              >
                {/* Retículas HUD nos cantos do quadrado */}
                <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400/60 pointer-events-none" />
                <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-400/60 pointer-events-none" />
                <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400/60 pointer-events-none" />
                <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400/60 pointer-events-none" />

                {/* Quadrado da Imagem (Aspect Square) */}
                <div
                  onClick={() => {
                    if (item.isImage) {
                      setActiveZoomItem(item);
                      playCyberTone('click', !soundEnabled);
                    }
                  }}
                  className={`relative w-full aspect-square rounded-xl overflow-hidden bg-black/80 border border-white/10 group-hover:border-amber-500/40 flex items-center justify-center transition-colors ${
                    item.isImage ? 'cursor-pointer' : ''
                  }`}
                >
                  {item.isImage ? (
                    <>
                      <img
                        src={item.blobUrl}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-amber-950/90 text-amber-200 border border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Ampliar</span>
                        </span>
                      </div>
                    </>
                  ) : item.isVideo ? (
                    <video
                      src={item.blobUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-4xl mb-2">{iconForFileType(item.type)}</span>
                      <span className="text-xs font-mono font-bold uppercase text-amber-300 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/40">
                        {item.ext}
                      </span>
                    </div>
                  )}

                  {/* Badges Flutuantes sobre o Quadrado */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider text-amber-200 bg-black/80 border border-amber-500/50 shadow-md backdrop-blur-sm uppercase">
                      {item.ext}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 flex items-center gap-1 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-200 bg-black/80 border border-white/15 shadow-md backdrop-blur-sm">
                      {formatBytes(item.bytes)}
                    </span>
                  </div>
                </div>

                {/* Metadados Abaixo do Quadrado */}
                <div className="mt-3 space-y-1">
                  <div
                    className="text-xs sm:text-sm font-semibold text-white truncate group-hover:text-amber-200 transition-colors"
                    title={item.name}
                  >
                    {item.name}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 truncate" title={`Origem: ${item.originalFileName}`}>
                    <span className="text-slate-500">De:</span>{' '}
                    <span className="text-emerald-400">{item.originalFileName}</span>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadItem(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold text-amber-200 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 hover:border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)] transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar</span>
                  </button>

                  {item.isImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveZoomItem(item);
                        playCyberTone('click', !soundEnabled);
                      }}
                      title="Ampliar visualização"
                      className="p-2 rounded-xl text-slate-300 hover:text-amber-200 bg-white/[0.04] hover:bg-amber-950/50 border border-white/10 hover:border-amber-500/40 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal de Zoom da Imagem */}
      {activeZoomItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
          onClick={() => setActiveZoomItem(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-[#090e17] border border-amber-500/50 rounded-2xl p-4 sm:p-6 flex flex-col shadow-[0_0_40px_rgba(245,158,11,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-white/10">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-white truncate font-mono">
                  {activeZoomItem.name}
                </h3>
                <p className="text-xs text-amber-300 font-mono">
                  {formatBytes(activeZoomItem.bytes)} • {activeZoomItem.ext.toUpperCase()} • Origem: {activeZoomItem.originalFileName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadItem(activeZoomItem)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-amber-200 bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveZoomItem(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Imagem Ampliada */}
            <div className="flex-1 overflow-auto flex items-center justify-center rounded-xl bg-black/80 border border-white/10 p-2 max-h-[70vh]">
              <img
                src={activeZoomItem.blobUrl}
                alt={activeZoomItem.name}
                className="max-w-full max-h-[68vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Seção de Privacidade e Processamento Local */}
      <section className="p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-[#090e17] text-slate-300 flex items-start gap-3">
        <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm font-mono space-y-1">
          <strong className="text-white block">🔒 Processamento local no navegador</strong>
          <p className="text-slate-400 leading-relaxed">
            As imagens são processadas diretamente na memória do seu navegador através da Canvas API e TypedArrays. Nenhum dado, imagem ou arquivo recuperado é enviado para servidores externos.
          </p>
        </div>
      </section>

      {/* Footer minimalista do motor */}
      <footer className="text-center text-xs font-mono text-slate-500 pt-2 pb-6">
        Decodificador independente • V1 LSB Local (RGB + Gray) • Sem dependência externa
      </footer>
    </div>
  );
};
