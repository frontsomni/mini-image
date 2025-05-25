// 下载图片
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { IpcResponse } from '../../types/ImageCompress';
import { getUniqueFileName } from './fileInfo';

type DownloadFileResonse = {
  fileName: string;
}
export default async function downloadFile(_event: Electron.IpcMainInvokeEvent, base64: string, fileName: string): Promise<IpcResponse<DownloadFileResonse | object>> {
  try {
    const buffer = Buffer.from(base64, 'base64');
    const downloadDir = app.getPath('downloads');

    const uniqueFileName = getUniqueFileName(downloadDir, fileName);
    const fullPath = path.join(downloadDir, uniqueFileName);

    fs.writeFileSync(fullPath, buffer);
    return {
      message: '保存成功', code: 1, data: {
        fileName: uniqueFileName,
      }
    };
  } catch (err: any) {
    return { message: err.message, code: 2, data: {} };
  }
}