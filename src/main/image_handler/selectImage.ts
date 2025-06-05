import { dialog } from "electron"
import ImageCompressApi from "../../types/imageCompress"
import { StatusCode } from "../../assets/constant"

const selectImage: ImageCompressApi['selectImageWithEvent'] = async (_event) => {
  try {
    const result = await dialog.showOpenDialog({
      title: '选择图片文件',
      properties: ['openFile', 'multiSelections',],
      filters: [{ name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'webp'] }]
    })

    if (result.canceled) {
      return {
        code: StatusCode.CANCEL,
        message: '用户取消选择',
      }
    }

    return {
      code: StatusCode.SUCCESS,
      message: '选择成功',
      data: result.filePaths
    }
  } catch (error) {
    return {
      code: StatusCode.ERROR,
      message: '选择失败',
    }
  }
}


export default selectImage