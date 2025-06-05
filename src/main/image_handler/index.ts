import { ipcMain } from 'electron'
import cropImage from "./cropImage";
import compressImage from "./compressImage";
import saveImage from "./saveImage";
import downloadImage from "./downloadImage";
import { Channels } from '../../assets/constant';
import selectSavePath from './selectSavePath';
import selectImage from './selectImage';
import setSavePath from './setSavePath';
import getSavePath from './getSavePath';

const handleList = {
  [Channels.COMPRESS_IMAGE]: compressImage,
  [Channels.CROP_IMAGE]: cropImage,
  [Channels.SAVE_IMAGE]: saveImage,
  [Channels.SELECT_IMAGE]: selectImage,
  [Channels.DOWNLOAD_IMAGE]: downloadImage,
  [Channels.SELECT_SAVE_PATH]: selectSavePath,
  [Channels.SET_SAVE_PATH]: setSavePath,
  [Channels.GET_SAVE_PATH]: getSavePath
}

export default function registerImageHandlers() {
  // 注册 IPC 通道
  Object.entries(handleList).forEach(([channel, handler]) => {
    ipcMain.handle(channel, handler)
  })
}
