import { StatusCode } from "../../assets/constant"
import ImageCompressApi from "../../types/imageCompress"
import store from "../store"

const getSavePath: ImageCompressApi['getSavePathWithEvent'] = async (_event) => {
  return {
    code: StatusCode.SUCCESS, // Assuming 0 is the success code
    message: '获取保存路径成功',
    data: store.get('savePath') || '', // Return the save path from the store, or an empty string if not set
  }
}

export default getSavePath