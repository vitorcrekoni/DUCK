import React, { useRef, useState } from 'react';
import { UploadCloud, FileImage, Cpu, ShieldCheck, Zap, Layers } from 'lucide-react';

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
  isProcessing: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
      // Reset input value to allow selecting the same file again
      e.target.value = '';
    }
  };

  return (
    <div
      id="duck-dropzone-container"
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer p-8 sm:p-12 text-center ${
        isDragOver
          ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_40px_rgba(6,182,212,0.25)]'
          : 'border-white/[0.1] bg-[#0c101c]/60 hover:border-cyan-500/40 hover:bg-[#0f1424]/80 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
      }`}
    >
      {/* Reticle Corner Brackets for Futuristic HUD Look */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/50 group-hover:border-cyan-400 transition-colors" />

      {/* Cyber Grid background glow */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <input
        ref={inputRef}
        id="file-input-duck"
        type="file"
        accept=".png,image/png"
        multiple
        className="hidden"
        onChange={handleChange}
      />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-md mx-auto">
        {/* Animated Cyber Icon Container */}
        <div
          className={`relative mb-5 flex items-center justify-center w-16 h-16 rounded-2xl border transition-transform duration-300 ${
            isDragOver
              ? 'scale-110 border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
              : 'border-white/10 bg-white/[0.03] text-cyan-400 group-hover:border-cyan-500/40 group-hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <UploadCloud className="w-8 h-8 transition-transform group-hover:-translate-y-0.5" />
          )}

          {/* Micro HUD status dot */}
          <div className="absolute -bottom-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-2">
          {isDragOver ? (
            <span className="text-cyan-400">Solte as imagens PNG agora</span>
          ) : (
            <span>Arraste as imagens <span className="text-cyan-400">Duck PNG</span> aqui</span>
          )}
        </h2>

        <p className="text-sm text-slate-400 mb-6 font-normal">
          Decodificação instantânea dos bits menos significativos (LSB 2, 6 e 8 bits). Suporta múltiplos arquivos.
        </p>

        {/* Primary Action Button */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            disabled={isProcessing}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-black bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] cursor-pointer"
          >
            <FileImage className="w-4 h-4 text-black" />
            <span>Selecionar Imagens</span>
          </button>
        </div>

        {/* Minimal Specs Pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
            <Cpu className="w-3 h-3 text-cyan-400" />
            LSB Auto Scan (2·6·8 bit)
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
            <Layers className="w-3 h-3 text-emerald-400" />
            Suporta .binpng (Vídeo / Payload)
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            Zero Upload / 100% Local
          </span>
        </div>
      </div>
    </div>
  );
};
