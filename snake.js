var snakes = [
	{
		head: 94,
		tail: 34
    },
    {
		head: 64,
		tail: 19
    },
    {
		head: 52,
		tail: 10
	}
];

function drawSnake(snake){
    var x1 = getColFromNumber(snake.head) * cellWidth;
	var y1 = getRowFromNumber(snake.head) * cellHeight;
	
	var x2 = getColFromNumber(snake.tail) * cellWidth;
    var y2 = getRowFromNumber(snake.tail) * cellHeight;
    

    var down = 20;

	var headPt = {
		x: x1+ down,
		y: y1+ down,
	}

	var tailPt = {
		x: x2 + down,
		y: y2 + down
	}
	
    var m = (tailPt.y-headPt.y)/(tailPt.x-headPt.x);

    var dir = Math.sign(m);

    var pt = headPt;
    var curveDir = 1;
    var ptHalf;
    var controlPoint;

    boardCtx.lineWidth = 15;

    var turnDistance =  helper.distanceBetweenTwoPoints(headPt, tailPt) / 5;

    drawHead(headPt, 15);

    while(Math.ceil(pt.y) < tailPt.y ){
        boardCtx.beginPath();
        boardCtx.moveTo(pt.x,pt.y);
        
        ptHalf = helper.pointAtPerpendicularDistance(pt, -1/m, dir * turnDistance / 2);
        pt = helper.pointAtPerpendicularDistance(pt, -1/m, dir * turnDistance);
        
        curveDir = curveDir * -1;
        controlPoint = helper.pointAtPerpendicularDistance(ptHalf, m, curveDir * turnDistance);
        
        boardCtx.quadraticCurveTo( controlPoint.x, controlPoint.y, pt.x, pt.y,);
        boardCtx.lineWidth = boardCtx.lineWidth - 3;
        boardCtx.stroke();

        boardCtx.fillStyle = 'red';
	}

    boardCtx.lineWidth = 1;
    draw.line(headPt, tailPt, 'red', boardCtx);

}

function drawHead(headPt, neckWidth){
    boardCtx.fillRect(headPt.x, headPt.y-5, 10, 10);
}


(function(){	
	for(var j = 0; j < snakes.length; j++){
        drawSnake(snakes[j]);
	}
})();