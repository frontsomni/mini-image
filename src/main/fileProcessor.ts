import { ipcMain } from 'electron'
import Channels from '../assets/channels'
import { compressImage, cropImage, downloadFile, saveImage, selectDirectory, selectFile } from './file_handler'


const handleList = {
  [Channels.COMPRESS_FILE]: compressImage,
  [Channels.CROP_FILE]: cropImage,
  [Channels.SAVE_FILE]: saveImage,
  [Channels.SELECT_FILE]: selectFile,
  [Channels.SELECT_DIRECTORY]: selectDirectory,
  [Channels.DOWNLOAD_FILE]: downloadFile
}

export default function registerImageHandlers() {
  // 注册 IPC 通道
  Object.entries(handleList).forEach(([channel, handler]) => {
    ipcMain.handle(channel, handler)
  })
}
