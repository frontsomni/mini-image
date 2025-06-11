import { StatusCode } from "../../assets/constant"
import type ImageCompressApi from "../../types/image-compress"
import store from "../store"

const getSavePath: ImageCompressApi['getSavePathWithEvent'] = async (_event) => {
  const path = store.get('savePath')
  if (path) {
    return {
      code: StatusCode.SUCCESS, // Assuming 0 is the success code
      message: '获取保存路径成功',
      data: path, // Return the save path from the store, or an empty string if not set
    }
  } else {
    return {
      code: StatusCode.ERROR, // Assuming 1 is the error code
      message: '保存路径未设置',
    }
  }

}

export default getSavePath