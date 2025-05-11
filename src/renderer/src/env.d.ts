/// <reference types="vite/client" />

/**
* 默认情况下，以 MAIN_VITE_ 为前缀的变量暴露给主进程，PRELOAD_VITE_ 用于预加载脚本，RENDERER_VITE_ 则用于渲染器，VITE_ 则所有进程共用。
*/
interface ViteTypeOptions {
  // 添加这行代码，你就可以将 ImportMetaEnv 的类型设为严格模式，
  // 这样就不允许有未知的键值了。
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}