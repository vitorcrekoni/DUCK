/**
 * Duck Decoder Engine — 100% Client-Side
 * Compatível com o formato duck.dooo.fun e SS_tools LSB (com ou sem senha).
 * Testa automaticamente 2, 6 e 8 bits por canal (LSB).
 * Suporta descriptografia SHA-256 + XOR com salt e desempacotamento de contêineres .binpng.
 */

export class DuckPasswordRequiredError extends Error {
  isPasswordRequired = true;
  kBits: number;
  ext?: string;

  constructor(message = 'Este arquivo está protegido por senha.', kBits = 2, ext?: string) {
    super(message);
    this.name = 'DuckPasswordRequiredError';
    this.kBits = kBits;
    this.ext = ext;
  }
}

export class DuckInvalidPasswordError extends Error {
  isInvalidPassword = true;
  kBits?: number;
  ext?: string;

  constructor(message = 'Senha incorreta. Verifique e tente novamente.', kBits?: number, ext?: string) {
    super(message);
    this.name = 'DuckInvalidPasswordError';
    this.kBits = kBits;
    this.ext = ext;
  }
}

export const HEADER_SKIP_WIDTH_RATIO = 0.4;
export const HEADER_SKIP_HEIGHT_RATIO = 0.08;
export const BITS_PER_CHANNEL_CANDIDATES = [2, 6, 8];

export class PackedBitReader {
  sourceBytes: Uint8Array;
  bitsPerValue: number;
  valueMask: number;
  readIndex: number;
  bitBuffer: number;
  bufferedBitCount: number;

  constructor(sourceBytes: Uint8Array, bitsPerValue: number) {
    this.sourceBytes = sourceBytes;
    this.bitsPerValue = bitsPerValue;
    this.valueMask = (1 << bitsPerValue) - 1;
    this.readIndex = 0;
    this.bitBuffer = 0;
    this.bufferedBitCount = 0;
  }

  readBytes(length: number): Uint8Array {
    const output = new Uint8Array(length);
    for (let index = 0; index < length; index++) {
      output[index] = this.readByte();
    }
    return output;
  }

  readByte(): number {
    while (this.bufferedBitCount < 8) {
      if (this.readIndex >= this.sourceBytes.length) {
        throw new Error('EOS');
      }
      const nextValue = this.sourceBytes[this.readIndex++] & this.valueMask;
      this.bitBuffer = (this.bitBuffer << this.bitsPerValue) | nextValue;
      this.bufferedBitCount += this.bitsPerValue;
    }
    const remainingBits = this.bufferedBitCount - 8;
    const outputByte = (this.bitBuffer >>> remainingBits) & 0xff;
    this.bufferedBitCount -= 8;
    this.bitBuffer &= (1 << this.bufferedBitCount) - 1;
    return outputByte;
  }
}

export function areBytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) {
    return false;
  }
  for (let index = 0; index < left.length; index++) {
    if (left[index] !== right[index]) {
      return false;
    }
  }
  return true;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function xorDecryptPayload(
  encryptedBytes: Uint8Array,
  password: string,
  saltBytes: Uint8Array
): Promise<Uint8Array> {
  const keystream = new Uint8Array(encryptedBytes.length);
  const passwordSaltBytes = new TextEncoder().encode(password + bytesToHex(saltBytes));
  let writeOffset = 0;
  let blockIndex = 0;

  while (writeOffset < encryptedBytes.length) {
    const counterBytes = new TextEncoder().encode(String(blockIndex));
    const digestInput = new Uint8Array(passwordSaltBytes.length + counterBytes.length);
    digestInput.set(passwordSaltBytes);
    digestInput.set(counterBytes, passwordSaltBytes.length);

    const digestBuffer = await crypto.subtle.digest('SHA-256', digestInput);
    const digestBytes = new Uint8Array(digestBuffer);
    const chunkLength = Math.min(32, encryptedBytes.length - writeOffset);
    keystream.set(digestBytes.subarray(0, chunkLength), writeOffset);
    writeOffset += chunkLength;
    blockIndex++;
  }

  const decrypted = new Uint8Array(encryptedBytes.length);
  for (let index = 0; index < encryptedBytes.length; index++) {
    decrypted[index] = encryptedBytes[index] ^ keystream[index];
  }
  return decrypted;
}

export async function restoreBinPngPayload(pngBytes: Uint8Array): Promise<Uint8Array> {
  const blob = new Blob([pngBytes], { type: 'image/png' });
  const imageBitmap = await createImageBitmap(blob, {
    colorSpaceConversion: 'none',
  });

  try {
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) throw new Error('Falha ao obter contexto 2D para restaurar binpng');

    context.drawImage(imageBitmap, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const rgbaBytes = imageData.data;
    const rgbBytes = new Uint8Array(canvas.width * canvas.height * 3);
    let writeOffset = 0;

    for (let index = 0; index < rgbaBytes.length; index += 4) {
      rgbBytes[writeOffset++] = rgbaBytes[index];
      rgbBytes[writeOffset++] = rgbaBytes[index + 1];
      rgbBytes[writeOffset++] = rgbaBytes[index + 2];
    }

    let actualLength = rgbBytes.length;
    while (actualLength > 0 && rgbBytes[actualLength - 1] === 0) {
      actualLength--;
    }
    return rgbBytes.subarray(0, actualLength);
  } finally {
    if (typeof imageBitmap.close === 'function') {
      imageBitmap.close();
    }
  }
}

export function extractRgbPayload(
  rgbaBytes: Uint8ClampedArray | Uint8Array,
  width: number,
  height: number,
  skipWidth: number,
  skipHeight: number
): Uint8Array {
  const rgbByteCount = (width * height - skipWidth * skipHeight) * 3;
  const extracted = new Uint8Array(rgbByteCount);
  let writeOffset = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (y < skipHeight && x < skipWidth) {
        continue;
      }
      const pixelOffset = (y * width + x) * 4;
      extracted[writeOffset++] = rgbaBytes[pixelOffset];
      extracted[writeOffset++] = rgbaBytes[pixelOffset + 1];
      extracted[writeOffset++] = rgbaBytes[pixelOffset + 2];
    }
  }
  return extracted;
}

export async function decodeEmbeddedFile(
  stegoBytes: Uint8Array,
  bitsPerChannel: number,
  password?: string
): Promise<{ ext: string; data: Uint8Array; isEncrypted: boolean }> {
  const reader = new PackedBitReader(stegoBytes, bitsPerChannel);
  const packedLengthBytes = reader.readBytes(4);
  const packedLength = new DataView(
    packedLengthBytes.buffer,
    packedLengthBytes.byteOffset,
    packedLengthBytes.byteLength
  ).getUint32(0, false);

  if (packedLength === 0 || packedLength > stegoBytes.length) {
    throw new Error(`Invalid length: ${packedLength}`);
  }

  const headerAndFileBytes = reader.readBytes(packedLength);
  let offset = 0;
  if (offset >= headerAndFileBytes.length) {
    throw new Error('Empty blob');
  }

  const isEncrypted = headerAndFileBytes[offset++] === 1;
  let storedPasswordDigest: Uint8Array | null = null;
  let saltBytes: Uint8Array | null = null;

  if (isEncrypted) {
    if (offset + 48 > headerAndFileBytes.length) {
      throw new Error('Header too short for auth');
    }
    storedPasswordDigest = headerAndFileBytes.slice(offset, offset + 32);
    offset += 32;
    saltBytes = headerAndFileBytes.slice(offset, offset + 16);
    offset += 16;
  }

  if (offset >= headerAndFileBytes.length) {
    throw new Error('Header too short for ext len');
  }

  const extensionLength = headerAndFileBytes[offset++];
  if (offset + extensionLength > headerAndFileBytes.length) {
    throw new Error('Header too short for ext');
  }

  const extensionBytes = headerAndFileBytes.slice(offset, offset + extensionLength);
  const rawExtension = new TextDecoder().decode(extensionBytes);
  offset += extensionLength;

  if (offset + 4 > headerAndFileBytes.length) {
    throw new Error('Header too short for data len');
  }

  const payloadLength = new DataView(
    headerAndFileBytes.buffer,
    headerAndFileBytes.byteOffset,
    headerAndFileBytes.byteLength
  ).getUint32(offset, false);
  offset += 4;

  const fileBytes = headerAndFileBytes.slice(offset);
  if (fileBytes.length !== payloadLength) {
    throw new Error(`Data length mismatch (${fileBytes.length} vs ${payloadLength})`);
  }

  let decodedBytes = fileBytes;

  if (isEncrypted) {
    if (!password || password.trim().length === 0) {
      throw new DuckPasswordRequiredError('Este arquivo está protegido por senha.', bitsPerChannel, rawExtension);
    }

    const saltHex = bytesToHex(saltBytes!);
    const passwordMaterial = new TextEncoder().encode(password + saltHex);
    const digestBuffer = await crypto.subtle.digest('SHA-256', passwordMaterial);
    const passwordDigest = new Uint8Array(digestBuffer);

    if (!areBytesEqual(passwordDigest, storedPasswordDigest!)) {
      throw new DuckInvalidPasswordError('Senha incorreta. Verifique e tente novamente.', bitsPerChannel, rawExtension);
    }

    decodedBytes = await xorDecryptPayload(fileBytes, password, saltBytes!);
  }

  // Verificar se é contêiner .binpng (vídeo empacotado em RGB)
  let cleanExt = (rawExtension || '').toLowerCase().trim();
  if (cleanExt.startsWith('.')) {
    cleanExt = cleanExt.slice(1);
  }

  if (cleanExt.endsWith('binpng') || cleanExt === 'binpng') {
    try {
      decodedBytes = await restoreBinPngPayload(decodedBytes);
      const stripped = cleanExt.replace(/\.?binpng$/i, '');
      cleanExt = stripped && stripped !== '.' ? stripped : 'mp4';
    } catch {
      // Manter como está caso falhe a restauração
    }
  }

  return {
    ext: cleanExt || 'bin',
    data: decodedBytes,
    isEncrypted,
  };
}

export interface DecodeOutcome {
  data: Uint8Array;
  ext: string;
  kBits: number;
  dimensions: { width: number; height: number };
  durationMs: number;
  isEncrypted?: boolean;
}

export async function decodeDuckFile(file: File, password?: string): Promise<DecodeOutcome> {
  const startTime = performance.now();
  if (!/\.png$/i.test(file.name) && file.type !== 'image/png') {
    throw new Error('O formato Duck esteganográfico requer arquivos PNG.');
  }

  const imageBitmap = await createImageBitmap(file, {
    colorSpaceConversion: 'none',
  });

  try {
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) throw new Error('Falha ao inicializar o contexto gráfico 2D.');

    context.drawImage(imageBitmap, 0, 0);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    const skipWidth = Math.floor(canvas.width * HEADER_SKIP_WIDTH_RATIO);
    const skipHeight = Math.floor(canvas.height * HEADER_SKIP_HEIGHT_RATIO);
    const stegoBytes = extractRgbPayload(
      imageData.data,
      canvas.width,
      canvas.height,
      skipWidth,
      skipHeight
    );

    let passwordRequiredError: DuckPasswordRequiredError | null = null;
    let invalidPasswordError: DuckInvalidPasswordError | null = null;
    let lastError: Error | null = null;

    for (const bitsPerChannel of BITS_PER_CHANNEL_CANDIDATES) {
      try {
        const result = await decodeEmbeddedFile(stegoBytes, bitsPerChannel, password);
        const durationMs = Math.round(performance.now() - startTime);

        return {
          data: result.data,
          ext: result.ext,
          kBits: bitsPerChannel,
          dimensions: { width: canvas.width, height: canvas.height },
          durationMs,
          isEncrypted: result.isEncrypted,
        };
      } catch (err: unknown) {
        if (err instanceof DuckInvalidPasswordError) {
          invalidPasswordError = err;
          break; // O bit-depth bateu e a senha está incorreta, não adianta testar outros
        }
        if (err instanceof DuckPasswordRequiredError) {
          passwordRequiredError = err;
          break; // O bit-depth bateu e o arquivo pede senha
        }
        lastError = err instanceof Error ? err : new Error(String(err));
      }
    }

    if (invalidPasswordError) {
      throw invalidPasswordError;
    }
    if (passwordRequiredError) {
      throw passwordRequiredError;
    }

    throw lastError || new Error('Nenhum payload Duck detectado nesta imagem.');
  } finally {
    if (typeof imageBitmap.close === 'function') {
      imageBitmap.close();
    }
  }
}

// Helpers mantidos para compatibilidade retroativa
function u32be(b: Uint8Array, o = 0): number {
  return (((b[o] << 24) >>> 0) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3]) >>> 0;
}

function bytesToAscii(bytes: Uint8Array): string {
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

function bitsFromValues(values: number[], k: number): Uint8Array {
  const out = new Uint8Array(values.length * k);
  let p = 0;
  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    for (let bit = k - 1; bit >= 0; bit--) {
      out[p++] = (v >> bit) & 1;
    }
  }
  return out;
}

function bitsToBytes(bits: Uint8Array): Uint8Array {
  const n = Math.floor(bits.length / 8);
  const out = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    let v = 0;
    for (let j = 0; j < 8; j++) {
      v = (v << 1) | bits[i * 8 + j];
    }
    out[i] = v;
  }
  return out;
}

export async function imageToRGB(file: File): Promise<{ rgb: Uint8Array; w: number; h: number }> {
  const bitmap = await createImageBitmap(file, { colorSpaceConversion: 'none' });
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    bitmap.close?.();
    throw new Error('Falha ao inicializar o contexto gráfico 2D.');
  }

  ctx.drawImage(bitmap, 0, 0);
  const im = ctx.getImageData(0, 0, bitmap.width, bitmap.height);
  bitmap.close?.();

  const rgb = new Uint8Array(canvas.width * canvas.height * 3);
  let p = 0;
  for (let i = 0; i < im.data.length; i += 4) {
    rgb[p++] = im.data[i];
    rgb[p++] = im.data[i + 1];
    rgb[p++] = im.data[i + 2];
  }
  return { rgb, w: canvas.width, h: canvas.height };
}

export function extractPayload(rgb: Uint8Array, w: number, h: number, k: number): Uint8Array {
  const skipW = Math.floor(w * 0.40);
  const skipH = Math.floor(h * 0.08);
  const values: number[] = [];
  const mask = (1 << k) - 1;

  for (let y = 0; y < h; y++) {
    const row = y * w * 3;
    for (let x = 0; x < w; x++) {
      if (y < skipH && x < skipW) continue;
      const p = row + x * 3;
      values.push(rgb[p] & mask);
      values.push(rgb[p + 1] & mask);
      values.push(rgb[p + 2] & mask);
    }
  }

  if (values.length * k < 32) {
    throw new Error('A imagem não contém bits suficientes para o cabeçalho.');
  }

  const bits = bitsFromValues(values, k);
  const headerLen = u32be(bitsToBytes(bits.slice(0, 32)));

  if (headerLen <= 0 || 32 + headerLen * 8 > bits.length) {
    throw new Error('Tamanho dos dados incorporados inválido ou corrompido.');
  }

  return bitsToBytes(bits.slice(32, 32 + headerLen * 8));
}

export function parseHeader(header: Uint8Array): { data: Uint8Array; ext: string } {
  let idx = 0;
  if (header.length < 1) {
    throw new Error('Cabeçalho de dados vazio ou corrompido.');
  }

  const hasPwd = header[idx++] === 1;
  if (hasPwd) {
    throw new DuckPasswordRequiredError('Esta imagem está protegida por senha.');
  }

  if (idx >= header.length) {
    throw new Error('Cabeçalho corrompido.');
  }

  const extLen = header[idx++];
  if (header.length < idx + extLen + 4) {
    throw new Error('Comprimento de extensão de arquivo inválido.');
  }

  const ext = bytesToAscii(header.slice(idx, idx + extLen)).replace(/[^a-zA-Z0-9._-]/g, '');
  idx += extLen;

  const dataLen = u32be(header, idx);
  idx += 4;

  const data = header.slice(idx);
  if (data.length !== dataLen) {
    throw new Error(`Inconsistência no tamanho dos dados (${data.length} bytes vs esperado ${dataLen}).`);
  }

  return { data, ext: ext || 'bin' };
}

export async function normalizePayload(data: Uint8Array, ext: string): Promise<{ data: Uint8Array; ext: string }> {
  let e = ext.toLowerCase().replace(/^\./, '');
  if (e.endsWith('.binpng') || e === 'binpng') {
    const restored = await restoreBinPngPayload(data);
    const cleanExt = e.replace(/\.?binpng$/i, '') || 'mp4';
    return { data: restored, ext: cleanExt };
  }
  return { data, ext: e || 'bin' };
}

export function getMimeType(ext: string): string {
  const e = ext.toLowerCase().replace(/^\./, '');
  const mimeMap: Record<string, string> = {
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    webp: 'image/webp',
    gif: 'image/gif',
    bmp: 'image/bmp',
    avif: 'image/avif',
    svg: 'image/svg+xml',
    mp4: 'video/mp4',
    webm: 'video/webm',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    txt: 'text/plain',
    json: 'application/json',
    csv: 'text/csv',
    html: 'text/html',
    pdf: 'application/pdf',
    zip: 'application/zip',
  };
  return mimeMap[e] || 'application/octet-stream';
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

// Retorno sonoro suave com Web Audio API
let audioCtx: AudioContext | null = null;

export function playCyberTone(type: 'click' | 'success' | 'error', muted = false) {
  if (muted) return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(980, now + 0.12);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    }
  } catch {
    // Silencioso em caso de restrição de áudio do navegador
  }
}
