import sharp from "sharp"
import { getFileInfo, getFileSize, supportedImageFormats } from "./utils"
import path from "path"
import { CompressImageParams, FileInfo, IpcResponse, } from "../../types/imageCompress"
import { StatusCode } from "../../assets/constant"

export default async function compressImage(_event: Electron.IpcMainInvokeEvent, params: CompressImageParams): Promise<IpcResponse<FileInfo | object>> {
  try {
    const { fileInputPath, quality = 80 } = params
    const fileOringSize = await getFileSize(fileInputPath)
    const fileInfo = await getFileInfo(fileInputPath)
    const fileFormat = fileInfo.format ?? ''

    if (!supportedImageFormats.includes(fileFormat)) {
      return {
        code: StatusCode.ERROR,
        message: fileFormat ? `不支持${fileFormat}图片格式` : '无法获取图片格式',
        data: {}
      }
    }

    const fileBuffer = await sharp(fileInputPath)
    [fileFormat]({ quality, })
      .toBuffer()

    const fileNameWithFormat = path.basename(fileInputPath)
    const fileName = path.parse(fileNameWithFormat).name

    return {
      code: 1,
      data: {
        fileBuffer,
        fileInputPath,
        fileName,
        fileOriginalSize: fileOringSize,
        fileSize: fileBuffer.length,
        fileFormat: fileInfo.format ?? '',
        fileNameWithFormat,
      },
      message: '压缩成功'
    }
  } catch (error) {
    return {
      code: 2,
      message: '压缩失败',
      data: {}
    }
  }
}