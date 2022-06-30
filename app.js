const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses ,corrects = [],incorrects = [];

function randomWorld() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)]
    word = ranObj.word; 
    maxGuesses = 8; corrects = []; incorrects = [];
    console.log(word)

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += ` <input type="text" disabled>`;        
    }
    inputs.innerHTML = html;
}

randomWorld();

function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`) && !corrects.includes(key)) {
        console.log(key);
        if(word.includes(key)) { 
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }                
            }
        } else {
            maxGuesses--; 
            incorrects.push(`${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";

   setTimeout(() => {
    if(corrects.length === word.length) {
        alert(`Congrats! You found the word ${word.toUpperCase()}`);
        randomWorld(); 
        }
        else if(maxGuesses <1) { 
            alert("Game over! You don't have remaining guesses");
            for (let i = 0; i < word.length; i++) {         
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
   });
}

resetBtn.addEventListener("click", randomWorld);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", ()=>typingInput.focus()); 
document.addEventListener("keydown", ()=>typingInput.focus());