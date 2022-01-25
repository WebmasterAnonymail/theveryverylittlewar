const md=require("./miscdatas.js")
module.exports={
	eventcheck:function(){
		let a_suprimer=[];
		for(let a in dbs.events){
			if(dbs.events[a].time<Date.now()){
				switch(dbs.events[a].type){
					
				}
			}
		}
		let b=0;
		let l=dbs.events.length;
		for(let a=0;a<l;a++){
			if(dbs.events[b]==null){
				dbs.events.splice(b,1);
				b--;
			}
			b++;
		}
	},
	usercheck:function(user,token=null){
		if(dbs.users[user]){
			let tempEcoule=Date.now()-dbs.users[user].lastUserCheck;
			
			dbs.users[user].lastUserCheck=Date.now();
			if(dbs.connections[token]==user){
				return(dbs.users);
			}
		}
		return false;
	},
	gamecheck:function(){
		//Classement
		let classement=[]
		for(a in dbs.users){
			if(dbs.users[a].actif){
				classement.push({
					user:a,
					points:dbs.users[a].points
				});
			}
		}
		classement.sort(function(a,b){
			return b.points.total-a.points.total;
		});
		dbs.MDS.classement=classement;
		//Réinitialisation mensuelle
		if(Date.now()>new Date(dbs.MDS.actual_game.year,dbs.MDS.actual_game.month+1).getTime()){
			dbs.MDS.actual_game.year=new Date().getFullYear();
			dbs.MDS.actual_game.month=new Date().getMonth();
			//Réinitialisation mensuelles
			dbs.connections={};
			for(let a in dbs.users){
				dbs.users[a].positionX=null;
				dbs.users[a].positionY=null;
				dbs.users[a].actif=false;
			}
			dbs.events=[];
			dbs.connections={};
			dbs.MDS.classement=[];
			dbs.MDS.map={"in_teams_progress":{"NONETEAM":0},"progress":3};
		}
	}
}
