import useFileStore from "@renderer/store"

function Preview() {
  const { fileList, deleteFile } = useFileStore()

  return (
    < div className="w-full mt-8 space-y-4 flex-1 overflow-y-auto" >
      {
        fileList.map((file, idx) => (
          <div key={idx} className="flex items-center justify-between bg-white p-4 rounded shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"></div>
              <div>
                <p className="text-gray-800 font-medium">{file.fileName}</p>
                <p className="text-gray-400 text-sm">{file.fileSize}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                onClick={() => deleteFile(idx)}
              >
                删除
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                下载
              </button>
            </div>
          </div>
        ))
      }
    </div >
  )
}

export default Preview
