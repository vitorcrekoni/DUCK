import React, { useState } from 'react';
import {
  Download,
  AlertTriangle,
  FileCheck,
  FileVideo,
  FileAudio,
  FileText,
  FileCode,
  File,
  ExternalLink,
  Maximize2,
  X,
  Clock,
  Cpu,
  HardDrive,
  Copy,
  Check,
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';
import { DecodedResult } from '../types';
import { formatBytes, downloadBlob } from '../utils/duckDecoder';

interface DecodedItemCardProps {
  item: DecodedResult;
  onRemove: (id: string) => void;
  onUnlock?: (id: string, password: string) => Promise<void>;
}

export const DecodedItemCard: React.FC<DecodedItemCardProps> = ({ item, onRemove, onUnlock }) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState('');

  const downloadFileName = `${item.originalFileName.replace(/\.png$/i, '')}_decoded.${item.extractedExt}`;

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadBlob(item.blobUrl, downloadFileName);
  };

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(downloadFileName);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleUnlockSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!password.trim()) {
      setUnlockError('Digite a senha do arquivo.');
      return;
    }
    if (!onUnlock) return;
    setIsUnlocking(true);
    setUnlockError('');
    try {
      await onUnlock(item.id, password.trim());
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Falha ao descriptografar.';
      setUnlockError(msg);
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <>
      <div
        id={`decoded-item-${item.id}`}
        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#0b0f19] p-4 transition-all duration-200 hover:border-cyan-500/30 hover:shadow-[0_4px_20px_rgba(6,182,212,0.12)]"
      >
        {/* Subtle corner reticles */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-white/20" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-white/20" />

        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0 flex-1">
            <h3
              className="text-xs font-mono font-medium text-slate-200 truncate"
              title={item.originalFileName}
            >
              {item.originalFileName}
            </h3>
            <p className="text-[10px] font-mono text-slate-500 mt-0.5">
              Original: {formatBytes(item.originalFileSize)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            title="Remover item"
            className="p-1 text-slate-500 hover:text-slate-300 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Preview / Status */}
        <div className="relative my-2 rounded-lg overflow-hidden bg-[#07090e] border border-white/[0.06] flex items-center justify-center min-h-[170px] max-h-[260px]">
          {item.status === 'processing' && (
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <div className="w-7 h-7 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono text-cyan-300 animate-pulse">
                Varrendo bits LSB (2·6·8)...
              </span>
            </div>
          )}

          {item.status === 'requires-password' && (
            <div className="w-full p-4 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-2 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                <Key className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 mb-1">
                Requer Senha
              </span>
              <p className="text-[11px] font-mono text-amber-300/80 mb-3 leading-tight max-w-[220px]">
                {item.errorMessage || 'Arquivo esteganográfico protegido.'}
              </p>

              <form onSubmit={handleUnlockSubmit} className="w-full space-y-2">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (unlockError) setUnlockError('');
                    }}
                    placeholder="Digite a senha..."
                    disabled={isUnlocking}
                    className="w-full pl-3 pr-8 py-1.5 rounded-lg bg-black/60 border border-amber-500/40 text-amber-100 placeholder-amber-500/40 font-mono text-xs focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400/60 hover:text-amber-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {unlockError && (
                  <div className="text-[10px] font-mono text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded px-2 py-0.5 text-left">
                    {unlockError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUnlocking}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg font-mono text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                >
                  {isUnlocking ? (
                    <>
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Verificando...</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3" />
                      <span>Desbloquear</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {item.status === 'error' && (
            <div className="flex flex-col items-center gap-2 p-5 text-center text-rose-400">
              <AlertTriangle className="w-7 h-7 text-rose-400" />
              <span className="text-xs font-mono font-medium">Decodificação falhou</span>
              <p className="text-[11px] text-slate-400 leading-tight">
                {item.errorMessage || 'Nenhum payload compatível detectado.'}
              </p>
            </div>
          )}

          {item.status === 'success' && (
            <>
              {item.isImage && (
                <div className="relative w-full h-full flex items-center justify-center group/img">
                  <img
                    src={item.blobUrl}
                    alt="Decodificado"
                    className="w-full max-h-[240px] object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={() => setIsZoomOpen(true)}
                    title="Ampliar visualização"
                    className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white opacity-0 group-hover/img:opacity-100 transition-opacity hover:bg-black/90"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {item.isVideo && (
                <video
                  src={item.blobUrl}
                  controls
                  className="w-full max-h-[240px] object-contain rounded"
                />
              )}

              {item.isAudio && (
                <div className="w-full p-4 flex flex-col items-center gap-3">
                  <FileAudio className="w-10 h-10 text-cyan-400" />
                  <audio src={item.blobUrl} controls className="w-full h-8" />
                </div>
              )}

              {item.isText && (
                <div className="w-full max-h-[200px] overflow-auto p-3 text-left font-mono text-[11px] text-emerald-300 bg-black/60 rounded">
                  <pre className="whitespace-pre-wrap break-all">
                    {item.textPreview || 'Arquivo de texto sem conteúdo prévio.'}
                  </pre>
                </div>
              )}

              {!item.isImage && !item.isVideo && !item.isAudio && !item.isText && (
                <div className="flex flex-col items-center gap-2 p-6 text-slate-400">
                  <FileCode className="w-10 h-10 text-cyan-400" />
                  <span className="text-xs font-mono font-medium text-slate-200">
                    Arquivo Binário .{item.extractedExt.toUpperCase()}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    Pronto para download
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Metadata HUD */}
        {item.status === 'success' && (
          <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-cyan-950/50 text-cyan-300 border border-cyan-500/20 font-semibold uppercase">
                .{item.extractedExt}
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <HardDrive className="w-3 h-3 text-cyan-400" />
                {formatBytes(item.data.length)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {item.kBits && (
                <span className="flex items-center gap-1 text-emerald-400" title="Profundidade LSB detectada">
                  <Cpu className="w-3 h-3" />
                  {item.kBits}-bit
                </span>
              )}
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3 h-3" />
                {item.processingTimeMs}ms
              </span>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-3 flex items-center gap-2">
          {item.status === 'success' ? (
            <>
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium text-cyan-950 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                title="Copiar nome do arquivo"
                className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </>
          ) : item.status === 'error' ? (
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="w-full py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-slate-200 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-colors"
            >
              Descartar
            </button>
          ) : null}
        </div>
      </div>

      {/* Modal Zoom for Images */}
      {isZoomOpen && item.isImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#0c101c] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-white/10">
              <span className="font-mono text-xs text-slate-300">
                {downloadFileName} • {formatBytes(item.data.length)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-3 py-1 text-xs rounded-lg bg-cyan-400 text-black font-medium inline-flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" />
                  Baixar
                </button>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <img
              src={item.blobUrl}
              alt="Pré-visualização ampliada"
              className="max-h-[75vh] w-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};
