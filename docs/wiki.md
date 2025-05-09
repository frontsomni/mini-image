### 向主进程发 ping

```javascript
 function App(): React.JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="action">
        <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
          Send IPC
        </a>
      </div>
      <Versions></Versions>
    </>
  )
}
```

### 技术文档

https://www.npmjs.com/package/sharp
https://www.tailwindcss.cn/docs/guides/vite
https://cn.electron-vite.org/guide/
https://www.electronjs.org/zh/docs/latest/why-electon
[React 快捷键](https://github.com/r5n-labs/vscode-react-javascript-snippets/blob/HEAD/docs/Snippets.md)
