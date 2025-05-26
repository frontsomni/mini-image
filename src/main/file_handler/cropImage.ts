import sharp from "sharp"
import { CropImageParams, IpcResponse, StatusCode } from "../../types/ImageCompress"

// 裁剪文件
export default async function cropImage(_event: Electron.IpcMainInvokeEvent, params: CropImageParams): Promise<IpcResponse> {
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
      data: {}
    }
  }
}