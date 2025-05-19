import { ipcRenderer } from 'electron'
import {
  CompressImageParams,
  CropImageParams,
  IpcResponse,
  SaveImageParams
} from '../types/ImageCompress'
import Channels from '../assets/channels'

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

export default {
  compressFile,
  cropImage,
  saveImage,
  selectFile,
  selectDirectory
}
