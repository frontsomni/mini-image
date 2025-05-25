import useFileStore from "@renderer/store"
import { ArrowUpFromLine, Upload as UpLoadImage } from "lucide-react";
function Upload() {
  const { setFileList } = useFileStore();
  // 选择文件
  async function fileUploadHandler() {
    const { data, code } = await window.api.selectFile()
    if (code === 1) {
      const files = data as string[]
      for await (const fileInputPath of files) {
        compressFile(fileInputPath)
      }
    }
  }


  // 压缩文件
  async function compressFile(fileInputPath: string) {
    const fileInfo = await window.api.compressFile({
      fileInputPath,
    })
    setFileList([fileInfo.data])
  }

  return (
    <div className="w-full bg-white border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center p-12 cursor-pointer hover:border-blue-400 transition"
      onClick={fileUploadHandler}
    >
      <ArrowUpFromLine size={50} />
      <p className="text-gray-500 mt-4">点击或拖拽图片到此处上传</p>
    </div>
  )
}

export default Upload
