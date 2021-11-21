const { ipcMain, app } = require('electron');
const path = require("path");
const fs = require("fs");
const dayjs = require('dayjs');
const { machineIdSync } = require('node-machine-id');
const NuxoClient = require("npm-nuxo");
const puppeteer = require("puppeteer");
var exec = require('child_process').execFile;
const isDev = process.env.NODE_ENV === "development";
const downloadPath = app.getPath('userData');
const databaseDir = path.join(
    __dirname, 
    '../../../static/'
);
const executablePath = puppeteer.executablePath().replace("app.asar","app.asar.unpacked")

ipcMain.on('store-files', (event,arg) => {
    const { filePaths , saveIn = "userData" } = arg;
    let newFilePaths = [];
    if( !Array.isArray(filePaths) ){
        console.log("error");
    }
    for( let i = 0; i < filePaths.length; i++ ){
        let filename = path.basename( filePaths[i] );
        filename = dayjs().valueOf() + '-' + filename;
        let fileUploadPath = app.getPath(saveIn) + '\\' + filename;
        move( filePaths[i] , fileUploadPath, (err,file) => {
            if(err){
                console.log('err storing file',err);
                return;
            }
            newFilePaths.push(file);
            if( newFilePaths.length === filePaths.length ){
                event.reply('store-files-success',newFilePaths);
            };
        });
    }
});

ipcMain.on('store-buffer', (event,arg) => {
    const { buffer , filename, saveIn = "userData" } = arg;
    const filepath = app.getPath(saveIn) + '\\' + filename;
    fs.writeFile(filepath, buffer , 'base64', (err) => {
        if(err){
            console.log('error',err);
        }
        event.reply('store-buffer-success',filepath);
    });
});


ipcMain.on('create-boleta', async (event,params) => {
    try {
        const nuxo = await NuxoClient({
            ...params,
            downloadPath,
            ...( !isDev ? { databaseDir, executablePath } : {} )
        });
        const response = await nuxo.createEboleta(params);
        event.reply("create-boleta-success", {
            created: true,
            ...response
        });
    }catch(err){
        event.reply("create-boleta-error", {
            error: err,
            description: "error abriendo puppeteer"
        })
    }
});


ipcMain.on('cancel-boleta', async (event,params) => {
    const downloadPath = papp.getPath('userData');
    const nuxo = await NuxoClient({
        ...params,
        downloadPath,
        ...( !isDev ? { databaseDir, executablePath } : {} )
    });
    const response = await nuxo.cancelEboleta(params);
    event.reply("cancel-boleta-success", {
        ...response
    });
});

ipcMain.on('get-device-code', async (event,params) => {
    const deviceCode = machineIdSync();
    event.reply("get-device-code-success", {
        deviceCode
    });
});


ipcMain.on('init-printers', async (event) => {
    const pluginPath = path.join(
        __dirname,
        '../../../static/conector_64_bits'
    );
    exec(pluginPath, (err,data) => {
        if(err){
            console.log('error',err);
        }
        console.log({data});

        event.reply("init-printers-success", {
            ready: true
        });
    });
});

function move(oldPath, newPath, callback) {
    copy();
    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);
        readStream.on('error', callback);
        writeStream.on('error', callback);
        readStream.on('close', function () {
            let fileName= path.basename(newPath);
            console.log(fileName,"  file uploaded");
            callback( null , { path: newPath, filename: fileName } );
            //remove path from destination
            //fs.unlink(oldPath, callback);
            // do your stuff
        });
        readStream.pipe(writeStream);
    }
}