import { app, shell, BrowserWindow, ipcMain, Menu, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import registerImageHandlers from './image_handler'
import { Channels } from '../assets/constant'


function createMenu(win: BrowserWindow): void {
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: '关于图片压缩',
          click: () => {
            app.showAboutPanel(); // 显示内置“关于”面板
          },
        },
        { type: 'separator' }, // ← 分隔线
        {
          label: '设置',
          accelerator: 'CmdOrCtrl+,',
          click() {
            win.webContents.send(Channels.SETTINGS, 1);
          },
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

function openDevTools(window: BrowserWindow): void {
  if (is.dev) {
    window.webContents.openDevTools({
      mode: 'bottom'
    })
  }
}


function registerShortcut(win: BrowserWindow) {
  globalShortcut.register('Escape', () => {
    win.webContents.send(Channels.SETTINGS, 0)
  })
}

function unregisterShortcut() {
  globalShortcut.unregister('Escape')
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: '图片压缩',
    show: false,
    minWidth: 800,
    minHeight: 600,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  createMenu(mainWindow)

  registerShortcut(mainWindow)

  // Use VSCode Debugger
  registerImageHandlers()

  openDevTools(mainWindow)

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  // 接收渲染进程的 ping 消息
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
  unregisterShortcut()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
