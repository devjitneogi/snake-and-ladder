var ladders = [
	{
		bottom: 29,
		top: 47
	},
	{
		bottom: 40,
		top: 77
	},
	{
		bottom: 66,
		top: 99
	},
	{
		bottom: 6,
		top: 13
	},
	{
		bottom: 4,
		top: 34
	}
];

function drawLadder(ladder){
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
       
    draw.line(l1p1, l1p2, 'black', boardCtx);

	var l2p1 = helper.pointAtPerpendicularDistance(l1p1, m, 15);
	var l2p2 = helper.pointAtPerpendicularDistance(l1p2, m, 15);
	
    draw.line(l2p1, l2p2, 'black', boardCtx);

	var dir = Math.sign(-m);

	var sp = helper.pointAtPerpendicularDistance(l1p1, -1/m, dir * 10);
	var spo = helper.pointAtPerpendicularDistance(sp, m, 15);
    draw.line(sp, spo, 'black', boardCtx);
	var spOld = sp;

	while(sp.y > l1p2.y + 8 && sp.y < l1p1.y){		
		sp = helper.pointAtPerpendicularDistance(spOld, -1/m, dir * 10);
		spo = helper.pointAtPerpendicularDistance(sp, m, 15);
        draw.line(sp, spo, 'black', boardCtx);
		spOld = sp;
	}
	
}

(function(){	
	for(var j = 0; j < ladders.length; j++){
	 drawLadder(ladders[j]);
	}
})();