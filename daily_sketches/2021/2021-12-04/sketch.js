// Daily Sketch for 2021-12-04
// Ram Narasimhan.

/*
Keywords: images
Desc: Composite image made up of vertical strips of 3 images
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
}

let numImages = 1;
let imgs = [];
_str = ['assets/gandhi2.jpg']
function preload() {
    for (i = 0; i < numImages; i++) {
        imgs[i] = loadImage(_str[i]);
    }
}

function setup() {

    createCanvas(960, 960);
    //colorMode(HSB);
    //background(params.blkColor);
    print(params.bgColor)
    palette2 = random(HSBpalList)
    palette = replicate(palette, 100)
    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    fill(params.blkColor);

    for (i = 0; i < numImages; i++) {
        print(imgs[i].width)
        imgs[i].resize(0, 960);
        imgs[i].loadPixels();
    }


    stepSize = 20;
    numStrips = int(width / stepSize) + 1;
    noStroke();
    for (j = 0; j < numStrips; j++) {
        for (i = 0; i < numStrips; i++) {
            x = i * stepSize;
            y = j * stepSize;
            patch = imgs[0].get(x, y, stepSize, stepSize);
            rgb = getAvgPatchColor(patch);

            push();
            translate(x, y);
            luma = (rgb.r + rgb.r + rgb.r + rgb.b + rgb.g * 4) >> 3
            print(luma)
            renderPatch(rgb, luma);
            pop();

        }
    }



    //    draw_border(clr = params.blkColor, sw = 30 + cnv.xMargin); //rn_utils.js
}


function renderPatch(rgb, luma) {
    numLines = 5;
    cutoff = 0.5
    strokeWeight(1);
    fill(rgb.r, rgb.g, rgb.b)
    stroke(rgb.r, rgb.g, rgb.b)
    if (luma < 128) {
        numLines = 6
        cutoff = 0.8
        strokeWeight(2)
    }
    for (l = 0; l < numLines; l++) {
        xInc = l * (stepSize / numLines)
        if (random() < cutoff) {
            line(xInc, 0, xInc, stepSize) //vstripes
        }
        if (random() < cutoff) {
            line(0, xInc, stepSize, xInc) //horiz stripes
        }
    }
}
