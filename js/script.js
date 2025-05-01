// prelevo gli elementi del DOM al click del BOTTONE GENERA NUMERI
const timerElem = document.getElementById("timer");
const numRandomElem = document.getElementById("numbers-random");
const arrayNumRandomElem = document.querySelectorAll("#numbers-random li");
const gameRulesElem = document.querySelector(".game-rules");
const btnGenNumElem = document.getElementById("btn-gen-numbers");

// prelevo gli elementi del DOM per la fine del TIMER
const userForm = document.getElementById("user-form")

// prelevo gli elementi input del DOM
const primoInput = document.getElementById("number1");
const secondoInput = document.getElementById("number2");
const terzoInput = document.getElementById("number3");
const quartoInput = document.getElementById("number4");
const quintoInput = document.getElementById("number5");
const btnFormUser = document.getElementById("btn-form-user");

// prelevo elemento messaggio fine gioco
const mesEndGame = document.getElementById("message-end-game");



// VARIABILE PER SALVARE A LIVELLO GLOBALE I NUMERI RANDOM
// PER CONFRONTARLI CON I NUMERE DELL'UTENTE
let generatedNumbers = [];


/*********** EVENTO AL CLICK PER IL BOTTONE GENERA NUMERI *************/
btnGenNumElem.addEventListener("click", function () {


    gameRulesElem.classList.add("d-none");
    numRandomElem.classList.remove("d-none");
    btnGenNumElem.classList.add("d-none");


    // VARIABILE PER SALVARE E AGGGIORNARE A LIVELLO BLOCK I NUMERI RANDOM
    generatedNumbers = [];


    // utilizzo il ciclo while per evitare duplicati nei numeri random.
    // Non uso il ciclo for perchè se trovo un numero che è già incluso, 
    // il for va avanti "incrementa" (potrei quindi trovarmi con meno di 5 numeri) 
    // mentre con while se è già incluso, mi genera i numeri fin quando 
    // non trova un numero non incluso e poi "incrementa".
    let i = 0;
    while ( i < arrayNumRandomElem.length) {
        
        const num = Math.floor(Math.random() * 100) + 1;

        if (!generatedNumbers.includes(num)) {

            arrayNumRandomElem[i].innerText = num;
            generatedNumbers.push(num);
            i++
        }

    }
    
    
    

    // VARIABILE PER IL CONTEGGIO DEI SECONDI
    let progress = 0;

    // intevallo timer
    const intervalId = setInterval(function () {

        if (progress < 30) {

            progress++
            timerElem.innerHTML = progress;

        } else {

            clearInterval(intervalId);
            timerElem.innerHTML = "0";
            userForm.classList.remove("d-none");
            numRandomElem.classList.add("d-none");
        }
    }, 1000);

});



// VARIABILE FLAG (PER IL RESET)
let btnReset = false;

/***********  EVENTO AL CLICK SUBMIT FORM ************/
userForm.addEventListener("submit", eventForm);

function eventForm(event) {
    event.preventDefault(); // funzione per togliere l'aggiornamento
                            // automatico al click del bottone submit


    // condizione per attivare/non attivare il reset                        
    if (btnReset) {

        resetGame()

        return
    }


// cambio il bottone "conferma" in "RIPROVA!"
btnFormUser.innerHTML = "Riprova!";
btnFormUser.classList.add("btn-success");


// prelevo i valori input
const primo = primoInput.value;
const secondo = secondoInput.value;
const terzo = terzoInput.value;
const quarto = quartoInput.value;
const quinto = quintoInput.value;


// array dei numeri dell'utente
const arrayNumUser = [primo, secondo, terzo, quarto, quinto];


// ciclo per confronto numeri USER & RANDOM
let contNum = 0;
let numTrovati = [];

for (let i = 0; i < arrayNumUser.length; i++) {

    let curArrayNumUser = parseInt(arrayNumUser[i]);
    if (generatedNumbers.includes(curArrayNumUser) && !numTrovati.includes(curArrayNumUser)) {
        contNum++;
        numTrovati.push(curArrayNumUser);
    }
    
}

// attivo il messaggio di fine gioco
mesEndGame.classList.remove("d-none");
mesEndGame.innerHTML = `Hai individuato ${contNum} numeri! (${numTrovati.join(", ")})`;

// cambio la variabile flag in true.
// così al secondo click parte il reset
btnReset = true;

}



// FUNZIONE PER IL RESET
function resetGame() {

    // cambio la variabile flag in false.
    // così al click ripartono le regole senza attivare il reset
    btnReset = false;

    // reset gli elementi per tornare all'inizio del gioco
    userForm.classList.add("d-none");
    gameRulesElem.classList.remove("d-none");
    btnGenNumElem.classList.remove("d-none");

    // reset i valori del form
    userForm.reset(); 


    // reset i numeri random
    for (let i = 0; i < arrayNumRandomElem.length; i++) {
        
        arrayNumRandomElem[i].innerText = ""; 
    }

    // ripristino del bottone CONFERMA
    btnFormUser.innerHTML = "Conferma";
    btnFormUser.classList.remove("btn-success");


    // reset del messaggio finale
    mesEndGame.classList.add("d-none");
    mesEndGame.innerHTML = "";

}