import { useHandlerResponse } from "@renderer/hooks";
import useFileStore from "@renderer/store"
import { FileDown } from "lucide-react";
import { type FileInfo } from "@/types/image-compress";

function Preview() {
  const { fileList } = useFileStore()

  async function downloadFile(file: FileInfo) {
    const { fileBuffer, fileNameWithFormat } = file
    const r = await window.api.downloadImage(fileBuffer, fileNameWithFormat)
    useHandlerResponse(r)
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

  return (
    <div className="overflow-y-auto flex-1 flex-col overflow-x-hidden w-full">
      {
        fileList.map((file, idx) => (
          <div key={idx} className="flex items-center justify-between bg-white p-2 border-b-[0.5px] border-b-gray-200 text-[14px]">
            <div className="w-12 h-12 bg-gray-200 rounded flex overflow-hidden items-center justify-center shadow mr-4">
              <img src={file.fileBase64} alt={file.fileNameWithFormat} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 mr-4 overflow-hidden">
              <p className="text-gray-800 font-medium text-ellipsis overflow-hidden text-nowrap" title={file.fileNameWithFormat}>{file.fileNameWithFormat}</p>
              <div className="flex items-center gap-2 mt-[6px]">
                <p className="bg-green-100 px-1 text-green-600 text-[10px] rounded-[2px]">{file.fileFormat.toUpperCase()}</p>
                <p className="text-gray-400 text-sm text-[12px]">{bToKb(file.fileOriginalSize)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-1">
                <p><b>{fileCostSize(file)}</b></p>
                <p className="text-[12px] text-gray-500">{bToKb(file.fileSize)}</p>
              </div>
              <div className="flex flex-col">
                <button className="p-[2px] text-sky-500 text-sm rounded hover:text-blue-400 cursor-pointer"
                  onClick={() => downloadFile(file)}
                >
                  <FileDown size={30} />
                </button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Preview
