function Line()
{
	this.k = 1;
	this.n = 0;
	this.type = 2;
}

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

Line.defineLineNormal = function(m,p)
{
	var l = new Line();
	if (m.x != undefined)
	{
		l.k = 0;
		l.n = p.y;
	}
	else if (m.k == 0)
		l.x = p.x;
	else
	{
		l.k = -1/m.k;
		l.n = p.y-l.k*p.x;
	}
	return l;
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
Line.defineAngleBisector = function(p,q,r)
{
	var a = Math.atan((q.y-p.y)/(q.x-p.x));
	var b = Math.atan((q.y-r.y)/(q.x-r.x));
	if ((q.y-p.y)/(q.x-p.x) > 0 && p.y < q.y)
		a = a+Math.PI;
	if ((q.y-p.y)/(q.x-p.x) < 0 && p.y > q.y)
		a = a+Math.PI;
	if (a > 2*Math.PI)
		a = a-2*Math.PI;
	if ((q.y-r.y)/(q.x-r.x) > 0 && r.y < q.y)
		b = b+Math.PI;
	if ((q.y-r.y)/(q.x-r.x) < 0 && r.y > q.y)
		b = b+Math.PI;
	if (b > 2*Math.PI)
		b = b-2*Math.PI;
	var c = (a+b)/2;
	if (c > 2*Math.PI)
		c = c-2*Math.PI;
	var l = new Line();
	l.k = Math.tan(c);
	l.n = q.y-l.k*q.x;
	return l;
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
		console.log(0,this.n,2000,2000*this.k+this.n);
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
		console.log("hi");
		ctx.moveTo(this.x,0);
		ctx.lineTo(this.x,2000);
	}
	else
	{
		console.log("hilo");
		ctx.moveTo(0,this.n);
		ctx.lineTo(2000,2000*this.k+this.n);
	}
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

Line.prototype.dist = function(p)
{
	var q = this.getClosest(p);
	return p.dist(q);
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
				return [-1,-1];
			var c = new Point();
			c.x = (obj.n-this.n)/(this.k-obj.k);
			c.y = this.k*c.x+this.n;
			return [c,-1];
		}
		if (this.x != undefined && obj.x != undefined)
			return [-1,-1];
		if (obj.x != undefined)
			return obj.intersect(this);
		if (this.x != undefined)
		{
			var c = new Point();
			c.x = this.x;
			c.y = obj.k*this.x+obj.n;
			return [c,-1];
		}
		return [-1,-1];
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
				return [-1,-1];
			w = Math.sqrt(w); 
			var y1 = (-b+w)/(2*a);
			var y2 = (-b-w)/(2*a);
			if (y1 != y2)
				return [new Point(this.x,y1),new Point(this.x,y2)];
			return [new Point(this.x,y1),-1];
		}
		var a = this.k*this.k+1;
		var b = -2*obj.o.x +2*this.k*this.n - 2*obj.o.y*this.k;
		var c = obj.o.x*obj.o.x +this.n*this.n+obj.o.y*obj.o.y-obj.r*obj.r-2*this.n*obj.o.y;
		var w = b*b-4*a*c;
		if (w < 0)
			return [-1,-1];
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
		return [p1,-1];
	}
	else
		return [-1.-1];
}

Line.prototype.getClosest = function(p)
{
	var l = Line.defineLineNormal(this,p);
	return  this.intersect(l)[0];
}
