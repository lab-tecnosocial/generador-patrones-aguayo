// layout: (24 * 3) + (72 * 2) + (72 * 2) + (72 * 2) + (72 * 2) + (24 * 3) = 720
// relleno: patron0 * 3, patron1 + patron0 + patron1, patron2 + patron0 + patron3 + patron0 + patron2, patron1 + patron0 + patron1, patron0 * 3
// patron0 = 24px
// patron1 = 72px
// patron2 = 48px
// patron3 = 96px
let posicionX = 0;

// es escritorio
let esMovil = false;
let lienzoAncho = 720;
let lienzoAlto = 720;
let patronAncho = 24; // 720 / 30 = 24
let breakpoints = [0, 72, 144, 216, 288, 360, 432, 504, 576, 648, 720];
let paletasArray;


function preload() {
    tablaPaletas = loadTable('paletas_pinturas.csv', 'csv', 'header');
}

function setup() {
    paletasArray = tablaPaletas.getArray();
    if (windowWidth <= 600) {
        esMovil = true;
        let container = select('#canvas-container');
        container.style('width', '360px');
        container.style('height', '360px');
        noLoop();
    }

    var canvas = createCanvas(lienzoAncho, lienzoAlto);
    canvas.parent('canvas-container');
    background(100);
    estructuraLienzo(breakpoints);

    const botonGenerar = select('#generate');
    botonGenerar.mousePressed(() => {
        generarBloque0();
        generarBloque1();
        generarBloque2();
        generarBloque1();
        generarBloque0();
        posicionX = 0;
        // estructuraLienzo(breakpoints);
    });

    const botonDescargar = select('#download');
    botonDescargar.mousePressed(() => {
        saveCanvas('aguayo', 'png');
    }
    );
}

function draw() {

}


// estructura del lienzo 
function estructuraLienzo(breakpoints) {
    // make lines for breakpoints
    for (let i = 0; i < breakpoints.length; i++) {
        stroke('cyan');
        strokeWeight(2);
        line(breakpoints[i], 0, breakpoints[i], height);
    }

}

// funcion general de generar patrones
function generarRandomTodo() {
    posicionX = 0;
    for (let i = 0; i < nPatrones; i++) {
        let patrones = [patron0];
        let patron = patrones[Math.floor(Math.random() * patrones.length)];
        patron(posicionX);

    }
}

// funciones de generacion de bloques
function generarBloque0() {
    for (let i = 0; i < 3; i++) {
        patron0(posicionX, paletasPatron0[i]);
    }
}

function generarBloque1() {
    patron1(posicionX, paletasPatron1[0]);
    patron0(posicionX, paletasPatron0[3]);
    patron1(posicionX, paletasPatron1[0]);
}

function generarBloque2() {
    patron2(posicionX, paletasPatron0[0]);
    patron0(posicionX, paletasPatron0[1]);
    patron3(posicionX, paletasPatron0[3]);
    patron0(posicionX, paletasPatron0[1]);
    patron2(posicionX, paletasPatron0[0]);
}

// patrones de franjas
function patron0(inicio, paleta) {
    //  x1 = 24
    let ancho = 24;
    // 1, 1, 1, 1, 3, 1, 1, 1, 1 = 12 which are the units of the width
    // 2, 2, 2, 2, 6, 2, 2, 2, 2 = 24 which is a multiple of 3
    // partial sums: 0, 2, 4, 6, 8, 16, 18, 20, 22, 24
    for (let i = 0; i < ancho; i += 1) {
        if (i < 3 || i >= 21) {
            stroke(paleta[0]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 3 && i < 6 || i >= 18 && i < 21) {
            stroke(paleta[1]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 6 && i < 9 || i >= 15 && i < 18) {
            stroke(paleta[2]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 9 && i < 15) {
            stroke(paleta[3]);
            line(i + inicio, 0, i + inicio, height);
        }

    }

    posicionX = posicionX + ancho;
}


function patron1(inicio, paleta) {
    // x3 = 72
    let ancho = 72;
    // 2, 2, 2, 60, 2, 2, 2 = 72
    for (let i = 0; i < ancho; i += 1) {
        if (i < 2 || i >= 70) {
            stroke(paleta[0]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 2 && i < 4 || i >= 68 && i < 70) {
            stroke(paleta[1]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 4 && i < 6 || i >= 66 && i < 68) {
            stroke(paleta[2]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 6 && i < 66) {
            stroke(paleta[3]);
            line(i + inicio, 0, i + inicio, height);
        }

    }
    posicionX = posicionX + ancho;


}

function patron2(inicio, paleta) {
    // x2 = 48
    let ancho = 48;
    // 4, 4, 4, 4, 12, 4, 4, 4, 4 = 48

    for (let i = 0; i < ancho; i += 1) {
        if (i < 4 || i >= 44) {
            stroke(paleta[0]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 4 && i < 8 || i >= 40 && i < 44) {
            stroke(paleta[1]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 8 && i < 12 || i >= 36 && i < 40) {
            stroke(paleta[2]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 12 && i < 36) {
            stroke(paleta[3]);
            line(i + inicio, 0, i + inicio, height);
        }

    }


    posicionX = posicionX + ancho;
}

function patron3(inicio, paleta) {
    // x4 = 96
    let ancho = 96;
    // 8, 8, 8, 48, 8, 8, 8 = 96
    for (let i = 0; i < ancho; i += 1) {
        if (i < 8 || i >= 88) {
            stroke(paleta[0]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 8 && i < 16 || i >= 80 && i < 88) {
            stroke(paleta[1]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 16 && i < 24 || i >= 72 && i < 80) {
            stroke(paleta[2]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 24 && i < 72) {
            stroke(paleta[3]);
            line(i + inicio, 0, i + inicio, height);
        }

    }
    posicionX = posicionX + ancho;

}


// colores
const paletasPatron0 = [
    ["#FF897A", "#DB3E43", "#A0030F", "#560004", "#40050C"],
    ["#BED480", "#63A46A", "#2C5C25", "#043816", "#03211A"],
    ["#FAB4A6", "#F14065", "#D93E5E", "#87152B", "#451219"],
    ["#84BBD4", "#128CB6", "#0074A5", "#003873", "#000651"]

]

const paletasPatron1 = [
    ["#4A6046", "#DDB092", "#D74B66", "#002E41"],
];

function patronOld1(inicio) {
    let paleta = paletasRandom();
    let franja = franjasRandom();
    for (let i = 0; i < patronAncho; i += 1) {

        if (i < 20 || i >= 70) {
            stroke(franja);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 20 && i < 70) {
            stroke(paleta[funcionEscalonada(i, 20, 10)]);
            line(i + inicio, 0, i + inicio, height);
        }

    }
    posicionX = posicionX + 90;
}


function patronOld2(inicio) {
    // invertido del 1
    let paleta = paletasRandom2();
    let franja = franjasRandom();
    for (let i = 0; i < patronAncho; i += 1) {

        if (i >= 15 && i < 75) {
            stroke(franja);
            line(i + inicio, 0, i + inicio, height);
            // put multiple squares all over the heigth

        }
        if (i < 15) {
            stroke(paleta[Math.floor(i / 5)]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 75) {
            // stroke(paleta[funcionEscalonada(i, 20, 10)]);
            stroke(paleta[Math.floor((i - 75) / 5)]);
            line(i + inicio, 0, i + inicio, height);
        }

    }

    // adorno1(inicio, paleta);

    posicionX = posicionX + 90;

}

// adornos

function adorno1(inicio, paleta) {
    let offsetCenter = 30;
    let offsetX = 14;
    let offsetY = 15;
    ellipseMode(CENTER);
    rectMode(CENTER);


    for (let j = 0; j < lienzoAlto; j += 100) {
        push();
        translate(inicio + offsetCenter + offsetX, offsetCenter + offsetY + j);
        rotate(PI / 4);
        for (let i = 40; i > 10; i -= 10) {
            noStroke();
            fill(paleta[(i / 10) - 2]);
            square(0, 0, i);
        }
        pop();
    }

}


// colores

function paletasRandom() {
    const paletas = [
        ['red', 'orange', 'yellow', 'orange', 'red'],
        ['blue', 'skyblue', 'white', 'skyblue', 'blue'],
        ['green', 'lightgreen', 'white', 'lightgreen', 'green'],
    ];
    return paletas[Math.floor(Math.random() * paletas.length)];
}

function franjasRandom() {
    const franjas = ['skyblue', 'crimson', 'green', "#B13166", "#F81868", "#F63B3A", "#F35FBA", "#6F1A65", "#013AA3", "#F00002", "#13B2CB", "#F93EA1", "#11C606"];
    return franjas[Math.floor(Math.random() * franjas.length)];

}

function paletasRandom2() {
    const paletas = [
        ['red', 'orange', 'yellow'],
        ['blue', 'skyblue', 'white'],
        ['green', 'lightgreen', 'white'],
        ["#E40003", "#FF4761", "#FDA9D7"], // rojos a rosados
        ["#0251A3", "#03ACC7", "#8BFDDD"], // azules a celestes

    ];
    return paletas[Math.floor(Math.random() * paletas.length)];
}


// utilities functions
function funcionEscalonada(x, inset, step) {
    return Math.floor((x - inset) / step);
}

function randomElement(array) {
    let element = array[Math.floor(Math.random * array.length)];
    return element;
}
