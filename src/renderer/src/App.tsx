import '@renderer/assets/base.css'
import Upload from '@renderer/components/Upload'
import Preview from '@renderer/components/Preview'
import { ToastContainer, Zoom } from 'react-toastify';
import Record from './components/Record';
import Settings from './components/Setting';

const App: React.FC = () => {
  console.warn('[App.tsx >>>>]')
  return (
    <>
      <div className="h-full bg-white flex flex-col items-center px-4 pt-4 relative justify-center overflow-hidden">
        <Upload />
        <Record />
        <Preview />
      </div>
      <Settings />
      <ToastContainer
        transition={Zoom}
        limit={1}
        autoClose={800}
        position="top-right"
        draggable={true}
        pauseOnHover={true}
        pauseOnFocusLoss={false}
        closeButton={true}
      />
    </>
  )
}

export default App
