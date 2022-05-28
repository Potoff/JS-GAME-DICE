//Définition des constantes
//Récupération des boutons
const newGameBtn = document.querySelector('.newGameBtn')
const startGameBtn = document.querySelector('.startGame');
const holdAction = document.querySelector('.holdBtn');
const launchDiceBtn = document.querySelector('.launchDiceBtn');
const resetGame = document.querySelector('.resetGameBtn');
const endGame = document.querySelector('.endGameBtn');
//Récupération des fenêtres Modal
const rules = document.querySelector('.rules');
const namesChoice = document.querySelector('.names');
const game = document.querySelector('.game');
const victory = document.querySelector('.victory');
//Récupération des DIV de scores
//Player 1
const playerOneTotalScore = document.querySelector('.playerOneTotalScore');
const playerOneCurrentScore = document.querySelector('.playerOneCurrentScore');
const playerOneNamePlace = document.querySelector('.playerOneName');
const playerOneControlCard = document.querySelector('.playerOneControl');
//Player 2
const playerTwoTotalScore = document.querySelector('.playerTwoTotalScore');
const playerTwoCurrentScore = document.querySelector('.playerTwoCurrentScore');
const playerTwoNamePlace = document.querySelector('.playerTwoName');
const playerTwoControlCard = document.querySelector('.playerTwoControl');
//Variables de score Total
let totalScore = 0;
let totalScoreOne = 0;
let totalScoreTwo = 0;
//Variables de score courant
let currentScore = 0;
let currentScoreOne = 0;
let currentScoreTwo = 0;
//Variable current player
let currentPlayer = '';
//Function de transition des modales et appel de la fonction d'initialisation
newGameBtn.addEventListener('click', () => {
    rules.style.display = 'none';
    namesChoice.style.display = 'flex';
});

startGameBtn.addEventListener('click', () => {
    namesChoice.style.display = 'none';
    game.style.display = 'flex';
    initialize();
});

resetGame.addEventListener('click', ()=>{
    game.style.display ='none';
    rules.style.display ='flex';
    initialize();
});

endGame.addEventListener('click', ()=>{
    victory.style.display = 'none';
    rules.style.display = 'flex';
    initialize();
});

//Evenement au clique sur button Hold
holdAction.addEventListener('click', hold);

//Déclenchement du lancement de dès
launchDiceBtn.addEventListener('click', launchDice);


//Initialisation de la partie à 0 avec choix du nom des joueurs.
function initialize() {
    //Initialisation des current score et insertion dans le DOM
    playerOneCurrentScore.innerText = '0';
    playerTwoCurrentScore.innerText = '0';
    //IDEM avec totalScore
    playerOneTotalScore.innerText = '0';
    playerTwoTotalScore.innerText = '0';
    //Récupération des champs de choix de noms et leurs valeurs
    let playerOneName = document.querySelector('#playerOne').value;
    let playerTwoName = document.querySelector('#playerTwo').value;
    playerOneNamePlace.textContent = playerOneName;
    playerTwoNamePlace.textContent = playerTwoName;
    currentPlayer = 'playerOne';
    playerOneControlCard.classList.add('active');
};

//Function NextPlayer 
function nextPlayer() {
    if (currentPlayer === 'playerOne') {
        currentPlayer = 'playerTwo';
        playerOneControlCard.classList.remove('active');
        playerTwoControlCard.classList.add('active');

    } else if (currentPlayer === 'playerTwo') {
        currentPlayer = 'playerOne';
        playerTwoControlCard.classList.remove('active');
        playerOneControlCard.classList.add('active');
    };
    playerOneCurrentScore.textContent = '0';
    playerTwoCurrentScore.textContent = '0';
    currentScore = 0;
};

//Function du lancement du dès 
function launchDice() {
    let number = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    let dice = document.querySelector('.dice');
    dice.src = "./images/dice-" + number + ".png";

    if (number !== 1) {
        currentScore += number;
        if (currentPlayer === 'playerOne') {
            currentScoreOne = currentScore;
            playerOneCurrentScore.innerText = currentScoreOne;
        }
        if (currentPlayer === 'playerTwo') {
            currentScoreTwo = currentScore;
            playerTwoCurrentScore.innerText = currentScoreTwo;
        }

    }
    else {
        nextPlayer();
    }
};

//Function Hold
function hold() {
    if (currentPlayer === 'playerOne') {
        totalScoreOne += parseInt(playerOneCurrentScore.textContent);
        playerOneTotalScore.innerText = totalScoreOne;
    } else if (currentPlayer === 'playerTwo') {
        totalScoreTwo += parseInt(playerTwoCurrentScore.textContent);
        playerTwoTotalScore.innerText = totalScoreTwo;
    }

    if (totalScoreTwo >= 100 || totalScoreOne >= 100) {
        showVictory();
    }
    nextPlayer();

};

//Function apparition modal avec nom du vainqueur   
function showVictory() {
    game.style.display ='none';
    victory.style.display = 'flex';
    let victoryContent = document.querySelector('.victoryContent');
    if(currentPlayer === 'playerOne'){
        victoryContent.innerText = `Félicitations, c'est ${document.querySelector('#playerOne').value} qui gagne ! `
    } else {
        victoryContent.innerText = `Félicitations, c'est ${document.querySelector('#playerTwo').value} qui gagne ! `
    }   
};

