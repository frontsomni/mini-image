import { Cog8ToothIcon } from '@heroicons/react/24/outline'

function Settings() {

  const handleSelectDirectory = async () => {
    console.log('Selecting directory...')
    const r = await window.api.selectSavePath()
    console.log('Selected directory:', r)
    if (r) {

      // 处理选中的路径
    }
  }

  return (
    <div>
      <button
        onClick={handleSelectDirectory}
        className="rounded hover:bg-gray-100  hover:text-blue-500 transition cursor-pointer">
        <Cog8ToothIcon className="size-6" />
      </button>
    </div>
  )
}

export default Settings
