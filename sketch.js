let cursorX = 0;

function setup() {
    createCanvas(600, 600);
    background(0);
    noStroke();
    const botonGenerar = select('#generate');
    botonGenerar.mousePressed(() => {
        patron1(cursorX);
    });
}

function draw() {
    // patron1(0);
    // patron1(90);
    // patron1(180);
}

function patron1(inicio) {
    let paleta = ['red', 'orange', 'yellow', 'orange', 'red'];
    franja(0 + inicio);
    for (let i = 0; i < 50; i += 10) {
        fill(paleta[i / 10]);
        rect(inicio + 20 + i, 0, 10, height);
    }
    franja(70 + inicio);
    function franja(i) {
        fill('skyblue');
        rect(i, 0, 20, height);
    }
    cursorX = cursorX + 90;
}