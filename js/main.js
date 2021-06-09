
// Variables

let box = document.querySelectorAll(".box");

let red = document.querySelector(".red");
let green = document.querySelector(".green");
let blue = document.querySelector(".blue");
let yellow = document.querySelector(".yellow");

let success = document.querySelector(".success");
let fail = document.querySelector(".fail");

let currentScore = document.querySelector(".current-score");
let bestScore = document.querySelector(".best-score");
let roundDisplay = document.querySelector(".round");

let start = document.querySelector(".game-btn"); 
let reset = document.querySelector(".reset-btn");

let boxArr = ["red","green","blue","yellow"];
let computerArr = [];
let playerArr = [];

let playerTurnActive = false;

let round = 1;
let score = 0;
let maxScore = 0;

// Display the current value from round,score and maxScore

const displayText = () => {
    roundDisplay.innerHTML = round;
    currentScore.innerHTML = score;
    bestScore.innerHTML = maxScore; 
}

displayText();

// Generate random value from boxArr

const generateBox = () => {
    computerArr.push(boxArr[Math.floor(Math.random() * boxArr.length)]);
}

// Check the color parameter and add the active class to the box that includes that color
// Then remove the active class after a short period 

const activeColor = (color) => {
   
    if(color === "red"){
        color = red;
    }else if(color === "green"){
        color = green;
    }else if(color === "blue"){
        color = blue;
    }else if(color === "yellow"){
        color = yellow;
    }

    color.classList.add("active");

    setTimeout(() => {
        color.classList.remove("active");
    }, 500);
}

// Computer turn

const computerTurn = () => {
    
    let x = 0;
   
    start.disabled = true;
    reset.disabled = true;

    (function k(){
        generateBox();
        activeColor(computerArr[x]);       
        
        x++;
        
        if(x < round) {
            setTimeout( k, 1500 );
        }else {
            playerTurnActive = true;
            setTimeout(() => {
                start.disabled = false;
                reset.disabled = false;
            }, 700);
        }
    })()
}

// Loop through boxes and add click event on any of it

for(let i=0; i<box.length; i++){
   
    box[i].addEventListener("click", function(){
        addBox(this);
        checkResult();
    })

}

// Push the clicked box's class(color) to the player array

const addBox = (elem) => {
    if(!playerTurnActive) {
        return false;
    }

    playerArr.push(elem.classList[1]);
}

// Check if the computer array and player array have same elements
// Update score and round if they do and start another round with bigger difficulty
// Reset score and round if the arrays are not equal

const checkResult = () => {
    if(computerArr.length === playerArr.length && computerArr.join(",") === playerArr.join(",")){
       
        success.style.display = "block";

        playerArr = [];
        computerArr = [];
        score++;

        if(score > maxScore) {
            maxScore = score;
        }

        round++;

        displayText();
        setTimeout(() => {
            success.style.display = "none";
            computerTurn();
        }, 1500);

    }else if(computerArr.length === playerArr.length && computerArr.join(",") !== playerArr.join(",")) {
        
        fail.style.display = "block";
        
        setTimeout(() => {
            fail.style.display = "none";
        }, 1500);

        playerArr = [];
        computerArr = [];
        score = 0;
        round = 1;

        displayText();
    }
}

// Start and Reset buttons

const resetStats = () => {
    playerArr = [];
    computerArr = [];
    score = 0;
    round = 1;
}

start.addEventListener("click", () => {
    resetStats();
    displayText();
    computerTurn();
})

reset.addEventListener("click", () => {
    resetStats();
    maxScore = 0;
    displayText();
})