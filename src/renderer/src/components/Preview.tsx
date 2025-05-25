import useFileStore from "@renderer/store"
import { FileInfo } from "src/types/ImageCompress";

function Preview() {
  const { fileList } = useFileStore()

  // 浏览器下载
  function download(file: FileInfo) {
    const { fileFormat, fileBase64 } = file
    const link = document.createElement('a')
    link.href = `data:image/${fileFormat};base64,${fileBase64}`
    link.download = `${file.fileName}.${fileFormat}`
    link.click()
  }

  async function downloadFile(file: FileInfo) {
    const { fileBase64, fileNameWithFormat } = file
    const r = await window.api.downloadFile(fileBase64, fileNameWithFormat)
    console.log('r', r)
  }

  function bToKb(bytes: number) {
    if (bytes === 0) return '0 KB'
    const kB = bytes / 1024
    return kB < 1 ? `${bytes} B` : `${kB.toFixed(0)} KB`
  }


  function fileCostSize(file: FileInfo) {
    const { fileSize, fileOriginalSize } = file
    const disSize = fileOriginalSize - fileSize
    const disSizePercent = Math.abs((disSize / fileOriginalSize) * 100)
    return `-${disSizePercent.toFixed(0)}%`
  }

  function base64ImageJoin(file: FileInfo) {
    const { fileBase64, fileFormat } = file
    return `data:image/${fileFormat};base64,${fileBase64}`
  }

  return (
    < div className="w-full mt-8 space-y-4 flex-1 overflow-y-auto" >
      {/* 统计 */}
      共压缩 5 张图片，节省空间 1.2 MB
      {
        fileList.map((file, idx) => (
          <div key={idx} className="flex items-center justify-between bg-white p-2 border-b-[0.5px] border-b-gray-300 text-[14px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center shadow">
                <img src={base64ImageJoin(file)} alt={file.fileNameWithFormat} className="w-full h-full object-cover rounded" />
              </div>
              <div>
                <p className="text-gray-800 font-medium">{file.fileNameWithFormat}</p>
                <div className="flex items-center gap-2 mt-[6px]">
                  <p className="bg-green-100 px-1 text-green-600 text-[10px] rounded-[2px]">{file.fileFormat.toUpperCase()}</p>
                  <p className="text-gray-400 text-sm text-[12px]">{bToKb(file.fileOriginalSize)}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <p><b>{fileCostSize(file)}</b></p>
                <p className="text-[12px] text-gray-500">{bToKb(file.fileSize)}</p>
              </div>
              <div className="flex flex-col">
                {/* <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 mb-2 cursor-pointer"
                  onClick={() => deleteFile(idx)}
                >
                  删除
                </button> */}
                <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 cursor-pointer"
                  onClick={() => downloadFile(file)}
                >
                  下载
                </button>
              </div>
            </div>

          </div>
        ))
      }
      {/* 下载全部 */}
      下载全部等快捷键
    </div >
  )
}

export default Preview
