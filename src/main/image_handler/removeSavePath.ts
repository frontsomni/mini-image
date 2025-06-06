import { StatusCode } from "../../assets/constant"
import ImageCompressApi from "../../types/imageCompress"
import store from "../store"

const removeSavePath: ImageCompressApi['removeSavePathWithEvent'] = async (_event) => {
  store.delete('savePath')
  return {
    code: StatusCode.SUCCESS,
    message: '清除保存路径成功',
  }
}

export default removeSavePath
