////////////////INFO & FEATURES
let myTitle = "Red square in a corner";
let present = '<h2>' + myTitle + '</h2><h3>by smldms</h3><hr>'
console.log(myTitle + " | smldms 2023.02");

const rand = fxrand();

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Add traits here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓
let bg, main, maxI;


function clr(rand) {
    if (rand > 0.25) {
        bg = 0;
        main = 255
        return ("Black")
    } else {
        bg = 255;
        main = 0
        return ("White")
    }
}

function layers(rand) {
    if (rand < 0.25) {
        return ('1');
    }
    else if (rand < 0.5) {
        return ('2');
    }
    else if (rand < 0.75) {
        return ('3');
    } else {
        return ('4')
    }
}

function fillfill(rand) {
    if (rand > 0.75) {
        return (true)
    } else {
        return (false)
    }
}

function rot(rand) {
    if (rand < 0.1) {
        return (-1)
    }
    else if (rand < 0.2) {
        return (1)
    }
    else if (rand < 0.3) {
        return (-2)
    }
    else if (rand < 0.4) {
        return (2)
    }
    else if (rand < 0.5) {
        return (-3)
    }
    else if (rand < 0.6) {
        return (3)
    }
    else if (rand < 0.7) {
        return (-0.5)
    }
    else if (rand < 0.8) {
        return (0.5)
    } else {
        return (0)
    }
}

window.$fxhashFeatures = {
    "clr": clr(rand),
    "Layers": layers(rand),
    "Fill": fillfill(rand),
    "Rotation": rot(rand)
}

console.log(window.$fxhashFeatures)

////////////////////////////////////////
let globalSize = 1920;
let cnv;
let gen;

let xoff = 0.5;
let yoff = 0.5;
let down;
let pX, pY

function setup() {
    cnv = createCanvas(globalSize, globalSize * 1.4142);
    cnv.parent('fullScreen');
    background(bg);
    angleMode(DEGREES)
    rectMode(CENTER)

    for (let pt = 0; pt < 10000; pt++) {
        push()
        strokeWeight(fxrand() * 1.5)
        stroke(main)
        point(fxrand() * width, fxrand() * height)
        pop()
    }

    for (let i = 0; i < layers(rand); i++) {
        let posX = width / 2
        let posY = height / 2
        theShape(posX, posY, 0, 0, globalSize / 6.18, fxrand() * 720, rot(rand), fillfill(rand))
    }

    pX = random([width * 0.075, width * 0.925])
    pY = random([height * 0.05, height * 0.95])
    redSquare(pX, pY, globalSize / 11.618)
    grainy(50)
    // saver()
    // timer(1)

}

function theShape(x, y, anchorX, anchorY, maxtheShape, s, angle, filling) {
    push()
    down = maxtheShape / (globalSize / 15)
    for (let i = 0; i < maxtheShape; i++) {
        if (filling == true) {
            strokeWeight(map(i, 0, maxtheShape, 2, 0))
            fill(map(i, 0, maxtheShape, bg, main), map(i, 0, maxtheShape, 50, 0))
        }
        else {
            noFill()
            stroke(map(i, 0, maxtheShape, main, bg))
            strokeWeight(map(i, 0, maxtheShape, 2, 0))
        }
        let noisetheShape = map(noise(xoff * 0.25, yoff * 0.25), 0, 1, s * 1.25, s)
        let factor = map(noise(xoff, yoff), 0, 1, -globalSize / 3, globalSize / 3)
        push()
        translate(x, y)
        rotate(angle * i)
        beginShape();
        vertex(anchorX + factor, anchorY + factor + noisetheShape);
        bezierVertex(anchorX + factor - noisetheShape, anchorY + factor + noisetheShape, anchorX + factor - noisetheShape * 2, anchorY + factor - noisetheShape, anchorX + factor, anchorY + factor - noisetheShape);
        bezierVertex(anchorX + factor + noisetheShape, anchorY + factor - noisetheShape, anchorX + factor + noisetheShape * 2, anchorY + factor + noisetheShape, anchorX + factor, anchorY + factor + noisetheShape);
        endShape(CLOSE);
        pop()
        xoff += 0.005;
        yoff += 0.005;
        s -= down;
    }
    pop()
}

function redSquare(posX, posY, s) {
    push()
    noStroke()
    fill(217, 4, 4)
    rect(posX, posY, s)
    pop()
}

function grainy(force) {
    loadPixels();
    let d = pixelDensity();
    let halfImage = 4 * (width * d) * (height * d);
    for (let i = 0; i < halfImage; i += 4) {
        grainAmount = random(-force, force);
        pixels[i] = pixels[i] + grainAmount;
        pixels[i + 1] = pixels[i + 1] + grainAmount;
        pixels[i + 2] = pixels[i + 2] + grainAmount;
        pixels[i + 3] = pixels[i + 3] + grainAmount
    }
    updatePixels();
}

/////////KEYS
function keyTyped() {
    if (keyCode === 83) { // if "v" is pressed
        save(myTitle + "_" + fxhash + '.png');
    }
}