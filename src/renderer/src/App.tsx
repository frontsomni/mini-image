import '@renderer/assets/base.css'
import Setting from '@renderer/components/Setting'
import Upload from './components/Upload';
import Action from './components/Action';
import Preview from './components/Preview';

const App: React.FC = () => {
  return (
    <div className="h-full bg-white flex flex-col items-center p-8 relative justify-center overflow-hidden">
      <Setting />
      <Upload />
      <Preview />
      <Action />
    </div>
  )
}

export default App