import fs from 'fs'

import { IpcResponse, SaveImageParams } from "../../types/ImageCompress"

// 保存图片（复制文件）
export default async function saveImage(_event: Electron.IpcMainInvokeEvent, params: SaveImageParams): Promise<IpcResponse> {
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