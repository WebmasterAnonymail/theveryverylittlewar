module.exports.batiments=[
	
];
module.exports.map_posX=[0,1,0,2,1,0,3,2,1,0,4,3,2,1,0,4,3,2,1,4,3,2,4,3,4];
module.exports.map_posY=[0,0,1,0,1,2,0,1,2,3,0,1,2,3,4,1,2,3,4,2,3,4,3,4,4];
module.exports.bb_code=function(texte){
	let res=texte;
	res=res.replaceAll("&","&amp;");
	res=res.replaceAll("<","&lt;");
	res=res.replaceAll(">","&gt;");
	res=res.replaceAll("\n","<br>");
	let unibalises=/\[([biuspq]|sup|sub|big|small|rainbow|ec|eo|en|ei|ebr|eh|es|ecl|h[1-6])\](.*?)\[\/\1\]/;
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