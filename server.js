const http=require('http');
const fs=require('fs');
const handler=require('./mainHandler.js'); 
const bddManager=require('./bddManager.js'); 
const httpServer=http.createServer(handler.http);
console.log("Démarage");
httpServer.listen(process.env.app_port||process.env.PORT||process.env.port||8000);
bddManager();
