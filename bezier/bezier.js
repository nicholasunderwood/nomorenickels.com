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

const splines = [];
const hoverDistance = 20;
const splineSize = 50;
const pointsPerSpline = 100;

let mobileChek = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) mobileCheck = true;})(navigator.userAgent||navigator.vendor||window.opera);
var scale = mobileCheck ? 0.25 : 1;
var minDrawDist = 10;
var toggleRemove = false;

function setup() {
    p = createCanvas(cnvs.width() * scale, cnvs.height() * scale);
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
    // if(pnts.length < 2) return;

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
    if (keyIsDown(SHIFT) != toggleRemove) {
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
    if(splines.length < 2) return;

    let spline = splines[splineIndex]

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
    if(splines.length != 0) draggingPoint = point;

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

    if (splines.length > 0 && splines[0].size() > 1) {
        let lastSpline = splines[splines.length - 1];

        let lastPoint = lastSpline.lastPoint();
        let lastControl = lastSpline.lastControl();
        let firstControl = lastPoint.add(lastPoint.sub(lastControl).norm().mult(100))
        newCurve.addPoint(lastPoint);
        newCurve.addPoint(firstControl);
    } else if(splines[0].size() == 1){
        splines[0].addPoint
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

window.mobileCheck = function() {
    let check = false;
    
    return check;
  };


$(document).ready(() => {
    console.log('load');
    let range = $('#res');

    range.val(100-minDrawDist);
    $('#val').text(minDrawDist);


    range.on('input', (e) => {
        minDrawDist = 100 - +e.target.value;
    });

    $('#clear').click(() => { splines.length = 0; });

    $('#rm').click(() => {
        toggleRemove = !toggleRemove;
        $('#rm').toggleClass('btn-secondary').toggleClass('btn-danger')
    });
})