var snakes = [
	{
		head: 94,
		tail: 34
    },
    {
		head: 84,
		tail: 19
    },
    {
		head: 65,
		tail: 7
    },
    {
		head: 12,
		tail: 8
    },
    {
		head: 21,
		tail: 3
    },
    {
		head: 72,
		tail: 48
    },
    {
		head: 44,
		tail: 5
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

    boardCtx.lineWidth = 12;

    var turnDistance =  helper.distanceBetweenTwoPoints(headPt, tailPt) / 5;

    

    while(Math.ceil(pt.y) < tailPt.y ){
        boardCtx.beginPath();
        boardCtx.moveTo(pt.x,pt.y);
        
        ptHalf = helper.pointAtPerpendicularDistance(pt, -1/m, dir * turnDistance / 2);
        pt = helper.pointAtPerpendicularDistance(pt, -1/m, dir * turnDistance);
        
        curveDir = curveDir * -1;
        controlPoint = helper.pointAtPerpendicularDistance(ptHalf, m, curveDir * turnDistance);
        
        boardCtx.quadraticCurveTo( controlPoint.x, controlPoint.y, pt.x, pt.y,);
        boardCtx.lineWidth = boardCtx.lineWidth - 1.5;
        boardCtx.stroke();

        boardCtx.fillStyle = 'red';
	}

    drawHead(headPt, 15);

}

function drawHead(headPt, neckWidth){
    boardCtx.beginPath();
    
    boardCtx.moveTo(headPt.x - 5, headPt.y - 3);
    boardCtx.bezierCurveTo(headPt.x, headPt.y - 20, headPt.x + 20, headPt.y - 20, headPt.x+25, headPt.y );

    boardCtx.moveTo(headPt.x+7, headPt.y + 2);
    boardCtx.bezierCurveTo(headPt.x+20, headPt.y + 3, headPt.x + 20, headPt.y + 5, headPt.x+25, headPt.y);

    boardCtx.moveTo(headPt.x, headPt.y +5);
    boardCtx.bezierCurveTo(headPt.x+5, headPt.y + 5, headPt.x + 20, headPt.y + 15, headPt.x+25, headPt.y );

    boardCtx.moveTo(headPt.x+25, headPt.y);
    boardCtx.bezierCurveTo(headPt.x+25, headPt.y + 3, headPt.x + 35, headPt.y - 5, headPt.x+45, headPt.y);

    boardCtx.moveTo(headPt.x+25, headPt.y);
    boardCtx.bezierCurveTo(headPt.x+25, headPt.y - 4, headPt.x + 35, headPt.y + 3, headPt.x+45, headPt.y +3);

    boardCtx.lineWidth = 1;
    // line color
    boardCtx.strokeStyle = 'black';
    boardCtx.stroke();

    draw.fillCircle({x: headPt.x + 11, y: headPt.y -4}, 3, 'black', boardCtx);
}


(function(){	
	for(var j = 0; j < snakes.length; j++){
        drawSnake(snakes[j]);
	}
})();