import sharp from 'sharp'
import fs from 'fs'
import {
  CompressImageParams,
  CropImageParams,
  SaveImageParams,
  IpcResponse
} from '../types/ImageCompress'
import { dialog, ipcMain } from 'electron'
import Channels from '../assets/channels'

// 压缩图片
export async function compressImage(params: CompressImageParams): Promise<IpcResponse> {
  try {
    const { fileInputPath, quality = 80 } = params
    const fileBuffer = await sharp(fileInputPath)
      .jpeg({ quality, })
      .toBuffer()
    const fileName = fileInputPath.split('/').pop() ?? ''

    return {
      code: 1,
      data: {
        fileBuffer,
        fileInputPath,
        fileName,
        fileSize: fileBuffer.length,
      },
      message: '压缩成功'
    }
  } catch (error) {
    return {
      code: 2,
      message: '压缩失败',
      data: {
      }
    }
  }
}

// 裁剪图片
export async function cropImage(params: CropImageParams): Promise<IpcResponse> {
  try {
    await sharp(params.inputPath)
      .extract({
        width: params.width,
        height: params.height,
        left: params.left,
        top: params.top
      })
      .toFile(params.outputPath)

    return {
      code: 1,
      message: '裁剪成功',
      data: {}
    }
  } catch (error) {
    return {
      code: 2,
      message: '裁剪失败',
      data: {}
    }
  }
}

// 保存图片（复制文件）
export async function saveImage(params: SaveImageParams): Promise<IpcResponse> {
  try {
    fs.copyFileSync(params.sourcePath, params.savePath)
    return {
      code: 1,
      message: '保存成功',
      data: {}
    }
  } catch (error) {
    return {
      code: 2,
      message: '保存失败',
      data: {}
    }
  }
}

export async function selectDirectory() {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0]
  }
  return null
}

export async function selectFile(): Promise<IpcResponse> {
  try {
    const result = await dialog.showOpenDialog({
      title: '选择图片文件',
      properties: ['openFile', 'multiSelections',],
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'webp'] }]
    })

    if (result.canceled) {
      return {
        code: 2,
        message: '用户取消选择',
        data: {}
      }
    }

    return {
      code: 1,
      message: '选择成功',
      data: result.filePaths
    }
  } catch (error) {
    return {
      code: 2,
      message: '选择失败',
      data: {}
    }
  }
}

export default function registerImageHandlers() {
  // 注册 IPC 通道
  ipcMain.handle(Channels.COMPRESS_FILE, (_event, params: CompressImageParams) => compressImage(params))
  ipcMain.handle(Channels.CROP_FILE, (_event, params: CropImageParams) => cropImage(params))
  ipcMain.handle(Channels.SAVE_FILE, (_event, params: SaveImageParams) => saveImage(params))
  ipcMain.handle(Channels.SELECT_FILE, (_event) => selectFile())

  ipcMain.handle(Channels.SELECT_DIRECTORY, selectDirectory)
}
