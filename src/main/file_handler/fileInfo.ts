import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
// 获取上传的图片压缩前字节大小
export async function getFileSize(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve(stats.size)
      }
    })
  }
  )
}

// 获取文件信息
export async function getFileInfo(filePath: string): Promise<sharp.Metadata> {
  return new Promise((resolve, reject) => {
    sharp(filePath)
      .metadata()
      .then((metadata) => {
        resolve(metadata)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// 文件重命名
export function getUniqueFileName(dir: string, fileName: string): string {
  const ext = path.extname(fileName);
  const name = path.basename(fileName, ext);
  let counter = 1;
  let uniqueName = fileName;

  while (fs.existsSync(path.join(dir, uniqueName))) {
    uniqueName = `${name} (${counter})${ext}`;
    counter++;
  }
  return uniqueName;
}

// , 'tiff', 'heif' 图片浏览器不支持,应转换为其他格式
export const supportedImageFormats = ['jpeg', 'png', 'webp', 'avif']