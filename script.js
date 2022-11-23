
function CanoUP(){
    this.elem = document.createElement('div');
    this.elem.className = 'cano';

    const corpo = document.createElement('div');
    corpo.className = 'corpo';

    const borda = document.createElement('div');
    borda.className = 'borda';

    this.altura = (h) => {corpo.style.height = `${h}px`};
    this.elem.appendChild(corpo);
    this.elem.appendChild(borda);
}

function CanoDW(){
    this.elem = document.createElement('div');
    this.elem.className = 'cano';

    const corpo = document.createElement('div');
    corpo.className = 'corpo';

    const borda = document.createElement('div');
    borda.className = 'borda';

    this.altura = (h) => {corpo.style.height = `${h}px`};
    this.elem.appendChild(borda);
    this.elem.appendChild(corpo);
}

function Barreira(x){
    this.elem = document.createElement('div');
    this.elem.className = 'barreira';

    this.superior = new CanoUP;
    this.inferior = new CanoDW;

    this.setAltura = () => { 
        const hTela = document.getElementById('game');
        const altsup = Math.random() * (hTela.clientHeight - 200);
        const altinf = hTela.clientHeight - altsup - 200;

        this.superior.altura(altsup);
        this.inferior.altura(altinf);
    }
    
    this.elem.appendChild(this.superior.elem);
    this.elem.appendChild(this.inferior.elem);

    this.getX = () => {
      const  Elem = this.elem
      const  leftElem = window.getComputedStyle(Elem).left
      return leftElem.split('px')[0];
    }

    this.setX = (x) => {
      this.elem.style.left = `${x}px`;
    }
   this.setX(x)
   this.setAltura()
}


function Barreiras(espaco, largura){ 
    this.pares = [new Barreira(largura), new Barreira(largura + espaco), new Barreira(largura + espaco*2), new Barreira(largura + espaco*3)]
    const passaro = document.getElementById('passaro');
    const hTela = document.getElementById('game').clientHeight;
    this.animar = () => {
        this.pares.forEach((e)=>{
            let frames = 3
            e.setX(e.getX()-frames) 
            if(e.getX() <= (-100)){
                e.setX(espaco*4)
               e.setAltura()
           } 
           /* VERIFICA SE PASSOU DO PASSARO */
           if( e.getX() <= passaro.offsetLeft && e.getX() > (passaro.offsetLeft - frames)){
               aumentarScore();
            }
            /* VERIFICA COLISAO */
            if( e.getX() <= (passaro.offsetLeft + passaro.clientWidth) && e.getX() > ((passaro.offsetLeft + passaro.clientWidth) - e.elem.clientWidth)){
                const canoSupAlt = e.superior.elem.clientHeight;
                const canoInfAlt = e.inferior.elem.clientHeight;
        
                if(passaro.offsetTop < canoSupAlt || (passaro.offsetTop + passaro.clientHeight) > (hTela - canoInfAlt)) {
                    gameOver();
                }
            }
        })
    }   
}

let ponto = 0;
function aumentarScore(){
    ponto ++;
    const score = document.getElementById('score');
    score.innerHTML = `Score:${ponto}`;
}

function voarCair(voando){
    const passaro = document.getElementById('passaro')
    const hTela = document.getElementById('game').clientHeight;
    const passaroHeight = parseInt(window.getComputedStyle(passaro).bottom);
    
    if(voando && passaroHeight < (hTela - passaro.clientHeight)){
        passaro.style.bottom= `${passaroHeight + 5}px`;
        passaro.style.transform = 'rotate(-15deg)';
    }
    else if(passaroHeight >= 0){
        passaro.style.bottom= `${passaroHeight - 3}px`; 
        passaro.style.transform = 'rotate(10deg)'
    }
}

function animaVoar(){
    let voando = false;    
    window.onkeydown = () => {voando = true};
    window.onkeyup = () => {voando = false};
    animaVoar = setInterval(function(){voarCair(voando)},10) 
}

function move(){
    const TelaW = parseInt(document.getElementById('game').clientWidth)
    const b1 = new Barreiras(500,TelaW)
    b1.pares.forEach(e => {document.getElementById('game').appendChild(e.elem)})
    andar = setInterval(b1.animar,10) 
}

function play(){
    window.location.reload()
}

window.onload = function(){
    move()
    animaVoar()
}

function gameOver(){
    const fim = document.getElementById('gameOver');
    fim.style.display = 'block';
    const textoGameOver = document.getElementById('fraseGameOver');
    clearInterval(andar)
    clearInterval(animaVoar)
    textoGameOver.innerHTML= `<span class='titulo'>!!GAME OVER!!</span> <br> Voce conseguiu <br><span class='ponto'>${ponto}</span> ${ponto > 1 ? 'pontos': 'ponto'}`
}
