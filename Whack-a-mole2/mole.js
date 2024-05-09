let engel;
let djevel;
let sisteTall = -1;
let piper = [];
let score = 0;
let timer;
let intervallId;
let intervalVarighet = 2000; // Initial interval duration

function oppstart() {
    intervallId = setInterval(engelNaa, intervalVarighet);
    piper1 = document.getElementsByClassName("pipe1");
    piper2 = document.getElementsByClassName("pipe2")
    console.log(piper);
}
/*function visStart() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('tutorial').style.display = 'block';
}*/

function visNivå(nivå) {
    // Skjul alle nivåer
    document.getElementById('nivå1-innhold').style.display = 'none';
    document.getElementById('nivå2-innhold').style.display = 'none';
    document.getElementById('startside').style.display = 'none';
    //document.getElementById('start').style.display = 'none';
    // Vis valgt nivå
    document.getElementById(nivå + '-innhold').style.display = 'block';
    // Start riktig funksjonalitet for det valgte nivået
    if (nivå === 'nivå1') {
        startNivå1();
    }
    else if (nivå === 'nivå2') {
        startNivå2();
    }
}

function visStart(start){
    // Skjul alle nivåer
    document.getElementById('nivå1-innhold').style.display = 'none';
    document.getElementById('nivå2-innhold').style.display = 'none';
    //document.getElementById('startside').style.display = 'none';
    
    // Vis valgt startside
    if (start === 'tutorial') {
        document.getElementById(start+'innhold').style.display = 'block';
    }
    // Start riktig funksjonalitet for den valgte starten
    if (start === 'start') {
        startStart();
    }
}

function randomBrikke() {
    let ind;
    do {
        ind = Math.floor(Math.random() * piper.length);
    } while (ind === sisteTall);
    sisteTall = ind;
    return piper[ind];
}

function startNivå1() {
    document.getElementById('brett1').innerHTML = '';
    let brett1 = document.getElementById('brett1');
 
}

function startNivå2() {

    document.getElementById('brett2').innerHTML = '';
    let brett2 = document.getElementById('brett2');
}

function startStart(){
    document.getElementById('tutorial').innerHTML = '';
    let brett2 = document.getElementById('tutorial');
}

function gameOver() {
    
    // Henter game over boksen og gjør den synlig
    let gameOverBox = document.getElementById("game-over-box");
    gameOverBox.style.display = "block";
    let rundeScoreSpan = document.getElementById("rundeScore");
    rundeScoreSpan.textContent = score;

    // Henter highscore tabellen og legger til ny rad
    let table = document.getElementById("score-table");
    let newRow = table.insertRow(-1); 
    let cell1 = newRow.insertCell(0); 
    let cell2 = newRow.insertCell(1); 
    let currentDate = new Date();
    cell1.textContent = currentDate.toLocaleTimeString() 
    cell2.textContent = score ;
    //Stopper timer slik at figurNaa blir kalt
    clearInterval(intervallId)

    //Skjuler planter
    engel.style.visibility = "hidden";
    djevel.style.visibility = "hidden";
}