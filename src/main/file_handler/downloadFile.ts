// 下载图片
import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { IpcResponse } from '../../types/ImageCompress';
import { getUniqueFileName } from './fileInfo';

type DownloadFileResonse = {
  fileName: string;
}
export default async function downloadFile(_event: Electron.IpcMainInvokeEvent, fileBuffer: Buffer, fileName: string): Promise<IpcResponse<DownloadFileResonse | object>> {
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