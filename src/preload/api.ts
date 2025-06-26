import { ipcRenderer } from 'electron'
import type ImageCompressApi from '../types/image-compress'
import { Channels } from '../assets/constant'

// 图片压缩相关接口
const compressImage: ImageCompressApi['compressImage'] = (params) => {
  return ipcRenderer.invoke(Channels.COMPRESS_IMAGE, params)
}

const cropImage: ImageCompressApi['cropImage'] = (params) => {
  return ipcRenderer.invoke(Channels.CROP_IMAGE, params)
}

const saveImage: ImageCompressApi['saveImage'] = (params) => {
  return ipcRenderer.invoke(Channels.SAVE_IMAGE, params)
}

const selectImage: ImageCompressApi['selectImage'] = () => {
  return ipcRenderer.invoke(Channels.SELECT_IMAGE)
}

const downloadImage: ImageCompressApi['downloadImage'] = (base64, fileName) => {
  return ipcRenderer.invoke(Channels.DOWNLOAD_IMAGE, base64, fileName)
}

const downloadImagesAsZip: ImageCompressApi['downloadImagesAsZip'] = (files) => {
  return ipcRenderer.invoke(Channels.DOWNLOAD_IMAGES_AS_ZIP, files)
}

const selectSavePath: ImageCompressApi['selectSavePath'] = () => {
  return ipcRenderer.invoke(Channels.SELECT_SAVE_PATH)
}
const getSavePath: ImageCompressApi['getSavePath'] = () => {
  return ipcRenderer.invoke(Channels.GET_SAVE_PATH)
}

const setSavePath: ImageCompressApi['setSavePath'] = (path) => {
  return ipcRenderer.invoke(Channels.SET_SAVE_PATH, path)
}

const removeSavePath: ImageCompressApi['removeSavePath'] = () => {
  return ipcRenderer.invoke(Channels.REMOVE_SAVE_PATH)
}

// Renderer 注册监听器,注册一个就行,根据类型处理不同逻辑
const onMainMessage = (channel, callback) => {
  ipcRenderer.on(channel, (_event, message) => callback(message))
}


export default {
  compressImage,
  cropImage,
  saveImage,
  selectImage,
  downloadImage,
  selectSavePath,
  getSavePath,
  setSavePath,
  removeSavePath,
  onMainMessage,
  downloadImagesAsZip
}
