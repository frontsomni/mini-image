import { Channels } from '@/assets/constant'
import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

function Settings() {
  const [isOpen, setIsOpen] = useState(false)
  const [savePath, setSavePath] = useState('')

  const handleSelectDirectory = async () => {
    console.log('Selecting directory...')
    const { code, data, message } = await window.api.selectSavePath()
    console.log('Directory selected:', code, data, message)
    if (code === 1) {
      const r = await window.api.setSavePath(data.path)
      setSavePath(data.path)
      console.log('Save path set:', r)
    }
  }

  async function handleGetSavePath() {
    const { code, data, message } = await window.api.getSavePath()
    if (code === 1) {
      setSavePath(data)
    }
    console.log('获取保存路径:', code, data, message)
  }

  async function handleRemoveSavePath() {
    const { code, message } = await window.api.removeSavePath()
    if (code === 1) {
      setSavePath('')
    }
    console.log('清空保存路径:', code, message)
  }

  useEffect(() => {
    window.api.onMainMessage(Channels.SETTINGS, async (code) => {
      if (code === 1) {
        await handleGetSavePath()
        setIsOpen(true)
      } else {
        setIsOpen(false)
      }
    })
  }, [])

  return (
    <>
      {/* 弹框遮罩层 */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-30 flex items-center justify-center">
          {/* 弹框内容 */}
          <div className="bg-white rounded-lg shadow-xl w-[460px] max-w-[90vw]">
            {/* 弹框头部 */}
            <div className="flex items-center justify-between p-4 border-b border-b-black/10">
              <h3 className="text-lg font-medium">设置</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer">
                <XMarkIcon className="size-5" />
              </button>
            </div>

            {/* 弹框内容 */}
            <div className="p-4 my-5">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  图片保存路径
                </label>
                <div className='flex'>
                  <div className="flex-1 mr-2 relative">
                    <input
                      type="text"
                      readOnly
                      value={savePath}
                      placeholder="请设置保存路径"
                      className="flex-1 w-full p-2 border border-black/30 text-black/60 rounded-md bg-gray-50"
                    />
                    {/* 清除 icon */}
                    {
                      savePath && (
                        <button
                          onClick={handleRemoveSavePath}
                          className="p-1 rounded-full -translate-1/2 hover:bg-gray-100 transition cursor-pointer absolute -right-1.5 top-1/2">
                          <XMarkIcon className="size-4" />
                        </button>
                      )
                    }
                  </div>
                  <button
                    onClick={handleSelectDirectory}
                    className="px-3 py-2 bg-sky-400 text-white rounded-md hover:bg-sky-500 transition cursor-pointer">
                    选择
                  </button>
                </div>
              </div>
            </div>

            {/* 弹框底部 */}
            <div className="flex justify-end gap-2 p-4 border-t border-t-black/10">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border border-black/20 text-black/60 rounded-md hover:bg-gray-50 transition cursor-pointer">
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings