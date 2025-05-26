import '@renderer/assets/base.css'
import Upload from './components/Upload'
import Preview from './components/Preview'
import { ToastContainer, Zoom } from 'react-toastify';
const App: React.FC = () => {
  console.warn('[App.tsx >>>>]')
  return (
    <>
      <div className="h-full bg-white flex flex-col items-center px-6 relative justify-center overflow-hidden">
        {/* <Setting /> */}
        <Upload />
        <Preview />
      </div>
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
