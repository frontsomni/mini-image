import { StatusCode } from "../../assets/constant"
import type ImageCompressApi from "../../types/image-compress"
import store from "../store"

const setSavePath: ImageCompressApi['setSavePathWithEvent'] = async (_event, path) => {
  console.log('设置保存路径:', path)
  if (!path) {
    return {
      code: StatusCode.ERROR,
      message: '保存路径不能为空',
    }
  }
  // 更新 store 中的保存路径
  store.set('savePath', path)
  return {
    code: StatusCode.SUCCESS,
    message: '设置保存路径成功',
    data: {
      path
    }
  }
}

export default setSavePath