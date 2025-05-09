import sharp from 'sharp'
import fs from 'fs'
import {
  CompressImageParams,
  CropImageParams,
  SaveImageParams,
  IpcResponse
} from '../types/ImageCompress'
import { dialog } from 'electron'

// 压缩图片
export async function compressImage(params: CompressImageParams): Promise<IpcResponse> {
  try {
    await sharp(params.inputPath)
      .jpeg({ quality: params.quality ?? 80 })
      .toFile(params.outputPath)

    return { success: true, outputPath: params.outputPath }
  } catch (error) {
    return { success: false, error: (error as Error).message }
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

    return { success: true, outputPath: params.outputPath }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

// 保存图片（复制文件）
export async function saveImage(params: SaveImageParams): Promise<IpcResponse> {
  try {
    fs.copyFileSync(params.sourcePath, params.savePath)
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
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
