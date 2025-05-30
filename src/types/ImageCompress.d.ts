
export interface CompressImageParams {
  fileInputPath: string
  outputPath?: string
  quality?: number // optional, 0-100
}

export interface CropImageParams {
  inputPath: string
  outputPath: string
  width: number
  height: number
  left: number
  top: number
}

export interface SaveImageParams {
  sourcePath: string
  savePath: string
}

export interface IpcResponse<T = object> {
  code: StatusCode
  message: string
  data?: T
}

export interface FileInfo {
  fileBuffer: Buffer,
  fileOriginalSize: number
  fileInputPath: string
  fileName: string
  fileSize: number
  fileFormat: string
  fileNameWithFormat: string
  fileBase64?: string // optional, base64 encoded string
}

export type ImageReponseType<T> = IpcResponse<IpcResponse['code'] extends StatusCode.SUCCESS ? T : null>

export interface ImageCompressApi {
  selectSavePath: () => Promise<ImageReponseType<{ path: string }>>
  getSavePath: () => Promise<ImageReponseType<string>>
  setSavePath: (path: string) => Promise<IpcResponse>
  // compressImage: (params: CompressImageParams) => Promise<ImageReponseType<FileInfo>>
  // compressImage: (_event: Electron.IpcMainInvokeEvent, params: CompressImageParams) => Promise<ImageReponseType<FileInfo>>
  compressImage: {
    (_event: Electron.IpcMainInvokeEvent, params: CompressImageParams): Promise<ImageReponseType<FileInfo>>
    (_event: Electron.IpcMainInvokeEvent, params: CompressImageParams): Promise<ImageReponseType<FileInfo>>
  };
  cropImage: (params: CropImageParams) => Promise<IpcResponse>
  saveImage: (params: SaveImageParams) => Promise<IpcResponse>
  selectImage: () => Promise<ImageReponseType<string[]>>
  downloadImage: (fileBuffer: Buffer, fileName: string) => Promise<IpcResponse>
}
