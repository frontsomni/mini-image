import { toast } from "react-toastify";
import { IpcResponse } from "src/types/ImageCompress";


function useHandlerResponse(response: IpcResponse) {
  const { message, code } = response
  const toastType = code === 1 ? 'success' : 'error'
  toast[toastType](message)
}

export default useHandlerResponse;