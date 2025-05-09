function Upload() {
  return (
    <div className="w-full bg-white border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center p-12 cursor-pointer hover:border-blue-400 transition">
      <UploadIcon />
      <p className="text-gray-500 mt-4">点击或拖拽图片到此处上传</p>
    </div>
  )
}

const UploadIcon = () => (
  <svg
    className="w-12 h-12 text-gray-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4m0 0l-4 4m4-4v12"
    />
  </svg>
)

export default Upload
