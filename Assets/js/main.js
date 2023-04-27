// FUNCTIONS

// Click on Play Button
function startGame() {

    console.log("click on start game btn");

    // Variables
    const gameLevel = Number(document.getElementById('level').value);
    gameSize = Math.sqrt(gameLevel);   
    const gridClasses = ['dFlex', 'justyCenter', 'alignCenter', 'fWrap', 'border'];
    const boxClasses = ['dFlex', 'justyCenter', 'alignCenter', 'pad1em', 'border', 'box', 'cPointer'];
    const grid = createElement("div", "grid", `${gridClasses.join(" ")}`, "");

    // Create Array (bomb) with 16 Different Random Numbers
    while (bomb.length < 16) {
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
        box.style.width = `calc( 100% / ${gameSize})`;
        box.style.height = `calc( 100% / ${gameSize})`;

        // Add Boxes inside Grid
        grid.append(box);

        // Click on single Boxes
        box.addEventListener("click", function() {

            // Check for bombs
            if (bomb.includes(stamp)) {

                // If the box contains a bomb
                this.classList.add('boxBoom');
                console.warn("A bomb exploded! Click on box number:", stamp);
                this.innerText = "💣";
                this.style.fontSize = "22px";
        
            } else {

                // If the box doesn't contain a bomb
                this.classList.toggle('boxClicked');
                console.log("Click on box number:", stamp);
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

// VARIABLES
const btnPlay = document.getElementById('playGame');
const gridSec = document.getElementById('gridSec');
let gameSize;
let box;
let bomb = [];

// EVENTS
btnPlay.addEventListener("click", startGame);


// Da inserire a fine partita
let Score = (document.querySelectorAll(".boxClicked").length) - 1
