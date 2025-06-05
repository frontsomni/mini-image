import { IpcMainEvent, IpcMainInvokeEvent } from "electron"

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

export interface DownloadImageParams {
  fileName: string
}

export interface SelectSavePathParams {
  path: string
}

export default interface ImageCompressApi {
  selectSavePath: () => Promise<ImageReponseType<SelectSavePathParams>>
  selectSavePathWithEvent: (evt: IpcMainInvokeEvent) => Promise<ImageReponseType<SelectSavePathParams>>
  getSavePath: () => Promise<ImageReponseType<string>>
  getSavePathWithEvent: (evt: IpcMainInvokeEvent) => Promise<ImageReponseType<string>>
  setSavePath: (path: string) => Promise<IpcResponse>
  setSavePathWithEvent: (evt: IpcMainInvokeEvent, path: string) => Promise<IpcResponse>
  compressImage: (params: CompressImageParams) => Promise<ImageReponseType<FileInfo>>
  compressImageWithEvent: (evt: IpcMainInvokeEvent, params: CompressImageParams) => Promise<ImageReponseType<FileInfo>>
  cropImage: (params: CropImageParams) => Promise<IpcResponse>
  cropImageWithEvent: (evt: IpcMainInvokeEvent, params: CropImageParams) => Promise<IpcResponse>
  saveImage: (params: SaveImageParams) => Promise<IpcResponse>
  saveImageWithEvent: (evt: IpcMainInvokeEvent, params: SaveImageParams) => Promise<IpcResponse>
  selectImage: () => Promise<ImageReponseType<string[]>>
  selectImageWithEvent: (evt: IpcMainInvokeEvent) => Promise<ImageReponseType<string[]>>
  downloadImage: (fileBuffer: Buffer, fileName: string) => Promise<ImageReponseType<DownloadImageParams>>
  downloadImageWithEvent: (evt: IpcMainInvokeEvent, fileBuffer: Buffer, fileName: string) => Promise<ImageReponseType<DownloadImageParams>>
}
