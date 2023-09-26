// layout escritorio: (24 * 3) + (72 * 2) + (72 * 2) + (72 * 2) + (72 * 2) + (24 * 3) = 720
// patron0 = 24px
// patron1 = 72px
// patron2 = 48px
// patron3 = 96px
// layout movil: (12 * 3) + (36 * 2) + (36 * 2) + (36 * 2) + (36 * 2) + (12 * 3) = 360
// patron0 = 12px
// patron1 = 36px
// patron2 = 24px
// patron3 = 48px
// relleno: patron0 * 3, patron1 + patron0 + patron1, patron2 + patron0 + patron3 + patron0 + patron2, patron1 + patron0 + patron1, patron0 * 3


// variables generales
let posicionX = 0;
let generados = 0;
let paletasArray;
let nPatrones = 1;
let nPaletas = 3;
// es escritorio
let lienzoAncho = 720;
let lienzoAlto = 720;
let patronAncho = 24; // 720 / 30 = 24
let breakpoints = [0, 72, 144, 216, 288, 360, 432, 504, 576, 648, 720];

// es movil
let esMovil = false;

function preload() {
    tablaPaletas = loadTable('paletas.csv', 'csv', 'header');
}

function setup() {
    paletasArray = tablaPaletas.getArray();
    if (windowWidth <= 600) {
        esMovil = true;
        lienzoAncho = 360;
        lienzoAlto = 360;
        patronAncho = 12;
        breakpoints = [0, 36, 72, 108, 144, 180, 216, 252, 288, 324, 360];
    }

    var canvas = createCanvas(lienzoAncho, lienzoAlto);
    canvas.parent('canvas-container');
    background(100);
    // estructuraLienzo(breakpoints);

    const botonGenerar = select('#generate');
    botonGenerar.mousePressed(() => {
        generarTodo(nPatrones, nPaletas);
        generados++;
    });

    const botonDescargar = select('#download');
    botonDescargar.mousePressed(() => {
        saveCanvas('aguayo', 'png');
    }
    );

    const sliderPatrones = select('#numPatrones');
    sliderPatrones.input(() => {
        nPatrones = sliderPatrones.value();
    });

    const sliderPaletas = select('#numPaletas');
    sliderPaletas.input(() => {
        nPaletas = sliderPaletas.value();
    });


    noLoop();
}

function draw() {

}


// estructura del lienzo 
function estructuraLienzo(breakpoints) {
    for (let i = 0; i < breakpoints.length; i++) {
        stroke('cyan');
        strokeWeight(2);
        line(breakpoints[i], 0, breakpoints[i], height);
    }

}

// funcion general de generar patrones
function generarTodo(nPatrones, nPaletas) {
    console.log(generados);
    console.log(nPatrones + ' patrones' + ' ' + nPaletas + ' paletas');
    let paletas = [];

    if (generados < 10) {
        let paletasChunks = [];
        for (let i = 0; i < paletasArray.length; i += 5) {
            let chunk = paletasArray.slice(i, i + 5);
            paletasChunks.push(chunk);
        }
        paletas = randomElement(paletasChunks);
    }

    if (generados >= 10) {
        let paletasRandom = [];
        for (let i = 0; i < 5; i++) {
            let paleta = randomElement(paletasArray);
            paletasRandom.push(paleta);
        }
        paletas = paletasRandom;
    }

    paletas = paletas.slice(0, nPaletas);

    if (nPatrones === 4) {
        generarBloque0(paletas);
        generarBloque1(paletas);
        generarBloque2(paletas);
        generarBloque1(paletas);
        generarBloque0Reverso(paletas);
    }

    if (nPatrones === 3) {
        generarBloque0(paletas);
        generarBloque0Reverso(paletas);
        patron2(posicionX, paletas[0]);
        patron2(posicionX, paletas[1]);
        generarBloque2(paletas);
        patron2(posicionX, paletas[1]);
        patron2(posicionX, paletas[0]);
        generarBloque0Reverso(paletas);
        generarBloque0(paletas);
    }

    if (nPatrones === 2) {
        generarBloque0(paletas);
        generarBloque0(paletas);
        patron2(posicionX, paletas[0]);
        patron2(posicionX, paletas[0]);
        patron2(posicionX, paletas[0]);
        generarBloque0(paletas);
        generarBloque0(paletas);
        patron2(posicionX, paletas[0]);
        patron2(posicionX, paletas[0]);
        patron2(posicionX, paletas[0]);
        generarBloque0Reverso(paletas);
        generarBloque0Reverso(paletas);

    }

    if (nPatrones === 1) {
        for (let i = 0; i < 10; i++)
            generarBloque0(paletas);

    }

    posicionX = 0;
}
function generarRandom() {
    posicionX = 0;
    for (let i = 0; i < nPatrones; i++) {
        let patrones = [patron0];
        let patron = patrones[Math.floor(Math.random() * patrones.length)];
        patron(posicionX);

    }
}

// funciones de generacion de bloques
function generarBloque0(paletas) {
    for (let i = 0; i < 3; i++) {
        patron0(posicionX, paletas[i]);
    }
}

function generarBloque1(paletas) {
    if (paletas.length === 5) {
        patron1(posicionX, paletas[4]);
        patron0(posicionX, paletas[3]);
        patron1(posicionX, paletas[4]);
    } else if (paletas.length === 4) {
        patron1(posicionX, paletas[3]);
        patron0(posicionX, paletas[2]);
        patron1(posicionX, paletas[3]);

    } else {
        patron1(posicionX, paletas[0]);
        patron0(posicionX, paletas[1]);
        patron1(posicionX, paletas[0]);
    }

}

function generarBloque2(paletas) {
    if (paletas.length >= 4) {
        patron2(posicionX, paletas[0]);
        patron0(posicionX, paletas[1]);
        patron3(posicionX, paletas[3]);
        patron0(posicionX, paletas[1]);
        patron2(posicionX, paletas[0]);
    } else {
        patron2(posicionX, paletas[0]);
        patron0(posicionX, paletas[1]);
        patron3(posicionX, paletas[2]);
        patron0(posicionX, paletas[1]);
        patron2(posicionX, paletas[0]);
    }
}

function generarBloque0Reverso(paletas) {
    for (let i = 2; i >= 0; i--) {
        patron0(posicionX, paletas[i]);
    }
}

// patrones de franjas
function patron0(inicio, paleta) {
    let ancho = patronAncho * 1;
    if (esMovil) {
        // 1, 1, 1, 1, 3, 1, 1, 1, 1 = 12 
        for (let i = 0; i < ancho; i += 1) {
            if (i < 1 || i >= 11) {
                stroke(paleta[0]);
                line(i + inicio, 0, i + inicio, height);
            }
            if (i >= 1 && i < 2 || i >= 10 && i < 11) {
                stroke(paleta[1]);
                line(i + inicio, 0, i + inicio, height);
            }
            if (i >= 2 && i < 3 || i >= 9 && i < 10) {
                stroke(paleta[2]);
                line(i + inicio, 0, i + inicio, height);
            }
            if (i >= 3 && i < 9) {
                stroke(paleta[3]);
                line(i + inicio, 0, i + inicio, height);
            }

        }
    } else {
        for (let i = 0; i < ancho; i += 1) {
            // 2, 2, 2, 2, 6, 2, 2, 2, 2 = 24 

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

    }

    posicionX = posicionX + ancho;
}


function patron1(inicio, paleta) {
    let ancho = patronAncho * 3;
    if (esMovil) {

        for (let i = 0; i < ancho; i += 1) {
            // 1, 1, 1, 30, 1, 1, 1 = 36

            if (i < 1 || i >= 35) {
                stroke(paleta[0]);
                line(i + inicio, 0, i + inicio, height);
            }
            if (i >= 1 && i < 2 || i >= 34 && i < 35) {
                stroke(paleta[1]);
                line(i + inicio, 0, i + inicio, height);
            }
            if (i >= 2 && i < 3 || i >= 33 && i < 34) {
                stroke(paleta[2]);
                line(i + inicio, 0, i + inicio, height);
            }
            if (i >= 3 && i < 33) {
                stroke(paleta[3]);
                line(i + inicio, 0, i + inicio, height);
            }

        }
    } else {
        for (let i = 0; i < ancho; i += 1) {
            // 2, 2, 2, 60, 2, 2, 2 = 72

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
    }
    posicionX = posicionX + ancho;


}

function patron2(inicio, paleta) {
    let ancho = patronAncho * 2;

    if (esMovil) {
        // 2, 2, 2, 2, 6, 2, 2, 2, 2 = 24
        for (let i = 0; i < ancho; i += 1) {
            if (i < 2 || i >= 22) {
                stroke(paleta[0]);
                line(i + inicio, 0, i + inicio, height);
            }
            if (i >= 2 && i < 4 || i >= 20 && i < 22) {
                stroke(paleta[1]);
                line(i + inicio, 0, i + inicio, height);
            }

            if (i >= 4 && i < 6 || i >= 18 && i < 20) {
                stroke(paleta[2]);
                line(i + inicio, 0, i + inicio, height);
            }
            if (i >= 6 && i < 18) {
                stroke(paleta[3]);
                line(i + inicio, 0, i + inicio, height);
            }

        }
    } else {

        for (let i = 0; i < ancho; i += 1) {
            // 4, 4, 4, 4, 12, 4, 4, 4, 4 = 48

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

    }

    posicionX = posicionX + ancho;
}

function patron3(inicio, paleta) {
    let ancho = patronAncho * 4;
    if (esMovil) {
        // 4, 4, 4, 4, 16, 4, 4, 4, 4 = 48
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
    } else {

        for (let i = 0; i < ancho; i += 1) {
            // 8, 8, 8, 48, 8, 8, 8 = 96

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
    }
    // adorno1(inicio, paleta);
    posicionX = posicionX + ancho;

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
    let offsetX = 18;
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
paletasSaturadas = [
    ['red', 'orange', 'yellow', 'orange', 'red'],
    ['blue', 'skyblue', 'white', 'skyblue', 'blue'],
    ['green', 'lightgreen', 'white', 'lightgreen', 'green'],
];

// utilities functions
function funcionEscalonada(x, inset, step) {
    return Math.floor((x - inset) / step);
}

function randomElement(array) {
    let element = array[Math.floor(Math.random() * array.length)];
    return element;
}

// get nPaletas to generate a n number of paletas
function nPaletasRandom(nPaletas) {
    let paletas = [];
    for (let i = 0; i < nPaletas; i++) {
        paletas.push(paletasRandom());
    }
    return paletas;
}

// get a random paleta
function paletasRandom() {
    let paleta = [];
    for (let i = 0; i < 4; i++) {
        paleta.push(randomColor());
    }
    return paleta;
}


// get a random color from a paleta
function randomColorFromPaleta(paleta) {
    let color = paleta[Math.floor(Math.random() * paleta.length)];
    return color;
}
