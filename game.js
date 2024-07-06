function getComputerChoice() {
    let i = Math.random();

    if (i <= 0.33) {
        return "rock";
    }

    else if (i <= 0.66) {
        return "paper";
    }

    else {
        return "scissors";
    }
}


let humanScore = 0;
let computerScore = 0;

let playerChoices = [];
let computerChoices = [];
let gameScores = { humanScore: 0, computerScore: 0 };

// Función para deshabilitar los botones de opción
function disableOptionButtons() {
    btns.forEach((btn) => {
        btn.disabled = true; // Deshabilita el botón
    });
}

// Función para habilitar los botones de opción
function enableOptionButtons() {
    btns.forEach((btn) => {
        btn.disabled = false; // Habilita el botón
    });
}

function playGame(humanChoice) {
    
    let playerBoard = document.querySelector("#player-score");
    let computerBoard = document.querySelector("#computer-score");
    
    let computerChoice = getComputerChoice();
    playerChoices.push(humanChoice);
    computerChoices.push(computerChoice);
    
    if ((humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "scissors" && computerChoice === "paper")) {
        gameScores.humanScore++;
    } else if (humanChoice === computerChoice) { 

    } else {
        gameScores.computerScore++;
    };
    
    playerBoard.textContent = `Your Score: ${gameScores.humanScore}`;
    computerBoard.textContent = `Computer Score: ${gameScores.computerScore}`;
    
    if (gameScores.humanScore >= 5 || gameScores.computerScore >= 5) {
        let scoreBoard = document.createElement("div");
        let winnerMessage = document.createElement("h3");
        winnerMessage.setAttribute("id", "winner-message")
        
        if (gameScores.humanScore > gameScores.computerScore) {
            winnerMessage.textContent = "¡Eres el ganador!";
        } else {
            winnerMessage.textContent = "¡Has perdido!";
        };
        
        scoreBoard.appendChild(winnerMessage);
        document.body.appendChild(scoreBoard);
        disableOptionButtons();
        
        let resetBtn = document.createElement("button")
        resetBtn.classList.add("reset-button")
        resetBtn.textContent = "Reiniciar Juego"; // Añade texto al botón de reinicio
        document.body.appendChild(resetBtn)

        resetBtn.addEventListener("click", resetGame)
    }
};

function resetGame() {
    let playerBoard = document.querySelector("#player-score");
    let computerBoard = document.querySelector("#computer-score");

    enableOptionButtons(); // Habilita los botones de opción
    gameScores.humanScore = 0; // Restablece el puntaje humano
    gameScores.computerScore = 0; // Restablece el puntaje del computador
    playerBoard.textContent = `Your Score: ${gameScores.humanScore}`; // Actualiza el tablero
    computerBoard.textContent = `Computer Score: ${gameScores.computerScore}`; // Actualiza el tablero

    let winnerMessage = document.querySelector("#winner-message");
    if (winnerMessage) winnerMessage.remove(); // Elimina el mensaje de ganador si existe

    document.body.removeChild(document.querySelector(".reset-button")); // Elimina el botón de reinicio
};


let btns = document.querySelectorAll(".option-button");

btns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        let buttonId = event.currentTarget.id;
        playGame(buttonId);

    });
});
