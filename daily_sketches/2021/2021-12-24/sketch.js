// Daily Sketch for 2021-12-24
// Ram Narasimhan.
/*
HexGrid.
2. Draw all the traingles, using 3 colors...
3. Create a triangle class, ID = its grid position
4. each triangle has 3 neighbors = s, t and d(own)
5. Code in some color rules for neighbors

*/
let palette = []
const cnv = {
  xMargin: 30,
  yMargin: 30,
}

const params = {
  tw: 80, // triangle width of the hexgrid...
  xStep: 60,
  yStep: 60,
  bgColor: [210, 50, 80],
  blkColor: [0, 0, 0],
}


function setup() {
  createCanvas(860, 860);
  background("#d3d3d3");
  palette = red_brown_orange; //colors.js
  //palette = purples; //colors.js
  palette = replicate(palette, 10)


  cnv.height = height - 2 * cnv.yMargin // usable height
  cnv.width = width - 2 * cnv.yMargin //usable width
  fill(params.blkColor);
  rect(cnv.xMargin, cnv.yMargin, cnv.width, cnv.height)


  hg = new HexGrid(cnv.width, cnv.height, cnv.xMargin, cnv.yMargin, params.tw);
  stroke(255)
  //renderGridPoints(gridPts) // grid.js
  let alphaValue = 200;
  print(hg.points.length) // columns. each one is a column of points

  //fill("#1167b1")
  stroke(0);
  strokeWeight(5)
  //base_r = cnv.width / (25)
  base_r = params.tw


  for (co of hg.points) { //using only the center points...
    for (gpt of co) {
      push();

      translate(gpt.x, gpt.y) // go to grid point center
      rad = base_r * random([0.5, 0.25])

      c = color(random(palette))
      c.setAlpha(alphaValue);
      fill(c);

      switch (random([0, 1, 2, 3, 4])) {
        case 0:
          cyl(0, 0, 2 * rad, 10)
          break;
        case 1:
          hx = new Polygon(0, 0, random([6, 8]), rad, random(purples)); //rn_shapes.js
          strokeWeight(int(random(3, 10)));
          rotate(PI / 7 * int(random(7)))
          hx.render()
          break;
        case 2:
          stroke('white')
          star(0, 0, rad, rad * 1.4, 5, curved = 1);
          break;

        case 3:
          strokeWeight(1)
          cuboid(0, 0, rad, rad, rad * 0.5, colr = random(palette));
          break;


        default:
          circle(0, 0, 2 * rad, 10)

          break;
      }

      pop();
    }
  }

  draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}//end setup


