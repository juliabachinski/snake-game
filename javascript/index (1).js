
const somFundo = new Audio("/music/music.mp3");
const somGameOver = new Audio("/music/gameover.mp3");
const somMover = new Audio("/music/move.mp3");
const somComer = new Audio("/music/food.mp3");

var direcao = { x: 0, y: 0 };
var cobrinha = [{ x: 5, y: 5 }]

var fruta = {
    x: Math.floor(Math.radom() * 18),
    y: Math.floor(Math.radom() * 18),
}
var ponto = 0;
var ultimaVezAtualizada = 0;
var velocidade = 1;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if ((tempoAtual - ultimaVezAtualizada) / 1000 < 1 / velocidade) {
        return;
    }
    ultimaVezAtualizada = tempoAtual;

    atualizaGame()
}
function atualizaGame() {
    for(var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = {...cobrinha[i].x}

        cobrinha[0].y += direcao.y;
        cobrinha[0].y += direcao.x;
    }
    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            parteCobrinha.classlist.add("head");

        } else {
            parteCobrinha.classlist.add("snake");
        }
        board.appendchild(parteCobrinha);
    }

var frutinha = createElement("div");
frutinha.style.gridColumnStart = fruta.y;
frutinha.style.gridColumnStart = fruta.x;
frutinha.classlist.add("fruta")
board.appendchild(frutinha)
}
function verificaClickTeclado(e) {
    somMover.play();

    switch (e.code) {
        case "keyW":
            direcao.y = 0;
            direcao.x = 1;
    
        break;
        //substituir
        case "keyA":
            direcao.y = -1;
            direcao.x = 0;
        break;
        //ir p esquerda 
        case "keyS":
            direcao.y = 0;
            direcao.x = 1;
        break;
        //baixo 
        case "keyD":
            direcao.y = 1;
            direcao.x = 0;
        break;
        //direita
    }
}
window.addEventListener("keydown", (e) => verificaClickTeclado(e))