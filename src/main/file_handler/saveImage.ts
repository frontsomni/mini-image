import fs from 'fs'

import { IpcResponse, SaveImageParams, StatusCode } from "../../types/ImageCompress"

// 保存图片（复制文件）
export default async function saveImage(_event: Electron.IpcMainInvokeEvent, params: SaveImageParams): Promise<IpcResponse> {
  try {
    fs.copyFileSync(params.sourcePath, params.savePath)
    return {
      code: StatusCode.SUCCESS,
      message: '保存成功',
      data: {}
    }
  } catch (error) {
    return {
      code: StatusCode.ERROR,
      message: '保存失败',
      data: {}
    }
  }
}