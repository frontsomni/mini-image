import { StatusCode } from "../../assets/constant"
import type ImageCompressApi from "../../types/image-compress"
import store from "../store"

const removeSavePath: ImageCompressApi['removeSavePathWithEvent'] = async (_event) => {
  store.delete('savePath')
  return {
    code: StatusCode.SUCCESS,
    message: '清除保存路径成功',
  }
}

export default removeSavePath
