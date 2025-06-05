import { Cog8ToothIcon } from '@heroicons/react/24/outline'

function Settings() {

  const handleSelectDirectory = async () => {
    console.log('Selecting directory...')
    const { code, data, message } = await window.api.selectSavePath()
    console.log('Directory selected:', code, data, message)
    if (code === 1) {
      const r = await window.api.setSavePath(data.path)
      console.log('Save path set:', r)
    }
  }

  async function handleGetSavePath() {
    const { code, data, message } = await window.api.getSavePath()
    console.log('获取保存路径:', code, data, message)
  }

  return (
    <div>
      <button
        onClick={handleSelectDirectory}
        className="rounded hover:bg-gray-100  hover:text-blue-500 transition cursor-pointer">
        <Cog8ToothIcon className="size-6" />
      </button>
      <button className="rounded hover:bg-gray-100  hover:text-blue-500 transition cursor-pointer"
        onClick={handleGetSavePath}
      >
        获取保存路径      </button>
    </div>
  )
}

export default Settings
