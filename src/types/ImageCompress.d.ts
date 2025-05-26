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

enum StatusCode {
  SUCCESS = 1,
  ERROR = 2,
  CANCEL = 3,
}

export interface IpcResponse<T = object> {
  code: StatusCode
  message: string
  data: T
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

export type ImageCompressApi = {
  compressFile: (params: CompressImageParams) => Promise<IpcResponse<FileInfo>>
  cropFile: (params: CropImageParams) => Promise<IpcResponse>
  saveFile: (params: SaveImageParams) => Promise<IpcResponse>
  selectFile: () => Promise<IpcResponse>
  selectDirectory: () => Promise<IpcResponse>
  downloadFile: (fileBuffer: Buffer, fileName: string) => Promise<IpcResponse>
}
