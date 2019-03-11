Point = require('./point.js').Point;
Line = require('./line.js').Line;
Circle = require('./circle.js').Circle;
ToolbarController = require('./toolbar_controller.js').ToolbarController;

function GameCanvas(_canvas_object)
{
	this.canvasObject = _canvas_object;
	this.objects = new Array();
	this.selectType = 0;
	this.state = 'none';

	this.canvasObject.addEventListener("mousedown", this, false);
    this.mouseX = 0;
    this.mouseY = 0;
    var gc = this;
	this.canvasObject.onmousemove=function(event){gc.mouseX = event.offsetX; gc.mouseY = event.offsetY;};
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

GameCanvas.prototype.point = async function()
{
    await this.asyncSelectObject(1);
    this.point();
}

GameCanvas.prototype.middlePoint = async function()
{
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
    this.addObject(Point.defineMiddle(firstPoint,secondPoint));
    this.middlePoint();
}

GameCanvas.prototype.twoPointLine = async function()
{
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
    this.addObject(Line.defineTwoPoints(firstPoint,secondPoint));
    this.twoPointLine();
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
    this.addObject(new Circle(thirdPoint,firstPoint.dist(secondPoint)));
    this.circleCompass();
}

GameCanvas.prototype.intersectObjects = async function()
{
	var o1 = await this.asyncSelectObject(7);
	var o2 = await this.asyncSelectObject(7);
    var w = o1.intersect(o2);
    for (var i = 0; i < w.length; i++)
        this.addObject(w[i]);
    this.redraw();
    this.intersectObjects();
}

MAX_SNAP = 10;
function argmin(arr, map, init) {
    return arr.map(map).reduce((min,cur) => cur[0] < min[0] ? cur : min, init)[1];
}

function getIntersections(arr) {
    sol = []
    for(i in arr) {
        for(j in arr) {
            sol = sol.concat(arr[i].intersect(arr[j]));
        }
    }
    return sol;
}

function getClosests(arr, p) {
    return arr.map(x => x.getClosest(p)); 
}

function closest(options, p) {
    return argmin(options, x => [x.dist(p),x], [100,undefined]);
}

GameCanvas.prototype.snapObject = function(x, y, type) {
	var p = new Point(x,y);

    nearby_pred = (x => x.dist(p) <= MAX_SNAP)
    nearby = this.objects.filter(nearby_pred);
    options = nearby.filter(x => x.type & this.selectType);
    if (options.length > 0) {
        return closest(options, p);
    }

	if (this.selectType != 1) 
        return undefined;

    nearby_intersections = getIntersections(nearby).filter(nearby_pred);
    if (nearby_intersections.length > 0) {
        return closest(nearby_intersections, p);
    }

    nearby_parts = getClosests(nearby,p).filter(nearby_pred);
    if (nearby_parts.length > 0) {
        return closest(nearby_parts, p);
    }
}

GameCanvas.prototype.handleEvent = function(event)
{
	var x = event.offsetX;
	var y = event.offsetY;
	var p = new Point(x,y);
    if (this.state == "select") {
        var obj = this.snapObject(x,y,this.selectType);
        if (obj != undefined)
        {
            if (obj.id == undefined)
                this.addObject(obj);
        }
        if (obj == undefined && this.selectType==1)
        {
            obj = p;
            this.addObject(obj);
        }
        if (obj == undefined)
            return;
        this.selectedObject = obj;
        this.selectType = 0;
        this.returnFunc(obj);
	}
}

GameCanvas.prototype.redraw = function()
{
	this.canvasObject.width = window.innerWidth; 
	this.canvasObject.height = window.innerHeight;
    var highlighted = this.snapObject(this.mouseX, this.mouseY, this.selectType);
	if (highlighted != undefined && highlighted.type > 1)
		highlighted.drawHigh(this.ctx);
	this.objects.sort((a,b) => a.type < b.type);
	for(var i = 0; i < this.objects.length; i++)
		this.objects[i].draw(this.ctx);
	if (highlighted != undefined && highlighted.type == 1)
		highlighted.drawHigh(this.ctx);
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

function load()
{
	window.canvasObj = new GameCanvas(document.getElementById("canvas"));
    window.toolbarController = new ToolbarController(window.canvasObj);
}

module.exports.load = load;
