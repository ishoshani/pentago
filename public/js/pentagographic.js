
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var board=[];
gamestate(board);
gamewon=false;
player="white"
drawstuff()

function gamestate(board){

for (var i = 0; i < 6; i++) {
	var row = [];
	for (var j = 0; j < 6; j++) {
		row[j]=null;
	};
	board[i]=row;
};


	canvas.addEventListener('click', function(e){
		var mx = e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft-58;
		var my = e.clientY+document.body.scrollTop+document.documentElement.scrollTop-79;
		console.log("mouse at"+mx+" "+my);
		var px= Math.floor(mx/83);
		var py= Math.floor(my/83);
		console.log("would put this into position"+px+" "+py);
		if(board[px][py]===null&&gamewon===false){
		if(player==="white"){
			board[px][py]="white";
			winstate=checkwinstate(px,py,player);
			player="black";
		}
		else{
			board[px][py]="black";
			checkwinstate(px,py,player);
			player="white";
		}
		drawstuff();
	}
	})



}
function checkwinstate(px,py,player){
	win=false;
	if(checkrow(px,py,player)||checkcol(px,py,player)||checkdagpos(px,py,player)||checkdagneg(px,py,player))
		{ win =true}
	console.log("game is over "+win)
	if(win===true){
		gamewon=true;
		console.log("game goes to "+player)
	}
	return win;
}
function drawstuff(){
	drawboard();
	drawpieces();
}

function drawboard(){
ctx.fillStyle = "#FF0000";
ctx.fillRect(0,0,500,500);
ctx.fillStyle = "#AB1100"
ctx.fillRect(0,0,250,250);
ctx.fillStyle = "#0C05FA"
ctx.fillRect(250,0,250,250);
ctx.fillStyle = "#0C05FA"
ctx.fillRect(0,250,250,250);
ctx.fillStyle = "#AB1100"
ctx.fillRect(250,250,250,250);
startx=0;
starty=0;
for(i=0;i<6;i++){
	startx+=83;
	starty+=83;
	ctx.moveTo(startx,0);
	ctx.lineTo(startx,500);
	ctx.moveTo(0,starty);
	ctx.lineTo(500,starty);
	ctx.stroke()
}
ctx.stroke();
}

function drawpieces(){
	startx=83/2;
	starty=83/2;
	for(i=0;i<6;i++){
		for(j=0;j<6;j++){
			if(board[i][j]!==null){
//			console.log("found piece "+board[i][j]+" at "+i+" "+j)
			ctx.beginPath();
			ctx.fillStyle=board[i][j]
			ctx.arc(startx,starty,40,0,2*Math.PI);
//			console.log("drawing circle at "+startx+" "+starty)
			ctx.fill();
			ctx.stroke();
		}
			starty+=83;
		}
		starty=83/2
		startx+=83;
	}
}

function checkrow(px,py,player){
	cx=px;
	cy=py;
	count=1;
	while(cx>0){
		cx--;
		if(board[cx][cy]===player){
			count++;
		}
		else {break}
		}
	cx=px;
	while (cx<5){
		cx++;
		if(board[cx][cy]===player){
		count++;
		}
		else {break}
	}
	console.log("row count "+count)
	if (count>4){
		return true;
	}else{
		return false;
	}
}
function checkcol(px,py,player){
	cx=px;
	cy=py;
	count=1;
	while(cy>0){
		cy--;
		if(board[cx][cy]===player){
			count++;
		}
		else {break}
		}
	cy=py;
	while (cy<5){
		cy++;
		if(board[cx][cy]===player){
		count++;
		}
		else {break}
	}
	if (count>=5){
		return true;
	}else{
		return false;
	}
}
function checkdagpos(px,py,player){
	cx=px;
	cy=py;
	count=1;
	while(cx>0&&cy>0){
		cx--;
		cy--;
		if(board[cx][cy]===player){
			count++;
		}
		else {break}
		}
	cx=px;
	cy=py;
	while (cx<5&&cy<5){
		cx++;
		cy++;
		if(board[cx][cy]===player){
		count++;
		}
		else {break}
	}
	if (count>=5){
		return true;
	}else{
		return false;
	}
}
function checkdagneg(px,py,player){
	cx=px;
	cy=py;
	count=1;
	while(cx>0&&cy<5){
		cx--;
		cy++;
		if(board[cx][cy]===player){
			count++;
		}
		else {break}
		}
	cx=px;
	cy=py;
	while (cx<5&&cy>0){
		cx++;
		cy--;
		if(board[cx][cy]===player){
		count++;
		}
		else {break}
	}
	if (count>=5){
		return true;
	}else{
		return false;
	}
}