// 下载图片
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import ImageCompressApi from '../../types/imageCompress';
import { getUniqueFileName } from './utils';
import { StatusCode } from "../../assets/constant";


const downloadImage: ImageCompressApi['downloadImageWithEvent'] = async (_event, fileBuffer, fileName) => {
  try {
    const downloadDir = app.getPath('downloads');
    const uniqueFileName = getUniqueFileName(downloadDir, fileName);
    const fullPath = path.join(downloadDir, uniqueFileName);

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