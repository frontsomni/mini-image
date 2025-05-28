// 下载图片
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { IpcResponse } from '../../types/imageCompress';
import { getUniqueFileName } from './utils';
import { StatusCode } from "../../assets/constant";

type DownloadImageResonse = {
  fileName: string;
}
export default async function downloadImage(_event: Electron.IpcMainInvokeEvent, fileBuffer: Buffer, fileName: string): Promise<IpcResponse<DownloadImageResonse | object>> {
  try {
    const downloadDir = app.getPath('downloads');

    const uniqueFileName = getUniqueFileName(downloadDir, fileName);
    const fullPath = path.join(downloadDir, uniqueFileName);

    fs.writeFileSync(fullPath, fileBuffer);
    return {
      message: '保存成功', code: StatusCode.SUCCESS, data: {
        fileName: uniqueFileName,
      }
    };
  } catch (err: any) {
    return { message: err.message, code: StatusCode.ERROR, data: {} };
  }
}