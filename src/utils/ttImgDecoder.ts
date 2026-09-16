/**
 * Motor de Decodificação TT-IMG Decoder — Versão V1 LSB
 * Processamento 100% no navegador (Client-side Canvas & TypedArrays).
 * 
 * Compatível com formato V1:
 * - Extração de bits LSB em canais RGB e Gray (escala de cinza ITU-R BT.709)
 * - Suporte a bits normais e invertidos (reverseBits)
 * - Remoção opcional de marca-d'água (crop dos 20% superiores e inferiores)
 * - Reconhecimento automático de assinaturas: PNG, JPG, GIF, WEBP, PDF, ZIP, GZ, MP4
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

export interface TtFileSignature {
  bytes: number[];
  ext: string;
  mime: string;
}

const SIGNATURES: TtFileSignature[] = [
  { bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], ext: 'png', mime: 'image/png' },
  { bytes: [0xff, 0xd8, 0xff], ext: 'jpg', mime: 'image/jpeg' },
  { bytes: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], ext: 'gif', mime: 'image/gif' },
  { bytes: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], ext: 'gif', mime: 'image/gif' },
  { bytes: [0x52, 0x49, 0x46, 0x46], ext: 'webp', mime: 'image/webp' },
  { bytes: [0x25, 0x50, 0x44, 0x46], ext: 'pdf', mime: 'application/pdf' },
  { bytes: [0x50, 0x4b, 0x03, 0x04], ext: 'zip', mime: 'application/zip' },
  { bytes: [0x1f, 0x8b, 0x08], ext: 'gz', mime: 'application/gzip' },
  { bytes: [0x66, 0x74, 0x79, 0x70], ext: 'mp4', mime: 'video/mp4' },
];

function makeGray(image: Uint8ClampedArray): Uint8Array {
  const out = new Uint8Array(image.length / 4);
  let p = 0;
  for (let i = 0; i < image.length; i += 4) {
    out[p++] = Math.round(image[i] * 0.2126 + image[i + 1] * 0.7152 + image[i + 2] * 0.0722);
  }
  return out;
}

function readByte(bits: Uint8Array, pos: number): number {
  let v = 0;
  for (let j = 0; j < 8; j++) {
    v = (v << 1) | bits[pos + j];
  }
  return v;
}

function matchSignature(bits: Uint8Array, pos: number, sig: number[]): boolean {
  for (let i = 0; i < sig.length; i++) {
    if (readByte(bits, pos + i * 8) !== sig[i]) return false;
  }
  return true;
}

function bitsToBytes(bits: Uint8Array, pos: number): Uint8Array {
  const count = Math.floor((bits.length - pos) / 8);
  const out = new Uint8Array(count);
  for (let i = 0; i < count; i++) {
    out[i] = readByte(bits, pos + i * 8);
  }
  return out;
}

function findSignatureInBytes(data: Uint8Array, sig: number[]): number {
  outer: for (let i = 0; i <= data.length - sig.length; i++) {
    for (let j = 0; j < sig.length; j++) {
      if (data[i + j] !== sig[j]) continue outer;
    }
    return i;
  }
  return -1;
}

function isPlausible(data: Uint8Array, ext: string): boolean {
  if (data.length < 16) return false;
  if (ext === 'png') {
    return data.includes(0x49) && data.includes(0x45) && data.includes(0x4e) && data.includes(0x44);
  }
  if (ext === 'jpg') {
    return data[data.length - 2] === 0xff && data[data.length - 1] === 0xd9;
  }
  if (ext === 'gif') {
    return data[data.length - 1] === 0x3b;
  }
  return true;
}

function buildName(original: string, ext: string): string {
  const clean = original.replace(/\.[^.]+$/, '').replace(/[^\wÀ-ÿ ._-]+/g, '_');
  return `${clean || 'arquivo_decodificado'}_decodificado.${ext}`;
}

function scanBitstream(
  values: Uint8Array,
  signatures: TtFileSignature[],
  reverseBits: boolean
): { data: Uint8Array; ext: string; mime: string } | null {
  const bits = new Uint8Array(values.length);
  for (let i = 0; i < values.length; i++) {
    const b = values[i] & 1;
    bits[i] = reverseBits ? 1 - b : b;
  }

  for (let offset = 0; offset < 8; offset++) {
    const maxBytes = Math.floor((bits.length - offset) / 8);
    const prefixLimit = Math.min(maxBytes, 1024 * 1024);
    for (let byteIndex = 0; byteIndex < prefixLimit; byteIndex++) {
      const pos = offset + byteIndex * 8;
      const first = readByte(bits, pos);
      for (const sig of signatures) {
        if (first !== sig.bytes[0]) continue;
        if (!matchSignature(bits, pos, sig.bytes)) continue;
        const all = bitsToBytes(bits, pos);
        const start = findSignatureInBytes(all, sig.bytes);
        if (start >= 0) {
          const data = all.slice(start);
          if (isPlausible(data, sig.ext)) {
            return { data, ext: sig.ext, mime: sig.mime };
          }
        }
      }
    }
  }
  return null;
}

/**
 * Decodifica uma imagem individual usando a engine TT-IMG V1.
 */
export async function decodeTtImageFile(
  file: File,
  cropWatermark: boolean
): Promise<TtDecodedItem | null> {
  const bitmap = await createImageBitmap(file);
  const w = bitmap.width;
  const h = bitmap.height;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    bitmap.close?.();
    throw new Error('Não foi possível obter contexto 2D do Canvas.');
  }

  ctx.drawImage(bitmap, 0, 0);
  bitmap.close?.();

  let y0 = 0;
  let y1 = h;
  if (cropWatermark) {
    y0 = Math.floor(h * 0.20);
    y1 = Math.ceil(h * 0.80);
  }

  const imageData = ctx.getImageData(0, y0, w, y1 - y0).data;
  const rgb = new Uint8Array(Math.floor(imageData.length / 4) * 3);
  let p = 0;
  for (let i = 0; i < imageData.length; i += 4) {
    rgb[p++] = imageData[i];
    rgb[p++] = imageData[i + 1];
    rgb[p++] = imageData[i + 2];
  }

  const attempts = [
    { channelMode: 'rgb' as const, bit: 0, reverseBits: false },
    { channelMode: 'gray' as const, bit: 0, reverseBits: false },
    { channelMode: 'rgb' as const, bit: 0, reverseBits: true },
    { channelMode: 'gray' as const, bit: 0, reverseBits: true },
  ];

  for (const attempt of attempts) {
    const stream = attempt.channelMode === 'gray' ? makeGray(imageData) : rgb;
    const found = scanBitstream(stream, SIGNATURES, attempt.reverseBits);
    if (found) {
      const blob = new Blob([found.data], { type: found.mime });
      const blobUrl = URL.createObjectURL(blob);
      const isImage = /^(png|jpe?g|gif|webp|bmp)$/i.test(found.ext);
      const isVideo = /^(mp4|webm|mov)$/i.test(found.ext);

      return {
        id: Math.random().toString(36).substring(2, 9),
        originalFileName: file.name,
        originalFileSize: file.size,
        blob,
        blobUrl,
        name: buildName(file.name, found.ext),
        type: found.mime,
        ext: found.ext,
        bytes: found.data.length,
        isImage,
        isVideo,
        timestamp: Date.now(),
      };
    }
  }

  return null;
}

export function iconForFileType(type: string): string {
  if (type.includes('png') || type.includes('jpeg') || type.includes('gif') || type.includes('webp')) {
    return '🖼️';
  }
  if (type.includes('pdf')) return '📄';
  if (type.includes('video')) return '🎬';
  if (type.includes('zip') || type.includes('gzip')) return '📦';
  return '📁';
}
