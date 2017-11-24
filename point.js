function Point(_x,_y)
{
	this.x = _x;
	this.y = _y;
	this.type = 1;
}

Point.defineMiddle = function(a,b)
{
	var p = new Point();
	p.x = (a.x+b.x)/2;
	p.y = (a.y+b.y)/2;
	return p;
}

Point.prototype.draw = function(ctx)
{
	ctx.beginPath();
	ctx.arc(this.x,this.y,3,0,2*Math.PI,false);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

Point.prototype.drawHigh = function(ctx)
{
	ctx.beginPath();
	ctx.arc(this.x,this.y,4,0,2*Math.PI,false);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

Point.prototype.dist = function(p)
{
	var _x = p.x;
	var _y = p.y;
	return Math.sqrt((this.x-_x)*(this.x-_x)+(this.y-_y)*(this.y-_y));
}

Point.prototype.intersect = function(obj)
{
	return [-1,-1];
}