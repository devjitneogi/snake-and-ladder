function helper(){
  this.pointAtPerpendicularDistance = function(p1, m, d){
    //  y = -x/m + (p1.y+p1.x/m);
    var p2 = {};
    var a = (1 + m*m);
    var b = -2*p1.x*a;
    var c = (p1.x * p1.x)*a - (d*d*m*m);
    var x2 = getXFromQuadraticEquation(a,b,c);

    p2.x = m>0?x2[0]:x2[1];
    p2.y = (-p2.x/m) + p1.y + (p1.x/m);
    
    return p2;
  }
  
  
  function getXFromQuadraticEquation(a, b ,c){
      var discriminant = Math.sqrt((b*b) - (4*a*c));
      var x1 = (-b + discriminant) / (2*a);
      var x2 = (-b - discriminant) / (2*a);
      return [x1, x2];
  }

  return this;
}

window.helper = new helper();