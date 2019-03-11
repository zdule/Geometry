Point = require('./point.js').Point;

function Line()
{
	this.k = 1;
	this.n = 0;
	this.type = 2;
}

module.exports.Line = Line;

Line.defineTwoPoints = function(a,b)
{
	var l = new Line();
	if (a.x == b.x)
		l.x = a.x;
	else
	{
		l.k = (a.y-b.y)/(a.x-b.x);
		l.n = a.y-l.k*a.x;
	}
	return l;
}

Line.defineLineNormal = function(line,p)
{
	var parallel = new Line();
	if (line.x != undefined)
	{
		parallel.k = 0;
		parallel.n = p.y;
	}
	else if (line.k == 0)
		parallel.x = p.x;
	else
	{
		parallel.k = -1/line.k;
		parallel.n = p.y-parallel.k*p.x;
	}
	return parallel;
}

Line.defineLineParalel = function(m,p)
{
	var l = Line.defineLineNormal(m,p);
	return Line.defineLineNormal(l,p);
}

Line.defineSegmentBisector = function(p,q)
{
	var point = Point.defineMiddle(p,q);
	var l = Line.defineTwoPoints(p,q);
	return Line.defineLineNormal(l,point);
}

Line.defineAngleBisector = function(p,q,r) {
    var a = q.vectorTo(p).normalize();
    var b = q.vectorTo(r).normalize();
    var c = Point.defineMiddle(q.add(a),q.add(b));
    if (q.dist(c)==0) {
        return Line.defineLineNormal(Line.defineTwoPoints(p,r),q);
    }
    return Line.defineTwoPoints(q,c);
}

Line.prototype.draw = function(ctx)
{
	ctx.beginPath();
	if (this.x != undefined)
	{
		ctx.moveTo(this.x,0);
		ctx.lineTo(this.x,2000);
	}
	else
	{
		ctx.moveTo(0,this.n);
		ctx.lineTo(2000,2000*this.k+this.n);
	}
	ctx.lineWidth = 2;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

Line.prototype.drawHigh = function(ctx)
{
	ctx.beginPath();
	if (this.x != undefined)
	{
		ctx.moveTo(this.x,0);
		ctx.lineTo(this.x,2000);
	}
	else
	{
		ctx.moveTo(0,this.n);
		ctx.lineTo(2000,2000*this.k+this.n);
	}
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}


Line.prototype.intersect = function(obj)
{
	if (this.type > obj.type)
		return obj.intersect(this);
	else if (obj.type==2)
	{
		if (this.x == undefined && obj.x == undefined)
		{
			if (this.k==obj.k)
				return [];
			var c = new Point();
			c.x = (obj.n-this.n)/(this.k-obj.k);
			c.y = this.k*c.x+this.n;
			return [c];
		}
		if (this.x != undefined && obj.x != undefined)
			return [];
		if (obj.x != undefined)
			return obj.intersect(this);
		if (this.x != undefined)
		{
			var c = new Point();
			c.x = this.x;
			c.y = obj.k*this.x+obj.n;
			return [c];
		}
		return [];
	}
	else if (obj.type==4)
	{
		if (this.x != undefined)
		{
			var a = 1;
			var b = -2*obj.o.y;
			var c = -obj.r*obj.r+(obj.o.x-this.x)*(obj.o.x-this.x)+obj.o.y*obj.o.y;
			var w = b*b - 4*a*c;
			if (w < 0)
				return [];
			w = Math.sqrt(w); 
			var y1 = (-b+w)/(2*a);
			var y2 = (-b-w)/(2*a);
			if (y1 != y2)
				return [new Point(this.x,y1),new Point(this.x,y2)];
			return [new Point(this.x,y1)];
		}
		var a = this.k*this.k+1;
		var b = -2*obj.o.x +2*this.k*this.n - 2*obj.o.y*this.k;
		var c = obj.o.x*obj.o.x +this.n*this.n+obj.o.y*obj.o.y-obj.r*obj.r-2*this.n*obj.o.y;
		var w = b*b-4*a*c;
		if (w < 0)
			return [];
		w = Math.sqrt(w);
		var x1 = (-b+w)/(2*a);
		var x2 = (-b-w)/(2*a)
		var p1 = new Point();
		p1.x = x1;
		p1.y = x1*this.k+this.n;
		if (x1 != x2)
		{
			var p2 = new Point();
			p2.x = x2;
			p2.y = x2*this.k+this.n;
			return [p1,p2];
		}
		return [p1];
	}
	else
		return [];
}

Line.prototype.dist = function(p)
{
	var q = this.getClosest(p);
	return p.dist(q);
}

Line.prototype.getClosest = function(p)
{
	var l = Line.defineLineNormal(this,p);
	return  this.intersect(l)[0];
}

Line.prototype.contains = function(p) {
    if (this.x != undefined) {
        return p.x == this.x;
    }
    else {
        return p.x*this.k + this.n == p.y;
    }
}
