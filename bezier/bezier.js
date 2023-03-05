class Vector2 {
    constructor(x, y) { this.x = x; this.y = y }

    mag() { return Math.hypot(this.x, this.y) }

    add(other) { return new Vector2(this.x + other.x, this.y + other.y); }
    sub(other) { return new Vector2(this.x - other.x, this.y - other.y); }
    mult(a) { return new Vector2(this.x * a, this.y * a); }
    neg() { return new Vector2(-this.x, -this.y); }
    dup() { return new Vector2(this.x, this.y); }
    map(A) { return new Vector2(this.x * A[0][0] + this.y * A[0][1], this.x * A[1][0] + this.y * A[1][1])}
    str(k = 2) { let a = Math.pow(10, k); return `{${Math.round(this.x * a) / a}, ${Math.round(this.y * a) / a}}` }
    norm() { let mag = this.mag(); return new Vector2(this.x / mag, this.y / mag); }
}

class BezierCurve {
    constructor() { this.waypoints = []; }
    size() { return this.waypoints.length; }
    frac(x) { return x <= 1 ? 1 : x * this.frac(x - 1); }
    getPoint(u) {
        let n = this.waypoints.length - 1;
        let x = 0; let y = 0;
        for (let i = 0; i <= n; i++) {
            let point = this.waypoints[i];
            let coef = this.frac(n) / this.frac(i) / this.frac(n - i) * Math.pow(u, i) * Math.pow(1 - u, n - i);
            x += coef * point.x;
            y += coef * point.y;
        }

        return new Vector2(x, y);
    }

    getWaypoint(index) { return this.waypoints[index] }
    firstPoint() { return this.getWaypoint(0); }
    lastPoint() { return this.getWaypoint(this.size() - 1); }
    firstControl() { return this.getWaypoint(1); }
    lastControl() { return this.getWaypoint(this.size() - 2); }

    addPoint(point) { this.waypoints.push(point); }
    insertPoint(point, index) { this.waypoints.splice(index, 0, point); }
    removePoint(index) {
        this.waypoints.splice(index, 1);
    }
}

var cnvs = $('main');

var draggingPoint = null;
var origDrag = null;
var dragPointIndex;
var isSmoothing = false;


var aDiff = null;
var bDiff = null;
var cDiff = null;

const splines = [];
const hoverDistance = 20;
const splineSize = 50;
const pointsPerSpline = 100;
var minDrawDist = 10;

function setup() {
    p = createCanvas(cnvs.width(), cnvs.height());
    // p.parent('#main');
    let spline = new BezierCurve();
    let bound = new Vector2(width, height)
    spline.addPoint(bound.map([[0.1,0], [0,0.1]]));
    spline.addPoint(bound.map([[0.4,0], [0,0.1]]));
    spline.addPoint(bound.map([[0.1,0], [0,0.8]]));
    spline.addPoint(bound.map([[0.4,0], [0,0.4]]));
    splines.push(spline);
    addPoint(bound.map([[0.7,0], [0,0.7]]));
    addPoint(bound.map([[0.9,0], [0,0.1]]));
    drawSplines();
}

function draw() {
    background(150);

    stroke(0);
    fill(0);
    drawSplines();
    
    stroke(100);
    fill(255);
    let pnts = getAllPoints();
    if(pnts.length < 2) return;

    for (let i = 0; i < pnts.length; i++) {
        if (i != pnts.length-1) {
            line(pnts[i].x, pnts[i].y, pnts[i+1].x, pnts[i+1].y);
        };

        circle(pnts[i].x, pnts[i].y, 8.0);
    }

    cnvs.css({'cursor': isOnWaypoint(mouseX, mouseY) ? draggingPoint ? 'grabbing' : keyIsDown(SHIFT) ? 'url(./cursor.cur), no-drop' : 'grab' : 'default'})

}

function drawInlineHitbox() {
    for (let a = 0; a < width; a++) {
        for (let b = 0; b < height; b++) {
            for (spline in splines) {
                spline = splines[spline];
                for (let i = 1; i < spline.size(); i++) {
                    if (isInline(new Vector2(a, b), spline.getWaypoint(i - 1), spline.getWaypoint(i))) {
                        set(a, b, 0);
                        break;
                    }
                    set(a, b, 220)
                }
            }
        }
    }
    updatePixels();
}

function getAllPoints() {
    return splines.reduce((a, c) => a.concat(c.waypoints), []);
}


function mousePressed() {
    if(mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height){ return; }

    let mousePoint = new Vector2(mouseX, mouseY);
    let hoverInfo = isOnWaypoint(mousePoint.x, mousePoint.y);
    
    // add point
    if (hoverInfo == null) {
        addPoint(new Vector2(mousePoint.x, mousePoint.y));
        return;
    }

    let splineIndex, pointIndex;
    [splineIndex, pointIndex] = hoverInfo;
    
    let spline = splines[splineIndex];
    let point = spline.waypoints[pointIndex];

    // remove point
    if (keyIsDown(SHIFT)) {
        let needSmoothing = true;
        if (spline.size() <= 2) {
            if (splineIndex > 0 && splineIndex < splines.length - 1) {
                splines[splineIndex + 1].waypoints[0] = splines[splineIndex - 1].lastPoint()
            }
            splines.splice(splineIndex, 1);
        } else {
            needSmoothing = !isFreePoint(splineIndex, pointIndex);
            
            // if (pointIndex == spline.lastPoint() && splineIndex < splines.length - 1) {
            //     let nextSplineIndex = splineIndex + 1;
            //     splines[nextSplineIndex].waypoints[0] = spline.lastPoint();
            // }
            
        }
        
        if(needSmoothing){
            let isEndPoint = point == spline.lastPoint();
            console.log('regain continuity', isEndPoint);
            // let isAnchorPoint = pointIndex == 1 || pointIndex == spline.size() - 2;

            if(isEndPoint){
                splines[splineIndex + 1].waypoints[0] = spline.lastControl();
            } else {
                let trans = spline.getWaypoint(pointIndex+1).mult(0.5).add(spline.getWaypoint(pointIndex-1).mult(0.5)).sub(point);
                maintainContinuity(splineIndex, pointIndex, trans, 3);
            }
        }


        spline.removePoint(pointIndex);
    } else {
        // drag point
        draggingPoint = point;
        origDrag = point.dup();
    }
}



function mouseDragged() {

    if (draggingPoint == null && !isSmoothing) return;

    isSmoothing = true;
    let mousePoint = new Vector2(mouseX, mouseY);
    let difVec = mousePoint.sub(draggingPoint);

    for (let i in splines) {
        let spline = splines[i]
        for (let k in spline.waypoints) {

            let point = spline.waypoints[k];
            if (point.x != draggingPoint.x || point.y != draggingPoint.y) continue;

            if (difVec.x != 0 || difVec.y != 0) maintainContinuity(+i, +k, difVec);

            isSmoothing = false;
            return;
        }
    }

}


function mouseReleased() {
    console.log('mouse released');
    // return;
    if (draggingPoint == null) { return; }

    let mousePoint = new Vector2(mouseX, mouseY);
    let difVec = mousePoint.sub(draggingPoint);

    // draggingPoint.x += difVec.x;
    // draggingPoint.y += difVec.y;

    for (let i in splines) {
        let spline = splines[i]
        for (let k in spline.waypoints) {

            let point = spline.waypoints[k];
            if (point.x != draggingPoint.x || point.y != draggingPoint.y) continue;

            maintainContinuity(+i, +k, difVec);


            draggingPoint = null;
            origDrag = null;

            return;
        }
    }
}

function maintainContinuity(splineIndex, pointIndex, trans, propCode = 3) {
    let spline = splines[splineIndex]


    // console.log((pointIndex > 1 && pointIndex < spline.size() - 2),(splineIndex == 0 && pointIndex == 0),(splineIndex == splines.length - 1 && pointIndex == spline.size() - 1));
    // point has no effect on continuity


    console.log((propCode == 3 ? 'drive' : 'drag ' + (propCode == 1 ? 'back' : 'fwd')) + ` <${splineIndex}, ${pointIndex}>`, 'by', trans.str(3));
    splines[splineIndex].waypoints[pointIndex].x += trans.x
    splines[splineIndex].waypoints[pointIndex].y += trans.y

    console.log(splineIndex, pointIndex, isFreePoint(splineIndex, pointIndex))

    if (isFreePoint(splineIndex, pointIndex)) {
        console.log('free point'); 
        return; 
    }


    // console.log((propCode == 3) ? 'drive' : 'drag', splineIndex, pointIndex, trans);
    let isEndPoint = pointIndex == 0 || pointIndex == spline.size() - 1;
    let isAnchorPoint = pointIndex == 1 || pointIndex == spline.size() - 2;
    // console.log('end point:', isEndPoint);


    let nextSplineIndex, nextTrans;
    let nextPointIndex = null;

    if (propCode & 1 == 1 && (isEndPoint || (pointIndex == 1 && splineIndex != 0))) {
        // console.log(splineIndex, pointIndex, 'prop back')
        nextSplineIndex = (!isEndPoint || pointIndex == 0) ? splineIndex - 1 : splineIndex;
        nextPointIndex = splines[nextSplineIndex].size() - 2;

        if (isAnchorPoint) {
            let prevPoint = splines[splineIndex].firstControl();
            let waypoint = splines[splineIndex].firstPoint();
            let nextPoint = splines[nextSplineIndex].lastControl();

            let mag = nextPoint.sub(waypoint).mag()
            let newPoint = prevPoint.sub(waypoint).norm().mult(-mag).add(waypoint);
            nextTrans = newPoint.sub(nextPoint);
        } else {
            nextTrans = trans
        }

        if (nextSplineIndex >= 0) {
            maintainContinuity(nextSplineIndex, nextPointIndex, nextTrans, 1);
        }
    }

    if ((propCode & 2) == 2 && splineIndex != splines.length - 1 && (isEndPoint || pointIndex == spline.size() - 2)) {
        // console.log(splineIndex, pointIndex, 'prop forward')
        nextSplineIndex = (pointIndex == 0) ? splineIndex : splineIndex + 1;
        nextPointIndex = 1;
        if (isAnchorPoint) {
            let prevPoint = splines[splineIndex].lastControl();
            let waypoint = splines[nextSplineIndex].firstPoint();
            let nextPoint = splines[nextSplineIndex].firstControl();

            let mag = nextPoint.sub(waypoint).mag()
            let newPoint = prevPoint.sub(waypoint).norm().mult(-mag).add(waypoint);
            nextTrans = newPoint.sub(nextPoint);
        } else {
            nextTrans = trans
        }
        if (nextSplineIndex < splines.length) {
            maintainContinuity(nextSplineIndex, nextPointIndex, nextTrans, 2)
        }
    }

}

function isFreePoint(splineIndex, pointIndex){
    let spline = splines[splineIndex];
    return (
        (pointIndex > 1 && pointIndex < spline.size() - 2)      ||
        (splineIndex == 0 && pointIndex < spline.size() - 2)    ||
        (splineIndex == splines.length - 1 && pointIndex > 1)
    );
}

const maxPointsPerSpline = 50;
const minPointsPerSpline = 5;

function drawSplinesSmart(){
    if (splines.length == 0) return;
    var points = new Array(pointsPerSpline);
    splines.forEach(spline => {
        points[0] = spline.getPoint(0);
        points[pointsPerSpline-1] = spline.getPoint(1);

        for(let i = 0; i < maxPointsPerSpline; i += maxPointsPerSpline/minPointsPerSpline){
            points[i] = spline.getPoint()
        }

        Map.clear();

    });
}

function drawSplines() {
    if (splines.length == 0) return;
    let lastPoint, point;

    for (spline in splines) {
        spline = splines[spline];
        lastPoint = spline.getWaypoint(0);
        for (let i = 0; i <= 1; i += 1.0 / pointsPerSpline) {
            point = spline.getPoint(i);
            if(point.sub(lastPoint).mag() < minDrawDist) continue;

            circle(point.x, point.y, 2.0);
            line(point.x, point.y, lastPoint.x, lastPoint.y);
            lastPoint = point;
        }
        
        point = spline.lastPoint();
        line(point.x, point.y, lastPoint.x, lastPoint.y);
    }
}

function isOnWaypoint(x, y) {

    let minDist = Number.MAX_VALUE;
    let minPoint = null;
    let mousePoint = new Vector2(x, y);

    for (splineIndex in splines) {
        for (let pointIndex = (splineIndex == 0) ? 0 : 1; pointIndex < splines[splineIndex].size(); pointIndex++) {

            point = splines[splineIndex].waypoints[pointIndex];
            let dist = mousePoint.sub(point).mag();

            if (dist < minDist) {
                minDist = dist;
                minPoint = [+splineIndex, +pointIndex]
            }
        }
    }

    return (minDist < hoverDistance) ? minPoint : null;
}

function addPoint(point) {
    draggingPoint = point;

    for (spline in splines) {
        spline = splines[spline];
        for (let i = 1; i < spline.size(); i++) {
            if (isInline(point, spline.getWaypoint(i - 1), spline.getWaypoint(i))) {
                spline.insertPoint(point, i);
                return;
            }
        }
    }

    let newCurve = new BezierCurve();

    if (splines.length > 0) {
        let lastSpline = splines[splines.length - 1];

        let lastPoint = lastSpline.lastPoint();
        let lastControl = lastSpline.lastControl();
        let firstControl = lastPoint.add(lastPoint.sub(lastControl).norm().mult(100))
        newCurve.addPoint(lastPoint);
        newCurve.addPoint(firstControl);
    }

    newCurve.addPoint(point)
    splines.push(newCurve)
}

function isInline(point, point1, point2) {
    if (
        point.x > Math.max(point1.x, point2.x) ||
        point.x < Math.min(point1.x, point2.x) ||
        point.y > Math.max(point1.y, point2.y) ||
        point.y < Math.min(point1.y, point2.y)
    ) {
        return false;
    }
    let ux = Math.abs((point.x - point1.x) / (point2.x - point1.x));
    let uy = Math.abs((point.y - point1.y) / (point2.y - point1.y));
    if (ux < 0 || ux > 1 || uy < 0 || uy > 1) {
        return false;
    }
    return Math.abs(ux - uy) < 0.2;
}


$(document).ready(() => {
    console.log('load');
    let range = $('#res');

    range.val(100-minDrawDist);
    $('#val').text(minDrawDist);


    range.on('input', (e) => {
        minDrawDist = 100 - +e.target.value;
    })
})