import { toast } from "react-toastify";
import { type IpcResponse } from "@/types/image-compress";


function useHandlerResponse(response: IpcResponse) {
  const { message, code } = response
  const toastType = code === 1 ? 'success' : 'error'
  toast[toastType](message)
}

export default useHandlerResponse;