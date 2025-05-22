import '@renderer/assets/base.css'
import Setting from '@renderer/components/Setting'
import Upload from './components/Upload'
import Preview from './components/Preview'

const App: React.FC = () => {
  console.warn('[App.tsx >>>>]')
  return (
    <div className="h-full bg-white flex flex-col items-center px-6 relative justify-center overflow-hidden">
      <Setting />
      <Upload />
      <Preview />
    </div>
  )
}

export default App
