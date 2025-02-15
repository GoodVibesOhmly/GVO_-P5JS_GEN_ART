// Daily Sketch for 2021-04-27
// Ram Narasimhan.
/*
HexGrid.
1. Draw all the traingles, using a 3 color palette
2. Code in some rules for Neighbors

*/
let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const params = {
  tw: 20 // triangle width of the hexgrid...
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  //background("#0F0F0F");
  //background(seablue);
  palette = red_brown_orange; //colors.js
  palette = [cappuccino[0], cappuccino[2], cappuccino[4]];
  palette = replicate(palette, 10)
  palette2 = purples; //colors.js  
  palette2 = replicate(palette2, 10)
  cubePalette = [cappuccino[0], 'white', cappuccino[0], cappuccino[2]];

  cnv.height = height - 2 * cnv.yMargin
  cnv.width = width - 2 * cnv.xMargin
  fill(20)

  hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, params.tw);
  hg.getTriangleNeighbors() // 3 neighbors get attached to each triangle.

  stroke(255);
  //renderGridPoints(gridPts) // grid.js
  let alphaValue = 100;
  //  print(hg.points.length) // columns. each one is a column of points

  noStroke(0);

  for (curr of hg.triangles) {
    _clr = color(random(palette))
    if (!curr.view) { // let's assign it a view.
      topN = curr.up
      sideN = curr.side
      downN = curr.down

      if (topN && (topN.view)) {
        curr.view = topN.view;
      } else {
        curr.view = random([1, 2, 3])
      }

      curr.display(cubePalette[curr.view])
    }
  }

  // for (let i = 0; i < 30; i++) {
  //   // col, row, orientation  
  //   t = hg.getTriangle(int(random(hg.cols)), int(random(hg.rows)), random([0, 1]))
  //   if (t) {
  //     t.displayNeighbors(hg)
  //   }
  // }





  draw_border(clr = "#d3d3d3", sw = 57); //rn_utils.js
  draw_border(c = "#d3d3d3", sw = 25); //rn_utils.js
  draw_border(c = 20, sw = 20);
}//end setup


