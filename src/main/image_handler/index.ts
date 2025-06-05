import { ipcMain } from 'electron'
import cropImage from "./cropImage";
import compressImage from "./compressImage";
import saveImage from "./saveImage";
import selectFile from "./selectImage";
import downloadFile from "./downloadImage";
import { Channels } from '../../assets/constant';
import selectSavePath from './selectSavePath';

const handleList = {
  [Channels.COMPRESS_IMAGE]: compressImage,
  [Channels.CROP_IMAGE]: cropImage,
  [Channels.SAVE_IMAGE]: saveImage,
  [Channels.SELECT_IMAGE]: selectFile,
  [Channels.DOWNLOAD_IMAGE]: downloadFile,
  [Channels.SELECT_SAVE_PATH]: selectSavePath
}

export default function registerImageHandlers() {
  // 注册 IPC 通道
  Object.entries(handleList).forEach(([channel, handler]) => {
    ipcMain.handle(channel, handler)
  })
}
