import { ipcRenderer } from 'electron'
import {
  CompressImageParams,
  CropImageParams,
  IpcResponse,
  SaveImageParams
} from '../types/imageCompress'
import { Channels } from '../assets/constant'

// 图片压缩相关接口
function compressFile(params: CompressImageParams): Promise<IpcResponse> {
  return ipcRenderer.invoke(Channels.COMPRESS_FILE, params)
}

function cropImage(params: CropImageParams): Promise<IpcResponse> {
  return ipcRenderer.invoke(Channels.CROP_FILE, params)
}

function saveImage(params: SaveImageParams): Promise<IpcResponse> {
  return ipcRenderer.invoke(Channels.SAVE_FILE, params)
}

function selectFile(): Promise<string[]> {
  return ipcRenderer.invoke(Channels.SELECT_FILE)
}

function selectDirectory(): Promise<string> {
  return ipcRenderer.invoke(Channels.SELECT_DIRECTORY)
}

function downloadFile(base64: string, fileName: string): Promise<IpcResponse> {
  return ipcRenderer.invoke(Channels.DOWNLOAD_FILE, base64, fileName)
}

export default {
  compressFile,
  cropImage,
  saveImage,
  selectFile,
  selectDirectory,
  downloadFile
}
