function draw(){
    this.fillCircle = function(center, radius, fillColor, ctx){
        ctx.beginPath();
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    this.line = function(from, to, color, ctx){
        ctx.beginPath();
		ctx.moveTo(from.x, from.y);
		ctx.lineTo(to.x, to.y);
		ctx.strokeStyle = color;
		ctx.stroke();
    }
}

window.draw = new draw();