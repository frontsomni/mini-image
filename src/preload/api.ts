import { ipcRenderer } from "electron"
import { CompressImageParams, CropImageParams, IpcResponse, SaveImageParams, } from "../types/ImageCompress"

// 图片压缩相关接口
function compressImage(params: CompressImageParams): Promise<IpcResponse> {
  return ipcRenderer.invoke('compress-image', params)
}

function cropImage(params: CropImageParams): Promise<IpcResponse> {
  return ipcRenderer.invoke('crop-image', params)
}

function saveImage(params: SaveImageParams): Promise<IpcResponse> {
  return ipcRenderer.invoke('save-image', params)
}

function selectFile(): Promise<string[]> {
  return ipcRenderer.invoke('select-file')
}

function selectDirectory(): Promise<string> {
  return ipcRenderer.invoke('select-directory')
}


export default {
  compressImage,
  cropImage,
  saveImage,
  selectFile,
  selectDirectory
}