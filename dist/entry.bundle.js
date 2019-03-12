var Controller =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/circle.js":
/*!***********************!*\
  !*** ./app/circle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("Point = __webpack_require__(/*! ./point.js */ \"./app/point.js\").Point;\nLine = __webpack_require__(/*! ./line.js */ \"./app/line.js\").Line;\n\nfunction Circle(o,r)\n{\n\tthis.o = o;\n\tthis.r = r;\n\tthis.type = 4;\n}\n\nmodule.exports.Circle = Circle;\n\nCircle.defineTwoPoint = function(o,p)\n{\n\tvar c = new Circle();\n\tc.o = o;\n\tc.r = o.dist(p);\n\treturn c;\n}\n\nCircle.defineThreePoint = function(a,b,c)\n{\n\tvar l = Line.defineSegmentBisector(a,b);\n\tvar m = Line.defineSegmentBisector(b,c);\n\tvar p =l.intersect(m);\n\treturn Circle.defineTwoPoint(p[0],a);\n}\n\nCircle.prototype.draw = function(ctx)\n{\n\tctx.beginPath();\n\tctx.arc(this.o.x,this.o.y,this.r,0,2*Math.PI,false);\n\tctx.lineWidth = 2;\n\tctx.strokeStyle = '#003300';\n\tctx.stroke();\n}\n\nCircle.prototype.drawHigh = function(ctx)\n{\n\tctx.beginPath();\n\tctx.arc(this.o.x,this.o.y,this.r,0,2*Math.PI,false);\n\tctx.lineWidth = 3;\n\tctx.strokeStyle = '#003300';\n\tctx.stroke();\n}\n\nCircle.prototype.dist = function(p)\n{\n\treturn Math.abs(this.o.dist(p) - this.r);\n}\n\nCircle.prototype.intersect = function(obj)\n{\n\tif (this.type > obj.type)\n\t\treturn obj.intersect(this);\n\telse if (obj.type == 4)\n\t{\n\t\tvar w = (this.r*this.r-obj.r*obj.r-this.o.x*this.o.x+obj.o.x*obj.o.x-this.o.y*this.o.y+obj.o.y*obj.o.y)/2;\n\t\tvar l = Line.defineTwoPoints(this.o,obj.o);\n\t\tvar p = new Point();\n\t\tp.x = (w-l.n*(obj.o.y-this.o.y))/(obj.o.x-this.o.x+l.k*(obj.o.y-this.o.y));\n\t\tp.y = l.k*p.x+l.n;\n\t\tvar m = Line.defineLineNormal(l,p);\n\t\treturn this.intersect(m);\n\t}\n\telse \n\t\treturn [];\n}\n\nCircle.prototype.getClosest = function(p)\n{\n\tvar l = Line.defineTwoPoints(p,this.o);\n\tvar points = l.intersect(this);\n\tif (points[0].dist(p) < points[1].dist(p))\n\t\treturn points[0];\n\treturn points[1]; \n}\n\n\n//# sourceURL=webpack://Controller/./app/circle.js?");

/***/ }),

/***/ "./app/game.js":
/*!*********************!*\
  !*** ./app/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("Point = __webpack_require__(/*! ./point.js */ \"./app/point.js\").Point;\nLine = __webpack_require__(/*! ./line.js */ \"./app/line.js\").Line;\nCircle = __webpack_require__(/*! ./circle.js */ \"./app/circle.js\").Circle;\nToolbarController = __webpack_require__(/*! ./toolbar_controller.js */ \"./app/toolbar_controller.js\").ToolbarController;\nObjectSelection = __webpack_require__(/*! ./object_selection.js */ \"./app/object_selection.js\");\nvar selectObject = ObjectSelection.selectObject;\nvar getHighlighted = ObjectSelection.getHighlighted;\n\nfunction GameController(canvasElement) {\n\tthis.canvasElement = canvasElement;\n\tthis.objects = [];\n\tthis.selectType = 0;\n\n\tthis.canvasElement.addEventListener(\"mousedown\", this, false);\n    this.mouseX = 0;\n    this.mouseY = 0;\n    var gc = this;\n\tthis.canvasElement.onmousemove=function(event){gc.mouseX = event.offsetX; gc.mouseY = event.offsetY;};\n\tthis.ctx = this.canvasElement.getContext(\"2d\");\n}\n\nGameController.prototype.remove = async function() {\n    var obj = await this.asyncSelectObject(7);\n    var ind = this.objects.indexOf(obj);\n\n    if (ind != -1) {\n        this.objects.splice(ind, 1);\n    }\n    this.remove();\n}\n\nfunction genericAddObjects(types, fun) {\n    return async function() {\n        while(true) {\n            var args = [];\n            for(var t of types) {\n                args.push(await this.asyncSelectObject(t));\n            } \n            var ret = fun(...args);\n            if (!Array.isArray(ret))\n                ret = [ret];\n            for (var obj of ret) {\n                this.addObject(obj);\n            }\n        }\n    };\n}\n\nGameController.prototype.point = async function() {\n    await this.asyncSelectObject(1);\n    this.point();\n}\n\nGameController.prototype.middlePoint = genericAddObjects([1,1],Point.defineMiddle);\n\nGameController.prototype.twoPointLine = genericAddObjects([1,1],Line.defineTwoPoints);\n\nGameController.prototype.normalLine = genericAddObjects([2,1],Line.defineLineNormal);\n\nGameController.prototype.paralelLine = genericAddObjects([2,1],Line.defineLineParalel);\n\nGameController.prototype.segmentBisector = genericAddObjects([1,1],Line.defineSegmentBisector);\n\nGameController.prototype.angleBisector = genericAddObjects([1,1,1],Line.defineAngleBisector);\n\nGameController.prototype.circleTwoPoint = genericAddObjects([1,1],Circle.defineTwoPoint);\n\nGameController.prototype.circleThreePoint = genericAddObjects([1,1,1],Circle.defineThreePoint);\n\nGameController.prototype.circleCompass = async function() {\n\tvar firstPoint = await this.asyncSelectObject(1);\n\tvar secondPoint = await this.asyncSelectObject(1);\n\tvar thirdPoint = await this.asyncSelectObject(1);\n    this.addObject(new Circle(thirdPoint,firstPoint.dist(secondPoint)));\n    this.circleCompass();\n}\n\nGameController.prototype.intersectObjects = async function() {\n\tvar o1 = await this.asyncSelectObject(7);\n\tvar o2 = await this.asyncSelectObject(7);\n    var w = o1.intersect(o2);\n    for (var i = 0; i < w.length; i++)\n        this.addObject(w[i]);\n    this.redraw();\n    this.intersectObjects();\n}\n\nGameController.prototype.handleEvent = function(event)\n{\n    if (this.selectType == 0) \n        return;\n\tvar x = event.offsetX;\n\tvar y = event.offsetY;\n\tvar p = new Point(x,y);\n    var obj = selectObject(p, this.objects, this.selectType);\n    if (obj != undefined) {\n        if (!this.objects.includes(obj))\n            this.addObject(obj);\n    }\n    if (obj == undefined)\n        return;\n    this.selectType = 0;\n    this.returnFunc(obj);\n}\n\n\nGameController.prototype.redraw = function() {\n\tthis.canvasElement.width = window.innerWidth; \n\tthis.canvasElement.height = window.innerHeight;\n    var highlighted = getHighlighted(new Point(this.mouseX, this.mouseY),\n                                     this.objects, this.selectType);\n\tif (highlighted != undefined && highlighted.type > 1)\n\t\thighlighted.drawHigh(this.ctx);\n\tthis.objects.sort((a,b) => a.type < b.type);\n\tfor(var i = 0; i < this.objects.length; i++)\n\t\tthis.objects[i].draw(this.ctx);\n\tif (highlighted != undefined && highlighted.type == 1)\n\t\thighlighted.drawHigh(this.ctx);\n}\n\nGameController.prototype.asyncSelectObject = function(type) {\n    var game = this\n    return new Promise(function(resolve,reject) {\n        game.selectType = type;\n        game.returnFunc = resolve;\n        game.reject = reject;\n    });\n}\n\nGameController.prototype.addObject = function(obj) {\n    this.objects.push(obj);\n}\n\nfunction load() {\n\ttoolbarController = new GameController(document.getElementById(\"canvas\"));\n    new ToolbarController(toolbarController);\n    setInterval(() => toolbarController.redraw(),100);\n}\n\nmodule.exports.load = load;\n\n\n//# sourceURL=webpack://Controller/./app/game.js?");

/***/ }),

/***/ "./app/line.js":
/*!*********************!*\
  !*** ./app/line.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("Point = __webpack_require__(/*! ./point.js */ \"./app/point.js\").Point;\n\nfunction Line()\n{\n\tthis.k = 1;\n\tthis.n = 0;\n\tthis.type = 2;\n}\n\nmodule.exports.Line = Line;\n\nLine.defineTwoPoints = function(a,b)\n{\n\tvar l = new Line();\n\tif (a.x == b.x)\n\t\tl.x = a.x;\n\telse\n\t{\n\t\tl.k = (a.y-b.y)/(a.x-b.x);\n\t\tl.n = a.y-l.k*a.x;\n\t}\n\treturn l;\n}\n\nLine.defineLineNormal = function(line,p)\n{\n\tvar parallel = new Line();\n\tif (line.x != undefined)\n\t{\n\t\tparallel.k = 0;\n\t\tparallel.n = p.y;\n\t}\n\telse if (line.k == 0)\n\t\tparallel.x = p.x;\n\telse\n\t{\n\t\tparallel.k = -1/line.k;\n\t\tparallel.n = p.y-parallel.k*p.x;\n\t}\n\treturn parallel;\n}\n\nLine.defineLineParalel = function(m,p)\n{\n\tvar l = Line.defineLineNormal(m,p);\n\treturn Line.defineLineNormal(l,p);\n}\n\nLine.defineSegmentBisector = function(p,q)\n{\n\tvar point = Point.defineMiddle(p,q);\n\tvar l = Line.defineTwoPoints(p,q);\n\treturn Line.defineLineNormal(l,point);\n}\n\nLine.defineAngleBisector = function(p,q,r) {\n    var a = q.vectorTo(p).normalize();\n    var b = q.vectorTo(r).normalize();\n    var c = Point.defineMiddle(q.add(a),q.add(b));\n    if (q.dist(c)==0) {\n        return Line.defineLineNormal(Line.defineTwoPoints(p,r),q);\n    }\n    return Line.defineTwoPoints(q,c);\n}\n\nLine.prototype.draw = function(ctx)\n{\n\tctx.beginPath();\n\tif (this.x != undefined)\n\t{\n\t\tctx.moveTo(this.x,0);\n\t\tctx.lineTo(this.x,2000);\n\t}\n\telse\n\t{\n\t\tctx.moveTo(0,this.n);\n\t\tctx.lineTo(2000,2000*this.k+this.n);\n\t}\n\tctx.lineWidth = 2;\n\tctx.strokeStyle = '#003300';\n\tctx.stroke();\n}\n\nLine.prototype.drawHigh = function(ctx)\n{\n\tctx.beginPath();\n\tif (this.x != undefined)\n\t{\n\t\tctx.moveTo(this.x,0);\n\t\tctx.lineTo(this.x,2000);\n\t}\n\telse\n\t{\n\t\tctx.moveTo(0,this.n);\n\t\tctx.lineTo(2000,2000*this.k+this.n);\n\t}\n\tctx.lineWidth = 3;\n\tctx.strokeStyle = '#003300';\n\tctx.stroke();\n}\n\n\nLine.prototype.intersect = function(obj)\n{\n\tif (this.type > obj.type)\n\t\treturn obj.intersect(this);\n\telse if (obj.type==2)\n\t{\n\t\tif (this.x == undefined && obj.x == undefined)\n\t\t{\n\t\t\tif (this.k==obj.k)\n\t\t\t\treturn [];\n\t\t\tvar c = new Point();\n\t\t\tc.x = (obj.n-this.n)/(this.k-obj.k);\n\t\t\tc.y = this.k*c.x+this.n;\n\t\t\treturn [c];\n\t\t}\n\t\tif (this.x != undefined && obj.x != undefined)\n\t\t\treturn [];\n\t\tif (obj.x != undefined)\n\t\t\treturn obj.intersect(this);\n\t\tif (this.x != undefined)\n\t\t{\n\t\t\tvar c = new Point();\n\t\t\tc.x = this.x;\n\t\t\tc.y = obj.k*this.x+obj.n;\n\t\t\treturn [c];\n\t\t}\n\t\treturn [];\n\t}\n\telse if (obj.type==4)\n\t{\n\t\tif (this.x != undefined)\n\t\t{\n\t\t\tvar a = 1;\n\t\t\tvar b = -2*obj.o.y;\n\t\t\tvar c = -obj.r*obj.r+(obj.o.x-this.x)*(obj.o.x-this.x)+obj.o.y*obj.o.y;\n\t\t\tvar w = b*b - 4*a*c;\n\t\t\tif (w < 0)\n\t\t\t\treturn [];\n\t\t\tw = Math.sqrt(w); \n\t\t\tvar y1 = (-b+w)/(2*a);\n\t\t\tvar y2 = (-b-w)/(2*a);\n\t\t\tif (y1 != y2)\n\t\t\t\treturn [new Point(this.x,y1),new Point(this.x,y2)];\n\t\t\treturn [new Point(this.x,y1)];\n\t\t}\n\t\tvar a = this.k*this.k+1;\n\t\tvar b = -2*obj.o.x +2*this.k*this.n - 2*obj.o.y*this.k;\n\t\tvar c = obj.o.x*obj.o.x +this.n*this.n+obj.o.y*obj.o.y-obj.r*obj.r-2*this.n*obj.o.y;\n\t\tvar w = b*b-4*a*c;\n\t\tif (w < 0)\n\t\t\treturn [];\n\t\tw = Math.sqrt(w);\n\t\tvar x1 = (-b+w)/(2*a);\n\t\tvar x2 = (-b-w)/(2*a)\n\t\tvar p1 = new Point();\n\t\tp1.x = x1;\n\t\tp1.y = x1*this.k+this.n;\n\t\tif (x1 != x2)\n\t\t{\n\t\t\tvar p2 = new Point();\n\t\t\tp2.x = x2;\n\t\t\tp2.y = x2*this.k+this.n;\n\t\t\treturn [p1,p2];\n\t\t}\n\t\treturn [p1];\n\t}\n\telse\n\t\treturn [];\n}\n\nLine.prototype.dist = function(p)\n{\n\tvar q = this.getClosest(p);\n\treturn p.dist(q);\n}\n\nLine.prototype.getClosest = function(p)\n{\n\tvar l = Line.defineLineNormal(this,p);\n\treturn  this.intersect(l)[0];\n}\n\nLine.prototype.contains = function(p) {\n    if (this.x != undefined) {\n        return p.x == this.x;\n    }\n    else {\n        return p.x*this.k + this.n == p.y;\n    }\n}\n\n\n//# sourceURL=webpack://Controller/./app/line.js?");

/***/ }),

/***/ "./app/object_selection.js":
/*!*********************************!*\
  !*** ./app/object_selection.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var MAX_SNAP_DIST = 10;\n\nfunction filterNearby(arr, p) {\n    return arr.filter(x => x.dist(p) <= MAX_SNAP_DIST);\n}\n\nfunction filterType(arr, allowedTypes) {\n    return arr.filter(x => x.type & allowedTypes);\n}\n\nfunction argmin(arr, map) {\n    return arr.map(map).reduce((min,cur) => cur[0] < min[0] ? cur : min,[1000,undefined])[1];\n}\n\nfunction selectClosest(options, p) {\n    return argmin(options, x => [x.dist(p),x]);\n}\n\nfunction getIntersections(arr) {\n    sol = []\n    for(var o1 of arr)\n        for(var o2 of arr)\n            sol = sol.concat(o1.intersect(o2));\n    return sol;\n}\n\nfunction snapToExistingPoints(pointer, objects, allowedTypes) {\n    if (1 & allowedTypes == 0)\n        return undefined;\n    var points = filterType(objects,1);\n    return selectClosest(points, pointer);\n}\n\nfunction snapToIntersections(pointer, objects, allowedTypes) {\n    if (1 & allowedTypes == 0)\n        return undefined;\n    var larges = filterType(objects,6);\n    var nearbyIntersections = filterNearby(getIntersections(larges),pointer);\n    return selectClosest(nearbyIntersections, pointer);\n}\n\nfunction snapToLarges(pointer, objects, allowedTypes) {\n    allowedTypes ^= 1;\n    var larges = filterType(objects,allowedTypes);\n    return selectClosest(larges, pointer);\n}\n\nfunction snapToPointsOnLarges(pointer, objects, allowedTypes) {\n    if (1 & allowedTypes == 0)\n        return undefined;\n    var nearbyLarges = filterType(objects,6);\n    var nearbyPointsOnLarges = nearbyLarges.map(x => x.getClosest(pointer));\n    return selectClosest(nearbyPointsOnLarges, pointer);\n}\n\nfunction selectFirst(array) {\n    return array.filter(x => x != undefined)[0];\n}\n\nfunction selectSnapped(pointer, objects, allowedTypes) {\n    var nearbyObjects = filterNearby(objects,pointer);\n\n    var existingPoints = snapToExistingPoints(pointer, nearbyObjects, allowedTypes);    \n    var intersections = snapToIntersections(pointer, nearbyObjects, allowedTypes);    \n    var larges = snapToLarges(pointer, nearbyObjects, allowedTypes);    \n    var pointsOnLarges = snapToPointsOnLarges(pointer, nearbyObjects, allowedTypes);\n    return selectFirst([existingPoints,intersections,larges,pointsOnLarges]);\n}    \n\nvar getHighlighted = selectSnapped;\n\nfunction selectObject(pointer, objects, allowedTypes) {\n    var snapped = selectSnapped(pointer, objects, allowedTypes);\n    if ((snapped == undefined) && (1 & allowedTypes))\n        return pointer;\n    return snapped;\n}\n\nmodule.exports.getHighlighted = getHighlighted;\nmodule.exports.selectObject = selectObject;\n\n\n//# sourceURL=webpack://Controller/./app/object_selection.js?");

/***/ }),

/***/ "./app/point.js":
/*!**********************!*\
  !*** ./app/point.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function Point(x,y) {\n\tthis.x = x;\n\tthis.y = y;\n\tthis.type = 1;\n}\n\nmodule.exports.Point = Point;\n\nPoint.prototype.subtract = function(p) {\n    return new Point(this.x - p.x, this.y - p.y);\n}\n\nPoint.prototype.vectorTo = function(p) {\n    return p.subtract(this);\n}\n\nPoint.prototype.scale = function(c) {\n    return new Point(this.x*c, this.y*c);\n}\n\nPoint.prototype.add = function(p) {\n    return new Point(this.x + p.x, this.y + p.y);\n}\n\nPoint.prototype.length = function() {\n    var x = this.x;\n    var y = this.y;\n\treturn Math.sqrt(x*x + y*y);\n}\n\nPoint.prototype.normalize = function() {\n    if (this.length() == 0) {\n        return new Point(0,0);\n    }\n    return this.scale(1/this.length());\n}\n\nPoint.prototype.dist = function(p) {\n    return this.subtract(p).length();\n}\n\nPoint.defineMiddle = function(a,b) {\n\tvar p = new Point();\n\tp.x = (a.x+b.x)/2;\n\tp.y = (a.y+b.y)/2;\n\treturn p;\n}\n\nPoint.prototype.draw = function(ctx) {\n\tctx.beginPath();\n\tctx.arc(this.x,this.y,3,0,2*Math.PI,false);\n\tctx.fillStyle = 'green';\n\tctx.fill();\n\tctx.lineWidth = 2;\n\tctx.strokeStyle = '#003300';\n\tctx.stroke();\n}\n\nPoint.prototype.drawHigh = function(ctx) {\n\tctx.beginPath();\n\tctx.arc(this.x,this.y,4,0,2*Math.PI,false);\n\tctx.fillStyle = 'green';\n\tctx.fill();\n\tctx.lineWidth = 2;\n\tctx.strokeStyle = '#003300';\n\tctx.stroke();\n}\n\nPoint.prototype.intersect = function(obj) {\n\treturn [];\n}\n\nPoint.prototype.getClosest = function(p) {\n    return new Point(this.x, this.y);\n}\n\n\n//# sourceURL=webpack://Controller/./app/point.js?");

/***/ }),

/***/ "./app/toolbar_controller.js":
/*!***********************************!*\
  !*** ./app/toolbar_controller.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("ToolbarController = function(canvasObj) {\n    var tc = this\n    this.canvasObj = canvasObj;\n    document.querySelectorAll(\"[data-showtoolbar]\").forEach(function(button) {\n        button.onclick = () => tc.toolbarClick(button);\n    });        \n    document.querySelectorAll(\"[data-action]\").forEach(function(button) {\n        button.onclick = () => tc.actionClick(button);\n    });        \n    document.querySelectorAll(\"[data-actionremove]\").forEach(function(button) {\n        button.onclick = () => tc.removeClick(button);\n    });        \n}\n\nToolbarController.prototype.toolbarClick = function(element) {\n    this.hideToolbars();\n    var to_show = document.getElementById(element.dataset['showtoolbar']);\n    if (to_show) {\n        to_show.style.display=\"block\";\n        this.actionClick(to_show.firstElementChild);\n    }\n}\n\nToolbarController.prototype.actionClick = function(element) {\n    this.deselectButtons();\n    element.className += ' button-selected';\n    this.canvasObj[element.dataset['action']]();\n}\n\nToolbarController.prototype.removeClick = function(element) {\n    this.hideToolbars();\n    this.deselectButtons();\n    element.className += ' button-selected';\n    this.canvasObj.remove();\n}\n\nToolbarController.prototype.hideToolbars = function() {\t\n    var elems = document.getElementsByClassName(\"toolbar-aux\");\n    for(var tb of elems)\n        tb.style.display=\"none\";\n}\n\nToolbarController.prototype.deselectButtons = function() {\n    var elems = document.getElementsByClassName(\"button\");\n    for(var i = 0; i < elems.length; i++) {\n        elems[i].classList.remove(\"button-selected\");\n    }\n}\n\nmodule.exports.ToolbarController = ToolbarController;\n\n\n//# sourceURL=webpack://Controller/./app/toolbar_controller.js?");

/***/ })

/******/ });