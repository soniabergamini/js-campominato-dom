// FUNCTIONS

// Click on Play/New Game Button
function startGame() {

    console.log("click on start game btn");
    resetGame();

    // Variables
    let bomb = [];
    const gameLevel = Number(document.getElementById('level').value);
    gameSize = Math.sqrt(gameLevel);   
    const gridClasses = ['dFlex', 'justyCenter', 'alignCenter', 'fWrap', 'border'];
    const boxClasses = ['dFlex', 'justyCenter', 'alignCenter', 'pad1em', 'border', 'box', 'cPointer'];
    const grid = createElement("div", "grid", `${gridClasses.join(" ")}`, "");

    // Create Array (bomb) with 16 Different Random Numbers
    while (bomb.length < bombTotal) {
        let randomNumber = getRandomNumber(1, gameLevel);
        if (bomb.indexOf(randomNumber) === -1) bomb.push(randomNumber); 
        // indexOf() is a method that returns -1 if the value is not found inside Array.
    }
    console.log("Box with bombs:", bomb);

    // ALTERNATIVE SOL: Create Array (bomb) with 16 Different Random Numbers with "Set"
    // bombSet = new Set([]);
    // while (bombSet.size !== 16) {
    //     bombSet.add(getRandomNumber(1, gameLevel));
    // }
    // bomb = Array.from(bombSet);
    // console.log("Box with bombs:", bomb);

    // Add Boxes inside Grid 
    for (let i = 0; i < gameLevel; i++) {

        // Create numbers from 1 to 100
        let stamp = i + 1

        // Create 100 Boxes
        box = createElement("div", "", `${boxClasses.join(" ")}`, `${stamp}`);
        if (bomb.includes(stamp)) {
            box.classList.add('bomb');
        } else {
            box.classList.add('noBomb');
        }
        box.style.width = `calc( 100% / ${gameSize})`;
        box.style.height = `calc( 100% / ${gameSize})`;

        // Add Boxes inside Grid
        grid.append(box);

        // Create Array All Boxes
        let allBoxes = []
        allBoxes = document.getElementsByClassName("box");

        // Click on single Boxes
        box.addEventListener("click", function boxClick() {

            // If game is not over
            if (gameIsOver == false) {

                // Check for bombs
                if (bomb.includes(stamp)) {

                    // If the box contains a bomb
                    this.classList.add('boxBoom');
                    console.warn("A bomb exploded! Click on box number:", stamp);
                    this.innerText = "💣";
                    this.style.fontSize = "22px";
                    grid.style.animation = "shake .2s";
                    grid.style.animationIterationCount = "5";
                    bombClick = true;

                } else {

                    // If the box doesn't contain a bomb
                    this.classList.toggle('boxClicked');
                    console.log("Click on box number:", stamp);
                }

                // Score and check if game is over
                scoring(gameLevel);
            }
        })
    }

    // Add Grid with Boxes inside DOM
    gridSec.innerHTML = "";
    gridSec.append(grid);

    // Chage Button Text
    btnPlay.innerText = "NEW GAME";
}

// Create HTML Elements
function createElement(tag, id, classes, content) {
    const element = document.createElement(tag);
    element.setAttribute("id", id);
    element.setAttribute("class", classes);
    element.innerText = (content);
    return element;
}

// Create Random Numbers
function getRandomNumber(min, max) {
    let number = Math.floor(Math.random() * (max - min + 1) + min );
    return number;
}

// View All Bomb
function viewBomb() {
    let allBombBoxes = document.getElementsByClassName("bomb");
    for (let i = 0; i < bombTotal; i++) {
        allBombBoxes[i].classList.add("boxBoom");
    }
}

// Score and Game Over
function scoring(size) {

    let score = document.querySelectorAll(".boxClicked").length;

    if (score == size - bombTotal || bombClick === true) {

        gameIsOver = true;
        
        // console.warn("Game Over. Score:", score)
        // Score
        msgScoring.innerText += score;
        msgScoring.classList.remove('dNone');
        msgGameOver.classList.remove('dNone');

        // Win or Lose
        if (bombClick === true) {
            viewBomb();
            msgGameOver.innerText += " - YOU LOSE 🫤";

        } else {
            msgGameOver.innerText += " - YOU WIN 🥳";
        }

        // Game Stop
        gameStop(size);
    }
}

// Stop the game after game over
function gameStop(size) {
    let allBoxes = []
    allBoxes = document.getElementsByClassName("box");
    for (let i = 0; i < size; i++) {
        allBoxes[i].classList.remove("cPointer");
        allBoxes[i].classList.add("gameStop");
    }
}

// Reset game to restart
function resetGame() {
    msgScoring.innerText = "Your Score: ";
    msgScoring.classList.add('dNone');
    msgGameOver.innerText = "GAME OVER";
    msgGameOver.classList.add('dNone');
    bombClick = false;
    gameIsOver = false;
}

// VARIABLES
const btnPlay = document.getElementById('playGame');
const gridSec = document.getElementById('gridSec');
const msgGameOver = document.querySelector("h3.gameOver");
const msgScoring = document.querySelector("span.gameOver");
const bombTotal = 16;
let gameSize;
let box;
let bombClick;
let gameIsOver = false;

// EVENTS
btnPlay.addEventListener("click", startGame);