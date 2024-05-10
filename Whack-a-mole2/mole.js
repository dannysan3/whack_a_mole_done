let engel = document.getElementById("e1");
let djevel = document.getElementById("d1");
let sisteTall = -1;
let piper = [];
let score = 0;
let timer;
let intervallId;
let intervalVarighet = 2000; // Initial interval duration
let harStartet = false
let currentNivå;


function visNivå(nivå) {
   
    spanNivå = document.getElementById("nivaa-span")
    if (nivå === 'nivå1') {
        document.getElementById('startside').style.display = 'none';
        document.getElementById('nivå1-innhold').style.display = 'block';
        spanNivå.textContent ="Nivå 1"
        startNivå1()
    }
    else if (nivå === 'nivå2') {
        document.getElementById('nivå1-innhold').style.display = 'block';
        document.getElementById('startside').style.display = 'none';
        spanNivå.textContent ="Nivå 2"
        startNivå2()
    }
}

function visStart(){
    // Skjul nivåer og vis start side
    document.getElementById('nivå1-innhold').style.display = 'none';
    document.getElementById('startside').style.display = 'block';
    document.getElementById("nivå-span").textContent = "Nivå : "
    restartAlt()
   
}

function startNivå1() {
    restartAlt()
    intervallId = setInterval(engelNaa, intervalVarighet);
    currentNivå = "nivå1"
  
}

function startNivå2() {
    restartAlt()
    intervallId = setInterval(engelNaa2, intervalVarighet);
    currentNivå = "nivå2"
  
}

function engelNaa2(){

    let harKlikket = false

    engelNaa()

    if (intervalVarighet > 1100 && harStartet) {
        intervalVarighet -= 100;
        clearInterval(intervallId);
        intervallId = setInterval(engelNaa2, intervalVarighet);
    }

    //Hvis brukeren har startet spillet, og ikke klikket på en figur før den bytter plass, mister bruker poeng
    if (harStartet && !harKlikket) { 
        score -= 25; //taper 25 poeng hver gang han ikke trykker på
        if (score < 0){ //Hvis bruker får - poeng taper bruker
            score = 0
            gameOver()
        }
        document.getElementById("score").innerHTML = score;
    }
   
   
    harKlikket = false;
}

function engelNaa() {

    // Henter alle piper
    let pipeElements = document.getElementsByClassName("pipe");

    
    //Trekker tilfeldig pipe og oppdaterer fiugerene
    let pipeId = randomBrikke(pipeElements);
    let pipeId2= randomBrikke(pipeElements);
    engel = document.getElementById("e1");
    djevel = document.getElementById("d1");

    let pipeElement = document.getElementById(pipeId);
    let pipeElement2 = document.getElementById(pipeId2);
    oppdaterPos(engel, pipeElement);
    oppdaterPos(djevel, pipeElement2);
    
}
function oppdaterPos(element, pipeElement) {
    element.setAttribute("x", pipeElement.getAttribute("x"));
    element.setAttribute("y", pipeElement.getAttribute("y"));
    element.style.visibility = "visible";
}


function randomBrikke(pipeElements) {
    

    var randomIndex;
    //sørger for at de ikke får lik tall djevel og engel
    do {
        randomIndex = Math.floor(Math.random() * pipeElements.length);
    } while (randomIndex === sisteTall); 

    sisteTall = randomIndex;

    var randomPipe = pipeElements[randomIndex];

    return randomPipe.id;
}


function spillIgjen() {
    let gameOverBox= document.getElementById("game-over-box");
    gameOverBox.style.display = "none";
    score = 0;
    highScore = 0
    harStartet = false
    intervalVarighet = 2000; 
    document.getElementById("score").innerHTML = score;

    //Sjekker hvilket nivå man spiller på
    if (currentNivå == "nivå1"){ 
        startNivå1()
    }else{
        startNivå2()
    }
}

function gameOver() {
    
    // Henter game over boksen og gjør den synlig
    let gameOverBox = document.getElementById("game-over-box");
    gameOverBox.style.display = "block";
    let rundeScoreSpan = document.getElementById("rundeScore");
    rundeScoreSpan.textContent = highScore;

    // Henter highscore tabellen og legger til ny rad
    let tabell = document.getElementById("score-tabell");
    let nyRad = tabell.insertRow(-1); 
    let datoKol = nyRad.insertCell(0); 
    let poengKol = nyRad.insertCell(1); 
    let nivåKol = nyRad.insertCell(2); 
    let dato = new Date();
    datoKol.textContent = dato.toLocaleTimeString() 
    poengKol.textContent = highScore;
    nivåKol.textContent = currentNivå
    
    //Stopper timer slik at Engel ikke blir kalt
    clearInterval(intervallId)
    //Skjuler figuerer
    engel.style.visibility = "hidden";
    djevel.style.visibility = "hidden";
}

//Brukes når man bytter fra start til nivå, eller nivå til nivå
function restartAlt(){
    engel = document.getElementById("e1");
    djevel = document.getElementById("d1");
    clearInterval(intervallId)
    harStartet = false
    intervalVarighet = 2000; 


    //Skjuler figuerer
    engel.style.visibility = "hidden";
    djevel.style.visibility = "hidden";
    score = 0
    highScore = 0
    document.getElementById("score").innerHTML = score;
    currentNivå = ""

}


document.addEventListener("DOMContentLoaded", function() {

    engel = document.getElementById("e1")
    djevel = document.getElementById("d1")


    //Hvis man klikker blomst får man poeng
    engel.addEventListener("click", function() {
        score += 100
        if (score > highScore){ //sjekker om score nå er større enn vi har fått til nå
            highScore = score
        }
        document.getElementById("score").innerHTML = score;
        harStartet = true
    });

    //Hvis man trykker planete dør man
    djevel.addEventListener("click", function() {
        gameOver()
    });


});






