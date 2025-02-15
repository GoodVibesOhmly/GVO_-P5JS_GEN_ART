// Daily Sketch for 2022-02-07
// Ram Narasimhan.


/*
ISOMETRIC
*/

let palette = []
let grid;
const cnv = {
    xMargin: 30,
    yMargin: 30,
}


const params = {
    tw: 40, // triangle width of the hexg,
    xStep: 20,
    yStep: 20,
    bgColor: "#d3d3d3",
    blkColor: "#0f0f0f",
}



function setup() {
    createCanvas(960, 960);
    //colorMode(HSB);
    background(params.blkColor);

    palette = random(RGBPalList);
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width


    hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, params.tw);
    hg.getTriangleNeighbors() // 3 neighbors get attached to each triangle.


    // for (let index = hg.rows - 10; index > 2; index -= 2) {
    //     tetrisT(colIndex = 7, index, hg)
    // }

    // for (let rep = 0; rep < 5; rep++) {
    //     col = int(random(hg.cols))
    //     row = int(random(hg.rows))
    //     for (let rep2 = 0; rep2 < 15; rep2++) {
    //         col += random([-2, -1, 0, 1, 2])
    //         row += random([-2, -1, 0, 1, 2])
    //         if (col == hg.cols) { break }
    //         if (row == hg.rows) { break }
    //         if (col < 0) { break }
    //         if (row < 0) { break }
    //         tetrisT(col, row, hg)
    //     }
    // }

    // index = 13;
    // colIndex = 4;
    // hg.getTriangle(colIndex, index, 0).display('white')
    // //    displayHexUpNE(colIndex, index, hg)
    // //    displayHexUpNW(colIndex, index, hg)
    // displayTriHex(colIndex, row = index, hg)
    // displayHexDownSE(colIndex, index, hg)

    // displayHexDownSE(colIndex, index + 1, hg)
    // //    displayHexDownSE(colIndex, index + 1, hg)
    // displayHexUpNW(colIndex + 1, index + 3, hg)
    // hg.getTriangle(colIndex, index, 0).display('white')

    for (let rep = 0; rep < 100; rep++) {
        nCubes = random([3, 4, 5, 6, 7, 8, 9])
        col = int(random(hg.cols))
        row = int(random(hg.rows))
        XdirCubes(nCubes, col, row, hg)
    }

    stroke(255)
    let alphaValue = 100;
    print(hg.points.length) // columns. each one is a column of points

    noStroke(0);


    draw_border(clr = params.bgColor, sw = 50); //rn_utils.js
}


//complex shapes
function tetrisT(colIndex, row, hg) {
    displayHexUpNE(colIndex, row, hg)
    displayHexUpNW(colIndex, row, hg)
    displayTriHex(colIndex, row, hg)
    displayHexDownSE(colIndex, row, hg)
}


function XdirCubes(nCubes, colIndex, row, hg) {
    for (let c = 0; c < nCubes; c++) {
        cAdd = Math.floor(c / 2)
        rAdd = cAdd * 2
        displayTriHex(colIndex + cAdd, row + rAdd, hg)

        //don't add Hex if N is odd and the last one.
        if (!((c == nCubes - 1) && (nCubes % 2))) {
            displayHexDownSE(colIndex + cAdd, row + rAdd, hg)
        }
    }
}



//simple Hexagons
function displayTriHex(col, row, hg) {
    tR = hg.getTriangle(col, row, 0) //top
    tRHex(tR);
}


function displayHexUpNE(col, row, hg) {
    t00 = hg.getTriangle(col, row, 0) //top
    if (t00 && (t00.up) && (t00.up.side)) {
        tR = t00.up.side
    }
    tRHex(tR)
}

function displayHexUpNW(col, row, hg) {
    t00 = hg.getTriangle(col, row, 0) //top
    if (t00 && (t00.side) && (t00.side.up)) {
        tR = t00.side.up
    }
    tRHex(tR)
}

function displayHexDownSE(col, row, hg) {
    t00 = hg.getTriangle(col, row, 0) //top
    if (t00 && (t00.down) && (t00.down.side)) {
        tR = t00.down.side
    }
    tRHex(tR)
}


//Hexagon that is half off Col and the southwest
function displayHexSideW(col, row, hg) {
    t00 = hg.getTriangle(col, row, 0) //top
    if (t00 && (t00.side) && (t00.side.down)) {
        tR = t00.side.down
    }
    tRHex(tR)
}


//Displays a Hexagon made up of 3 rhombuses
function tRHex(tR) {
    if (!tR) { return }
    tL = tR.side
    if (!tL) { return }
    if (!tL.down) { return }
    if (!tL.down.down) { return }
    if (!tR.down) { return }
    if (!tR.down.down) { return }
    tR.display(palette[1])
    tL.display(palette[1])
    tL.down.display(palette[2])
    tL.down.down.display(palette[2])
    tR.down.display(palette[3]) //side
    tR.down.down.display(palette[3]) //side
}