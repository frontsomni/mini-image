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
import path from 'path'

// 获取上传的图片压缩前字节大小
async function getFileSize(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats.size)
      }
    })
  }
  )
}

// 获取文件信息
async function getFileInfo(filePath: string): Promise<sharp.Metadata> {
  return new Promise((resolve, reject) => {
    sharp(filePath)
      .metadata()
      .then((metadata) => {
        resolve(metadata)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 压缩图片
export async function compressImage(_event: Electron.IpcMainInvokeEvent, params: CompressImageParams): Promise<IpcResponse> {
  try {
    const { fileInputPath, quality = 80 } = params
    const fileOringSize = await getFileSize(fileInputPath)
    const fileInfo = await getFileInfo(fileInputPath)
    const fileBuffer = await sharp(fileInputPath)
      .jpeg({ quality, })
      .toBuffer()

    const fileFullName = path.basename(fileInputPath)
    const fileName = path.parse(fileFullName).name
    return {
      code: 1,
      data: {
        fileBase64: fileBuffer.toString('base64'),
        fileInputPath,
        fileName,
        fileOriginalSize: fileOringSize,
        fileSize: fileBuffer.length,
        fileSuffix: fileInfo.format,
        fileFullName,
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
export async function cropImage(_event: Electron.IpcMainInvokeEvent, params: CropImageParams): Promise<IpcResponse> {
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
export async function saveImage(_event: Electron.IpcMainInvokeEvent, params: SaveImageParams): Promise<IpcResponse> {
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

const handleList = {
  [Channels.COMPRESS_FILE]: compressImage,
  [Channels.CROP_FILE]: cropImage,
  [Channels.SAVE_FILE]: saveImage,
  [Channels.SELECT_FILE]: selectFile,
  [Channels.SELECT_DIRECTORY]: selectDirectory,
}

export default function registerImageHandlers() {
  // 注册 IPC 通道
  Object.entries(handleList).forEach(([channel, handler]) => {
    ipcMain.handle(channel, handler)
  })
}
