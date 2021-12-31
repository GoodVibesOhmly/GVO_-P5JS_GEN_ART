// Daily Sketch for 2021-12-29
// Ram Narasimhan.

/*
Keywords: Bezier

*/


let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}

const params = {
    xStep: 60,
    yStep: 60,
    bgColor: [210, 50, 80],
    blkColor: [0, 0, 0],
    moves: 1000
}


function setup() {
    createCanvas(960, 960);
    colorMode(HSB);
    background(params.bgColor);
    print(params.bgColor)

    print(palList)
    palette2 = random(palList)
    palette = Hcappuccino; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(palette[random([0, 1, 2, 3, 4])]);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);


    numStrands = 12;
    for (rep = 0; rep <= numStrands; rep++) {
        push();
        xB = random([0, 1, 2]) * 100
        xC = random([2, 3, 4, 5]) * 100

        yC = random([3, 4, 5]) * 75

        var cBez1 = [{ x: -100, y: 120 * rep }, { x: 100 + 10 * rep, y: -40 * rep }, { x: 200 + 10 * rep, y: 300 * rep }, { x: width * 1.2, y: 150 * (rep - 8) }]
        numPearls = random([180, 100, 120])
        var cPoints = findCBezPoints(cBez1, numPearls)
        pal = random(palList)

        for (bz of cPoints) {
            colr = random(pal)
            stroke(colr);
            fill(colr);
            rad = noise(bz.x, bz.y)
            circle(bz.x, bz.y, 50 * rad)
        }
        pop();
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

function findCBezPoints(b, numPts) {
    var startPt = b[0];
    var controlPt1 = b[1];
    var controlPt2 = b[2];
    var endPt = b[3];
    var pts = [b[0]];
    var lastPt = b[0];
    var tests = 100;
    for (var t = 0; t <= numPts; t++) {
        // calc another point along the curve
        var pt = getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, t / numPts);
        // add the pt if it's not already in the pts[] array
        var dx = pt.x - lastPt.x;
        var dy = pt.y - lastPt.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        var dInt = parseInt(d);
        if (dInt > 0 || t == tests) {
            lastPt = pt;
            pts.push(pt);
        }
    }
    return (pts);
}



