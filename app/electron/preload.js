const { contextBridge, ipcRenderer, shell } = require("electron");
const fs = require("fs");
const i18nextBackend = require("i18next-electron-fs-backend");
const Store = require("secure-electron-store").default;
const ContextMenu = require("secure-electron-context-menu").default;
const SecureElectronLicenseKeys = require("secure-electron-license-keys");
const path = require("path");
const { createModelProxy } = require("./create-proxy");

// Create the electron store to be made available in the renderer process
const store = new Store();
const isDev = process.env.NODE_ENV === "development";


const dbProductionPath = path.join(
  __dirname
  , '../../../static/aidy.sqlite3'
)

const executablePath = path.join(
  __dirname
  , '../../../app.asar.unpacked/node_modules/puppeteer/.local-chromium/win64-901912/chrome-win/chrome.exe'
)

const dbPath = path.join(
  __dirname,
  './db.sqlite3'
)

const knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: isDev ? dbPath : dbProductionPath
  }
});

const bookshelf = require('bookshelf')(knex);

const Categories = bookshelf.model('Categories', {
  tableName: 'categories'
});

const Suppliers = bookshelf.model('Suppliers', {
  tableName: 'suppliers',
  products() {
    return this.hasMany('Products')
  }
})

const Products = bookshelf.model('Products', {
  tableName: 'products',
  images() {
    return this.belongsToMany('Images')
  },
  category() {
    return this.belongsTo('Categories')
  },
  supplier(){
    return this.belongsTo('Suppliers')
  }
});

const Clients = bookshelf.model('Clients', {
  tableName: 'clients'
})

const Images = bookshelf.model('Images', {
  tableName: 'images',
  products() {
    return this.belongsToMany('Products')
  }
});

const Tickets = bookshelf.model('Tickets', {
  tableName: 'tickets',
  bill() {
    return this.belongsTo('Bills')
  }
});

const StockMovements = bookshelf.model('StockMovements', {
  tableName: 'stock_movements',
  bill() {
    return this.belongsTo('Bill')
  }
})

const Bills = bookshelf.model('Bills', {
  tableName: 'bills',
  client() {
    return this.belongsTo('Clients')
  },
  history() {
    return this.hasMany('StockMovements')
  },
  ticket() {
    return this.hasOne('Tickets')
  }
})

const Users = bookshelf.model('Users', {
  tableName: 'users'
});

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  i18nextElectronBackend: i18nextBackend.preloadBindings(ipcRenderer),
  store: store.preloadBindings(ipcRenderer, fs),
  contextMenu: ContextMenu.preloadBindings(ipcRenderer),
  licenseKeys: SecureElectronLicenseKeys.preloadBindings(ipcRenderer)
});

contextBridge.exposeInMainWorld("bookshelf", {
  users: createModelProxy(Users),
  products: createModelProxy(Products),
  categories: createModelProxy(Categories),
  clients: createModelProxy(Clients),
  tickets: createModelProxy(Tickets),
  bills: createModelProxy(Bills),
  stockMovements: createModelProxy(StockMovements),
  images: createModelProxy(Images),
  suppliers: createModelProxy(Suppliers)
});

contextBridge.exposeInMainWorld('storeFiles', (files) => {
  const filePaths = files.map(file => file.path);
  //eslint-disable-next-line
  return new Promise((resolve) => {
    ipcRenderer.once('store-files-success', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('store-files', {
      filePaths
    });
  });
});

contextBridge.exposeInMainWorld('createBoleta', async (params) => {
  return new Promise((resolve,reject) => {
    ipcRenderer.once('create-boleta-success', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.once('create-boleta-error',  (_,arg) => {
      reject(arg);
    })
    ipcRenderer.send('create-boleta', params);
  });
});

contextBridge.exposeInMainWorld('cancelBoleta', async (params) => {
  return new Promise((resolve) => {
    ipcRenderer.once('cancel-boleta-success', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('cancel-boleta', params);
  });
});

contextBridge.exposeInMainWorld('writeFile', async ({ buffer, filename, saveIn }) => {
  return new Promise((resolve) => {
    ipcRenderer.once('store-buffer-success', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('store-buffer', { buffer, filename, saveIn });
  });
});

contextBridge.exposeInMainWorld("baseUrl", process.env.BASE_API_URL ?? "https://cloud.nuxo.cl");

contextBridge.exposeInMainWorld("initPrinters", () => {
  //eslint-disable-next-line
  return new Promise((resolve) => {
    ipcRenderer.once('init-printers-success', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('init-printers');
  });
});

contextBridge.exposeInMainWorld("getDeviceCode", () => {
  //eslint-disable-next-line
  return new Promise((resolve) => {
    ipcRenderer.once('get-device-code-success', (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send('get-device-code');
  });
});

contextBridge.exposeInMainWorld("openExternal", (url) => {
  shell.openExternal(url);
});

contextBridge.exposeInMainWorld('path',executablePath);

