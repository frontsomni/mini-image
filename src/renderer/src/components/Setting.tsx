import { Cog8ToothIcon } from '@heroicons/react/24/outline'

function Settings() {
  function onSetHandler() {
    console.log('Settings clicked')
  }

  return (
    <button
      onClick={onSetHandler}
      className="p-2 rounded hover:bg-gray-100  hover:text-blue-500 transition absolute top-2 right-2">
      <Cog8ToothIcon className="size-7" />
    </button>
  )
}

export default Settings
