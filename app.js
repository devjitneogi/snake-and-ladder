
var currentDiceNumber;

var players = [];
var playerColor = ['red', 'green', 'blue'];
var currentPlayer;
var currentPlayerIndex = 0;

var previousTime ;

var t1 = new Date();
var t2 = new Date();
var dt = t2-t1; // in mili secs



var playerLayer = document.getElementById('player-layer');
var playerLayerCtx = playerLayer.getContext('2d');


function drawPlayers(players){
	for(var i=0;i<players.length;i++){
		drawPlayer(players[i]);
	}
}

function drawPlayer(player){
	var number = player.getCurrentCell();
	cellX = getColFromNumber(number) * cellWidth;
	cellY = getRowFromNumber(number) * cellHeight;
	drawPlayerATxy(cellX + cellWidth/2, cellY + cellHeight/2, player.getColor());
}

function erasePlayerAt(n){
	cellX = getColFromNumber(n) * cellWidth;
	cellY = getRowFromNumber(n) * cellHeight;
	playerLayerCtx.clearRect(cellX, cellY, cellWidth, cellHeight);
}

var playerSpeed = 10;
function movePlayerAnimation(startCell, endCell){
	var startX = getColFromNumber(startCell) * cellWidth;
	var startY = getRowFromNumber(startCell) * cellHeight;
	var endX = getColFromNumber(endCell) * cellWidth;
	var endY = getRowFromNumber(endCell) * cellHeight;
	
	moveOneCell(startCell);
	startCell = startCell + 1;
	
	if(startCell < endCell){
		setTimeout(function(start, end){
			movePlayerAnimation(start,end);
		},300, startCell, endCell);
	}
}



function moveOneCell(start){
	erasePlayerAt(start);
	var end = start + 1;
	var endX = getColFromNumber(end) * cellWidth;
	var endY = getRowFromNumber(end) * cellHeight;
	
	drawPlayerATxy(endX + cellWidth/2, endY + cellHeight/2);
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

function player(color='red'){
	var currentCell = 1;
	var color = color;
	
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
		movePlayerAnimation(currentCell, currentCell+n);
		currentCell = currentCell + n;
	}
}

function moveFromAtoB(){
	
}

function createPlayer(){
	var color = playerColor[players.length];
	players.push(new player(color));
	currentPlayer  = players[currentPlayerIndex];
	drawPlayers(players);
}