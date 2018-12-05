
var currentDiceNumber;

var players = [];
var playerColor = ['red', 'green', 'blue', 'yellow'];
var currentPlayer;
var currentPlayerIndex = 0;
var me = null;

function drawPlayers(players){
	for(var i=0;i<players.length;i++){
		drawPlayer(players[i]);
	}
}

function drawPlayer(player){
	var number = player.getCurrentCell();
	cellX = getColFromNumber(number) * cellWidth;
	cellY = getRowFromNumber(number) * cellHeight;
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
				playerMoveLadder(player, ladders[i]);
				player.setCurrentCell(ladders[i].top);
			}
		}

		//check for snake head

		for(var i = 0; i< snakes.length; i++ ){
			if(snakes[i].head == endCell){
				// move to end cell
				playerMoveSnake(player, snakes[i]);
				player.setCurrentCell(snakes[i].tail);
			}
		}
	}
}



function moveOneCell(start, player){
	erasePlayerAt(start, player.getContext());
	var end = start + 1;
	var endX = getColFromNumber(end) * cellWidth;
	var endY = getRowFromNumber(end) * cellHeight;
	
	draw.fillCircle({x: endX + cellWidth/2, y: endY + cellHeight/2}, 15, player.getColor(), player.getContext());
}

function drawPlayerATxy(x, y, color, playerLayerCtx){
	playerLayerCtx.clearRect(0, 0, 600, 600);
	draw.fillCircle({x: x, y: y}, 15, color, playerLayerCtx);
}

function rollTheDiceAndEmit(){
	var currentDiceNumber = rollTheDice();
	socket.emit('diceRolled', {'currentDiceNumber': currentDiceNumber});
}

function rollTheDice(diceNumber){
	currentDiceNumber = diceNumber?diceNumber:getRandomInt(1,6);
	document.getElementById('current-dice-number').innerHTML = currentDiceNumber;
	currentPlayer.addToCurrentCell(currentDiceNumber);
	switchToNextPlayer();
	return currentDiceNumber;
}

function switchToNextPlayer(){
	currentPlayerIndex = (currentPlayerIndex==players.length-1)?0:currentPlayerIndex + 1
	currentPlayer = players[currentPlayerIndex];
	document.getElementById('current-player').innerHTML = currentPlayer.getName() + "'s Turn"
	if(me === currentPlayer){
		// enable roll the dice
		document.getElementById('roll-dice').style.display = 'block';
	}
	else{
		//disable roll the dice
		document.getElementById('roll-dice').style.display = 'none';
	}
}

function getRandomInt(min, max){
	randomInt = Math.floor(Math.random() * ((max-min) +1)) + min;
	return randomInt;
} 

function player(color='red', index, name){
	var currentCell = 1;
	var color = color;
	var index = index;
	var name = name;

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

	this.getName = function(){
		return name;
	}
}

function createPlayerAndEmit(){
	var index = players.length;
	var color = playerColor[index];
	var name =  document.getElementById('player-name').value;
	if(!name){
		document.getElementById('name-error').style.display = 'block';
		return;
	}
	document.getElementById('name-error').style.display = 'none';
	me = createPlayer(color, name);
	socket.emit('playerAdded', {'color': color, 'index': index, 'name': name});
}

function createPlayer(color, name){
	var p = new player(color,players.length,name);
	players.push(p);
	currentPlayer  = players[currentPlayerIndex];
	drawPlayers(players);
	updatePlayerListHtml(players);
	return p;
}

function updatePlayerListHtml(players) {
	var playerList = '';

	for(var i=0; i< players.length; i++){
		playerList += `<li>${players[i].getName()} <div class="player-color" style="background-color:${players[i].getColor()};"></div></li>`
	}
	document.getElementById('player-list').innerHTML = playerList;
}

function playerMoveLadder(player, ladder) {
	var x1 = getColFromNumber(ladder.bottom) * cellWidth;
	var y1 = getRowFromNumber(ladder.bottom) * cellHeight;
	
	var x2 = getColFromNumber(ladder.top) * cellWidth;
	var y2 = getRowFromNumber(ladder.top) * cellHeight;

	var down = 20;
	l1p1 = {
		x: x1+ down,
		y: y1+ down,
	}

	l1p2 = {
		x: x2 + down,
		y: y2 + down
	}
	
	var m = (l1p2.y-l1p1.y)/(l1p2.x-l1p1.x);
	
	var start = null;
	var speed = 1/30;
	var playerColor = player.getColor();
	var playerCtx = player.getContext();
	window.requestAnimationFrame(step);

	function step(timestamp) {
		if (!start) start = timestamp;
		var dt = timestamp - start;
		var d = dt * speed * Math.sign(m);
		//element.style.left = Math.min(progress / 10, 200) + 'px';
		var ptNext = helper.pointAtPerpendicularDistance(l1p1, -1/m, -d);
		drawPlayerATxy(ptNext.x, ptNext.y, playerColor, playerCtx);
		if ((m>0 && ptNext.x >= l1p2.x && ptNext.y >= l1p2.y) || (m<0 && ptNext.x <= l1p2.x && ptNext.y >= l1p2.y)) {
		  window.requestAnimationFrame(step);
		}


	}

}

function playerMoveSnake(player, snake) {
	var x1 = getColFromNumber(snake.head) * cellWidth;
	var y1 = getRowFromNumber(snake.head) * cellHeight;
	
	var x2 = getColFromNumber(snake.tail) * cellWidth;
	var y2 = getRowFromNumber(snake.tail) * cellHeight;

	var down = 20;
	l1p1 = {
		x: x1+ down,
		y: y1+ down,
	}

	l1p2 = {
		x: x2 + down,
		y: y2 + down
	}
	
	var m = (l1p2.y-l1p1.y)/(l1p2.x-l1p1.x);
	
	var start = null;
	var speed = 1/30;
	var playerColor = player.getColor();
	var playerCtx = player.getContext();
	window.requestAnimationFrame(step);

	function step(timestamp) {
		if (!start) start = timestamp;
		var dt = timestamp - start;
		var d = dt * speed * Math.sign(m);
		//element.style.left = Math.min(progress / 10, 200) + 'px';
		var ptNext = helper.pointAtPerpendicularDistance(l1p1, -1/m, d);
		drawPlayerATxy(ptNext.x, ptNext.y, playerColor, playerCtx);
		if ((m>0 && ptNext.x <= l1p2.x && ptNext.y <= l1p2.y) || (m<0 && ptNext.x >= l1p2.x && ptNext.y <= l1p2.y)) {
		  window.requestAnimationFrame(step);
		}


	}

}

  
