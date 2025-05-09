export interface CompressImageParams {
  inputPath: string;
  outputPath: string;
  quality?: number; // optional, 0-100
}

export interface CropImageParams {
  inputPath: string;
  outputPath: string;
  width: number;
  height: number;
  left: number;
  top: number;
}

export interface SaveImageParams {
  sourcePath: string;
  savePath: string;
}


export interface IpcResponse {
  success: boolean;
  outputPath?: string;
  error?: string;
}

export type ImageCompressApi = {
  compressImage: (params: CompressImageParams) => Promise<IpcResponse>
  cropImage: (params: CropImageParams) => Promise<IpcResponse>
  saveImage: (params: SaveImageParams) => Promise<IpcResponse>
  selectFile: () => Promise<string[]>
  selectDirectory: () => Promise<string>
}
