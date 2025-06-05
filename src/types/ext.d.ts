import { ElectronAPI } from '@electron-toolkit/preload'
import ImageCompressApi from './imageCompress'

// 全局扩展声明
declare global {
  interface Window {
    electron: ElectronAPI
    api: ImageCompressApi
    electronAPI: ImageCompressApi
  }
}
