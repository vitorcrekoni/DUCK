export interface DecodedResult {
  id: string;
  originalFileName: string;
  originalFileSize: number;
  extractedExt: string;
  mimeType: string;
  data: Uint8Array;
  blobUrl: string;
  isImage: boolean;
  isVideo: boolean;
  isAudio: boolean;
  isText: boolean;
  textPreview?: string;
  kBits?: number;
  dimensions?: { width: number; height: number };
  processingTimeMs: number;
  status: 'processing' | 'success' | 'error';
  errorMessage?: string;
  timestamp: number;
}

export interface ContactConfig {
  whatsappNumber: string;
  whatsappMessage: string;
  instagramHandle: string;
}
