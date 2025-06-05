import sharp from "sharp"
import { getFileInfo, getFileSize, supportedImageFormats } from "./utils"
import path from "path"
import ImageCompressApi from "../../types/imageCompress"
import { StatusCode } from "../../assets/constant"


const compressImage: ImageCompressApi['compressImageWithEvent'] = async (_event, params) => {
  try {
    const { fileInputPath, quality = 80 } = params
    const fileOringSize = await getFileSize(fileInputPath)
    const fileInfo = await getFileInfo(fileInputPath)
    const fileFormat = fileInfo.format ?? ''

    if (!supportedImageFormats.includes(fileFormat)) {
      return {
        code: StatusCode.ERROR,
        message: fileFormat ? `不支持${fileFormat}图片格式` : '无法获取图片格式',
      }
    }

    const fileBuffer = await sharp(fileInputPath)
    [fileFormat]({ quality, })
      .toBuffer()

    const fileNameWithFormat = path.basename(fileInputPath)
    const fileName = path.parse(fileNameWithFormat).name

    return {
      code: StatusCode.SUCCESS,
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
      code: StatusCode.ERROR,
      message: '压缩失败',
    }
  }
}

export default compressImage