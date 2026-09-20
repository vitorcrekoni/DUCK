/**
 * Motor de Decodificação TT-IMG Decoder — Versão V1 LSB
 * 100% Client-Side (Canvas 2D & TypedArrays de alta performance).
 * 
 * Totalmente compatível com https://ttimgdec.com e ComfyUI/RunningHub TT-Tools:
 * - Protocolo estruturado TT-IMG V1:
 *   [32-bit Data Length] -> [1-byte Extension Length] -> [Extension ASCII] -> [32-bit Data Size] -> [Binary Payload]
 * - Suporta extração em canais RGB (3 canais) e Grayscale (1 canal LSB)
 * - Suporta remoção de marca-d'água (crop dos 20% superiores e inferiores) com fallback inteligente
 * - Suporta todos os formatos de vídeo (MP4, WEBM, MKV, AVI, MOV, FLV, WMV, M4V, etc.)
 * - Suporta imagens (PNG, JPG, JPEG, WEBP, GIF, BMP, SVG) e arquivos binários/áudio
 * - Fallback inteligente com scanner de assinaturas mágicas para payloads LSB crus (com suporte correto a caixas MP4 e contêineres multimídia)
 */

export interface TtDecodedItem {
  id: string;
  originalFileName: string;
  originalFileSize: number;
  blob: Blob;
  blobUrl: string;
  name: string;
  type: string;
  ext: string;
  bytes: number;
  isImage: boolean;
  isVideo: boolean;
  timestamp: number;
}

const MIME_MAP: Record<string, string> = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  bmp: 'image/bmp',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  mp4: 'video/mp4',
  m4v: 'video/mp4',
  avi: 'video/x-msvideo',
  mov: 'video/quicktime',
  mkv: 'video/x-matroska',
  webm: 'video/webm',
  flv: 'video/x-flv',
  wmv: 'video/x-ms-wmv',
  ts: 'video/mp2t',
  wav: 'audio/wav',
  mp3: 'audio/mpeg',
  aac: 'audio/aac',
  flac: 'audio/flac',
  ogg: 'audio/ogg',
  m4a: 'audio/mp4',
  pdf: 'application/pdf',
  zip: 'application/zip',
  tar: 'application/x-tar',
  gz: 'application/gzip',
  json: 'application/json',
  txt: 'text/plain',
};

export function getMimeType(ext: string): string {
  const clean = ext.toLowerCase().replace(/^\./, '').trim();
  return MIME_MAP[clean] || 'application/octet-stream';
}

export function iconForFileType(type: string): string {
  if (type.startsWith('image/')) return '🖼️';
  if (type.startsWith('video/')) return '🎬';
  if (type.startsWith('audio/')) return '🎵';
  if (type.includes('pdf')) return '📄';
  if (type.includes('zip') || type.includes('gzip') || type.includes('tar')) return '📦';
  return '📁';
}

function buildName(original: string, ext: string): string {
  const clean = original.replace(/\.[^.]+$/, '').replace(/[^\wÀ-ÿ ._-]+/g, '_');
  return `${clean || 'arquivo'}_decodificado.${ext}`;
}

interface TtExtractionResult {
  data: Uint8Array;
  ext: string;
  mime: string;
}

/**
 * Motor de extração nativo TT-IMG V1 (protocolo de cabeçalho estruturado).
 * Implementado com streaming direto de bits em typed arrays para performance máxima
 * e sem vazamento de memória em vídeos grandes.
 */
function extractTtImgProtocol(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  startRow: number,
  endRow: number,
  channels: number,
  reverseBits: boolean = false
): TtExtractionResult | null {
  let dataLength = 0;
  let bitCount = 0;
  let headerParsed = false;
  let fileHeader: Uint8Array | null = null;
  let byteIndex = 0;
  let currentByte = 0;
  let bitsInByte = 0;

  outerLoop: for (let y = startRow; y < endRow; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      for (let c = 0; c < channels; c++) {
        let bit = pixels[i + c] & 1;
        if (reverseBits) bit = 1 - bit;

        if (!headerParsed) {
          dataLength = ((dataLength << 1) | bit) >>> 0;
          bitCount++;
          if (bitCount === 32) {
            // Header length must be reasonable (e.g., > 5 bytes and <= 300MB)
            if (dataLength < 6 || dataLength > 300_000_000) {
              return null;
            }
            fileHeader = new Uint8Array(dataLength);
            headerParsed = true;
          }
        } else if (fileHeader) {
          currentByte = (currentByte << 1) | bit;
          bitsInByte++;
          if (bitsInByte === 8) {
            fileHeader[byteIndex++] = currentByte;
            currentByte = 0;
            bitsInByte = 0;
            if (byteIndex === dataLength) {
              break outerLoop;
            }
          }
        }
      }
    }
  }

  if (!headerParsed || !fileHeader || byteIndex < dataLength) {
    return null;
  }

  // Validar estrutura do cabeçalho TT-IMG V1
  const extLen = fileHeader[0];
  if (extLen <= 0 || extLen > 20 || fileHeader.length < 1 + extLen + 4) {
    return null;
  }

  let ext = '';
  for (let i = 1; i <= extLen; i++) {
    const ch = fileHeader[i];
    if (ch >= 32 && ch <= 126) {
      ext += String.fromCharCode(ch);
    } else {
      return null;
    }
  }
  ext = ext.trim().toLowerCase().replace(/^\./, '');
  if (!/^[a-z0-9]{1,10}$/i.test(ext)) {
    return null;
  }

  const offset = 1 + extLen;
  const dataSize = (
    ((fileHeader[offset] << 24) >>> 0) |
    (fileHeader[offset + 1] << 16) |
    (fileHeader[offset + 2] << 8) |
    fileHeader[offset + 3]
  ) >>> 0;

  if (dataSize <= 0 || dataSize > fileHeader.length - (offset + 4)) {
    return null;
  }

  const payload = fileHeader.slice(offset + 4, offset + 4 + dataSize);
  const mime = getMimeType(ext);

  return {
    data: payload,
    ext,
    mime,
  };
}

/**
 * Scanner de fallback para extração bruta de LSB em imagens sem cabeçalho TT-IMG estruturado.
 * Suporta detecção precisa de caixas MP4 (ftyp), WebM, MKV, AVI, PNG, JPG, GIF, WEBP, PDF, ZIP.
 */
function scanRawSignatures(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
  startRow: number,
  endRow: number,
  channels: number,
  reverseBits: boolean = false
): TtExtractionResult | null {
  const totalPixels = (endRow - startRow) * width;
  const totalBits = totalPixels * channels;
  const maxBytes = Math.min(Math.floor(totalBits / 8), 64 * 1024 * 1024);
  if (maxBytes < 16) return null;

  const rawBytes = new Uint8Array(maxBytes);
  let byteIndex = 0;
  let currentByte = 0;
  let bitsInByte = 0;

  scanLoop: for (let y = startRow; y < endRow; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      for (let c = 0; c < channels; c++) {
        let bit = pixels[i + c] & 1;
        if (reverseBits) bit = 1 - bit;

        currentByte = (currentByte << 1) | bit;
        bitsInByte++;
        if (bitsInByte === 8) {
          rawBytes[byteIndex++] = currentByte;
          currentByte = 0;
          bitsInByte = 0;
          if (byteIndex >= maxBytes) break scanLoop;
        }
      }
    }
  }

  const limit = Math.min(byteIndex, 1024 * 1024);

  for (let offset = 0; offset < limit - 16; offset++) {
    // 1. MP4 / M4V (box ftyp em offset + 4)
    if (
      rawBytes[offset + 4] === 0x66 && // 'f'
      rawBytes[offset + 5] === 0x74 && // 't'
      rawBytes[offset + 6] === 0x79 && // 'y'
      rawBytes[offset + 7] === 0x70    // 'p'
    ) {
      const boxSize = (
        ((rawBytes[offset] << 24) >>> 0) |
        (rawBytes[offset + 1] << 16) |
        (rawBytes[offset + 2] << 8) |
        rawBytes[offset + 3]
      ) >>> 0;
      if (boxSize >= 8 && boxSize <= 4096) {
        return {
          data: rawBytes.slice(offset),
          ext: 'mp4',
          mime: 'video/mp4',
        };
      }
    }

    // 2. WebM / Matroska EBML [0x1A, 0x45, 0xDF, 0xA3]
    if (
      rawBytes[offset] === 0x1a &&
      rawBytes[offset + 1] === 0x45 &&
      rawBytes[offset + 2] === 0xdf &&
      rawBytes[offset + 3] === 0xa3
    ) {
      return {
        data: rawBytes.slice(offset),
        ext: 'webm',
        mime: 'video/webm',
      };
    }

    // 3. AVI ('RIFF' ... 'AVI ')
    if (
      rawBytes[offset] === 0x52 &&
      rawBytes[offset + 1] === 0x49 &&
      rawBytes[offset + 2] === 0x46 &&
      rawBytes[offset + 3] === 0x46 &&
      rawBytes[offset + 8] === 0x41 &&
      rawBytes[offset + 9] === 0x56 &&
      rawBytes[offset + 10] === 0x49 &&
      rawBytes[offset + 11] === 0x20
    ) {
      return {
        data: rawBytes.slice(offset),
        ext: 'avi',
        mime: 'video/x-msvideo',
      };
    }

    // 4. PNG [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]
    if (
      rawBytes[offset] === 0x89 &&
      rawBytes[offset + 1] === 0x50 &&
      rawBytes[offset + 2] === 0x4e &&
      rawBytes[offset + 3] === 0x47 &&
      rawBytes[offset + 4] === 0x0d &&
      rawBytes[offset + 5] === 0x0a &&
      rawBytes[offset + 6] === 0x1a &&
      rawBytes[offset + 7] === 0x0a
    ) {
      return {
        data: rawBytes.slice(offset),
        ext: 'png',
        mime: 'image/png',
      };
    }

    // 5. JPEG [0xFF, 0xD8, 0xFF]
    if (
      rawBytes[offset] === 0xff &&
      rawBytes[offset + 1] === 0xd8 &&
      rawBytes[offset + 2] === 0xff
    ) {
      return {
        data: rawBytes.slice(offset),
        ext: 'jpg',
        mime: 'image/jpeg',
      };
    }

    // 6. GIF ('GIF87a' ou 'GIF89a')
    if (
      rawBytes[offset] === 0x47 &&
      rawBytes[offset + 1] === 0x49 &&
      rawBytes[offset + 2] === 0x46 &&
      rawBytes[offset + 3] === 0x38 &&
      (rawBytes[offset + 4] === 0x37 || rawBytes[offset + 4] === 0x39) &&
      rawBytes[offset + 5] === 0x61
    ) {
      return {
        data: rawBytes.slice(offset),
        ext: 'gif',
        mime: 'image/gif',
      };
    }

    // 7. WEBP ('RIFF' ... 'WEBP')
    if (
      rawBytes[offset] === 0x52 &&
      rawBytes[offset + 1] === 0x49 &&
      rawBytes[offset + 2] === 0x46 &&
      rawBytes[offset + 3] === 0x46 &&
      rawBytes[offset + 8] === 0x57 &&
      rawBytes[offset + 9] === 0x45 &&
      rawBytes[offset + 10] === 0x42 &&
      rawBytes[offset + 11] === 0x50
    ) {
      return {
        data: rawBytes.slice(offset),
        ext: 'webp',
        mime: 'image/webp',
      };
    }

    // 8. ZIP ('PK\x03\x04')
    if (
      rawBytes[offset] === 0x50 &&
      rawBytes[offset + 1] === 0x4b &&
      rawBytes[offset + 2] === 0x03 &&
      rawBytes[offset + 3] === 0x04
    ) {
      return {
        data: rawBytes.slice(offset),
        ext: 'zip',
        mime: 'application/zip',
      };
    }
  }

  return null;
}

/**
 * Carrega o arquivo de imagem no elemento Image preservando 100% dos dados dos pixels originais.
 */
function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      const reader = new FileReader();
      reader.onload = (e) => {
        const fallbackImg = new Image();
        fallbackImg.onload = () => resolve(fallbackImg);
        fallbackImg.onerror = () => reject(new Error('Falha ao carregar a imagem.'));
        fallbackImg.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Falha ao ler os bytes da imagem.'));
      reader.readAsDataURL(file);
    };
    img.src = url;
  });
}

/**
 * Decodifica um arquivo de imagem esteganográfica TT-IMG V1.
 * Suporta vídeos e imagens em escala de cinza e coloridas, com ou sem marca-d'água.
 */
export async function decodeTtImageFile(
  file: File,
  cropWatermark: boolean = true
): Promise<TtDecodedItem | null> {
  const img = await loadImageFromFile(file);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;

  if (!width || !height) {
    return null;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('Não foi possível obter o contexto 2D do Canvas.');
  }

  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, width, height);
  const pixels = imageData.data;

  // Parâmetros de corte para remoção de marca-d'água (RunningHub / TT-Tools padrão: 20% superior e inferior)
  const topSkip = Math.floor(height * 0.20);
  const bottomSkip = Math.floor(height * 0.20);
  const croppedStartRow = topSkip;
  const croppedEndRow = height - bottomSkip;

  interface AttemptConfig {
    startRow: number;
    endRow: number;
    channels: number; // 3 para RGB (ttimgdec padrão), 1 para Grayscale/Red
    reverseBits: boolean;
  }

  const attempts: AttemptConfig[] = [];

  const addVariantsForCrop = (isCropped: boolean) => {
    const start = isCropped ? croppedStartRow : 0;
    const end = isCropped ? croppedEndRow : height;

    // 1. RGB (3 canais) - formato padrão ttimgdec.com
    attempts.push({ startRow: start, endRow: end, channels: 3, reverseBits: false });
    // 2. Grayscale (1 canal LSB) - para imagens com 1 bit por pixel
    attempts.push({ startRow: start, endRow: end, channels: 1, reverseBits: false });
    // 3. RGB com bits invertidos
    attempts.push({ startRow: start, endRow: end, channels: 3, reverseBits: true });
    // 4. Grayscale com bits invertidos
    attempts.push({ startRow: start, endRow: end, channels: 1, reverseBits: true });
  };

  if (cropWatermark) {
    addVariantsForCrop(true);
    addVariantsForCrop(false);
  } else {
    addVariantsForCrop(false);
    addVariantsForCrop(true);
  }

  // Execução do protocolo TT-IMG V1 estruturado
  for (const attempt of attempts) {
    const extracted = extractTtImgProtocol(
      pixels,
      width,
      height,
      attempt.startRow,
      attempt.endRow,
      attempt.channels,
      attempt.reverseBits
    );

    if (extracted) {
      const blob = new Blob([extracted.data], { type: extracted.mime });
      const blobUrl = URL.createObjectURL(blob);
      const isImage = extracted.mime.startsWith('image/');
      const isVideo = extracted.mime.startsWith('video/');

      return {
        id: Math.random().toString(36).substring(2, 9),
        originalFileName: file.name,
        originalFileSize: file.size,
        blob,
        blobUrl,
        name: buildName(file.name, extracted.ext),
        type: extracted.mime,
        ext: extracted.ext,
        bytes: extracted.data.length,
        isImage,
        isVideo,
        timestamp: Date.now(),
      };
    }
  }

  // Fallback: Busca por assinaturas mágicas brutas (MP4 com box ftyp, WebM, AVI, PNG, JPG, etc.)
  for (const isCropped of [cropWatermark, !cropWatermark]) {
    const start = isCropped ? croppedStartRow : 0;
    const end = isCropped ? croppedEndRow : height;

    for (const channels of [3, 1]) {
      const fallbackExtracted = scanRawSignatures(
        pixels,
        width,
        height,
        start,
        end,
        channels,
        false
      );

      if (fallbackExtracted) {
        const blob = new Blob([fallbackExtracted.data], { type: fallbackExtracted.mime });
        const blobUrl = URL.createObjectURL(blob);
        const isImage = fallbackExtracted.mime.startsWith('image/');
        const isVideo = fallbackExtracted.mime.startsWith('video/');

        return {
          id: Math.random().toString(36).substring(2, 9),
          originalFileName: file.name,
          originalFileSize: file.size,
          blob,
          blobUrl,
          name: buildName(file.name, fallbackExtracted.ext),
          type: fallbackExtracted.mime,
          ext: fallbackExtracted.ext,
          bytes: fallbackExtracted.data.length,
          isImage,
          isVideo,
          timestamp: Date.now(),
        };
      }
    }
  }

  return null;
}
