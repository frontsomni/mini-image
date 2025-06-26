import useFileStore from "@renderer/store"
import { useMemo } from "react"

function Action() {
  const { fileList, clearFiles } = useFileStore()

  async function downloadImagesAsZip() {
    const pickedFiles = fileList.map(file => ({
      fileNameWithFormat: file.fileNameWithFormat,
      fileBuffer: file.fileBuffer,
    }))
    const r = await window.api.downloadImagesAsZip(pickedFiles)
    console.log('fileList', r)
  }

  const disabled = useMemo(() => fileList.length === 0, [fileList.length])

  function clearAllFiles() {
    console.log('clearAllFiles')
    clearFiles()
  }

  return (
    <div className="">
      <button className="px-4 py-2 bg-sky-500 text-white rounded-md cursor-pointer hover:bg-sky-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={clearAllFiles}
        disabled={disabled}
      >
        全部清空
      </button>
      <button className="px-4 py-2 mx-4 bg-orange-400 text-white rounded-md cursor-pointer hover:bg-sky-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={downloadImagesAsZip}
        disabled={disabled}
      >
        下载全部
      </button>
    </div>
  )
}

export default Action
