const somFundo = new Audio("/music/music.mp3");
const somGameOver = new Audio("/music/gameover.mp3");
const somMover = new Audio("/music/move.mp3");
const somComer = new Audio("/music/food.mp3");



var direcao = { x: 0, y: 0 };
var cobrinha = [{ x: 5, y: 5 }]

var fruta = {
    x: Math.floor(Math.random() * 18),
    y: Math.floor(Math.random() * 18)
}
var ponto = 0;
var ultimaVezAtualizada = 0;
var velocidade = 5;

function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if ((tempoAtual - ultimaVezAtualizada) / 1000 < (1 / velocidade)) {
        return;
    }
    ultimaVezAtualizada = tempoAtual;

    atualizaGame()
}

function verificacolisao() {
    for (var i = 1; i < cobrinha.length; i++) {
        if (cobrinha[i].x == cobrinha[0].x && cobrinha[i].y == cobrinha[0].y) {
            return true;

        }
    }
    if (cobrinha[0].x >= 18 ||
        cobrinha[0].x <= 0 ||
        cobrinha[0].y >= 18 ||
        cobrinha[0].y <= 0) {
        return true;
    }
}

function verficaComeufrutinha() {
    if (cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y) {
        somComer.play();
        ponto = ponto + 10;
        pontuacao.innerHTML = ponto + "pontos";
        cobrinha.unshift({
            x: cobrinha[0].x + direcao.x,
            y: cobrinha[0].y + direcao.y
        })
        fruta.x = Math.floor(Math.random() * 16) + 1;
        fruta.y = Math.floor(Math.random() * 16) + 1;
        velocidade = velocidade + 0.5;

    }

}

function atualizaGame() {
    var colidiu = verificacolisao()
    if (colidiu == true) {
        somFundo.pause();
        somGameOver.play();
        alert("game over")
        cobrinha = [{ x: 5, y: 5 }]
        direcao.y += 0;
        direcao.x += 0;
        pontos = 0;
    }

    verficaComeufrutinha();

    for (var i = cobrinha.length - 2; i >= 0; i--) {
        cobrinha[i + 1] = {...cobrinha[i] }
    }

    cobrinha[0].y += direcao.y;
    cobrinha[0].x += direcao.x;

    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;

        if (i == 0) {
            parteCobrinha.classList.add("head");

        } else {
            parteCobrinha.classList.add("snake");
        }
        board.appendChild(parteCobrinha);
    }

    var frutinha = document.createElement("div");
    frutinha.style.gridColumnStart = fruta.x;
    frutinha.style.gridRowStart = fruta.y;
    frutinha.classList.add("fruta")
    board.appendChild(frutinha)
}

function verificaClickTeclado(e) {

    somMover.play();

    switch (e.code) {
        case "KeyW":
            direcao.x = 0;
            direcao.y = -1;

            break;
            //substituir
        case "KeyA":
            direcao.x = -1;
            direcao.y = 0;
            break;
            //ir p esquerda 
        case "KeyS":
            direcao.x = 0;
            direcao.y = 1;
            break;
            //baixo 
        case "KeyD":
            direcao.x = 1;
            direcao.y = 0;
            break;
        case "Enter":
            direcao.x = 1;
            direcao.y = 0;
            break;
            somFundo.play();

            //direita
    }
}
window.addEventListener("keydown", (e) => verificaClickTeclado(e))

principal();