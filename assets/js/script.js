/**
 * 
 */
class Bet {
    constructor(quantity, pips) {
        this.quantity = quantity;
        this.pips = pips;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    accountForHeader();
    // Find current page and assign to fileName
    let path = window.location.pathname;
    let fileName = path.substring(path.lastIndexOf('/') + 1);
    // If current page 'play.html', start game
    if (fileName === 'play.html') {
        startNewGame();
    }
    // Add event listener to bet form submit button
    let betForm = document.getElementById('bet-form');
    betForm.addEventListener('submit', handleBet);
});

addEventListener("resize", accountForHeader);

/**
 * Adjusts the offset of the main section of the page to account
 * for different header sizes on different devices.
 * Runs when the page first loads
 */
function accountForHeader() {
    let height = document.getElementsByTagName('header')[0].offsetHeight;
    height += 15;
    document.getElementsByTagName('main')[0].style.paddingTop = `${height}px`;
}

/**
 * Starts a new game of Liar's Dice.
 * Runs when play.html first loads and every time the game is restarted
 */
function startNewGame() {
    populateHand('player-hand');
    populateHand('opponent-hand');
    updateCurrentBet(null);
}

/**
 * Updates the current bet on the page.
 * Pass any falsy value to produce 'Current Bet: None'.
 * @param {Bet} bet Bet object to update the current bet with
 */
function updateCurrentBet(bet) {
    currentBet = document.getElementById('current-bet');
    if (bet) {
        currentBet.innerHTML = `Current Bet: ${bet.quantity} dice with ${bet.pips} pips`;
        // Update current bet attributes so quantity and pips easily accessible
        currentBet.quantity = bet.quantity;
        currentBet.pips = bet.pips;
    } else {
        currentBet.innerHTML = 'Current Bet: None';
    }
}

/**
 * Populates the player or opponents hand with six new dice
 * @param {string} hand 'player-hand' or 'opponent-hand'
 */
function populateHand(hand) {
    let myHand = document.getElementById(hand);
    // Generate six dice
    for(i = 0; i < 6; i++) {
        let newDice = document.createElement('img');
        let diceNumber = generateDiceNumber();
        newDice.setAttribute('dots', diceNumber);
        newDice.style.margin = '20px';
        newDice.style.width = '20%';
        newDice.style.height = 'auto';
        newDice.style.objectFit = 'contain';
        /* If player's hand, assign dice face images as per dice number.
        If opponent's hand, assign all dices faces to unknown dice face image. */
        switch (hand) {
            case 'player-hand':
                newDice.src = getDiceImage(diceNumber);
                break;
            case 'opponent-hand':
                newDice.src = 'assets/images/dice-faces/dice-unknown.webp';
                break;
        }
        myHand.appendChild(newDice);
    }

}

/**
 * Generates a random number between 1 and 6.
 * Takes no parameters
 */
function generateDiceNumber() {
    let randomNumber = Math.ceil(Math.random() * 6);
    return randomNumber;
}

/**
 * Returns the file of the relevant dice image for a dice number.
 * @param {integer} diceNumber The dice number (1-6)
 */
function getDiceImage(diceNumber) {
    let DiceImages = ['assets/images/dice-faces/dice-one.webp',
        'assets/images/dice-faces/dice-two.webp',
        'assets/images/dice-faces/dice-three.webp',
        'assets/images/dice-faces/dice-four.webp',
        'assets/images/dice-faces/dice-five.webp',
        'assets/images/dice-faces/dice-six.webp'
    ]
    return DiceImages[diceNumber - 1];
}

/**
 * Handles the submission of the bet form
 * @param {*} event 
 */
function handleBet(event) {
    console.log("handling bet");
    // Stops default submit action
    event.preventDefault();
    // Retrieves 'quantity' and 'pips' from bet form
    let quantitySelector = document.getElementById('quantity-selector');
    let pipSelector = document.getElementById('pip-selector');
	let newBet = new Bet(quantitySelector.value, pipSelector.value);
    // Updates current bet
	updateCurrentBet(newBet);
    // Create opponent response
    createOpponentResponse();
}

function callGame() {
    updateComputerResponse('The computer has called!');
}

function createOpponentResponse() {
    // Create random number from which to generate bet response
    let randomNum = Math.random();
    // Choose randomly whether to 'call' or bet
    if (Math.random() < 0.3) {
        callGame();
    } else {
        let newBet = new Bet(0, 0);
        currentBet = document.getElementById('current-bet');
        if (randomNum < 0.7) {
            newBet.quantity = parseInt(currentBet.quantity) + 1;
        } else {
            newBet.quantity = parseInt(currentBet.quantity) + 2;
        }
        newBet.pips = generateDiceNumber();
        updateCurrentBet(newBet);
        updateComputerResponse(`The computer has bet ${newBet.quantity} dice with ${newBet.pips} pips.`);
    }
}

/**
 * Updates the computer's response section on the board
 * @param {string} response The response the computer should output
 */
function updateComputerResponse(response) {
    let computerResponse = document.getElementById('computer-response')
    computerResponse.innerHTML = response;
}