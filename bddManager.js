const https=require("https");
const fs=require("fs");
var dblocation={
	"users":process.env.users_dbid,
	"events":process.env.events_dbid,
	"connections":process.env.connections_dbid,
	"MDS":process.env.maindatastorage_dbid
}
function doHttpRequest(method,host,path,data,callback=(()=>{})){
	let options={
		host:host,
		port:443,
		path:path,
		method:method,
		headers:{
			"Content-Type":"application/json",
			"Accept":"application/json"
		}
	}
	let req=https.request(options,(res)=>{
		data="";
		res.on('data',d=>{
			data+=String(d);
		});
		res.on('end',d=>{
			if(res.statusCode==200){
				callback(data);
			}else{
				console.error(res.statusCode);
			}
		});
	});
	req.on('error',error=>{
		console.error(error);
	});
	req.write(data);
	req.end();
}
function requestDB(dbname){
	doHttpRequest("GET","jsonblob.com","/api/jsonBlob/"+dblocation[dbname],"",data=>{
		dbs[dbname]=JSON.parse(data);
		console.debug("["+dbname+"] : GOT");
	});
}
function updateDB(dbname){
	doHttpRequest("PUT","jsonblob.com","/api/jsonBlob/"+dblocation[dbname],JSON.stringify(dbs[dbname]));
}
module.exports=function(){
	console.log("Getting databases");
	global.dbs={};
	requestDB("users");
	requestDB("events");
	requestDB("connections");
	requestDB("MDS");
	setInterval(function(){
		for(a in dbs){
			updateDB(a);
		}
	},10000)
}
