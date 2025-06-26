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

// 返回值类型
export type ImageReponseType<T = IpcResponse> = Promise<T<T['code'] extends StatusCode.SUCCESS ? T : null>>

export interface DownloadImageParams {
  fileName: string
}

export interface SelectSavePathParams {
  path: string
}

export type downloadImagesAsZipParams = Pick<FileInfo, 'fileBuffer' | 'fileNameWithFormat'>[]

export default interface ImageCompressApi {
  selectSavePath: () => ImageReponseType<SelectSavePathParams>
  selectSavePathWithEvent: (evt: IpcMainInvokeEvent) => ImageReponseType<SelectSavePathParams>
  removeSavePath: () => ImageReponseType
  removeSavePathWithEvent: (evt: IpcMainInvokeEvent) => ImageReponseType
  getSavePath: () => ImageReponseType<string>
  getSavePathWithEvent: (evt: IpcMainInvokeEvent) => ImageReponseType<string>
  setSavePath: (path: string) => ImageReponseType
  setSavePathWithEvent: (evt: IpcMainInvokeEvent, path: string) => ImageReponseType
  compressImage: (params: CompressImageParams) => ImageReponseType<FileInfo>
  compressImageWithEvent: (evt: IpcMainInvokeEvent, params: CompressImageParams) => ImageReponseType<FileInfo>
  cropImage: (params: CropImageParams) => ImageReponseType
  cropImageWithEvent: (evt: IpcMainInvokeEvent, params: CropImageParams) => ImageReponseType
  saveImage: (params: SaveImageParams) => ImageReponseType
  saveImageWithEvent: (evt: IpcMainInvokeEvent, params: SaveImageParams) => ImageReponseType
  selectImage: () => ImageReponseType<string[]>
  selectImageWithEvent: (evt: IpcMainInvokeEvent) => ImageReponseType<string[]>
  downloadImage: (fileBuffer: Buffer, fileName: string) => ImageReponseType<DownloadImageParams>
  downloadImageWithEvent: (evt: IpcMainInvokeEvent, fileBuffer: Buffer, fileName: string) => ImageReponseType<DownloadImageParams>
  downloadImagesAsZip: (files: downloadImagesAsZipParams) => ImageReponseType<DownloadImageParams>
  downloadImagesAsZipWithEvent: (evt: IpcMainInvokeEvent, files: downloadImagesAsZipParams) => ImageReponseType<DownloadImageParams>
  onMainMessage: (channel: string, callback: (message: any) => void) => void
}
