import { StatusCode } from "../../assets/constant"
import ImageCompressApi from "../../types/imageCompress"

const getSavePath: ImageCompressApi['getSavePathWithEvent'] = async (_event) => {
  return {
    code: StatusCode.SUCCESS, // Assuming 0 is the success code
    message: '获取保存路径成功',
    data: '323'
  }
}

export default getSavePath