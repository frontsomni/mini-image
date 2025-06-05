import fs from 'fs'
import ImageCompressApi from "../../types/imageCompress"
import { StatusCode } from "../../assets/constant"

// 保存图片（复制文件）
const saveImage: ImageCompressApi['saveImageWithEvent'] = async (_event, params) => {
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
    }
  }
}


export default saveImage