import {Bet} from './bet.js';
import * as utility from './utility.js';


/* Runs when the page is loaded */
document.addEventListener("DOMContentLoaded", function() {
    let path = window.location.pathname
    let fileName = path.substring(path.lastIndexOf('/') + 1); // Find current page and assign to fileName
    if (fileName === 'play.html') {
        startNewGame();
        // Add liar's dice game event listeners
        document.getElementById('bet-form').addEventListener('submit', handleBet);
        document.getElementById('call-button').addEventListener('click', () => {callGame('player')});
        document.getElementById('next-turn').addEventListener('click', handleNextTurn);
        document.getElementById('pip-selector').addEventListener('change', handlePipChange)
    }
    accountForHeader(fileName);
    window.addEventListener("resize", () => {accountForHeader(fileName)});
});

/**
 * Adjusts the offset of the main section of the page to account
 * for different header sizes on different devices.
 * On play.html, gives extra padding-top.
 * @param {string} page The page being loaded (e.g index.html).
 */
function accountForHeader(page) {
    let height = document.getElementsByTagName('header')[0].offsetHeight;
    height += page === 'play.html' && window.screen.width >= 768 ? 50 : 15;
    document.getElementsByTagName('main')[0].style.paddingTop = `${height}px`;
}

/**
 * Starts a new game of Liar's Dice.
 */
function startNewGame() {
    document.getElementById('current-bet').setAttribute('last-winner', '');
    populateHand('player-hand', 6);
    populateHand('opponent-hand', 6);
    updateBetOptions();
    document.getElementById('next-turn').textContent = 'Next turn';
}

/**
 * Populates the player or opponent's hand with dice.
 * @param {string} hand the hand which should be populated - 'player-hand' or 'opponent-hand'.
 * @param {integer} dieNumber the number of dice which should be added.
 */
function populateHand(hand, dieNumber) {
    let cachedHand = document.getElementById(hand);
    cachedHand.setAttribute('dice', dieNumber);
    cachedHand.innerHTML = ""; // If any dice currently in hand, then remove them
    // Generate dice
    for(let i = 0; i < dieNumber; i++) {
        let newDie = document.createElement('img');
        let dieNumber = utility.generateDiceNumber();
        newDie.setAttribute('pips', dieNumber);
        newDie.style.padding = '10%';
        newDie.style.width = '100%';
        newDie.style.objectFit = 'contain';
        newDie.alt = dieNumber == 1 ? `A playing die with ${dieNumber} pip` : `A playing die with ${dieNumber} pips`;
        newDie.src = hand == 'player-hand' ? utility.getDiceImage(dieNumber) : 'assets/images/dice-faces/dice-unknown.webp';
        cachedHand.appendChild(newDie);
    }
}

/**
 * Handles the submission of the bet form.
 * @param {*} event The callback event.
 */
function handleBet(event) {
    event.preventDefault();
    document.getElementById('call-button').disabled = false;
	new Bet(document.getElementById('quantity-selector').value, document.getElementById('pip-selector').value).updateCurrentBet();
    createOpponentResponse();
    updateBetOptions();
}

/**
 * Handles the change of the pip value in the pip selector.
 * If the pip value is higher than the current bet, adds the current quantity
 * as an option to the quantity selector. If the pip value goes lower again,
 * removes the current quantity.
 */
function handlePipChange(){
    let currentBet = document.getElementById('current-bet');
    let quantitySelector = document.getElementById('quantity-selector');
    let pipSelector = document.getElementById('pip-selector');
    let firstTurn = currentBet.getAttribute('quantity') == 0;
    let current = false;
    for (let option of quantitySelector.children) {
        if (option.value == currentBet.getAttribute('quantity')) {
	        current = option;
            break;
        }
    }
    let shouldHaveCurrent = parseInt(pipSelector.value) > parseInt(currentBet.getAttribute('pips'));
    // If the selector has the current quantity but shouldn't do, remove it
    if (current && !shouldHaveCurrent && !firstTurn) {
	    quantitySelector.remove(current);
    }
    // If the selector doesn't have the current quantity but should do, add it
    if (!current && shouldHaveCurrent  && !firstTurn) {            
	    let newOption = document.createElement('option');
        newOption.value = newOption.innerHTML = currentBet.getAttribute('quantity');
        quantitySelector.insertBefore(newOption, quantitySelector.firstChild);
    }
}

/**
 * 'Calls' the game, revealing all dice and the winner of the round.
 * @param {string} caller Either 'player' or 'opponent', the player who called the game.
 */
function callGame(caller) {
    endTurn();
    let playerHand = document.getElementById('player-hand');
    let opponentHand = document.getElementById('opponent-hand');
    let currentBet = document.getElementById('current-bet');
    if (caller === 'opponent') {
        utility.updateOpponentResponseMessage('The computer has called!');
    }
    let bothHandsDiceArray = utility.returnDiceArray('player-hand') + utility.returnDiceArray('opponent-hand')
    let allPipsObject = utility.tallyPipTotals(bothHandsDiceArray);
    let pipOccurrences = allPipsObject[currentBet.getAttribute('pips')]; // Pip occurrences is the total times the current pip appears
    if (pipOccurrences === undefined) {
        pipOccurrences = 0;
    }
    let betIsCorrect = currentBet.getAttribute('quantity') <= pipOccurrences;
    if ((caller == 'player' && !betIsCorrect) || (caller == 'opponent' && betIsCorrect)) {
        currentBet.setAttribute('last-winner', 'player');
        opponentHand.setAttribute('dice', opponentHand.getAttribute('dice')-1);
    } else {
        currentBet.setAttribute('last-winner', 'opponent');
        playerHand.setAttribute('dice', playerHand.getAttribute('dice')-1);
    }
    document.getElementById('outcome-text').innerHTML = utility.constructOutcomeText(caller, betIsCorrect, pipOccurrences);
    checkForGameFinish();
}

/**
 * Create a response from the opponent (either a new bet or calling the game).
 */
function createOpponentResponse() {
    let currentBet = document.getElementById('current-bet');
    let randomNum = Math.random();
    let confidence = 0.47; // How likely the computer is to refrain from calling based on how its dice match the bet
    let scepticism = 0.51; // How likely the computer is to call based on the overall dice quantity
    // Determine likelihood of calling based on dice currently on board
    let totalPipTally = utility.tallyPipTotals(utility.returnDiceArray('opponent-hand'));
    let highestPip = utility.findHighestPipTotal(totalPipTally);
    if (currentBet.getAttribute('quantity') > 2) {
        randomNum += (currentBet.getAttribute('quantity')-2) * (scepticism/3);
    }
    if (currentBet.getAttribute('pips') == highestPip[0]) {
        randomNum -= (highestPip[1]*(confidence/3));
    }
    let lastWinner = currentBet.getAttribute('last-winner') === "player";
    currentBet.setAttribute('last-winner', '');
    // Call game or make bet 
    if (randomNum > 0.9 && !lastWinner) {
        callGame('opponent');
        return;
    }
    let newBet = generateNewBet(highestPip[0], lastWinner);
    // Update the board
    newBet.updateCurrentBet();
    utility.updateOpponentResponseMessage(`The computer has bet ${newBet.quantity} dice with ${newBet.pips} pips.`);
}

/**
 * Generates a potential new bet using knowledge of a hand.
 * @param {number} highestPipNum The pip that occurs most in the hand.
 * @param {Boolean} firstBet Whether or not this is the first bet in the round.
 * @returns {Bet} The potential new bet.
 */
function generateNewBet(highestPipNum, firstBet) {
    let newBet = new Bet(0, 0);
    let randomNum = Math.random();
    let currentBet = document.getElementById('current-bet');
    // Pick the pip number
    if (randomNum < 0.5) {
        newBet.pips = highestPipNum;
    } else {
        newBet.pips = firstBet ? utility.generateDiceNumber() : currentBet.getAttribute('pips');
    }
    // Pick quantity
    if (newBet.pips > currentBet.getAttribute('pips')) {
        newBet.quantity = firstBet ? 2 : currentBet.getAttribute('quantity');
    } else {
        newBet.quantity = firstBet ? 2 : parseInt(currentBet.getAttribute('quantity')) + 1;
    }
    return newBet;
}

/**
 * Checks the hands to see if either has ran out of dice.
 * If so, outputs the end game message and updates the 'next turn' button to 'Start New Game'.
 */
function checkForGameFinish() {
    let playerLost = document.getElementById('player-hand').getAttribute('dice') <= 0;
    let opponentLost = document.getElementById('opponent-hand').getAttribute('dice') <= 0;
    let outcomeTextContent = document.getElementById('outcome-text').innerHTML;
    if (playerLost) {
        document.getElementById('outcome-text').innerHTML = `${outcomeTextContent} You have ran out of dice so you have lost
        the game! Better luck next time.`
    }
    if (opponentLost) {
        document.getElementById('outcome-text').innerHTML = `${outcomeTextContent} The computer has ran out of dice so you have
        won the game! Well done.`
    }
    document.getElementById('next-turn').innerText = playerLost || opponentLost ? 'Start New Game' : 'Next turn';
}

/**
 * Ends the turn - 
 * reveals the opponent's dice, disables the bet form, and enables the 'next turn' button.
 */
function endTurn(){
    revealDice();
    document.getElementById('bet-button').disabled = true;
    document.getElementById('call-button').disabled = true;
    document.getElementById('quantity-selector').disabled = true;
    document.getElementById('pip-selector').disabled = true;
    document.getElementById('next-turn').disabled = false;
}

/** 
 * Reveal the opponent's dice.
 */
function revealDice() {
    let opponentHand = document.getElementById('opponent-hand');
    for (let die of opponentHand.children) {
        die.src = utility.getDiceImage(die.getAttribute('pips'));
    }
}

/**
 * Update the options the player has for betting in the bet form.
 */
function updateBetOptions(){
    let quantitySelector = document.getElementById('quantity-selector');
    document.getElementById('pip-selector').value = "";
    // Clear quantity selector options except for blank default
    quantitySelector.innerHTML = "<option class='hide' disabled selected value></option>";
    // Add new quantity selector options
    let quantity = parseInt(document.getElementById('current-bet').getAttribute("quantity"));
    if (quantity == 0) {
        quantity = 1; // If first turn of game, don't add an option for one die
    }
    for (let i = 1; i <= 4; i++) {
        let newOption = document.createElement('option');
        newOption.value = newOption.innerHTML = quantity + i;
        quantitySelector.appendChild(newOption);
    }
}

/**
 * Handles the next turn button.
 */
function handleNextTurn() {
    new Bet(0, 0).updateCurrentBet(); // Resets current bet
    utility.updateOpponentResponseMessage("The computer is awaiting your move.");
    document.getElementById('bet-button').disabled = false;
    document.getElementById('quantity-selector').disabled = false;
    document.getElementById('pip-selector').disabled = false;
    document.getElementById('next-turn').disabled = true;
    document.getElementById('outcome-text').innerHTML = "";
    let playerDice = document.getElementById('player-hand').getAttribute('dice');
    let opponentDice = document.getElementById('opponent-hand').getAttribute('dice');
    // If either player's hand is empty, restart the game
    if (opponentDice <= 0 || playerDice <= 0) {
        startNewGame();
        return;
    }
    populateHand('player-hand', playerDice);
    populateHand('opponent-hand', opponentDice);
    // Starts new round with opponent bet if player lost the last round
    if (document.getElementById('current-bet').getAttribute('last-winner') == 'player') {
        createOpponentResponse();
        document.getElementById('call-button').disabled = false;
    }
    updateBetOptions();
}