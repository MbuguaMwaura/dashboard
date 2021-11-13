const { icpRenderer , contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron',{
    notificationApi : {
        sendNotification(message){
            console.log(message)
            icpRenderer.send('notify',message);
        }
    }

    
})