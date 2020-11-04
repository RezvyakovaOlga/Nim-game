//choosing mode
var randomModeBtn = document.getElementById ('randomMode')
var winningModeBtn = document.getElementById ('winningMode')
var winningMode
//for pregame selection
var rangeEnterEl = document.getElementById ('ChooseRange')
var sumEnterEl = document.getElementById ('ChooseSum')
var rangeOutputEl = document.getElementById ('RangeOutput')
var sumOutputEl = document.getElementById ('SumOutput')
var inputError = document.getElementById ('errorOutput')
var player
//for buttons
var choosingPlayerBtn = document.getElementById ('firstPlayerChoice')
var finishBtn = document.getElementById ('UserFinish')
var finishCompBtn = document.getElementById ('CompFinish')
//for game process
var isCompsTurn 
//for calculations
var playingSum = 0
var userInputEl = document.getElementById ('RandomUserNumber')
var randomCompNum
var count = 0
//for outputs
var whoIsFirst = document.getElementById ('WhoFirst')
var whichTurnDiv = document.getElementById ('WhichTurn')
var process = document.getElementById ('ProcessOutput')
var currentSumEl = document.getElementById ('CurrentSum')
var winner = document.getElementById ('WinnerOutput')

//disable choosing player btn
choosingPlayerBtn.disabled = true;

//checking range
function enteringParameters () {

    //empty inputs
    if (rangeEnterEl.value == "" || sumEnterEl.value == "") {
        inputError.innerText = "Please, enter your numbers"
    }

    //if the parameters are smaller than they must be
    else if (+sumEnterEl.value <= 5 || +rangeEnterEl.value < 1) {
        inputError.innerText = "The sum must be larger than 5, the last number of range must be larger than 1"  
    }

    //if the sum bigger than range
    else if (+sumEnterEl.value < +rangeEnterEl.value) {
        inputError.innerText = "The sum must be bigger than the last number of the range"
    }
    
    //if the parameters are integer
    else if (!Number.isInteger(+sumEnterEl.value) || !Number.isInteger(+rangeEnterEl.value)) {
        inputError.innerText = "The parameters must be integer"
    }
    
    //activate choosing player btn and show the entered parameters
    else {
        inputError.innerText = ""
        rangeOutputEl.innerText = "The range of numbers is from 1 to " + rangeEnterEl.value
        sumOutputEl.innerText = "The final sum is " + sumEnterEl.value
        choosingPlayerBtn.disabled = false
    }
    
}

//deciding who is the first player and starting game
function firstPlayer () {

    //generating random number for deciding who is first
    player = Math.floor (Math.random()*2+1)

    //activating play
    document.getElementById('PlayingField').style.display = "block";
    
    //user is first
    if (player === 1) {
        whoIsFirst.innerText = "You will be the first"
        isCompsTurn = false
        userTurn ()
    }
    
    //comp is first
    else {
        whoIsFirst.innerText = "The computer will be the first"
        isCompsTurn = true
        compTurn ()
    }

}

function userTurn () {

        whichTurnDiv.innerText = "It's your turn"

        //activate all user's input elements
        userInputEl.style.display = "block";    
        document.getElementById('InvisLab').style.display = "block";
        finishBtn.style.display = "block";    

    }

function compTurn () {

    whichTurnDiv.innerText = "It's computer's turn"

    //comp winning comp mode deactivated
    if (winningMode === false) {
        randomCompNum = Math.floor (Math.random() * +rangeEnterEl.value +1);
        playingSum += randomCompNum 
    }
    //comp winning mode
    else {
        count += 1
        randomCompNum = 10 * count - playingSum
        if (randomCompNum == 10) {
            // randomCompNum = Math.floor (Math.random() * 9 + 1);
            randomCompNum = 1
        }
        playingSum += randomCompNum 
    }

    //information about current sum and computer's choice
    process.innerText = "The computer's number is " + randomCompNum 
    currentSumEl.innerText = "The current sum is " + playingSum

    //activate ok btn
    finishCompBtn.style.display = "block";

    }

function userInput () {

    //comp winning mode deactivated
    if (winningMode === false) {

        //empty input
        if (userInputEl.value == "") {
            process.innerText = "Please, enter your numbers"
        }
    
        //if the parameters are in the range
        else if (+userInputEl.value < 1 || +userInputEl.value > +rangeEnterEl.value) {
            process.innerText = "Please enter the number in the range"  
        }
        
        //if the number is integer
        else if (!Number.isInteger(+userInputEl.value)) {
            process.innerText = "The number must be integer"
        }
        
        //calculation
        else {
            process.innerText = "Your number is " + userInputEl.value 
            playingSum += +userInputEl.value
            currentSumEl.innerText = "The current sum is " + playingSum  
        }
    }

    //comp winning mode 
    else {

        //empty input
        if (userInputEl.value == "") {
            process.innerText = "Please, enter your numbers"
        }
    
        //if the parameters are in the range
        else if (+userInputEl.value < 1 || +userInputEl.value > 9) {
            process.innerText = "Please enter the number in the range from 0 to 9"  
        }
        
        //if the number is integer
        else if (!Number.isInteger(+userInputEl.value)) {
            process.innerText = "The number must be integer"
        }
        
        //calculation
        else {
            process.innerText = "Your number is " + userInputEl.value 
            playingSum += +userInputEl.value
            currentSumEl.innerText = "The current sum is " + playingSum  
        }
    }
}

//continue game
function continueGame () {

    //comp turn
    if (isCompsTurn === true) {

        //comp winning mode is deactivated
        if (winningMode === false) {
        
                //check if the comp wins
                if (playingSum < +sumEnterEl.value) {

                //passing turn to the user
                isCompsTurn = false

                //deactivate ok btn 
                finishCompBtn.style.display = "none";

                //clearing users input
                userInputEl.value = ""

                userTurn ()

        }

            //comp is the winner
            else {
                winner.innerText = "The computer is the winner! Try again"
            }
        }
        //comp winning mode
        else {
            //check if the comp wins
            if (playingSum < 100) {

                //passing turn to the user
                isCompsTurn = false

                //deactivate ok btn 
                finishCompBtn.style.display = "none";

                //clearing users input
                userInputEl.value = ""

                userTurn ()

            }

            //comp is the winner
            else {

                winner.innerText = "The computer is the winner! Try again"

            }
        }
    }

    //user turn
    else {

        //comp winning mode deactivated
        if (winningMode === false) {

            if (userInputEl.value == "" || +userInputEl.value < 1 || +userInputEl.value > +rangeEnterEl.value || Number.isInteger(+userInputEl.value) !== true) {
                process.innerText = "You didn't enter a number right. Try again"
            }
    
            else {
    
                //check if the user wins
                if (playingSum < +sumEnterEl.value) {
    
                //passing turn to the comp
                isCompsTurn = true
    
                //deactivate all user's elements
                finishBtn.style.display = "none";
                userInputEl.style.display = "none";
                document.getElementById('InvisLab').style.display = "none";
    
                compTurn ()
                }  
    
                //user is the winner
                else {
                    winner.innerText = "You're the winner! Congratulations!"
                    }
            
            }
        }

        //comp winning mode
        else {
            
            if (userInputEl.value == "" || +userInputEl.value < 1 || +userInputEl.value > 9|| Number.isInteger(+userInputEl.value) !== true) {
                process.innerText = "You didn't enter a number right. Try again"
            }
            else {
    
                //check if the user wins
                if (playingSum < 100) {
    
                //passing turn to the comp
                isCompsTurn = true
    
                //deactivate all user's elements
                finishBtn.style.display = "none";
                userInputEl.style.display = "none";
                document.getElementById('InvisLab').style.display = "none";
    
                compTurn ()
                }  
    
                //user is the winner
                else {
                    winner.innerText = "You're the winner! Congratulations!"
                    }
                }
        }
    }
}

function enterChooseBtn (event) {
    if (event.keyCode === 13) 
    choosingPlayerBtn.click()
}

function enterFinishBtn (event) {

    if (event.keyCode === 13) 
    finishBtn.click()

}

//functions for showing playing fields and deactivating another mode btn
function activateRandomMode () {
    document.getElementById ('randomModeField').style.display = "block";
    document.getElementById ('fieldForBoth').style.display = "block";
    winningModeBtn.disabled = true;
    winningMode = false
}

function activateWinningMode () {
    document.getElementById ('fieldForBoth').style.display = "block";
    randomModeBtn.disabled = true;
    choosingPlayerBtn.disabled = false;
    winningMode = true
}

randomModeBtn.addEventListener ('click', activateRandomMode)
winningModeBtn.addEventListener ('click', activateWinningMode)

rangeEnterEl.addEventListener ('input', enteringParameters)
sumEnterEl.addEventListener ('input', enteringParameters)

rangeEnterEl.addEventListener ('keyup', enterChooseBtn)
sumEnterEl.addEventListener ('keyup', enterChooseBtn)

choosingPlayerBtn.addEventListener ('click', firstPlayer)

userInputEl.addEventListener ('input', userInput)
userInputEl.addEventListener ('keyup', enterFinishBtn)
finishBtn.addEventListener ('click', continueGame)
finishCompBtn.addEventListener ('click', continueGame)