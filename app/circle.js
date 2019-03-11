Point = require('./point.js').Point;
Line = require('./line.js').Line;

function Circle(o,r)
{
	this.o = o;
	this.r = r;
	this.type = 4;
}

module.exports.Circle = Circle;

Circle.defineTwoPoint = function(o,p)
{
	var c = new Circle();
	c.o = o;
	c.r = o.dist(p);
	return c;
}

Circle.defineThreePoint = function(a,b,c)
{
	var l = Line.defineSegmentBisector(a,b);
	var m = Line.defineSegmentBisector(b,c);
	var p =l.intersect(m);
	if (p[0] == -1)
	{
		return;
	}
	return Circle.defineTwoPoint(p[0],a);
}

Circle.prototype.draw = function(ctx)
{
	ctx.beginPath();
	ctx.arc(this.o.x,this.o.y,this.r,0,2*Math.PI,false);
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

Circle.prototype.drawHigh = function(ctx)
{
	ctx.beginPath();
	ctx.arc(this.o.x,this.o.y,this.r,0,2*Math.PI,false);
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

Circle.prototype.dist = function(p)
{
	return Math.abs(this.o.dist(p) - this.r);
}

Circle.prototype.intersect = function(obj)
{
	if (this.type > obj.type)
		return obj.intersect(this);
	else if (obj.type == 4)
	{
		var w = (this.r*this.r-obj.r*obj.r-this.o.x*this.o.x+obj.o.x*obj.o.x-this.o.y*this.o.y+obj.o.y*obj.o.y)/2;
		var l = Line.defineTwoPoints(this.o,obj.o);
		var p = new Point();
		p.x = (w-l.n*(obj.o.y-this.o.y))/(obj.o.x-this.o.x+l.k*(obj.o.y-this.o.y));
		p.y = l.k*p.x+l.n;
		var m = Line.defineLineNormal(l,p);
		return this.intersect(m);
	}
	else 
		return [-1,-1];
}

Circle.prototype.getClosest = function(p)
{
	var l = Line.defineTwoPoints(p,this.o);
	var points = l.intersect(this);
	if (points[0].dist(p) < points[1].dist(p))
		return points[0];
	return points[1]; 
}
