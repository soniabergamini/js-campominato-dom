// FUNCTIONS

// Click on Play Button
function startGame() {

    console.log("click on start game btn");

    // Variables
    gameON = true;
    const gameLevel = Number(document.getElementById('level').value);
    const gridClasses = ['dFlex', 'justyCenter', 'alignCenter', 'fWrap', 'border'];
    const boxClasses = ['dFlex', 'justyCenter', 'alignCenter', 'pad1em', 'border', 'box', 'cPointer'];
    const grid = createElement("div", "grid", `${gridClasses.join(" ")}`, "");
    gameSize = Math.sqrt(gameLevel);    

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

            this.classList.toggle('boxClicked');
            console.log("Click on box number:", stamp);

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
    // console.log(element);

    return element;

}

// VARIABLES
const btnPlay = document.getElementById('playGame');
const gridSec = document.getElementById('gridSec');
let gameSize = 10;
let box;
let gameON = false;

// EVENTS
btnPlay.addEventListener("click", startGame);
