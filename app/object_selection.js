var MAX_SNAP_DIST = 10;

function filterNearby(arr, p) {
    return arr.filter(x => x.dist(p) <= MAX_SNAP_DIST);
}

function filterType(arr, allowedTypes) {
    return arr.filter(x => x.type & allowedTypes);
}

function argmin(arr, map) {
    return arr.map(map).reduce((min,cur) => cur[0] < min[0] ? cur : min,[1000,undefined])[1];
}

function selectClosest(options, p) {
    return argmin(options, x => [x.dist(p),x]);
}

function getIntersections(arr) {
    sol = []
    for(var o1 of arr)
        for(var o2 of arr)
            sol = sol.concat(o1.intersect(o2));
    return sol;
}

function snapToExistingPoints(pointer, objects, allowedTypes) {
    if (1 & allowedTypes == 0)
        return undefined;
    var points = filterType(objects,1);
    return selectClosest(points, pointer);
}

function snapToIntersections(pointer, objects, allowedTypes) {
    if (1 & allowedTypes == 0)
        return undefined;
    var larges = filterType(objects,6);
    var nearbyIntersections = filterNearby(getIntersections(larges),pointer);
    return selectClosest(nearbyIntersections, pointer);
}

function snapToLarges(pointer, objects, allowedTypes) {
    allowedTypes ^= 1;
    var larges = filterType(objects,allowedTypes);
    return selectClosest(larges, pointer);
}

function snapToPointsOnLarges(pointer, objects, allowedTypes) {
    if (1 & allowedTypes == 0)
        return undefined;
    var nearbyLarges = filterType(objects,6);
    var nearbyPointsOnLarges = nearbyLarges.map(x => x.getClosest(pointer));
    return selectClosest(nearbyPointsOnLarges, pointer);
}

function selectFirst(array) {
    return array.filter(x => x != undefined)[0];
}

function selectSnapped(pointer, objects, allowedTypes) {
    var nearbyObjects = filterNearby(objects,pointer);

    var existingPoints = snapToExistingPoints(pointer, nearbyObjects, allowedTypes);    
    var intersections = snapToIntersections(pointer, nearbyObjects, allowedTypes);    
    var larges = snapToLarges(pointer, nearbyObjects, allowedTypes);    
    var pointsOnLarges = snapToPointsOnLarges(pointer, nearbyObjects, allowedTypes);
    return selectFirst([existingPoints,intersections,larges,pointsOnLarges]);
}    

var getHighlighted = selectSnapped;

function selectObject(pointer, objects, allowedTypes) {
    var snapped = selectSnapped(pointer, objects, allowedTypes);
    if ((snapped == undefined) && (1 & allowedTypes))
        return pointer;
    return snapped;
}

module.exports.getHighlighted = getHighlighted;
module.exports.selectObject = selectObject;
