import useFileStore from "@renderer/store"
import { FileDown } from "lucide-react";
import { FileInfo } from "src/types/ImageCompress";

function Preview() {
  const { fileList } = useFileStore()

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

  // 计算节省空间函数
  function calculateSpaceSaved(fileList: FileInfo[]) {
    const totalSize = fileList.reduce((acc, file) => acc + file.fileOriginalSize, 0)
    const compressedSize = fileList.reduce((acc, file) => acc + file.fileSize, 0)
    return Math.abs((totalSize - compressedSize) / 1024 / 1024).toFixed(2)
  }

  return (
    < div className="w-full mt-8 space-y-4 flex-1 overflow-hidden flex flex-col" >
      <div className="flex items-center justify-between bg-white p-4 border-b-[0.5px] border-b-gray-300">
        <p className="font-bold text-orange-600 text-right flex-1">共压缩 {fileList.length} 张图片，节省空间 {calculateSpaceSaved(fileList)} MB</p>
        {/* <button>下载全部</button> */}
      </div>
      <div className="overflow-y-auto flex-1 flex-col">
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
                <div className="mr-2">
                  <p><b>{fileCostSize(file)}</b></p>
                  <p className="text-[12px] text-gray-500">{bToKb(file.fileSize)}</p>
                </div>
                <div className="flex flex-col">
                  <button className="p-[2px] text-blue-500 text-sm rounded hover:text-blue-400 cursor-pointer"
                    onClick={() => downloadFile(file)}
                  >
                    <FileDown />
                  </button>
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div >
  )
}

export default Preview
