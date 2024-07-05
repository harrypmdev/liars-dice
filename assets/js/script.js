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
    // Add event listener to bet form call button
    let callButton = document.getElementById('call-button');
    callButton.addEventListener('click', () => {callGame('player')});
    // Add event listener to bet form pip selector
    let pipSelector = document.getElementById('pip-selector');
    pipSelector.addEventListener('change', handlePipChange)
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
        currentBet.setAttribute("quantity", bet.quantity)
        currentBet.setAttribute("pips", bet.pips);
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
        newDice.setAttribute('pips', diceNumber);
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
    // Updates the bet options according to the new current bet (the opponent's bet)
    updateBetOptions();
}

/**
 * Runs when the pip value is changed in the pip selector.
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
    for (option of quantitySelector.options) {
        if (option.value === currentBet.getAttribute('quantity')) {
            containsCurrentQuantity = true;
        }
    }
    /* If the currently selected pip is higher than current bet pip value, 
    add the quantity from current bet to quantity selector
    */
   console.log(pipSelector.value + " > " + currentBet.getAttribute('pips'));
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
    revealDice();
    if (caller === 'opponent') {
        updateComputerResponse('The computer has called!');
    }

}

function createOpponentResponse() {
    // Create random number from which to generate bet response
    let randomNum = Math.random();
    // Choose randomly whether to 'call' or bet
    let randomNumTwo = Math.random();
    let currentBet = document.getElementById('current-bet');
    // Make computer more likely to call game if quantity of dice is higher
    randomNumTwo -= (parseInt(currentBet.getAttribute('quantity'))*0.5) / 10
    // If quantity of dice is already 12 or higher, call the game.
    if (parseInt(currentBet.getAttribute('quantity')) >= 12) {
        callGame('opponent')
    // Otherwise, randomly call or bet
    } else if ( randomNumTwo < 0.15) {
        callGame('opponent');
    } else {
        let newBet = new Bet(0, 0);
        currentBet = document.getElementById('current-bet');
        if (randomNum < 0.8) {
            newBet.quantity = parseInt(currentBet.getAttribute("quantity")) + 1;
        } else {
            newBet.quantity = parseInt(currentBet.getAttribute("quantity")) + 2;
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

/**
 * Update the options the player has for betting in the bet form
 */
function updateBetOptions(){
    let quantitySelector = document.getElementById('quantity-selector');
    let pipSelector = document.getElementById('pip-selector');
    let currentBet = document.getElementById('current-bet');
    // Clear quantity selector options except for blank default
    quantitySelector.innerHTML = "<option class='hide' disabled selected value></option>";
    // Set pip selector to blank
    pipSelector.value = "";
    // Add new quantity selector options
    let quantity = parseInt(currentBet.getAttribute("quantity"));
    for (i = 1; i <= 5; i++) {
        let newOption = document.createElement('option');
        newOption.value = quantity + i;
        newOption.innerHTML = quantity + i;
        quantitySelector.appendChild(newOption);
    }
}

function revealDice() {
    let opponentHand = document.getElementById('opponent-hand');
    for (let child of opponentHand.children) {
        child.src = getDiceImage(child.getAttribute('pips'))
    }
}