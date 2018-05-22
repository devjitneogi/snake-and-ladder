
var currentDiceNumber;

var players = [];
var playerColor = ['red', 'green', 'blue'];
var currentPlayer;
var currentPlayerIndex = 0;

var previousTime ;

var t1 = new Date();
var t2 = new Date();
var dt = t2-t1; // in mili secs


function drawPlayers(players){
	for(var i=0;i<players.length;i++){
		drawPlayer(players[i]);
	}
}

function drawPlayer(player){
	var number = player.getCurrentCell();
	cellX = getColFromNumber(number) * cellWidth;
	cellY = getRowFromNumber(number) * cellHeight;
	//drawPlayerATxy(cellX + cellWidth/2, cellY + cellHeight/2, player.getColor());

	draw.fillCircle({x: cellX + cellWidth/2, y: cellY + cellHeight/2}, 15, player.getColor(), player.getContext());
}

function erasePlayerAt(n, ctx){
	cellX = getColFromNumber(n) * cellWidth;
	cellY = getRowFromNumber(n) * cellHeight;
	ctx.clearRect(cellX, cellY, cellWidth, cellHeight);
}

var playerSpeed = 10;
function movePlayerAnimation(startCell, endCell, player){
	var startX = getColFromNumber(startCell) * cellWidth;
	var startY = getRowFromNumber(startCell) * cellHeight;
	var endX = getColFromNumber(endCell) * cellWidth;
	var endY = getRowFromNumber(endCell) * cellHeight;
	
	moveOneCell(startCell, player);
	startCell = startCell + 1;
	
	if(startCell < endCell){
		setTimeout(function(start, end){
			movePlayerAnimation(start,end, player);
		},300, startCell, endCell);
	}

	if(startCell == endCell){
		for(var i = 0; i< ladders.length; i++ ){
			if(ladders[i].bottom == endCell){
				// move to end cell
			}
		}

		//check for snake head
	}
}



function moveOneCell(start, player){
	erasePlayerAt(start, player.getContext());
	var end = start + 1;
	var endX = getColFromNumber(end) * cellWidth;
	var endY = getRowFromNumber(end) * cellHeight;
	
	//drawPlayerATxy(endX + cellWidth/2, endY + cellHeight/2);

	draw.fillCircle({x: endX + cellWidth/2, y: endY + cellHeight/2}, 15, player.getColor(), player.getContext());
}

function drawPlayerATxy(x, y, color){
	draw.fillCircle({x: x, y: y}, 15, color, playerLayerCtx);
}

function updatePlayerPosition(){
	
}

window.requestAnimationFrame(updatePlayerPosition);


function rollTheDice(){
	currentDiceNumber = getRandomInt(1,6);
	document.getElementById('current-dice-number').innerHTML = currentDiceNumber;
	currentPlayer.addToCurrentCell(currentDiceNumber);
	switchToNextPlayer();
}

function switchToNextPlayer(){
	currentPlayerIndex = (currentPlayerIndex==players.length-1)?0:currentPlayerIndex + 1
	currentPlayer = players[currentPlayerIndex];
}

function getRandomInt(min, max){
	randomInt = Math.floor(Math.random() * ((max-min) +1)) + min;
	return randomInt;
} 

function player(color='red',index){
	var currentCell = 1;
	var color = color;

	var playerCanvas = document.createElement('canvas');
	playerCanvas.width = 550;
	playerCanvas.height =  550;
	playerCanvas.style.zIndex = 4;
	document.getElementById('canvas-area').appendChild(playerCanvas);
	var ctx = playerCanvas.getContext('2d');
	
	this.setCurrentCell =  function(n){
		currentCell = n;
	}
	
	this.getCurrentCell =  function(){
		return currentCell;
	}

	this.getColor = function(){
		return color;
	}
	
	this.addToCurrentCell = function(n){
		movePlayerAnimation(currentCell, currentCell+n, this);
		currentCell = currentCell + n;
	}

	this.getContext = function(){
		return ctx;
	}
}

function moveFromAtoB(){
	
}

function createPlayer(){
	var color = playerColor[players.length];
	players.push(new player(color,players.length));
	currentPlayer  = players[currentPlayerIndex];
	drawPlayers(players);
}