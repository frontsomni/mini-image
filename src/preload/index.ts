import { contextBridge } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload' // sandbox mode is enabled, 不能使用 electronAPI
import api from './api'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
console.warn('[preload.js >>>>]')
if (process.contextIsolated) {
  try {
    // contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    // contextBridge.exposeInMainWorld('electronAPI', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  // window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
