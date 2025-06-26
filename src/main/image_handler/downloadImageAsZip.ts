// 下载图片
import fs from 'fs';
import path from 'path';
import type ImageCompressApi from "../../types/image-compress"
import { getUniqueFileName } from './utils';
import { StatusCode } from "../../assets/constant";
import selectSavePath from './selectSavePath';
import getSavePath from './getSavePath';
import setSavePath from './setSavePath';
import JSZip from 'jszip';

const downloadImagesAsZip: ImageCompressApi['downloadImagesAsZipWithEvent'] = async (event, files) => {
  let savePath = '';
  try {
    const { data } = await getSavePath(event);
    savePath = data ?? '';
    if (!savePath) {
      const r = await selectSavePath(event);
      const { code, data } = r;
      if (code !== StatusCode.SUCCESS) {
        return r;
      }
      savePath = data.path;
      await setSavePath(event, savePath);
    }

    // 创建 zip
    const zip = new JSZip();
    for (const { fileBuffer, fileNameWithFormat } of files) {
      const uniqueFileName = getUniqueFileName(savePath, fileNameWithFormat);
      zip.file(uniqueFileName, fileBuffer);
    }
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    // 生成 zip 文件名
    const zipFileName = `mini_image_compressed_${Date.now()}.zip`;
    const fullZipPath = path.join(savePath, zipFileName);

    fs.writeFileSync(fullZipPath, zipBuffer);

    return {
      message: '批量下载成功', code: StatusCode.SUCCESS, data: {
        fileName: zipFileName,
      }
    };
  } catch (err) {
    let message = '批量下载失败';
    if (err instanceof Error) {
      const error = err as NodeJS.ErrnoException;
      if (error.code === 'ENOENT') {
        message = `${savePath} 目录不存在`;
      } else if (error.code === 'EACCES') {
        message = `${savePath} 目录没有写入权限`;
      }
    }
    return { message, code: StatusCode.ERROR };
  }
}

export default downloadImagesAsZip;