import useFileStore from "@renderer/store"
import { useMemo } from 'react'

function Record() {
  const { fileList } = useFileStore()

  const spaceSaved = useMemo(() => {
    const totalSize = fileList.reduce((acc, file) => acc + file.fileOriginalSize, 0)
    const compressedSize = fileList.reduce((acc, file) => acc + file.fileSize, 0)
    return Math.abs((totalSize - compressedSize) / 1024 / 1024).toFixed(2)
  }, [fileList])

  // 全部下载,打包成 zip
  return (
    <>
      <div className="flex items-center w-full justify-between bg-white py-2 mt-6 border-b-[0.5px] border-b-gray-200 text-sm">
        <p className="font-bold text-orange-600 text-right">
          共压缩 {fileList.length} 张图片，节省空间 {spaceSaved} MB
        </p>
        <button className="px-4 py-2 bg-sky-500 text-white rounded-md cursor-pointer hover:bg-sky-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
          下载全部
        </button>
      </div>
    </>
  )
}

export default Record