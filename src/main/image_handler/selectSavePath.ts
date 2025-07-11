import { dialog } from "electron";
import type ImageCompressApi from "../../types/image-compress"
import { StatusCode } from "../../assets/constant";


const selectSavePath: ImageCompressApi['selectSavePathWithEvent'] = async (_event) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
  })
  if (canceled) {
    return {
      code: StatusCode.CANCEL,
      message: '取消选择',

    };
  } else {
    const selectedPath = filePaths[0];
    return {
      code: StatusCode.SUCCESS,
      message: '选择成功',
      data: {
        path: selectedPath
      }
    };
  }
}

export default selectSavePath;