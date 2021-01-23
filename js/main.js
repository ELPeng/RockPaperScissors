let playerWins = 0
let compWins = 0	
const userRock = document.querySelector('#user-rock')
const userPaper = document.querySelector('#user-paper')
const userScissors = document.querySelector('#user-scissors')
let playerScore = document.querySelector('#player-score')
let compScore = document.querySelector('#comp-score')
let roundOutcome = document.querySelector('#round-outcome')  
let userSelect = ''
let endFlag = false

//Set user selection based on which image is clicked and calls function playRound to report winner of the round
userRock.addEventListener('click', function(){
    if(endFlag)
        return  
    userSelect = 'Rock'
    playRound(userSelect, computerPlay())
})
userPaper.addEventListener('click', function(){
    if(endFlag)
        return  
    userSelect = 'Paper'
    playRound(userSelect, computerPlay())
})
userScissors.addEventListener('click', function(){
    if(endFlag)
        return  
    userSelect = 'Scissors'
    playRound(userSelect, computerPlay())
})

//This function highlights and returns the computer's randomized selection 
function computerPlay(){
    let randomRPS = Math.ceil(Math.random()*3)
    switch (randomRPS){
        case 1: 
            refreshBorders()
            document.getElementById('comp-rock').style.borderColor = 'orange'
            return 'Rock'
        case 2: 
            refreshBorders()
            document.getElementById('comp-scissors').style.borderColor = 'orange'
            return 'Scissors'
        case 3: 
            refreshBorders()
            document.getElementById('comp-paper').style.borderColor = 'orange'
            return 'Paper'        
    }
}

//This function compares the player selection to the computer selection and returns the outcome, then updates the score to reflect the completed round.
function playRound(playerSelection, computerSelection){
    if(playerSelection == computerSelection){
        roundOutcome.textContent = `Draw, please play again. The current score is ${playerWins} to ${compWins}.`
    }
    else if (playerSelection == "Rock" && computerSelection == "Scissors" || playerSelection == "Scissors" && computerSelection == "Paper" || playerSelection == "Paper" && computerSelection == "Rock"){
        playerWins++
        roundOutcome.textContent = `You Win! ${playerSelection} Beats ${computerSelection}! The current score is ${playerWins} to ${compWins}.` 
        updateScore()    
    }
    else {
        compWins++
        roundOutcome.textContent = `You Lose! ${computerSelection} Beats ${playerSelection}! The current score is ${playerWins} to ${compWins}.`
        updateScore()
    }
}

//This function displays the updated score and final match details if the player or computer reaches a total score of 5.
function updateScore(){
    playerScore.textContent = playerWins
    compScore.textContent = compWins
    if(playerWins == 5 || compWins == 5){
        userRock.classList.remove('player-img-active')
        userPaper.classList.remove('player-img-active')
        userScissors.classList.remove('player-img-active')
        endFlag = true
        if (playerWins > compWins)
            document.querySelector('#match-outcome').textContent =`The Final Score is ${playerWins} : ${compWins} Player Wins!`      
        else
            document.querySelector('#match-outcome').textContent =`The Final Score is ${playerWins} : ${compWins} Computer Wins!`     
        endGame()
    }
}

function refreshBorders(){
    document.querySelectorAll('.comp-img').forEach(x => x.style.borderColor = 'black')
}
function endGame(){
    const btn = document.createElement('button')
    btn.innerHTML = 'Play Again?'
    document.body.appendChild(btn) 
    btn.addEventListener('click', clearScore)
}

//when the 'Play Again' button is pressed, scores are cleared and game is reset
function clearScore(){
    userRock.classList.add('player-img-active')
    userPaper.classList.add('player-img-active')
    userScissors.classList.add('player-img-active')
    endFlag = false
    roundOutcome.textContent = ''
    document.getElementById('match-outcome').textContent = ''
    document.querySelector('button').remove()
    playerWins = 0
    compWins = 0
    refreshBorders()
    updateScore()
}

