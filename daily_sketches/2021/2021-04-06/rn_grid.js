//P5, Grid-related objects, functions and utilities
// Ram Narasimhan 

class HexGrid {
    /**
     * Create and Return a grid object
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     */
    constructor(cWidth, cHeight, canvasXMargin, canvasYMargin) {
        //this.rows = nRows;
        //this.cols = nCols;
        this.width = cWidth; // usable width
        this.height = cHeight; // uable ht
        this.xMargin = canvasXMargin;
        this.yMargin = canvasYMargin;
        //this.xStep = cWidth / nCols;
        //this.yStep = cHeight / nRows;
        //print('x y step:', this.xStep, this.yStep)
        this.points = this.createHexGridPoints(); // stored col by col array of arrays
    }

    createHexGridPoints() {
        let th = 80
        let tw = th * sqrt(3) / 2
        let num_cols = int(this.width / tw)
        let num_rows = int(2 * this.height / th)
        print(th, num_cols, num_rows, this.width, this.height, "cols rows wi he")
        let dots = [];

        for (let col = 0; col < num_cols; col++) {
            let odd_col_dots = [];
            let even_col_dots = [];
            let yOffset = this.yMargin;
            for (let row = 0; row < num_rows; row++) {
                let xOffset = this.xMargin + tw;
                if (row % 2) {
                    xOffset = this.xMargin;
                }
                let x = col * tw * 2 + xOffset;
                let y = row * th / 2 + yOffset;
                let p = createVector(x, y)
                p.row = row;
                if (row % 2) {//odd
                    p.col = 2 * col;
                    odd_col_dots.push(p);
                } else {
                    p.col = 2 * col + 1;
                    even_col_dots.push(p);
                }
            }
            dots.push(odd_col_dots);
            dots.push(even_col_dots);
        }

        return dots;
    }



}

class Grid {
    /**
     * Create and Return a grid object
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     */
    constructor(nRows, nCols, cWidth, cHeight, canvasXMargin, canvasYMargin) {
        this.rows = nRows;
        this.cols = nCols;
        this.width = cWidth;
        this.height = cHeight;
        this.xMargin = canvasXMargin;
        this.yMargin = canvasYMargin;
        this.xStep = cWidth / nCols;
        this.yStep = cHeight / nRows;
        print('x y step:', this.xStep, this.yStep)
        this.points = this.createGridPoints()
    }

    /**
     * Create and Return a grid of points covering the canvas
     * @param  {Integer} nRows Number of rows
     * @param  {Integer} nCols Number of columns
     */
    createGridPoints() {
        let gridPts = [];
        for (let row = 0; row <= this.rows; row++) {
            for (let col = 0; col <= this.cols; col++) {
                let px = this.xMargin + this.xStep * col;
                let py = this.yMargin + this.yStep * row;
                let v = createVector(px, py);
                v.col = col;
                v.row = row;
                v.free = true; // all grid points are free initially
                gridPts.push(v);

            }
        }
        return gridPts;
    }

    /* Given gCol and gRow, convert to Global Coords
    */
    getGlobalCoords(gCol, gRow) {
        let px = this.xMargin + this.xStep * gCol;
        let py = this.yMargin + this.yStep * gRow;
        return ({
            x: px,
            y: py
        })
    }

    /* given LOCAL GCol and gRow, get the gpt object */
    getGPt(gCol, gRow) {
        for (let g of this.points) {
            if ((g.col == gCol) && (g.row == gRow)) {
                return (g)
            }
        }
        print('Unable to find Grid point col row', gCol, gRow)
        return (null)
    }

    getGPtsBetween(g1, g2) {
        let inbetween = [];
        if (g1.col == g2.col) {
            if (g2.row > g1.row) {
                for (let d = 0; d < g2.row - g1.row; d++) {
                    inbetween.push(this.getGPt(g1.col, g1.row + d))
                }
            } else {
                for (let d = 0; d < g1.row - g2.row; d++) {
                    inbetween.push(this.getGPt(g1.col, g2.row + d))
                }
            }
        }
        if (g1.row == g2.row) {
            if (g2.col > g1.col) {
                for (let d = 0; d < g2.col - g1.col; d++) {
                    inbetween.push(this.getGPt(g1.col + d, g1.row))
                }
            } else {
                for (let d = 0; d < g1.col - g2.col; d++) {
                    inbetween.push(this.getGPt(g2.col + d, g1.row))
                }
            }
        }
        return inbetween;
    }



    /* return GP objects given Col and Row
        Note that this does not take xy Coords as the input
        Just pass in row and column numbers*/
    get4NearestGridPoints(gCol, gRow) {
        let neigh = [];
        if (gCol < this.cols) {
            neigh.push(this.getGPt(gCol + 1, gRow));
        }
        if (gCol > 0) {
            neigh.push(this.getGPt(gCol - 1, gRow));
        }
        if (gRow < this.rows) {
            neigh.push(this.getGPt(gCol, gRow + 1));
        }
        if (gRow > 0) {
            neigh.push(this.getGPt(gCol, gRow - 1));
        }

        return neigh;
    }
}

function createTileGrid(n, cnv) {
    // generates a tile grid of n by n, and returns their centers...
    tiles = [];
    for (tx = 0; tx < n; tx++) {
        for (ty = 0; ty < n; ty++) {
            x = (1 / (n * 2) + tx / (n)) * cnv.width + cnv.xMargin
            y = (1 / (n * 2) + ty / n) * cnv.height + cnv.yMargin
            tile = createVector(x, y)
            tiles.push(tile)
        }
    }
    return tiles
}


function getCoords(v) {
    px = cnv.xMargin + xStep * v.x;
    py = cnv.yMargin + yStep * v.y;
    return (createVector(px, py))
}

//GRID RELATED FUNCTION
function outOfBounds(pt) {
    if (pt.x < cnv.xMargin) { return 1 }
    if (pt.x > width - cnv.xMargin) { return 1 }
    if (pt.y < cnv.yMargin) { return 1 }
    if (pt.y > height - cnv.yMargin) { return 1 }
    return 0
}

function renderGridPoints(grid) {
    strokeWeight(3);
    for (p of grid) {
        point(p.x, p.y);
    }
}

function _get4NearestGridPoints(hpt) {
    //each hpt has 4 grid points around it. Find them.
    gpts = [];
    hx = hpt.x
    hy = hpt.y
    xStep = (width - 2 * cnv.xMargin) / nCols;
    yStep = (height - 2 * cnv.yMargin) / nRows;
    gx = Math.floor((hx - cnv.xMargin) / xStep)
    gy = Math.floor((hy - cnv.yMargin) / yStep)
    //print(gx, gy, xStep, yStep)
    gpt = getGridCoords(gx, gy)
    for (g of grid) {
        if ((g.x == gpt.x) && (g.y == gpt.y)) {
            gpts.push(g)
        }
        if ((g.x == gpt.x) && (g.y == gpt.y + yStep)) {
            gpts.push(g)
        }
        if ((g.x == gpt.x + xStep) && (g.y == gpt.y)) {
            gpts.push(g)
        }
        if ((g.x == gpt.x + xStep) && (g.y == gpt.y + yStep)) {
            gpts.push(g)
        }
    }
    //print(hpt.x, gpts.length, 'gpts')
    return (gpts)
}

