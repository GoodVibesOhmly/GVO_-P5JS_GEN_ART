// Daily Sketch for 2021-12-20
// Ram Narasimhan

/*
Keywords: flow field

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
    background(params.blkColor);
    print(params.bgColor)
    palette2 = random(HSBpalList)
    palette = random(HSBpalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    var tg = new TileGrid(params.xStep, params.yStep, cnv.width, cnv.height, cnv.xMargin, cnv.yMargin)

    print(tg.rows, tg.cols, 'row cols')
    tg.createFlowField = function () {
        for (col = 0; col < this.cols; col++) {
            for (row = 0; row < this.rows; row++) {
                tile = this.getTileFromCR(col, row, verbose = false);
                angle = getAngle(col, row)
                //print(col, row, angle)
                tile.angle = angle //store the flow field
            }
        }
    }

    tg.renderFlowField = function () {
        strokeWeight(2);
        stroke('white')
        for (col = 0; col < this.cols; col++) {
            for (row = 0; row < this.rows; row++) {
                tile = this.getTileFromCR(col, row, verbose = false);
                xEnd = tile.x + tg.width * cos(tile.angle)
                yEnd = tile.y + tg.height * sin(tile.angle)
                line(tile.x, tile.y, xEnd, yEnd)
                //circle(tile.x, tile.y, 10)
            }
        }
    }

    function getAngle(col, row) {
        // scale down x and y
        _scale = 0.005;
        x = (col - tg.cols / 2);
        y = (row - tg.rows / 2);

        angle = (y / x) * PI / 4 + PI / 2
        //print(col, row, angle)

        //angle = (col / (2 * tg.cols)) * PI // diverging from the SE corner
        //angle = (row / (2 * tg.rows)) * PI // diverging from the NW corner
        // angle = (row / (2 * tg.rows)) * PI * 3 // two loops, going off the left wall
        // delta_x = Math.abs(col - this.cols / 2);
        // delta_y = Math.abs(row - this.rows / 2);
        // angle = (delta_x / delta_y + 1) * PI

        // // attactor gives new x, y for old one. 
        // var x1 = Math.sin(a * y) + c * Math.cos(a * x);
        // var y1 = Math.sin(b * x) + d * Math.cos(b * y);

        // // find angle from old to new. that's the value.
        // return Math.atan2(y1 - y, x1 - x);
        return angle;
    }


    tg.createFlowField()
    //tg.renderFlowField()

    //RENDER the Field

    for (i = 0; i < 3000; i++) {
        strokeWeight(random([2]))
        x = cnv.xMargin + random(cnv.width)
        y = cnv.yMargin + random(cnv.height)
        //draw a strand...which could have 1 to 4 segments
        numSegs = random([1, 2, 8])
        stroke(random(palette2))
        if (numSegs == 8) { // all longer strands are one of 2 colors
            stroke(palette2[random([0, 1])])
        }
        for (s = 0; s < numSegs; s++) {
            tile = tg.getTile(x, y)
            step = tg.height
            if (tile) {
                xEnd = x + step * cos(tile.angle)
                yEnd = y + step * sin(tile.angle)
                line(x, y, xEnd, yEnd)
                x = xEnd; y = yEnd;
            }
        }
    }

    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


