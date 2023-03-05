class Vector2 {

    constructor(x, y) { this.x = x; this.y = y }

    mag() { return Math.hypot(this.x, this.y)}

    add(other) { return new Vector2(this.x + other.x, this.y + other.y); }
    sub(other) { return new Vector2(this.x - other.x, this.y - other.y); }
    mult(a) { return new Vector2(this.x * a, this.y * a); }
    neg() { return new Vector2(-this.x, -this.y); }
    dup() { return new Vector2(this.x, this.y); }

    norm() { let mag = this.mag(); return new Vector2(this.x/mag, this.y/mag); }
}

const PointType = Object.freeze({Anchor, Control, Free});

class Point {
    constructor(pos, type) { this.pos = pos; this.type = type; }
    constructor(pos, x, y) { this(pos, new Vector2(x,y)); }
}



var draggingPoint = null;
var followingPoint1 = null;
var followingPoint2 = null;

const points = [];
const hoverDistance = 30;
const splineSize = 50;
const pointsPerSpline = 30;


function setup() {
    main = $('main');
    createCanvas(main.width(), main.height());
    points.push(new Point(PointType.Anchor, 100.0, 100.0));
    points.push(new Point(PointType.Control, 400.0, 200.0));
    points.push(new Point(PointType.Control, 200.0, 400.0));
    points.push(new Point(PointType.Anchor, 500.0, 500.0));
    
    drawSplines();
}

function draw() {
    background(220);
    let lastPoint;    
    stroke(0);

    drawSplines();
    
    stroke(100);
    splines.forEach(spline => {
        spline.waypoints.forEach(point => {
            if (lastPoint != null) {
                line(point.x, point.y, lastPoint.x, lastPoint.y);
            }
            lastPoint = point;
            // stroke();
        });
        
        spline.waypoints.forEach(point => {
            circle(point.x, point.y, 6.0);
        })
    })
}

function mousePressed() {
    hoverInfo = isOnWaypoint(mouseX, mouseY);
    if(hoverInfo == null){
        addPoint(mouseX, mouseY);
    } else {
        
        let spline = splines[hoverInfo.splineIndex];
        let point = spline.waypoints[hoverInfo.pointIndex];
        
        if (keyIsDown(SHIFT)) {
            if (spline.size() <= 2) {
                if(hoverInfo.splineIndex > 0 && hoverInfo.splineIndex < splines.length-1){
                    splines[hoverInfo.splineIndex+1].waypoints[0] = splines[hoverInfo.splineIndex-1].lastPoint()
                }
                splines.splice(hoverInfo.splineIndex, 1);
                return;
            }

            spline.removePoint(hoverInfo.pointIndex);
            if(hoverInfo.splineIndex + 1 < splines.length){
                let nextSplineIndex = hoverInfo.splineIndex + 1;
                console.log(hoverInfo);
                splines[nextSplineIndex].waypoints[0] = spline.lastPoint();
            }


            return;
        }

        draggingPoint = point;
    }

}




function maintainContinuity(splineIndex, pointIndex, trans, propCode=3) {
    let spline = splines[splineIndex]

    // point has no effect on continuity
    if(
        (pointIndex > 1 && pointIndex < spline.size() - 1) ||
        (splineIndex == 1 && pointIndex == 1) ||
        (splineIndex = splines.length - 1 && pointIndex == spline.size() - 1)
    ){ return; }

    isEndPoint = pointIndex == 1 || pointIndex == spline.length-1


    maintainContinuity()
    if(isEndPoint)


}

function relativeWaypoint(splineIndex, pointIndex, delta){
    if(delta == 0) return (splineIndex, pointIndex);
    if(delta > 0)
}

function mouseDragged(){
    if(draggingPoint == null) return;

    let difVec = new Vector2(mouseX, mouseY).sub(draggingPoint);



    let trans = [draggingPoint];
    let rot = [];
    console.log(draggingPoint)

    for(let i in splines){
        let spline = splines[i]
        for(let k in spline.waypoints){
            let point = spline.waypoints[i];
            if(point.x == draggingPoint.x && point.y == draggingPoint.y) continue;
            console.log(point, point == draggingPoint);

            if(k == 0 || k == spline.size()-1){
                //waypoint
                // trans.push(spline.waypoints[k == 0 ? k + 1 : k - 1])
            }
            
            if(k == 1 || k == spline.size()-2){
                // control
                // rot.push(spline.waypoints[k == 1 ? k - 1 : k + 1])
            }
        }
    }


    for(i in trans){
        trans[i].x += difVec.x;
        trans[i].y += difVec.y;
    }

    for(i in rot){

    }

    draggingPoint.x = mouseX;
    draggingPoint.y = mouseY;
}

function drawSplines() {
    if (splines.length == 0) return;
    let lastPoint, point;
    for (spline in splines) {
        spline = splines[spline];
        lastPoint = spline.getWaypoint(0);
        for (let i = 0; i <= 1; i += 1.0 / pointsPerSpline) {
            point = spline.getPoint(i);
            circle(point.x, point.y, 3.0);
            line(point.x, point.y, lastPoint.x, lastPoint.y);
            lastPoint = point;
        }
        point = spline.lastPoint();
        line(point.x, point.y, lastPoint.x, lastPoint.y);
    }
}

function isOnWaypoint(x, y) {
    for (splineIndex in splines) {
        for (pointIndex in splines[splineIndex].waypoints) {
            point = splines[splineIndex].waypoints[pointIndex];
            if (Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)) < hoverDistance) {
                return {'splineIndex': +splineIndex, 'pointIndex': +pointIndex};
            }
        }
    }
    return null;
}

function addPoint(x, y) {
    var point = new Vector2(x, y);
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
    if(
        point.x > Math.max(point1.x, point2.x) ||
        point.x < Math.min(point1.x, point2.x) ||
        point.y > Math.max(point1.y, point2.y) ||
        point.y < Math.min(point1.y, point2.y)
    ){
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
    console.log('ready')

});

console.log('load')