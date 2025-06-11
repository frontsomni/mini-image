import Store from 'electron-store';

interface StoreSchema {
  savePath: string;
}

// 文件保存在应用根目录下
// ~/Library/Application Support/mini-image/config.json

const config = {
  name: 'config',
  defaults: {
    savePath: '',
    // ...existing code...
  }
} as const;

const store = new Store<StoreSchema>(config);

export default store