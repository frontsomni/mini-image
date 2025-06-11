import { FileInfo } from "@/types/image-compress";
import { create } from "zustand";

type FileStore = {
  fileList: FileInfo[];
  deleteFile: (idx: number) => void;
  downloadFile: (idx: number) => void;
  setFile: (fileList: FileInfo) => Promise<void>;
}

// 异步的如何处理
async function bufferToBase64DataUrl(file: FileInfo): Promise<string> {
  const { fileBuffer, fileFormat } = file;
  const blob = new Blob([fileBuffer], { type: fileFormat });
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}


const useFileStore = create<FileStore>(set => ({
  fileList: [],
  setFile: async (fileInfo: FileInfo) => {
    const fileBase64 = await bufferToBase64DataUrl(fileInfo);
    set(state => {
      return {
        fileList: state.fileList.concat([{
          ...fileInfo,
          fileBase64: fileBase64
        }])
      }
    });
  },
  deleteFile: (idx: number) => set(state => {
    const fileList = state.fileList.filter((_, index) => index !== idx)
    return { fileList }
  }),
  downloadFile: (idx: number) => set(state => {
    const fileList = state.fileList.filter((_, index) => index !== idx)
    return { fileList }
  }),
}))

export default useFileStore