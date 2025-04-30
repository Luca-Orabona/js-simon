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




let generatedNumbers = [];


// evento al click del bottone GENERA NUMERI
btnGenNumElem.addEventListener("click", function () {

    gameRulesElem.classList.add("d-none");
    numRandomElem.classList.remove("d-none");
    btnGenNumElem.classList.add("d-none");

    // ciclo numeri random
    generatedNumbers = [];
    
    for (let i = 0; i < arrayNumRandomElem.length; i++) {
        
        const num = Math.floor(Math.random() * 100) + 1;
        
        arrayNumRandomElem[i].innerText = num;
        generatedNumbers.push(num);
    }
    

    // intevallo timer
    let progress = 0;

    const intervalId = setInterval(function () {

        if (progress < 2) {

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


// evento al click submit form
userForm.addEventListener("submit", eventForm);

function eventForm(event) {
    event.preventDefault();

    mesEndGame.classList.remove("d-none");

// prelevo i valori input
const primo = primoInput.value;
const secondo = secondoInput.value;
const terzo = terzoInput.value;
const quarto = quartoInput.value;
const quinto = quintoInput.value;

const strNumUser = `${primo} ${secondo} ${terzo} ${quarto} ${quinto}`

const arrayNumUser = strNumUser.split(" ");



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


mesEndGame.innerHTML = `Hai individuato ${contNum} numeri! (${numTrovati.join(", ")})`;

}