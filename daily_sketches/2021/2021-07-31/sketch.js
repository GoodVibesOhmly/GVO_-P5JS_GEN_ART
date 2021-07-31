// Daily Sketch for 2021-07-31
// Ram Narasimhan

/*
Keywords: Thread connect

Desc: Draw points around 2 concentric disks. Connect Pins to according to rules.
Desc: Symmetry

    */


let palette = []
let grid;
const cnv = {
    xMargin: 50,
    yMargin: 50,
}

const params = {
    bgColor: "#0f0f0f", //black
    //    bgColor: '#ab3977', //black
    numColors: 20,
    numpins: 24,
}

function setup() {
    createCanvas(660, 660);
    background(params.bgColor);
    palette2 = purples;
    palette2 = replicate(palette2, 100)
    palette = red_brown_orange; //colors.js
    // palette = cappuccino; //colors.js
    // palette = take5;
    palette = ['lightblue', 'blue', 'black', 'orange', 'blue',
        'salmon', 'brown', 'green']
    palette = replicate(palette, 100)

    cnv.height = height - 2 * cnv.yMargin // usable height
    cnv.width = width - 2 * cnv.yMargin //usable width
    bg = random(palette2)
    //    displayBgRect(bg)
    incr = TAU / params.numpins
    rads = [100, 225, 300];
    disks = [];
    for (var i = 0; i < rads.length; i++) {
        disks[i] = new Array();
    }
    for (i = 0; i < rads.length; i++) {
        r = rads[i]
        for (angle = 0; angle <= TAU; angle += incr) {
            x = r * cos(angle);
            y = r * sin(angle);
            disks[i].push([x, y])
        }
    }

    push();
    translate(width / 2, height / 2)
    for (i = 0; i < rads.length; i++) {
        for (cpt of disks[i]) {
            circle(cpt[0], cpt[1], 5)
        }
    }

    //pick 2 random points and connect via the center
    for (i = 0; i < rads.length; i++) {
        for (l = 0; l < 300; l++) {
            i1 = int(random(params.numpins));
            i2 = int(random(params.numpins));
            p1 = disks[i][i1]
            p2 = disks[i][i2]
            dff = Math.abs(i1 - i2)
            dffMax = params.numpins / 2
            print(dff)
            if ((dff > params.numpins * 0.65) || (dff < params.numpins * 0.45)) {
                sw = Math.abs(dffMax - dff)
                strokeWeight(sw / 4)
                strokeWeight(3 - i)
                stroke(palette[i + 3])
                //stroke(palette[sw])
                print(dff, dffMax, sw)
                line(p1[0], p1[1], p2[0], p2[1])
            }
        }
    }
    pop();

    draw_border(clr = 20, sw = 50); //rn_utils.js
}





