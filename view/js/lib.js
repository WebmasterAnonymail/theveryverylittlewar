var opened_popup_id="";
var username=null;
var user=null;
function bb_code(texte){
	let res=texte;
	res=res.replaceAll("&","&amp;");
	res=res.replaceAll("<","&lt;");
	res=res.replaceAll(">","&gt;");
	res=res.replaceAll("\n","<br>");
	let unibalises=/\[([biuspq]|sup|sub|big|small|rainbow|ec|eo|en|ei|ebr|eh|es|ecl)\](.*?)\[\/\1\]/;
	let oldres="";
	do{
		oldres=res;
		res=res.replace(unibalises,"<$1>$2</$1>");
	}while(oldres!=res);
	let lienbalise=/\[url=((https?:\/\/)?[-a-z0-9A-Z._](:[0-9]+)?([-a-z0-9A-Z._/#?&+%]+)?)\](.*?)\[\/url\]/;
	do{
		oldres=res;
		res=res.replace(lienbalise,"<a href='$1'>$5</a>");
	}while(oldres!=res);
	let imgbalise=/\[img=((https?:\/\/)?[-a-z0-9A-Z._](:[0-9]+)?([-a-z0-9A-Z._/#?&+%]+)?)\]/;
	do{
		oldres=res;
		res=res.replace(imgbalise,"<img src='$1'>");
	}while(oldres!=res);
	let colorbalise=/\[color=(#[0-9A-F]{6}|black|grey|silver|white|maroon|olive|green|teal|navy|purple|red|yellow|lime|aqua|blue|fuchsia)\](.*?)\[\/color\]/;
	do{
		oldres=res;
		res=res.replace(colorbalise,"<span style='color: $1;'>$2</span>");
	}while(oldres!=res);
	return res;
}
function affichageTemps(time){
	var jours=Math.floor(time/86400000);
	if(jours==0){
		jours="";
	}else if(jours<10){
		jours="0"+String(jours)+"j ";
	}else{
		jours=String(jours)+"j ";
	}
	var heures=Math.floor((time%86400000)/3600000);
	if(heures==0){
		heures="";
	}else if(heures<10){
		heures="0"+String(heures)+"h ";
	}else{
		heures=String(heures)+"h ";
	}
	var minutes=Math.floor((time%3600000)/60000);
	if(minutes==0){
		minutes="";
	}else if(minutes<10){
		minutes="0"+String(minutes)+"m ";
	}else{
		minutes=String(minutes)+"m ";
	}
	secondes=Math.floor((time%60000)/1000);
	if(secondes==0){
		secondes="";
	}else if(secondes<10){
		secondes="0"+String(secondes)+"s ";
	}else{
		secondes=String(secondes)+"s ";
	}
	if(time<1000){
		return "maintenant";
	}else{
		return jours+heures+minutes+secondes;
	}
}
function affichageRessources(num){
	var si=[
	{value:1E24,symbol:"Y"},
	{value:1E21,symbol:"Z"},
	{value:1E18,symbol:"E"},
	{value:1E15,symbol:"P"},
	{value:1E12,symbol:"T"},
	{value:1E9 ,symbol:"G"},
	{value:1E6 ,symbol:"M"},
	{value:1E3 ,symbol:"K"}
	];
	for(let i=0;i<si.length;i++){
		if(num>=si[i].value){
			return Math.floor((num/si[i].value)*100)/100+si[i].symbol;
		}
	}
	return Math.floor(num);
}
function use_api(method,api,data,in_body,callback){
	let api_xhr=new XMLHttpRequest();
	if(in_body){
		api_xhr.open(method,"/api/v1/"+api);
	}else{
		let at_send=new URLSearchParams();
		at_send.append("token",localStorage.getItem("token"));
		at_send.append("username",username);
		for(let b in data){
			at_send.append(b,data[b]);
		}
		api_xhr.open(method,"/api/v1/"+api+"?"+at_send.toString());
	}
	api_xhr.responseType="json";
	if(in_body){
		let at_send=data;
		at_send.token=localStorage.getItem("token");
		at_send.username=username;
		api_xhr.send(JSON.stringify(at_send));
	}else{
		api_xhr.send();
	}
	api_xhr.addEventListener("readystatechange",function(ev){
		if(api_xhr.readyState==api_xhr.DONE){
			callback(api_xhr);
		}
	});
}
