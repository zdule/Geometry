Point = require('./point.js').Point;
Line = require('./line.js').Line;
Circle = require('./circle.js').Circle;
console.log(Circle);

function GameCanvas(_canvas_object)
{
	this.canvasObject = _canvas_object;
	this.objects = new Array();
	this.selectType = 0;
	this.state = 'none';

	this.canvasObject.addEventListener("mousedown", this, false);
	this.canvasObject.onmousemove=function(event){window.canvasObj.snap(event)};
	this.ctx = this.canvasObject.getContext("2d");
}

GameCanvas.prototype.remove = async function() {
    var obj = await this.asyncSelectObject(7);
    var ind = this.objects.indexOf(obj);

    if (ind != -1) {
        this.objects.splice(ind, 1);
    }
    this.remove();
}

GameCanvas.prototype.Point = async function()
{
    await this.asyncSelectObject(1);
    this.Point();
}

GameCanvas.prototype.twoPointLine = async function()
{
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
    this.addObject(Line.defineTwoPoints(firstPoint,secondPoint));
    this.twoPointLine();
}

GameCanvas.prototype.middlePoint = async function()
{
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
    this.addObject(Point.defineMiddle(firstPoint,secondPoint));
    this.middlePoint();
}

GameCanvas.prototype.normalLine = async function()
{
	var line = await this.asyncSelectObject(2);
	var point = await this.asyncSelectObject(1);
    this.addObject(Line.defineLineNormal(line,point));
    this.normalLine();
}

GameCanvas.prototype.paralelLine = async function()
{
	var line = await this.asyncSelectObject(2);
	var point = await this.asyncSelectObject(1);
    this.addObject(Line.defineLineParalel(line,point));
    this.paralelLine();
}

GameCanvas.prototype.segmentBisector = async function()
{
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
    this.addObject(Line.defineSegmentBisector(firstPoint,secondPoint));
    this.segmentBisector();
}

GameCanvas.prototype.angleBisector = async function()
{
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
	var thirdPoint = await this.asyncSelectObject(1);
    this.addObject(Line.defineAngleBisector(firstPoint,secondPoint,thirdPoint))
    this.angleBisector();
}

GameCanvas.prototype.circleTwoPoint = async function()
{
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
    this.addObject(Circle.defineTwoPoint(firstPoint,secondPoint));
    this.circleTwoPoint();
}

GameCanvas.prototype.circleThreePoint = async function()
{
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
	var thirdPoint = await this.asyncSelectObject(1);
    this.addObject(Circle.defineThreePoint(firstPoint,secondPoint,thirdPoint));
    this.circleThreePoint();
}

GameCanvas.prototype.circleCompass = async function()
{
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
	var thirdPoint = await this.asyncSelectObject(1);
    this.addObject(new Circle(thirdPoint,firstPoint.dist(secondPoint)))
    this.circleCompass();
}

GameCanvas.prototype.intersectObjects = async function()
{
	var o1 = await this.asyncSelectObject(7);
	var o2 = await this.asyncSelectObject(7);
    var w = o1.intersect(o2);
    if (w[0] != -1)
        this.addObject(w[0]);
    if (w[1] != -1)
        this.addObject(w[1]);
    this.redraw();
    this.intersectObjects();
}

GameCanvas.prototype.snap = function(event)
{
	if (this.selectType==0)
		return;
	this.highlighted = undefined;
	var x = event.clientX;
	var y = event.clientY;
	var p = new Point(x,y);
	var min = 10;
	for(var i = 0; i < this.objects.length; i++)
	{
		if (this.objects[i].dist(p) < min && (this.selectType & this.objects[i].type))
			this.highlighted = this.objects[i];
	}
	if (this.selectType != 1)
		return;
	var first = Line.defineTwoPoints(new Point(1005,1005),new Point(1000,0));
	var second = Line.defineTwoPoints(new Point(1005,1005),new Point(0,1000));
	for(var i = 0; i < this.objects.length; i++)
	{
		if (this.objects[i].dist(p) < first.dist(p) && this.objects[i].type != 1)
		{
			second = first;
			first = this.objects[i];
		}
		else
		if (this.objects[i].dist(p) < second.dist(p) && this.objects[i].type != 1)
			second = this.objects[i];
	}
	var points = first.intersect(second);
	if (points[0] != -1)
	{
		if (points[1] != -1 && points[1].dist(p) < points[0].dist(p))
			points[0] = points[1];
		if (points[0].dist(p) < min)
			this.highlighted = points[0];
	}
	if (this.highlighted != undefined)
		return;
	for(var i = 0; i < this.objects.length; i++)
	{
		if (this.objects[i].dist(p) < min && this.objects[i].type != 1)
		{
			min = this.objects[i].dist(p);
			this.highlighted = this.objects[i].getClosest(p);
		}
	}
}

GameCanvas.prototype.handleEvent = function(event)
{
	var x = event.offsetX;
	var y = event.offsetY;
	var p = new Point(x,y);
	switch(this.state)
	{
		case 'select':
			var min = 5.0;
			var obj;	
			for(var i = 0; i < this.objects.length; i++)
			{
				if (this.objects[i].dist(p) < min && this.objects[i].type&this.selectType)
				{
					min = this.objects[i].dist(p);
					obj = this.objects[i];
				}
			}
			if (typeof this.highlighted != 'undefined')
			{
				obj = this.highlighted;
				if (obj.id == undefined)
					this.addObject(obj);
			}
			if (typeof obj == "undefined" && this.selectType==1)
			{
				obj = p;
				this.addObject(obj);
			}
			if (typeof obj == "undefined")
				break;
			this.selectedObject = obj;
			this.selectType = 0;
			this.returnFunc(obj);
			break;
	}
}

GameCanvas.prototype.redraw = function()
{
	this.canvasObject.width = window.innerWidth;
	this.canvasObject.height = window.innerHeight;
	if (typeof this.highlighted != 'undefined' && this.highlighted.type > 1)
		this.highlighted.drawHigh(this.ctx);
	this.objects.sort(function(a,b){return a.type < b.type});
	for(var i = 0; i < this.objects.length; i++)
		this.objects[i].draw(this.ctx);
	if (typeof this.highlighted != 'undefined' && this.highlighted.type == 1)
		this.highlighted.drawHigh(this.ctx);
}
setInterval(function(){window.canvasObj.redraw();},100);

GameCanvas.prototype.selectObject = function(type,returnFunc)
{
	this.state = 'select';
	this.selectType = type;
	this.returnFunc = returnFunc;
}

GameCanvas.prototype.asyncSelectObject = function(type)
{
    var canvas = this
    return new Promise(function(resolve,reject) {
        canvas.state = 'select';
        canvas.selectType = type;
        canvas.returnFunc = resolve;
        canvas.reject = reject;
    });
}

GameCanvas.prototype.addObject = function(obj)
{
    obj.id = 7;
    this.objects.push(obj);
}

GameCanvas.prototype.stateManager =
{
	toolbarsNum:3,
	toolbars:['toolbar-point','toolbar-line','toolbar-circle'],
	hideToolbars: function()
	{	
		for(var i = 0;  i < this.toolbarsNum; i++)
			document.getElementById(this.toolbars[i]).style.display="none";
	},
	deselectButtons: function()
	{
		var elems = document.getElementsByClassName("button");
		for(var i = 0; i < elems.length; i++)
		{
		  elems[i].className = elems[i].className.replace( /(?:^|\s)button-selected(?!\S)/g , '' );
		}
	},
	setPoint: function()
	{
		this.selectButton(document.getElementById('button-point'));
		window.canvasObj.Point();
		this.hideToolbars();
		document.getElementById("toolbar-point").style.display="inline-block";
	},
	setLine: function()
	{
		this.selectButton(document.getElementById('button-two-point-line'));
		window.canvasObj.twoPointLine();
		this.hideToolbars();
		document.getElementById("toolbar-line").style.display="inline-block";
	},
	setCircle: function()
	{
		this.selectButton(document.getElementById('button-circle-center-radius'));
		window.canvasObj.circleTwoPoint();
		this.hideToolbars();
		document.getElementById("toolbar-circle").style.display="inline-block";
	},
	setMain: function()
	{
		this.state = "none";
		this.hideToolbars();
	},
	selectButton : function(obj)
	{
		this.deselectButtons();
		obj.className += ' button-selected';
	}
}


function load()
{
	window.canvasObj = new GameCanvas(document.getElementById("canvas"));
}

module.exports.load = load;
