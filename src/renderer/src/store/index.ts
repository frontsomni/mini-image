import { FileInfo } from "src/types/ImageCompress";
import { create } from "zustand";

type FileStore = {
  fileList: FileInfo[];
  setFileList: (fileList: FileInfo[]) => void;
  deleteFile: (idx: number) => void;
  downloadFile: (idx: number) => void;
}

const useFileStore = create<FileStore>(set => ({
  fileList: [],
  setFileList: (fileList) => set(state => {
    console.log('state', fileList)
    return { fileList: state.fileList.concat(fileList) }
  }),
  deleteFile: (idx: number) => set(state => {
    const fileList = state.fileList.filter((_, index) => index !== idx)
    return { fileList }
  }),
  downloadFile: (idx: number) => set(state => {
    const fileList = state.fileList.filter((_, index) => index !== idx)
    return { fileList }
  })
}))

export default useFileStore