import {Bet} from './bet.js';
import * as utility from './utility.js';
import * as opponent from './opponent.js';

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
 * @param {string} page The page being loaded
 */
function accountForHeader(page) {
    let height = document.getElementsByTagName('header')[0].offsetHeight;
    height += page === 'play.html' && window.screen.width >= 768 ? 50 : 15;
    document.getElementsByTagName('main')[0].style.paddingTop = `${height}px`;
}

/**
 * Starts a new game of Liar's Dice.
 * Runs when play.html first loads and every time the game is restarted
 */
function startNewGame() {
    new Bet(0, 0).updateCurrentBet(); // Sets current bet to 'none'
    populateHand('player-hand', 6);
    populateHand('opponent-hand', 6);
    updateBetOptions();
    document.getElementById('next-turn').textContent = 'Next turn';
}

/**
 * Populates the player or opponent's hand with dice
 * @param {string} hand the hand which should be populated - 'player-hand' or 'opponent-hand'
 * @param {integer} dieNumber the number of dice which should be added
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
        newDie.style.margin = '20px';
        newDie.style.width = '20%';
        newDie.style.height = 'auto';
        newDie.style.objectFit = 'contain';
        newDie.src = hand == 'player-hand' ? utility.getDiceImage(dieNumber) : 'assets/images/dice-faces/dice-unknown.webp';
        cachedHand.appendChild(newDie);
    }
}

/**
 * Handles the submission of the bet form
 * @param {*} event The callback event 
 */
function handleBet(event) {
    event.preventDefault();
    document.getElementById('call-button').disabled = false;
	new Bet(document.getElementById('quantity-selector').value, document.getElementById('pip-selector').value).updateCurrentBet();
    opponent.createResponse();
    updateBetOptions();
}

/**
 * Handles the change of the pip value in the pip selector.
 * If the pip value is higher than the current bet, adds the current quantity
 * as an option to the quantity selector. If the pip value goes lower again, removes
 * the current quantity.
 */
function handlePipChange(){
    let currentBet = document.getElementById('current-bet');
    // If first turn of the game, exit function
    if (currentBet.getAttribute('quantity') == 0) {
        return;
    }
    let quantitySelector = document.getElementById('quantity-selector');
    let pipSelector = document.getElementById('pip-selector');
    // Check if the current bet quantity is currently an option of the quantity selector
    let containsCurrentQuantity = false;
    for (let option of quantitySelector.options) {
        if (option.value === currentBet.getAttribute('quantity')) {
            containsCurrentQuantity = true;
        }
    }
    /* If the currently selected pip is higher than current bet pip value, 
    add the quantity from current bet to quantity selector
    */
    if (parseInt(pipSelector.value) > parseInt(currentBet.getAttribute('pips'))) {
        // If current bet quantity not an option, add it
        if (!containsCurrentQuantity) {
            let newOption = document.createElement('option');
            newOption.value = currentBet.getAttribute('quantity');
            newOption.innerHTML = currentBet.getAttribute('quantity');
            quantitySelector.insertBefore(newOption, quantitySelector.firstChild);
        }
    } else {
        // If current bet quantity is already an option, remove it
        if (containsCurrentQuantity) {
            for (option of quantitySelector.options) {
                if (option.value == currentBet.getAttribute('quantity')) {
                    quantitySelector.remove(option);
                } 
            }
        }
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
        opponent.updateResponseMessage('The computer has called!');
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
 * Checks the hands to see if either has ran out of dice.
 * If so, outputs the end game message and updates the 'next turn'
 * button to 'Start New Game'.
 */
function checkForGameFinish() {
    let playerLost = document.getElementById('player-hand').getAttribute('dice') <= 0;
    let opponentLost = document.getElementById('opponent-hand').getAttribute('dice') <= 0;
    let outcomeTextContent = document.getElementById('outcome-text').innerHTML;
    if (playerLost) {
        outcomeTextContent += ` You have ran out of dice so you have lost
        the game! Better luck next time.`
    }
    if (opponentLost) {
        outcomeTextContent += ` The computer has ran out of dice so you have
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
 * Reveal the opponent's dice 
 */
function revealDice() {
    let opponentHand = document.getElementById('opponent-hand');
    for (let die of opponentHand.children) {
        die.src = utility.getDiceImage(die.getAttribute('pips'));
    }
}

/**
 * Update the options the player has for betting in the bet form
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
    for (let i = 1; i <= 5; i++) {
        let newOption = document.createElement('option');
        newOption.value = newOption.innerHTML = quantity + i;
        quantitySelector.appendChild(newOption);
    }
}

/**
 * Handles the next turn button
 */
function handleNextTurn() {
    opponent.updateResponseMessage("The computer is awaiting your move.");
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
    new Bet(0, 0).updateCurrentBet(); // Resets current bet
    populateHand('player-hand', playerDice);
    populateHand('opponent-hand', opponentDice);
    // Starts new round with opponent bet if player lost the last round
    if (document.getElementById('current-bet').getAttribute('last-winner') == 'opponent') {
        opponent.createResponse();
        document.getElementById('call-button').disabled = false;
    }
    updateBetOptions();
}