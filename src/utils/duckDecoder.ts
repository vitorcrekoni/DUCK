/**
 * Duck Decoder Engine
 * Compatível com o formato público SS_tools LSB (sem senha).
 * Testa automaticamente 2, 6 e 8 bits por canal (LSB).
 * Suporta payloads .binpng (vídeos mp4 e dados em canvas RGB).
 */

function u32be(b: Uint8Array, o = 0): number {
  return (((b[o] << 24) >>> 0) | (b[o + 1] << 16) | (b[o + 2] << 8) | b[o + 3]) >>> 0;
}

function bytesToAscii(bytes: Uint8Array): string {
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}

function bitsFromValues(values: number[], k: number): Uint8Array {
  // For an 8-bit value, the last k bits are simply its k-bit binary representation.
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
  const bitmap = await createImageBitmap(file);
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

  // The SS_tools Python implementation flattens HxWx3 without alpha in pixel order.
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
    throw new Error('Esta imagem está protegida por senha (suporte a senha não disponível no formato público).');
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

export async function normalizePayload(data: Uint8Array, ext: string): Promise<{ data: Uint8Array; ext: string }> {
  let e = ext.toLowerCase().replace(/^\./, '');
  if (e.endsWith('.binpng') || e === 'binpng') {
    const bitmap = await createImageBitmap(new Blob([data], { type: 'image/png' }));
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Falha ao decodificar contêiner binpng');
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close?.();

    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const rgb = new Uint8Array(Math.floor(d.length / 4) * 3);
    let p = 0;
    for (let i = 0; i < d.length; i += 4) {
      rgb[p++] = d[i];
      rgb[p++] = d[i + 1];
      rgb[p++] = d[i + 2];
    }

    let end = rgb.length;
    while (end > 0 && rgb[end - 1] === 0) end--;
    const cleanExt = e.replace(/\.?binpng$/i, '') || 'mp4';
    return { data: rgb.slice(0, end), ext: cleanExt };
  }
  return { data, ext: e || 'bin' };
}

export interface DecodeOutcome {
  data: Uint8Array;
  ext: string;
  kBits: number;
  dimensions: { width: number; height: number };
  durationMs: number;
}

export async function decodeDuckFile(file: File): Promise<DecodeOutcome> {
  const startTime = performance.now();
  if (!/\.png$/i.test(file.name) && file.type !== 'image/png') {
    throw new Error('O formato Duck esteganográfico requer arquivos PNG.');
  }

  const { rgb, w, h } = await imageToRGB(file);
  let lastError: Error | null = null;

  // O formato Duck testa 2, 6 e 8 bits por canal
  for (const k of [2, 6, 8]) {
    try {
      const rawHeader = extractPayload(rgb, w, h, k);
      const parsed = parseHeader(rawHeader);
      const normalized = await normalizePayload(parsed.data, parsed.ext);
      const durationMs = Math.round(performance.now() - startTime);

      return {
        data: normalized.data,
        ext: normalized.ext,
        kBits: k,
        dimensions: { width: w, height: h },
        durationMs,
      };
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw lastError || new Error('Nenhum payload Duck detectado nesta imagem.');
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

// Subtle cybernetic audio feedback (optional Web Audio API synthesizer)
let audioCtx: AudioContext | null = null;

export function playCyberTone(type: 'click' | 'success' | 'error', muted = false) {
  if (muted) return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
    // Graceful fallback if audio is restricted
  }
}
