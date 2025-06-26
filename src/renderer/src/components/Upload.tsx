import useFileStore from "@renderer/store"
import { ArrowUpFromLine, } from "lucide-react";
import { StatusCode } from "@/assets/constant";

function Upload() {
  const { setFile } = useFileStore();
  // 选择文件
  async function fileUploadHandler() {
    const { data, code } = await window.api.selectImage()
    if (code === StatusCode.SUCCESS) {
      const r = await Promise.allSettled(data.map((fileInputPath: string) => compressImage(fileInputPath)))
      const rejectedList = r.filter(v => v.status === 'rejected').map(v => v.value.data.fileName)
      console.log('[处理失败的文件名]', rejectedList)
    }
  }

  // 压缩文件
  async function compressImage(fileInputPath: string) {
    const r = await window.api.compressImage({
      fileInputPath,
    })
    const { code, data } = r
    if (code === StatusCode.SUCCESS) {
      setFile(data!)
    }
    return r
  }

  return (
    <div className="w-full  bg-white border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center p-12 cursor-pointer hover:border-blue-400 transition"
      onClick={fileUploadHandler}
    >
      <ArrowUpFromLine size={50} />
      <p className="text-gray-500 mt-4">点击或拖拽图片到此处上传</p>
    </div>
  )
}

export default Upload
