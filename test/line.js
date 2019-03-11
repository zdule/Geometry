var expect = require('expect.js');
var Line = require("../app/line.js").Line;
var Point = require("../app/point.js").Point;

describe("Line", function() {

    var p11 = new Point(1,1);
    var p12 = new Point(1,2);
    var p21 = new Point(2,1);
    var p22 = new Point(2,2);

    describe("Creation from two points", function() {
        it("can be constructed from two points", function() {
            var l = Line.defineTwoPoints(p21,p12);
            expect(l.contains(p12)).to.eql(true);
            expect(l.contains(p11)).to.eql(false);
        });
        it("can be constructed from vertical points", function() {
            var l = Line.defineTwoPoints(p11,p12);
            expect(l.contains(p12)).to.eql(true);
            expect(l.contains(p22)).to.eql(false);
        });
    });
    describe("Creation as a parallel", function() {
        it("can be constructed as a parallel to a line in a point", function() {
            var l = Line.defineTwoPoints(p11,p12);
            var lp = Line.defineLineParalel(l,p21);
            expect(lp.contains(p22)).to.eql(true);
            expect(lp.contains(p11)).to.eql(false);
        });
    });
    describe("Creation as a normal", function() {
        it("can be constructed as a normal to a line in a point", function() {
            var l = Line.defineTwoPoints(p21,p12);
            var lp = Line.defineLineNormal(l,p22);
            expect(lp.contains(p11)).to.eql(true);
            expect(lp.contains(p21)).to.eql(false);
        });
    });
    describe("Creation as a segment bisector", function() {
        it("can be constructed as a segment bisector", function() {
            var l = Line.defineSegmentBisector(p21,p12);
            expect(l.contains(p11)).to.eql(true);
            expect(l.contains(p21)).to.eql(false);
        });
    });
    describe("Creation as a angle bisector", function() {
        it("can be constructed as an angle bisector", function() {
            var l = Line.defineAngleBisector(p12,p11,p21);
            expect(l.contains(p22)).to.eql(true);
            expect(l.contains(p21)).to.eql(false);
        });
    });
    describe("Can find closest point to a point", function() {
        it("it finds a closest point", function() {
            var l = Line.defineTwoPoints(p21,p12);
            var p = l.getClosest(p22);
            expect(p.x).to.eql(1.5);
            expect(p.y).to.eql(1.5);
        });
    });
});
