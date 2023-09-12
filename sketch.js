let posicionX = 0;
let repeticion = 10;
let lienzoAncho = 900;
let lienzoAlto = 900;

function setup() {
    createCanvas(lienzoAncho, lienzoAlto);
    background(0);

    const botonGenerar = select('#generate');
    botonGenerar.mousePressed(() => {
        generarPatrones();
    });
}

function draw() {

}

// funcion general de generar patrones
function generarPatrones() {
    background(0);
    posicionX = 0;

    for (let i = 0; i < repeticion; i++) {
        let patrones = [patronHebra1, patronHebra2];
        let patron = patrones[Math.floor(Math.random() * patrones.length)];
        patron(posicionX);

    }
}

// piecewiese functions for fabric patterns
function patronHebra1(inicio) {
    let paleta = paletasRandom();
    let franja = franjasRandom();
    for (let i = 0; i < 90; i += 1) {

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

function patronHebra2(inicio) {
    // invertido del 1
    let paleta = paletasRandom2();
    let franja = franjasRandom();
    for (let i = 0; i < 90; i += 1) {

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

    // adornos
    adorno1(inicio);

    posicionX = posicionX + 90;


}

function adorno1(inicio) {
    let franja = franjasRandom();
    let offsetCenter = 30;
    let offsetX = 14;
    let offsetY = 15;
    fill(franja);
    noStroke();
    ellipseMode(CENTER);
    for (let j = 0; j < lienzoAlto; j += 100) {
        circle(inicio + offsetCenter + offsetX, j + offsetCenter + offsetY, 60);
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


// adornos
function rombos() {

}