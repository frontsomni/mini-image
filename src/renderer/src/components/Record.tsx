import useFileStore from "@renderer/store"
import { useMemo } from 'react'

function Record() {
  const { fileList } = useFileStore()

  const spaceSaved = useMemo(() => {
    const totalSize = fileList.reduce((acc, file) => acc + file.fileOriginalSize, 0)
    const compressedSize = fileList.reduce((acc, file) => acc + file.fileSize, 0)
    return Math.abs((totalSize - compressedSize) / 1024 / 1024).toFixed(2)
  }, [fileList]) // 依赖项数组

  return (
    <>
      <div className="flex items-center w-full justify-end bg-white py-2 mt-6 border-b-[0.5px] border-b-gray-200 text-sm">
        <p className="font-bold text-orange-600 text-right flex-1">
          共压缩 {fileList.length} 张图片，节省空间 {spaceSaved} MB
        </p>
      </div>
    </>
  )
}

export default Record