import { dialog } from "electron"
import { StatusCode } from "../../assets/constant"

export default async function selectDirectory() {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0]
  }
  return null
}