
    var cellWidth = 50;
    var cellHeight = 50;
    var cellX = 0;
    var	cellY = 0;
        
    var canvas = document.getElementById('board-layer');
    var boardCtx = canvas.getContext('2d');

    function cell(number){

        this.number = number;

        this.mover = null;

        this.moveTo = function(){
            if(this.mover!==null){
                this.mover.to;
            }
        }
        
        
        cellX = getColFromNumber(number) * cellWidth;
        cellY = getRowFromNumber(number) * cellHeight;
        
        boardCtx.fillStyle = 'hsl('+ 360*Math.random() +',89%,70%)'; // color of the cell
        boardCtx.fillRect(cellX, cellY, cellWidth, cellHeight);
        boardCtx.strokeRect(cellX, cellY, cellWidth , cellHeight);
        boardCtx.fillStyle = 'black'; // text color
        boardCtx.fillText(number, cellX +10, cellY+10);

    }

    function getRowFromNumber(number){
        var row  = 10 - parseInt(number/10);
        if(number%10 === 0){
            return row + 1;
        }
        return row;
    }

    function getColFromNumber(number){
        var unitDigit = number%10;
        var col = unitDigit;
        var isEvenRow = getRowFromNumber(number) % 2 === 0;
        var isUnitDigitZero = unitDigit === 0;
        if(isEvenRow){
            //row even		
            if(isUnitDigitZero){
                col = 10;
            }
        }
        else{
            //row odd
            col = 10 - (unitDigit) + 1;
            if(isUnitDigitZero){
                col = 1;
            }
        }
        return col;
    }


(function(){
    var numberOfCells = 100;
	for(var i = 1; i <= numberOfCells; i++){
	 new cell(i);
	}
})();