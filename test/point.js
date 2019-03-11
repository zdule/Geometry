var expect = require('expect.js');
var Point = require("../app/point.js").Point;

describe("Point", function() {
    describe("Creation", function() {
        it("can be created from coordinates", function() {
            var p = new Point(73.2,-1.8);
            expect(p.x).to.eql(73.2);
            expect(p.y).to.eql(-1.8);
        });
        it("can be created as a midpoint", function() {
            var a = new Point(2,0);
            var b = new Point(0,4);
            var c = Point.defineMiddle(a,b);
            expect(c.x).to.eql(1);
            expect(c.y).to.eql(2);
        });
    });
    describe("Distance", function() {
        it("can calculate distances to other points", function() {
            var a = new Point(-3,0);
            var b = new Point(0,4);
            expect(a.dist(b)).to.eql(5);
            expect(b.dist(a)).to.eql(5);
        });
    });
});
