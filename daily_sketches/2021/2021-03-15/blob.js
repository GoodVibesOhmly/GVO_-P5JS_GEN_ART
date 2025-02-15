// Functions related to creating a Blob
// Ram Narasimhan, March 2021


function isPointInside(pt, hull) {

    let h0 = hull[0];
    //strokeWeight(5)
    //point(h0.x, h0.y)

    bbox = hull_bbox(hull)
    //print('bbox', bbox)

    if ((pt.x > bbox.xMax) || (pt.x < bbox.xMin)) {
        print('no need to check')
        return (0)
    }

    //hvector is from h0 to hi
    //pvector is from h0 to pt
    //then check their cross product sign  
    crossZ = [];
    for (i = 1; i < hull.length; i++) {
        checking = hull[i]
        const pv = p5.Vector.sub(pt, h0);
        const hv = p5.Vector.sub(checking, h0);
        const cross = pv.cross(hv);
        //print(cross.z, 'cross z')
        crossZ.push(cross.z)
    }

    sector = -1;
    for (i = 1; i < crossZ.length; i++) {
        if (Math.sign(crossZ[i - 1]) != Math.sign(crossZ[i])) { // found the sector
            sector = i;
            //print(i - 1, i, crossZ.length, hull.length)
        }
    }

    /*
    if (sector != -1) {
      push();
      stroke(255);
      strokeWeight(8);
      point(h0.x, h0.y)
      point(hull[sector].x, hull[sector].y)
      point(hull[sector + 1].x, hull[sector + 1].y)
      pop();
    } 
    */

    //print('sector', sector, sector + 1)
    //we know the sector, but we still have to see if the pt is inside or outside the hull...

    if (sector != -1) {
        const edge = p5.Vector.sub(hull[sector], hull[sector + 1]);
        const hp = p5.Vector.sub(hull[sector], pt);
        const cross2 = edge.cross(hp);
        //print(cross2.z, 'cross2')
        if (cross2.z > 0) {
            return 1
        } else {
            return 0
        }
    }
    return (0)
}



function renderHull(hull) {
    let numEcho = 1;
    alphaValue = 100 + random(100);
    c = color(200, 200, 220);
    stroke(c);
    strokeWeight(3)
    c.setAlpha(alphaValue);
    //fill(c);
    for (e = 0; e < numEcho; e++) {
        push();
        scale(1 - e * 0.1) // not quite working, due to lack of translate()
        beginShape();
        for (let p of hull) {
            vertex(p.x, p.y);
        }
        endShape(CLOSE);
        pop();
    }

}


// Adapted from Gift Wrapping Algorithm by Daniel Shiffman
// Made it a stand-alone function for me to use
function getHull(points) {

    let hull = [];

    points.sort((a, b) => a.x - b.x);
    let leftMost = points[0];
    currentVertex = leftMost;
    hull.push(currentVertex);
    nextVertex = points[1];

    done = false;
    attempts = 0;
    while (!done && attempts < 1000) {

        nextVertex = getNextVertex(currentVertex, points);
        if (nextVertex == leftMost && hull.length > 2) {
            done = true;
        } else {
            hull.push(nextVertex);
            currentVertex = nextVertex;
            nextVertex = leftMost;
        }
        attempts++;
    }
    return (hull)
}


function getNextVertex(currentVertex, points) {
    nextVertex = random(points);
    for (index = 0; index < points.length; index++) {
        let checking = points[index];
        stroke(255);

        const a = p5.Vector.sub(nextVertex, currentVertex);
        const b = p5.Vector.sub(checking, currentVertex);
        const cross = a.cross(b);

        if (cross.z < 0) { // found a better point
            nextVertex = checking;
            nextIndex = index;
        }

    }

    return (nextVertex)

}


function renderPts(gpts, sw = 5) {
    for (gp of gpts) {
        push();
        strokeWeight(sw);
        point(gp.x, gp.y);
        pop();
    }
}

function generateBlobVertices(centerX, centerY, xRange, yRange) {
    let verts = [];
    numBlobPts = 5 + int(random(25));
    //generate a bunch of random vectors clumped around CenterX, CenterY
    for (pt = 0; pt < numBlobPts; pt++) {
        let x = random(-xRange / 2, xRange / 2);
        let y = random(-yRange / 2, yRange / 2);
        let v = createVector(centerX + x, centerY + y);
        if (!outOfBounds(v)) {
            verts.push(v);
        }
    }
    return verts;
}


function isBlobOvelapping(hull, interiorPts) {
    //1 if overlapping, 0 means it is fine to place it there
    // for (h of hull) {
    //     gpts = get4NearestGridPoints(h)
    //     //renderPts(gpts)
    //     //print(gpts, "grid points")
    //     for (gp of gpts) {
    //         if (!gp.free) {
    //             //print(gp, 'not free')
    //             return (1)
    //         }
    //     }
    // }
    for (ip of interiorPts) {
        if (!ip.free) {
            return (1)
        }
    }

    return (0)

}


function getInternalGridPoints(bbox, gridPts) {
    // grid points inside bbox
    gridBox = [];
    for (g of gridPts) {
        if ((g.x <= bbox.xMax) &&
            (g.x >= bbox.xMin) &&
            (g.y <= bbox.yMax) &&
            (g.y >= bbox.yMin)
        ) {
            gridBox.push(g)
        }
    }
    return gridBox
}

function markInternalPoints(hull, blobGpts) {
    for (gpt of blobGpts) {
        val = isPointInside(gpt, hull)
        if (val == 1) {
            gpt.free = false;
        }
    }
}


function renderInternalGridPoints(blobGpts) {
    push();
    strokeWeight(3);
    for (g of blobGpts) {
        if (g.free) {
            stroke(0, 200, 0);
        } else {
            stroke(128, 0, 0);
        }
        point(g.x, g.y)
    }
    pop();
}


function moveHull(hull, xStep, yStep) {
    newHull = [];
    for (h of hull) {
        let v = createVector(h.x + xStep, h.y + yStep);
        newHull.push(v)
    }
    return (newHull)
}

function hull_bbox(hull, verts) {
    try {
        return {
            xMin: Math.min.apply(Math, hull.map(function (o) { return o.x; })),
            xMax: Math.max.apply(Math, hull.map(function (o) { return o.x; })),
            yMin: Math.min.apply(Math, hull.map(function (o) { return o.y; })),
            yMax: Math.max.apply(Math, hull.map(function (o) { return o.y; }))
        };
    } catch (err) {
        print("verts", verts, "hull", hull)
    }
}


