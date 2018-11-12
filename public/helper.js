function helper(){
  this.pointAtPerpendicularDistance = function(p1, m, d){
    //  y = -x/m + (p1.y+p1.x/m);
    var p2 = {};

    if(m == Infinity){
      m = 0;
    }

    if(m == 0){
      var xParallel = 1/m > 0;
      p2.x = xParallel ? p1.x + d : p1.x;
      p2.y = xParallel ? p1.y : p1.y + d;
      return p2;
    }

    var a = (1 + m*m);
    var b = -2*p1.x*a;
    var c = (p1.x * p1.x)*a - (d*d*m*m);
    var x2 = getXFromQuadraticEquation(a,b,c);

    p2.x = d>0?x2[0]:x2[1];
    p2.y = (-p2.x/m) + p1.y + (p1.x/m);
    
    return p2;
  }
  
  
  function getXFromQuadraticEquation(a, b ,c){
      var discriminant = Math.sqrt((b*b) - (4*a*c));
      var x1 = (-b + discriminant) / (2*a);
      var x2 = (-b - discriminant) / (2*a);
      return [x1, x2];
  }

  this.distanceBetweenTwoPoints = function(p1, p2){
    return Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2));
  }

  return this;
}

window.helper = new helper();