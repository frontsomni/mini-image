import { ElectronAPI } from '@electron-toolkit/preload'
import type ImageCompressApi from './image-compress'

// 全局扩展声明
declare global {
  interface Window {
    electron: ElectronAPI
    api: ImageCompressApi
    electronAPI: ImageCompressApi
  }
}
