export interface DecodedResult {
  id: string;
  originalFileName: string;
  originalFileSize: number;
  originalFile?: File;
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
  status: 'processing' | 'success' | 'error' | 'requires-password';
  requiresPassword?: boolean;
  passwordError?: string;
  errorMessage?: string;
  timestamp: number;
}

export interface ContactConfig {
  whatsappNumber: string;
  whatsappMessage: string;
  instagramHandle: string;
}
