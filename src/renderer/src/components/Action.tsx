function Action() {
  return (
    <div className="w-full flex justify-between mt-8">
      <button className="flex-1 mx-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        全部压缩
      </button>
      <button className="flex-1 mx-1 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
        全部下载
      </button>
      <button className="flex-1 mx-1 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
        清空列表
      </button>
    </div>
  )
}

export default Action
