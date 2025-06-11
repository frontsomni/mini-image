import sharp from "sharp"
import type ImageCompressApi from "../../types/image-compress"
import { StatusCode } from "../../assets/constant"

// 裁剪文件
const cropImage: ImageCompressApi['cropImageWithEvent'] = async (_event, params) => {
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
      code: StatusCode.SUCCESS,
      message: '裁剪成功',
      data: {}
    }
  } catch (error) {
    return {
      code: StatusCode.ERROR,
      message: '裁剪失败',
    }
  }
}

export default cropImage