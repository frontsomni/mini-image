import { StatusCode } from "../../assets/constant"
import ImageCompressApi from "../../types/imageCompress"


const setSavePath: ImageCompressApi['setSavePathWithEvent'] = async (_event, path) => {
  return {
    code: StatusCode.SUCCESS,
    message: '设置保存路径成功',
    data: {
      path
    }
  }
}

export default setSavePath