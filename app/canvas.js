Point = require('./point.js').Point;
Line = require('./line.js').Line;
Circle = require('./circle.js').Circle;
ToolbarController = require('./toolbar_controller.js').ToolbarController;
ObjectSelection = require('./object_selection.js');
var selectObject = ObjectSelection.selectObject;
var getHighlighted = ObjectSelection.getHighlighted;

function GameCanvas(_canvas_object) {
	this.canvasObject = _canvas_object;
	this.objects = [];
	this.selectType = 0;

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

function genericAddObjects(types, fun) {
    return async function() {
        while(true) {
            var args = [];
            for(var t of types) {
                args.push(await this.asyncSelectObject(t));
            } 
            var ret = fun(...args);
            if (!Array.isArray(ret))
                ret = [ret];
            for (var obj of ret) {
                this.addObject(obj);
            }
        }
    };
}

GameCanvas.prototype.point = async function() {
    await this.asyncSelectObject(1);
    this.point();
}

GameCanvas.prototype.middlePoint = genericAddObjects([1,1],Point.defineMiddle);

GameCanvas.prototype.twoPointLine = genericAddObjects([1,1],Line.defineTwoPoints);

GameCanvas.prototype.normalLine = genericAddObjects([2,1],Line.defineLineNormal);

GameCanvas.prototype.paralelLine = genericAddObjects([2,1],Line.defineLineParalel);

GameCanvas.prototype.segmentBisector = genericAddObjects([1,1],Line.defineSegmentBisector);

GameCanvas.prototype.angleBisector = genericAddObjects([1,1,1],Line.defineAngleBisector);

GameCanvas.prototype.circleTwoPoint = genericAddObjects([1,1],Circle.defineTwoPoint);

GameCanvas.prototype.circleThreePoint = genericAddObjects([1,1,1],Circle.defineThreePoint);

GameCanvas.prototype.circleCompass = async function() {
	var firstPoint = await this.asyncSelectObject(1);
	var secondPoint = await this.asyncSelectObject(1);
	var thirdPoint = await this.asyncSelectObject(1);
    this.addObject(new Circle(thirdPoint,firstPoint.dist(secondPoint)));
    this.circleCompass();
}

GameCanvas.prototype.intersectObjects = async function() {
	var o1 = await this.asyncSelectObject(7);
	var o2 = await this.asyncSelectObject(7);
    var w = o1.intersect(o2);
    for (var i = 0; i < w.length; i++)
        this.addObject(w[i]);
    this.redraw();
    this.intersectObjects();
}

GameCanvas.prototype.handleEvent = function(event)
{
    if (this.selectType == 0) 
        return;
	var x = event.offsetX;
	var y = event.offsetY;
	var p = new Point(x,y);
    var obj = selectObject(p, this.objects, this.selectType);
    if (obj != undefined) {
        if (!this.objects.includes(obj))
            this.addObject(obj);
    }
    if (obj == undefined)
        return;
    this.selectType = 0;
    this.returnFunc(obj);
}


GameCanvas.prototype.redraw = function() {
	this.canvasObject.width = window.innerWidth; 
	this.canvasObject.height = window.innerHeight;
    var highlighted = getHighlighted(new Point(this.mouseX, this.mouseY),
                                     this.objects, this.selectType);
	if (highlighted != undefined && highlighted.type > 1)
		highlighted.drawHigh(this.ctx);
	this.objects.sort((a,b) => a.type < b.type);
	for(var i = 0; i < this.objects.length; i++)
		this.objects[i].draw(this.ctx);
	if (highlighted != undefined && highlighted.type == 1)
		highlighted.drawHigh(this.ctx);
}

setInterval(function(){window.canvasObj.redraw();},100);

GameCanvas.prototype.asyncSelectObject = function(type) {
    var canvas = this
    return new Promise(function(resolve,reject) {
        canvas.selectType = type;
        canvas.returnFunc = resolve;
        canvas.reject = reject;
    });
}

GameCanvas.prototype.addObject = function(obj) {
    this.objects.push(obj);
}

function load() {
	window.canvasObj = new GameCanvas(document.getElementById("canvas"));
    window.toolbarController = new ToolbarController(window.canvasObj);
}

module.exports.load = load;
