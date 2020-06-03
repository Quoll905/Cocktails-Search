const electron = require('electron');
const { app, BrowserWindow, Tray } = require('electron');

const nativeImage = require('electron').nativeImage;


let appIcon= null;

let win = null;

function createWindow () {
  // Crea la finestra del browser
    win = new BrowserWindow({
    width: 718,
    height: 730,
    icon: 'logo.png',
    frame: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html');

  win.on('close', (event) => {
    console.log(event);
    event.preventDefault();
    win.hide();
  })

}

app.on('ready',()=>{

  const imageDock = nativeImage.createFromPath( __dirname + '/logo.png');
  const imageTray = nativeImage.createFromPath(__dirname + '/logo16x16.png');

  app.dock.setIcon(imageDock);
  app.dock.hide();

  appIcon = new Tray(imageTray);

  appIcon.on('click', function(e){
      if (win.isVisible()) {
        win.hide()
      } else {
        win.show()
      }
    });

    appIcon.on('right-click', (e)=>{
      appIcon.destroy();
      app.quit();
    })


})

app.whenReady().then(createWindow);



app.on('closed', () => {
  win.hide();
})




app.on('window-all-closed', () => {
  // Su macOS è comune che l'applicazione e la barra menù
  // restano attive finché l'utente non esce espressamente tramite i tasti Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Su macOS è comune ri-creare la finestra dell'app quando
  // viene cliccata l'icona sul dock e non ci sono altre finestre aperte.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
