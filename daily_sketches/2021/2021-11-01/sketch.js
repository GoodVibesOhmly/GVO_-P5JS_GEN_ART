// Daily Sketch for 2021-11-01
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
    palette2 = HrainbowDash; //colors.js
    palette = Hcappuccino; //colors.js
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(palette[5]);
    rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height);


    for (rep = 0; rep <= 8; rep++) {
        var cBez1 = [{ x: 0, y: 120 * rep }, { x: 290, y: -40 * rep }, { x: 300, y: 200 * rep }, { x: width, y: 150 * rep }]
        var cPoints = findCBezPoints(cBez1);
        for (bz of cPoints) {
            colr = random(palette2)
            stroke(colr);
            fill(colr);
            rad = noise(bz.x, bz.y)
            circle(bz.x, bz.y, 50 * rad)
        }
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}

function findCBezPoints(b) {
    var startPt = b[0];
    var controlPt1 = b[1];
    var controlPt2 = b[2];
    var endPt = b[3];
    var pts = [b[0]];
    var lastPt = b[0];
    var tests = 100;
    for (var t = 0; t <= tests; t++) {
        // calc another point along the curve
        var pt = getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, endPt, t / tests);
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



