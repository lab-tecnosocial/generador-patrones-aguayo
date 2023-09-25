// (33 * 3) + (99 * 2) + (99 * 2) + (99 * 2) + (99 * 2) (33 * 3) = 990
let posicionX = 0;

// es escritorio
let esMovil = false;
let lienzoAncho = 891;
let lienzoAlto = 891;
let patronAncho = 33; // 990 / 30 = 33
let breakpoints = [0, 99, 297, 495, 693, 891, 990];
let paletasArray;



function preload() {
    tablaPaletas = loadTable('paletas_pinturas.csv', 'csv', 'header');

}

function setup() {
    paletasArray = tablaPaletas.getArray();
    if (windowWidth <= 600) {
        esMovil = true;
        let container = select('#canvas-container');
        container.style('width', '400px');
        container.style('height', '400px');
        noLoop();
    }
    var canvas = createCanvas(lienzoAncho, lienzoAlto);
    canvas.parent('canvas-container');
    background(100);
    // estructuraLienzo(breakpoints);

    const botonGenerar = select('#generate');
    botonGenerar.mousePressed(() => {
        generarBloque0();
        generarBloque1();
        generarBloque2();
        generarBloque1();
        generarBloque0();
        posicionX = 0;
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
function generarTodo() {
    posicionX = 0;
    for (let i = 0; i < nPatrones; i++) {
        let patrones = [patron0];
        let patron = patrones[Math.floor(Math.random() * patrones.length)];
        patron(posicionX);

    }
}

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
    for (let i = 0; i < 2; i++) {
        patron2(posicionX, paletasPatron0[i]);
    }

    patron3(posicionX, paletasPatron0[3]);

    for (let i = 1; i >= 0; i--) {
        patron2(posicionX, paletasPatron0[i]);
    }
}

// patrones de franjas

function patron0(inicio, paleta) {
    let ancho = 33;
    // 1, 1, 1, 1, 3, 1, 1, 1, 1 = 12 which are the units of the width
    // 3, 3, 3, 3, 9, 3, 3, 3, 3 = 33 which is a multiple of 3
    // 0, 3, 6, 9, 12, 21, 24, 27, 30, 33 which are the partial sums
    for (let i = 0; i < ancho; i += 1) {
        if (i < 3 || i >= 30) {
            stroke(paleta[0]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 3 && i < 6 || i >= 27 && i < 30) {
            stroke(paleta[1]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 6 && i < 9 || i >= 24 && i < 27) {
            stroke(paleta[2]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 9 && i < 12 || i >= 21 && i < 24) {
            stroke(paleta[3]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 12 && i < 21) {
            stroke(paleta[4]);
            line(i + inicio, 0, i + inicio, height);
        }

    }

    posicionX = posicionX + ancho;
}



function patron1(inicio, paleta) {
    let ancho = 81;
    // 3, 3, 3, 63, 3, 3, 3 = 81
    for (let i = 0; i < ancho; i += 1) {
        if (i < 3 || i >= 78) {
            stroke(paleta[0]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 3 && i < 6 || i >= 75 && i < 78) {
            stroke(paleta[1]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 6 && i < 9 || i >= 72 && i < 75) {
            stroke(paleta[2]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 9 && i < 72) {
            stroke(paleta[3]);
            line(i + inicio, 0, i + inicio, height);
        }

    }
    stroke(0)
    posicionX = posicionX + ancho;
    line(posicionX, 0, posicionX, height)
    posicionX = posicionX + 1;

}

function patron2(inicio, paleta) {
    let ancho = 66;
    // 6, 6, 6, 6, 18, 6, 6, 6, 6 = 66
    for (let i = 0; i < ancho; i += 1) {
        if (i < 6 || i >= 60) {
            stroke(paleta[0]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 6 && i < 12 || i >= 54 && i < 60) {
            stroke(paleta[1]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 12 && i < 18 || i >= 48 && i < 54) {
            stroke(paleta[2]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 18 && i < 48) {
            stroke(paleta[3]);
            line(i + inicio, 0, i + inicio, height);
        }

    }


    posicionX = posicionX + ancho;
}

function patron3(inicio, paleta) {
    let ancho = 132;
    // 11, 11, 11, 66, 11, 11, 11 = 132
    for (let i = 0; i < ancho; i += 1) {
        if (i < 11 || i >= 121) {
            stroke(paleta[0]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 11 && i < 22 || i >= 110 && i < 121) {
            stroke(paleta[1]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 22 && i < 33 || i >= 99 && i < 110) {
            stroke(paleta[2]);
            line(i + inicio, 0, i + inicio, height);
        }
        if (i >= 33 && i < 99) {
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
