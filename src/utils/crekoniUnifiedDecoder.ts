/**
 * Crekoni Decoder Engine — Sistema Unificado Dual
 * Integração 100% Client-Side dos dois motores esteganográficos:
 * 1. Motor Duck Decoder (LSB 2, 6, 8 bits por canal, SS_tools e contêineres .binpng, com proteção por senha SHA-256 + XOR)
 * 2. Motor TT-IMG Decoder (Protocolo V1 estruturado, ComfyUI TT-Tools, RunningHub,
 *    RGB 3 canais e Grayscale 1 canal, detecção mágica de MP4/WebM/AVI/PNG/JPG/ZIP)
 */

import {
  decodeDuckFile,
  getMimeType as getDuckMimeType,
  DuckPasswordRequiredError,
  DuckInvalidPasswordError,
} from './duckDecoder';
import { decodeTtImageFile, getMimeType as getTtMimeType } from './ttImgDecoder';

export interface UnifiedDecodedResult {
  id: string;
  originalFileName: string;
  originalFileSize: number;
  originalFile?: File;
  engine: 'duck' | 'ttimg';
  engineLabel: string;
  engineBadgeColor: 'cyan' | 'amber';
  extractedExt: string;
  mimeType: string;
  data: Uint8Array;
  blobUrl: string;
  blob: Blob;
  name: string;
  isImage: boolean;
  isVideo: boolean;
  isAudio: boolean;
  isText: boolean;
  textPreview?: string;
  dimensions?: { width: number; height: number };
  resolution?: string;
  processingTimeMs: number;
  kBits?: number;
  status: 'success' | 'error' | 'requires-password';
  requiresPassword?: boolean;
  passwordError?: string;
  errorMessage?: string;
  timestamp: number;
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1073741824) return `${(n / 1048576).toFixed(1)} MB`;
  return `${(n / 1073741824).toFixed(2)} GB`;
}

export function downloadBlob(url: string, filename: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function buildOutputFileName(originalName: string, ext: string): string {
  const clean = originalName.replace(/\.[^.]+$/, '').replace(/[^\wÀ-ÿ ._-]+/g, '_');
  return `${clean || 'arquivo'}_decodificado.${ext}`;
}

export function getFileCategoryIcon(mimeType: string, ext: string): string {
  if (mimeType.startsWith('video/') || /^(mp4|webm|mkv|avi|mov|flv|wmv|m4v|ts)$/i.test(ext)) return '🎬';
  if (mimeType.startsWith('image/') || /^(png|jpe?g|webp|gif|bmp|svg|avif)$/i.test(ext)) return '🖼️';
  if (mimeType.startsWith('audio/') || /^(mp3|wav|ogg|aac|flac|m4a)$/i.test(ext)) return '🎵';
  if (mimeType.includes('pdf') || ext.toLowerCase() === 'pdf') return '📄';
  if (mimeType.includes('zip') || /^(zip|rar|7z|tar|gz)$/i.test(ext)) return '📦';
  if (mimeType.includes('text') || mimeType.includes('json') || /^(txt|json|csv|html|xml|js|ts|py|md|log)$/i.test(ext)) return '📝';
  return '📁';
}

/**
 * Detecta com precisão a resolução (largura x altura) de um vídeo ou imagem extraído.
 */
export async function detectMediaDimensions(
  blobUrl: string,
  isImage: boolean,
  isVideo: boolean
): Promise<{ width: number; height: number } | null> {
  if (!blobUrl) return null;

  if (isImage) {
    return new Promise((resolve) => {
      const img = new Image();
      const timer = setTimeout(() => resolve(null), 2500);
      img.onload = () => {
        clearTimeout(timer);
        if (img.naturalWidth && img.naturalHeight) {
          resolve({ width: img.naturalWidth, height: img.naturalHeight });
        } else {
          resolve(null);
        }
      };
      img.onerror = () => {
        clearTimeout(timer);
        resolve(null);
      };
      img.src = blobUrl;
    });
  }

  if (isVideo) {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      const timer = setTimeout(() => resolve(null), 3000);
      video.onloadedmetadata = () => {
        clearTimeout(timer);
        if (video.videoWidth && video.videoHeight) {
          resolve({ width: video.videoWidth, height: video.videoHeight });
        } else {
          resolve(null);
        }
      };
      video.onerror = () => {
        clearTimeout(timer);
        resolve(null);
      };
      video.src = blobUrl;
    });
  }

  return null;
}

/**
 * Decodifica um arquivo executando os motores (Duck e TT-IMG) de forma unificada.
 * Suporta descriptografia caso o arquivo possua senha.
 */
export async function decodeUnifiedFile(
  file: File,
  options: { cropWatermark?: boolean; password?: string } = { cropWatermark: true }
): Promise<UnifiedDecodedResult> {
  const startTime = performance.now();
  const tempId = Math.random().toString(36).substring(2, 9);
  const isPng = /\.png$/i.test(file.name) || file.type === 'image/png';
  const crop = options.cropWatermark ?? true;
  const password = options.password;

  let duckPasswordRequired: DuckPasswordRequiredError | null = null;
  let duckInvalidPassword: DuckInvalidPasswordError | null = null;

  // 1. Tentar primeiro com o motor Duck Decoder se for PNG
  if (isPng) {
    try {
      const outcome = await decodeDuckFile(file, password);
      const mime = getDuckMimeType(outcome.ext);
      const blob = new Blob([outcome.data], { type: mime });
      const blobUrl = URL.createObjectURL(blob);

      const isImage = /^(png|jpe?g|webp|gif|bmp|avif|svg)$/i.test(outcome.ext);
      const isVideo = /^(mp4|webm|mov|mkv|avi|m4v)$/i.test(outcome.ext);
      const isAudio = /^(mp3|wav|ogg|aac|flac|m4a)$/i.test(outcome.ext);
      const isText = /^(txt|json|csv|html|xml|js|ts|py|md|log)$/i.test(outcome.ext);

      let textPreview: string | undefined;
      if (isText && outcome.data.length < 200000) {
        try {
          textPreview = new TextDecoder('utf-8', { fatal: false }).decode(outcome.data.slice(0, 1500));
        } catch {
          // ignorar erro de preview
        }
      }

      // Detectar resolução do arquivo de mídia extraído
      let dimensions = await detectMediaDimensions(blobUrl, isImage, isVideo);
      if (!dimensions && outcome.dimensions) {
        dimensions = outcome.dimensions;
      }

      let resolution = dimensions ? `${dimensions.width}x${dimensions.height} px` : undefined;
      if (!resolution) {
        if (isAudio) resolution = 'Não aplicável (Áudio)';
        else if (isText) resolution = 'Não aplicável (Texto)';
        else if (!isImage && !isVideo) resolution = 'Não aplicável (Dados)';
      }

      const durationMs = Math.round(performance.now() - startTime);

      return {
        id: tempId,
        originalFileName: file.name,
        originalFileSize: file.size,
        originalFile: file,
        engine: 'duck',
        engineLabel: 'Duck Decoder LSB',
        engineBadgeColor: 'cyan',
        extractedExt: outcome.ext,
        mimeType: mime,
        data: outcome.data,
        blob,
        blobUrl,
        name: buildOutputFileName(file.name, outcome.ext),
        isImage,
        isVideo,
        isAudio,
        isText,
        textPreview,
        dimensions: dimensions || undefined,
        resolution,
        processingTimeMs: durationMs,
        kBits: outcome.kBits,
        status: 'success',
        timestamp: Date.now(),
      };
    } catch (duckErr) {
      if (duckErr instanceof DuckPasswordRequiredError) {
        duckPasswordRequired = duckErr;
      } else if (duckErr instanceof DuckInvalidPasswordError) {
        duckInvalidPassword = duckErr;
      }
      // Se for outro erro, continua para o motor TT-IMG
    }
  }

  // Se o Duck identificou explicitamente que o arquivo tem senha ou a senha estava incorreta,
  // interrompemos aqui retornando o status 'requires-password' para que o usuário informe a senha
  if (duckPasswordRequired) {
    const rawExt = duckPasswordRequired.ext ? duckPasswordRequired.ext.replace(/^\./, '') : 'bin';
    return {
      id: tempId,
      originalFileName: file.name,
      originalFileSize: file.size,
      originalFile: file,
      engine: 'duck',
      engineLabel: 'Duck Decoder LSB',
      engineBadgeColor: 'cyan',
      extractedExt: rawExt,
      mimeType: getDuckMimeType(rawExt),
      data: new Uint8Array(),
      blob: new Blob(),
      blobUrl: '',
      name: file.name,
      isImage: false,
      isVideo: false,
      isAudio: false,
      isText: false,
      processingTimeMs: Math.round(performance.now() - startTime),
      kBits: duckPasswordRequired.kBits,
      status: 'requires-password',
      requiresPassword: true,
      errorMessage: 'Este arquivo está protegido por senha. Digite a senha para decodificar.',
      timestamp: Date.now(),
    };
  }

  if (duckInvalidPassword) {
    const rawExt = duckInvalidPassword.ext ? duckInvalidPassword.ext.replace(/^\./, '') : 'bin';
    return {
      id: tempId,
      originalFileName: file.name,
      originalFileSize: file.size,
      originalFile: file,
      engine: 'duck',
      engineLabel: 'Duck Decoder LSB',
      engineBadgeColor: 'cyan',
      extractedExt: rawExt,
      mimeType: getDuckMimeType(rawExt),
      data: new Uint8Array(),
      blob: new Blob(),
      blobUrl: '',
      name: file.name,
      isImage: false,
      isVideo: false,
      isAudio: false,
      isText: false,
      processingTimeMs: Math.round(performance.now() - startTime),
      kBits: duckInvalidPassword.kBits,
      status: 'requires-password',
      requiresPassword: true,
      passwordError: 'Senha incorreta. Verifique e tente novamente.',
      errorMessage: 'Senha incorreta. Verifique e tente novamente.',
      timestamp: Date.now(),
    };
  }

  // 2. Executar motor TT-IMG Decoder (suporta PNG, JPG, WEBP, etc.)
  try {
    const ttOutcome = await decodeTtImageFile(file, crop);

    if (ttOutcome) {
      const isImage = ttOutcome.isImage;
      const isVideo = ttOutcome.isVideo;
      const isAudio = /^(mp3|wav|ogg|aac|flac|m4a)$/i.test(ttOutcome.ext) || ttOutcome.type.startsWith('audio/');
      const isText = /^(txt|json|csv|html|xml|js|ts|py|md|log)$/i.test(ttOutcome.ext) || ttOutcome.type.startsWith('text/');

      let textPreview: string | undefined;
      if (isText && ttOutcome.bytes < 200000) {
        try {
          const ab = await ttOutcome.blob.arrayBuffer();
          textPreview = new TextDecoder('utf-8', { fatal: false }).decode(ab.slice(0, 1500));
        } catch {
          // ignorar
        }
      }

      // Detectar resolução do arquivo de mídia extraído pelo TT-IMG
      const dimensions = await detectMediaDimensions(ttOutcome.blobUrl, isImage, isVideo);
      let resolution = dimensions ? `${dimensions.width}x${dimensions.height} px` : undefined;
      if (!resolution) {
        if (isAudio) resolution = 'Não aplicável (Áudio)';
        else if (isText) resolution = 'Não aplicável (Texto)';
        else if (!isImage && !isVideo) resolution = 'Não aplicável (Dados)';
      }

      const durationMs = Math.round(performance.now() - startTime);

      return {
        id: tempId,
        originalFileName: file.name,
        originalFileSize: file.size,
        originalFile: file,
        engine: 'ttimg',
        engineLabel: 'TT-IMG Decoder V1',
        engineBadgeColor: 'amber',
        extractedExt: ttOutcome.ext,
        mimeType: ttOutcome.type,
        data: new Uint8Array(),
        blob: ttOutcome.blob,
        blobUrl: ttOutcome.blobUrl,
        name: ttOutcome.name,
        isImage,
        isVideo,
        isAudio,
        isText,
        textPreview,
        dimensions: dimensions || undefined,
        resolution,
        processingTimeMs: durationMs,
        status: 'success',
        timestamp: Date.now(),
      };
    }
  } catch (_ttErr) {
    // TT-IMG também falhou
  }

  // 3. Se não foi PNG na primeira tentativa, ainda tenta Duck caso o arquivo tenha sido renomeado
  if (!isPng) {
    try {
      const outcome = await decodeDuckFile(file, password);
      const mime = getDuckMimeType(outcome.ext);
      const blob = new Blob([outcome.data], { type: mime });
      const blobUrl = URL.createObjectURL(blob);

      const isImage = /^(png|jpe?g|webp|gif|bmp|avif|svg)$/i.test(outcome.ext);
      const isVideo = /^(mp4|webm|mov|mkv|avi|m4v)$/i.test(outcome.ext);
      const isAudio = /^(mp3|wav|ogg|aac|flac|m4a)$/i.test(outcome.ext);
      const isText = /^(txt|json|csv|html|xml|js|ts|py|md|log)$/i.test(outcome.ext);

      let dimensions = await detectMediaDimensions(blobUrl, isImage, isVideo);
      if (!dimensions && outcome.dimensions) {
        dimensions = outcome.dimensions;
      }

      let resolution = dimensions ? `${dimensions.width}x${dimensions.height} px` : undefined;
      if (!resolution) {
        if (isAudio) resolution = 'Não aplicável (Áudio)';
        else if (isText) resolution = 'Não aplicável (Texto)';
        else if (!isImage && !isVideo) resolution = 'Não aplicável (Dados)';
      }

      return {
        id: tempId,
        originalFileName: file.name,
        originalFileSize: file.size,
        originalFile: file,
        engine: 'duck',
        engineLabel: 'Duck Decoder LSB',
        engineBadgeColor: 'cyan',
        extractedExt: outcome.ext,
        mimeType: mime,
        data: outcome.data,
        blob,
        blobUrl,
        name: buildOutputFileName(file.name, outcome.ext),
        isImage,
        isVideo,
        isAudio,
        isText,
        dimensions: dimensions || undefined,
        resolution,
        processingTimeMs: Math.round(performance.now() - startTime),
        kBits: outcome.kBits,
        status: 'success',
        timestamp: Date.now(),
      };
    } catch (duckErr) {
      if (duckErr instanceof DuckPasswordRequiredError) {
        const rawExt = duckErr.ext ? duckErr.ext.replace(/^\./, '') : 'bin';
        return {
          id: tempId,
          originalFileName: file.name,
          originalFileSize: file.size,
          originalFile: file,
          engine: 'duck',
          engineLabel: 'Duck Decoder LSB',
          engineBadgeColor: 'cyan',
          extractedExt: rawExt,
          mimeType: getDuckMimeType(rawExt),
          data: new Uint8Array(),
          blob: new Blob(),
          blobUrl: '',
          name: file.name,
          isImage: false,
          isVideo: false,
          isAudio: false,
          isText: false,
          processingTimeMs: Math.round(performance.now() - startTime),
          kBits: duckErr.kBits,
          status: 'requires-password',
          requiresPassword: true,
          errorMessage: 'Este arquivo está protegido por senha. Digite a senha para decodificar.',
          timestamp: Date.now(),
        };
      }
      if (duckErr instanceof DuckInvalidPasswordError) {
        const rawExt = duckErr.ext ? duckErr.ext.replace(/^\./, '') : 'bin';
        return {
          id: tempId,
          originalFileName: file.name,
          originalFileSize: file.size,
          originalFile: file,
          engine: 'duck',
          engineLabel: 'Duck Decoder LSB',
          engineBadgeColor: 'cyan',
          extractedExt: rawExt,
          mimeType: getDuckMimeType(rawExt),
          data: new Uint8Array(),
          blob: new Blob(),
          blobUrl: '',
          name: file.name,
          isImage: false,
          isVideo: false,
          isAudio: false,
          isText: false,
          processingTimeMs: Math.round(performance.now() - startTime),
          kBits: duckErr.kBits,
          status: 'requires-password',
          requiresPassword: true,
          passwordError: 'Senha incorreta. Verifique e tente novamente.',
          errorMessage: 'Senha incorreta. Verifique e tente novamente.',
          timestamp: Date.now(),
        };
      }
    }
  }

  // 4. Nenhum dos dois motores conseguiu extrair
  return {
    id: tempId,
    originalFileName: file.name,
    originalFileSize: file.size,
    originalFile: file,
    engine: 'duck',
    engineLabel: 'Dual Engine (Duck + TT-IMG)',
    engineBadgeColor: 'cyan',
    extractedExt: 'bin',
    mimeType: 'application/octet-stream',
    data: new Uint8Array(),
    blob: new Blob(),
    blobUrl: '',
    name: file.name,
    isImage: false,
    isVideo: false,
    isAudio: false,
    isText: false,
    processingTimeMs: Math.round(performance.now() - startTime),
    status: 'error',
    errorMessage:
      'Nenhum payload detectado nem pelo Duck Decoder (LSB 2/6/8-bit) nem pelo TT-IMG V1 (RGB/Grayscale). Certifique-se de que a imagem contém dados esteganográficos válidos.',
    timestamp: Date.now(),
  };
}
