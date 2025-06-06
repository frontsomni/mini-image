// 下载图片
import fs from 'fs';
import path from 'path';
import ImageCompressApi from '../../types/imageCompress';
import { getUniqueFileName } from './utils';
import { StatusCode } from "../../assets/constant";
import selectSavePath from './selectSavePath';
import getSavePath from './getSavePath';
import setSavePath from './setSavePath';

const downloadImage: ImageCompressApi['downloadImageWithEvent'] = async (event, fileBuffer, fileName) => {
  try {
    const { data } = await getSavePath(event)
    let savePath = data ?? '';
    // 未设置保存路径时，提示用户选择保存路径
    if (!savePath) {
      const r = await selectSavePath(event);
      const { code, data } = r

      // 如果用户取消了选择，则返回错误
      if (code !== StatusCode.SUCCESS) {
        return r;
      }
      savePath = data.path;
      await setSavePath(event, savePath);
    }

    // 如果用户选择了保存路径，则更新 store 中的保存路径
    const uniqueFileName = getUniqueFileName(savePath, fileName);
    const fullPath = path.join(savePath, uniqueFileName);

    fs.writeFileSync(fullPath, fileBuffer);

    return {
      message: '下载成功', code: StatusCode.SUCCESS, data: {
        fileName: uniqueFileName,
      }
    };
  } catch (err) {
    return { message: '下载失败', code: StatusCode.ERROR };
  }
}

export default downloadImage;