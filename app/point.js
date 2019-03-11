function Point(x,y) {
	this.x = x;
	this.y = y;
	this.type = 1;
}

module.exports.Point = Point;

Point.prototype.subtract = function(p) {
    return new Point(this.x - p.x, this.y - p.y);
}

Point.prototype.vectorTo = function(p) {
    return p.subtract(this);
}

Point.prototype.scale = function(c) {
    return new Point(this.x*c, this.y*c);
}

Point.prototype.add = function(p) {
    return new Point(this.x + p.x, this.y + p.y);
}

Point.prototype.length = function() {
    var x = this.x;
    var y = this.y;
	return Math.sqrt(x*x + y*y);
}

Point.prototype.normalize = function() {
    if (this.length() == 0) {
        return new Point(0,0);
    }
    return this.scale(1/this.length());
}

Point.prototype.dist = function(p) {
    return this.subtract(p).length();
}

Point.defineMiddle = function(a,b) {
	var p = new Point();
	p.x = (a.x+b.x)/2;
	p.y = (a.y+b.y)/2;
	return p;
}

Point.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x,this.y,3,0,2*Math.PI,false);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

Point.prototype.drawHigh = function(ctx) {
	ctx.beginPath();
	ctx.arc(this.x,this.y,4,0,2*Math.PI,false);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

Point.prototype.intersect = function(obj) {
	return [-1,-1];
}
