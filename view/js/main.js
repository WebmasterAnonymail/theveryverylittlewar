function act_preview(){
	use_api("GET","users",{"mode":"detailed"},false,function(xhr){
		if(xhr.status==200){
			document.getElementById("preview_energie").innerText=affichageRessources(xhr.response.ressources.energie);
			document.getElementById("preview_energie").title=Math.floor(xhr.response.ressources.energie);
			for(let a of atomes){
				document.getElementById("preview_"+a).innerText=affichageRessources(xhr.response.ressources[a]);
				document.getElementById("preview_"+a).title=Math.floor(xhr.response.ressources[a]);
			}
			document.getElementById("preview_points").innerText=Math.floor(xhr.response.points.total);
			for(a=0;a<9;a++){
				frames[a].user=xhr.response;
				if(frames[a].post_getuser_action){
					frames[a].post_getuser_action();
				}
			}
		}else{
			alert("ERROR in getting user : code "+xhr.status);
		}
	});
	use_api("GET","users",{"mode":"events"},false,function(xhr){
		if(xhr.status==200){
			let notifbar=document.getElementById("notifbar");
			notifbar.innerText="";
			for(let event of xhr.response){
				notif=document.createElement("div");
				notif.classList.add("notif");
				switch(event.type){
					case "amelioration":
						let icon1=document.createElement("img");
						icon1.classList.add("icon");
						icon1.src="image/actions/upgrade.png";
						notif.appendChild(icon1);
						let batiment=document.createElement("span");
						batiment.style.marginLeft="10px";
						batiment.innerText=event.batiment;
						notif.appendChild(batiment);
						break;
					case "molecule":
						let icon2=document.createElement("img");
						icon2.classList.add("icon");
						icon2.src="image/actions/molecule.png";
						notif.appendChild(icon2);
						let molecule=document.createElement("span");
						molecule.style.marginLeft="10px";
						molecule.innerHTML="Mol&eacute;cule "+(event.molecule+1)+" : "+event.number+" restantes";
						notif.appendChild(molecule);
						break;
					case "combat":
						let icon3=document.createElement("img");
						icon3.classList.add("icon");
						icon3.src="image/actions/combat.png";
						notif.appendChild(icon3);
						let beligerants=document.createElement("span");
						beligerants.style.marginLeft="10px";
						beligerants.innerText=event.atk+" vs "+event.def;
						notif.appendChild(beligerants);
						break;
					case "return":
						let icon4=document.createElement("img");
						icon4.classList.add("icon");
						icon4.src="image/actions/retour.png";
						notif.appendChild(icon4);
						let txt=document.createElement("span");
						txt.style.marginLeft="10px";
						txt.innerText="Retour d'attaque";
						notif.appendChild(txt);
						break;
				}
				time=document.createElement("span");
				time.classList.add("notif_time");
				time.innerText=affichageTemps(event.time-Date.now());
				notif.appendChild(time);
				notifbar.appendChild(notif);
			}
		}else{
			alert("ERROR in getting user's events : code "+xhr.status);
		}
	});
}
window.onload=()=>{
	let check_connect_xhr=new XMLHttpRequest();
	let at_send=new URLSearchParams();
	at_send.append("token",localStorage.getItem("token"));
	check_connect_xhr.open("GET","/api/v1/connect?"+at_send.toString());
	check_connect_xhr.responseType="json";
	check_connect_xhr.send();
	check_connect_xhr.addEventListener("readystatechange",function(ev){
		if(check_connect_xhr.readyState==check_connect_xhr.DONE){
			if(check_connect_xhr.response.connected){
				username=check_connect_xhr.response.username;
				for(a=0;a<6;a++){
					frames[a].username=check_connect_xhr.response.username;
				}
				document.getElementById("popup_mask").addEventListener("click",(ev)=>{
					document.getElementById("popup_mask").style.display="none";
					document.getElementById(opened_popup_id).setAttribute("open","no");
				});
				document.getElementById("notifbar").addEventListener("click",(ev)=>{
					document.getElementById("notifbar").setAttribute("open","yes");
					document.getElementById("popup_mask").style.display="block";
					opened_popup_id="notifbar";
				});
				act_preview();
				setInterval(act_preview,1250)
			}else{
				document.location.replace("html/accueil.html");
			}
		}
	});
	let list_users_xhr=new XMLHttpRequest();
	let at_send2=new URLSearchParams();
	at_send2.append("mode","list");
	list_users_xhr.open("GET","/api/v1/users?"+at_send2.toString());
	list_users_xhr.responseType="json";
	list_users_xhr.send();
	list_users_xhr.addEventListener("readystatechange",function(ev){
		if(list_users_xhr.readyState==list_users_xhr.DONE){
			for(b=0;b<9;b++){
				let user_autocomplete_list=frames[b].document.createElement("datalist");
				user_autocomplete_list.id="user_autocomplete_list";
				for(let a of list_users_xhr.response){
					let user_element=frames[b].document.createElement("option");
					user_element.innerHTML=a;
					user_autocomplete_list.appendChild(user_element);
				}
				frames[b].document.body.appendChild(user_autocomplete_list);
			}
		}
	});
}
function open_iframe(iframeid){
	let iframe=document.getElementById("iframe"+iframeid);
	iframe.setAttribute("open","yes");
	document.getElementById("popup_mask").style.display="block";
	opened_popup_id="iframe"+iframeid;
}