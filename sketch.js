let posicionX = 0;

function setup() {
    createCanvas(900, 900);
    background(0);
    const botonGenerar = select('#generate');
    botonGenerar.mousePressed(() => {
        patronHebra1(posicionX);
    });
}

function draw() {

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

// color palettes functions
function paletasRandom() {
    const paletas = [
        ['red', 'orange', 'yellow', 'orange', 'red'],
        ['blue', 'skyblue', 'white', 'skyblue', 'blue'],
        ['green', 'lightgreen', 'white', 'lightgreen', 'green'],
    ];
    return paletas[Math.floor(Math.random() * paletas.length)];
}

function franjasRandom() {
    const franjas = ['skyblue', 'crimson', 'green'];
    return franjas[Math.floor(Math.random() * franjas.length)];

}

// utilities functions
function funcionEscalonada(x, inset, step) {
    return Math.floor((x - inset) / step);
}