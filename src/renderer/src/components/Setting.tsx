import { Cog8ToothIcon } from '@heroicons/react/24/outline'

function Settings() {
  function onSetHandler() {
    console.log('Settings clicked')
  }

  return (
    <div className='flex justify-end w-full'>
      <button
        onClick={onSetHandler}
        className="rounded hover:bg-gray-100  hover:text-blue-500 transition cursor-pointer">
        <Cog8ToothIcon className="size-6" />
      </button>
    </div>
  )
}

export default Settings
