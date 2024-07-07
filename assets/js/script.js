 /**
 * A class for bets to simplify the game's data
 * @class
 */
class Bet {
    /**
     * Create a bet
     * @param {number} quantity The quantity of dice being bet
     * @param {number} pips The number of pips being bet
     */
    constructor(quantity, pips) {
        this.quantity = quantity;
        this.pips = pips;
    }
}

/* Runs when the page is loaded */
document.addEventListener("DOMContentLoaded", function() {
    // Find current page and assign to fileName
    let path = window.location.pathname;
    let fileName = path.substring(path.lastIndexOf('/') + 1);
    // If current page 'play.html', start game
    if (fileName === 'play.html') {
        // Add event listener to bet form submit button
        let betForm = document.getElementById('bet-form');
        betForm.addEventListener('submit', handleBet);
        // Add event listener to bet form call button
        let callButton = document.getElementById('call-button');
        callButton.addEventListener('click', () => {callGame('player')});
        // Add event listener to next turn button
        let nextTurn = document.getElementById('next-turn');
        nextTurn.addEventListener('click', handleNextTurn);
        // Add event listener to bet form pip selector
        let pipSelector = document.getElementById('pip-selector');
        pipSelector.addEventListener('change', handlePipChange)
        // Start game
        startNewGame();
    } else {
        accountForHeader('index.html');
        window.addEventListener("resize", () => {accountForHeader('index.html')});
    }
    /* Account for fixed header and add event listener
    to adjust padding whenever window is resized */
    accountForHeader(fileName);
    window.addEventListener("resize", () => {accountForHeader(fileName)});
});

/**
 * Adjusts the offset of the main section of the page to account
 * for different header sizes on different devices.
 * Runs when the page first loads.
 * On play.html, gives extra padding-top.
 * @param {string} page The page being loaded
 */
function accountForHeader(page) {
    let height = document.getElementsByTagName('header')[0].offsetHeight;
    if (page === 'play.html' && window.screen.width >= 768) {
        height += 50;
    } else {
        height += 15;
    }
    document.getElementsByTagName('main')[0].style.paddingTop = `${height}px`;
}

/**
 * Starts a new game of Liar's Dice.
 * Runs when play.html first loads and every time the game is restarted
 */
function startNewGame() {
    populateHand('player-hand', 6);
    populateHand('opponent-hand', 6);
    updateCurrentBet(null);
    updateBetOptions();
    document.getElementById('next-turn').textContent = 'Next turn';
}

/**
 * Updates the current bet on the page.
 * Pass any falsy value to produce 'Current Bet: None'.
 * @param {Bet} bet Bet object to update the current bet with
 */
function updateCurrentBet(bet) {
    currentBet = document.getElementById('current-bet');
    if (bet) {
        let pipGrammar = 'pips';
        if (bet.pips == 1) {
            pipGrammar = 'pip';
        }
        currentBet.innerHTML = `Current Bet: ${bet.quantity} dice with ${bet.pips} ${pipGrammar}`;
        // Update current bet attributes so quantity and pips easily accessible
        currentBet.setAttribute("quantity", bet.quantity)
        currentBet.setAttribute("pips", bet.pips);
    } else {
        currentBet.innerHTML = 'Current Bet: None';
        currentBet.setAttribute("quantity", 0)
        currentBet.setAttribute("pips", 0);
    }
}

/**
 * Populates the player or opponent's hand with dice
 * @param {string} hand the hand which should be populated - 'player-hand' or 'opponent-hand'
 * @param {integer} dieNumber the number of dice which should be added
 */
function populateHand(hand, dieNumber) {
    let myHand = document.getElementById(hand);
    myHand.setAttribute('dice', dieNumber);
    // If any dice currently in hand, then remove them
    myHand.innerHTML = "";
    // Generate dice
    for(i = 0; i < dieNumber; i++) {
        let newDice = document.createElement('img');
        let diceNumber = generateDiceNumber();
        newDice.setAttribute('pips', diceNumber);
        newDice.style.margin = '20px';
        newDice.style.width = '20%';
        newDice.style.height = 'auto';
        newDice.style.objectFit = 'contain';
        /* If player's hand, assign dice face images as per dice number.
        If opponent's hand, assign all dice faces to unknown dice face image. */
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
 * Returns the webp file of the relevant dice image for a dice number.
 * @param {integer} dieNumber The dice number (1-6)
 * @return {string} The path of the relevant dice image. Erroneous arguments will return the 'dice unknown' image
 */
function getDiceImage(dieNumber) {
    // Returns 'dice unknown' image if passed value other than 1-6
    dieNumber = parseInt(dieNumber);
    if (!([1, 2, 3, 4, 5, 6].includes(dieNumber))){
        return 'assets/images/dice-faces/dice-unknown.webp';
    }
    // Returns relevant image
    let DiceImages = ['assets/images/dice-faces/dice-one.webp',
        'assets/images/dice-faces/dice-two.webp',
        'assets/images/dice-faces/dice-three.webp',
        'assets/images/dice-faces/dice-four.webp',
        'assets/images/dice-faces/dice-five.webp',
        'assets/images/dice-faces/dice-six.webp'
    ]
    return DiceImages[dieNumber - 1];
}

/**
 * Handles the submission of the bet form
 * @param {*} event The callback event 
 */
function handleBet(event) {
    let callButton = document.getElementById('call-button');
    if (callButton.disabled) {
        callButton.disabled = false;
    }
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
 * Returns the pips from the dice of either or both hands in an array.
 * @param {string} hand The hand for which the dice pips should be counted - 'player-hand', 'opponent-hand', or 'both'.
 * @returns {Array} An array of all the dice pips in question.
 */
function returnDiceArray(hand) {
    let totalPips = [];
    if (hand === "player-hand" || hand === "both") {
        let playerHand = document.getElementById('player-hand');
        for (let die of playerHand.children) {
            totalPips.push(die.getAttribute('pips'));
        }
    }
    if (hand === "opponent-hand" || hand === "both") {
        let opponentHand = document.getElementById('opponent-hand');
        for (let die of opponentHand.children) {
            totalPips.push(die.getAttribute('pips'));
        }
    }
    return totalPips;
}

/**
 * 'Calls' the game, revealing all dice and the winner of the round.
 * @param {string} caller Either 'player' or 'opponent', the player who called the game.
 */
function callGame(caller) {
    endTurn();
    // If the computer called the game, put out a message from the computer
    if (caller === 'opponent') {
        updateComputerResponse('The computer has called!');
    }
    // Check if the the bet was correct
    let playerHand = document.getElementById('player-hand');
    let opponentHand = document.getElementById('opponent-hand');
    let totalPips = returnDiceArray("both");
    let currentBet = document.getElementById('current-bet');
    let quantity = 0;
    for (let pip of totalPips) {
        if (pip == currentBet.getAttribute('pips')) {
            quantity += 1;
        }
    }
    // Determine the phrasing of the outcome text
    let diePhrasing = quantity == 1 ? 'die' : 'dice';
    let pipPhrasing = currentBet.getAttribute('pips') == 1 ? 'pip' : 'pips';
    // If bet is correct
    if ((currentBet.getAttribute('quantity') - quantity) <= 0) {
        // If player called, they have lost the round
        if (caller === 'player') {
            if (quantity == 0) {
                document.getElementById('outcome-text').innerHTML = `You called but the computer's bet was correct! 
                There was no dice with ${currentBet.getAttribute('pips')}
                 ${pipPhrasing} on the board. You lost the round.`;
            } else {
                document.getElementById('outcome-text').innerHTML = `You called but the computer's bet was correct! 
                There was a quantity of ${quantity} ${diePhrasing} with ${currentBet.getAttribute('pips')}
                ${pipPhrasing} on the board. You lost the round.`;
            }
            // Set the last winner to opponent
            currentBet.setAttribute('last-winner', 'opponent');
            // Decrement player's hand by one die
            playerHand.setAttribute('dice', playerHand.getAttribute('dice')-1);
        // If opponent called, the player has won the round
        } else {
            if (quantity == 0) {
                document.getElementById('outcome-text').innerHTML = `The computer called but the bet was correct!
                There was no dice with ${currentBet.getAttribute('pips')}
                ${pipPhrasing} on the board. You won the round.`; 
            } else {
                document.getElementById('outcome-text').innerHTML = `The computer called but the bet was correct!
                There was a quantity of ${quantity} ${diePhrasing} with ${currentBet.getAttribute('pips')}
                ${pipPhrasing} on the board. You won the round.`;               
            }
            // Set the last winner to player
            currentBet.setAttribute('last-winner', 'player');
            // Decrement opponent's hand by one die
            opponentHand.setAttribute('dice', opponentHand.getAttribute('dice')-1);
            console.log(opponentHand.getAttribute('dice'));

        }
    // If bet is incorrect
    } else {
        // If player called, they have won the round
        if (caller === 'player') {
            if (quantity == 0) {
                document.getElementById('outcome-text').innerHTML = `You called and you were right! 
                There was no dice with ${currentBet.getAttribute('pips')}
                ${pipPhrasing} on the board. You won the round.`;
            } else {
                document.getElementById('outcome-text').innerHTML = `You called and you were right! 
                There was a quantity of ${quantity} ${diePhrasing} with ${currentBet.getAttribute('pips')}
                ${pipPhrasing} on the board. You won the round.`;

            }
            // Set the last winner to player
            currentBet.setAttribute('last-winner', 'player');
            // Decrement opponent's hand by one die
            opponentHand.setAttribute('dice', opponentHand.getAttribute('dice')-1);
        // If opponent called, the player has lost the round
        } else {
            if (quantity == 0) {
                document.getElementById('outcome-text').innerHTML = `The computer called and it was right!
                There was no dice with ${currentBet.getAttribute('pips')}
                ${pipPhrasing} on the board. You lost the round.`;
            } else {
                document.getElementById('outcome-text').innerHTML = `The computer called and it was right!
                There was a quantity of ${quantity} ${diePhrasing} with ${currentBet.getAttribute('pips')}
                ${pipPhrasing} on the board. You lost the round.`;    
            } 
            // Set the last winner to opponent
            currentBet.setAttribute('last-winner', 'opponent');
            // Decrement player's hand by one die
            playerHand.setAttribute('dice', playerHand.getAttribute('dice')-1);
        }
    }
    checkForGameFinish();
}

/**
 * Checks the hands to see if either has ran out of dice.
 * If so, outputs the end game message and updates the 'next turn'
 * button to 'Start New Game'.
 */
function checkForGameFinish() {
    // If the result of this call means the player has ran out of dice
    if (document.getElementById('player-hand').getAttribute('dice') <= 0) {
        document.getElementById('outcome-text').innerHTML += ` You have ran out of dice so you have lost
        the game! Better luck next time.`
        document.getElementById('next-turn').innerText = 'Start New Game';
    }
    // If the result of this call means the opponent has ran out of dice
    if (document.getElementById('opponent-hand').getAttribute('dice') <= 0) {
        document.getElementById('outcome-text').innerHTML += ` The computer has ran out of dice so you have
        won the game! Well done.`
        console.log('why is this not working?');
        document.getElementById('next-turn').innerText = 'Start New Game';
    }
}

/**
 * Ends the turn.
 * Reveals the opponent's dice, disables the bet form, and enables the 'next turn' button.
 */
function endTurn(){
    // Reveal the opponent's dice
    revealDice();
    // Disable the bet form
    document.getElementById('bet-button').disabled = true;
    document.getElementById('call-button').disabled = true;
    document.getElementById('quantity-selector').disabled = true;
    document.getElementById('pip-selector').disabled = true;
    // Enable the 'next turn' button
    document.getElementById('next-turn').disabled = false;
}

/**
 * Create a bet from the opponent
 */
function createOpponentResponse() {
    // Variables that determine the opponent's response style
    let scepticism = 0.46 // How likely the computer is to 'call' - (0 is never, 1 is very likely)
    // Create random number from which to generate bet response
    let randomNum = Math.random();
    // Choose randomly whether to 'call' or bet
    let randomNumTwo = Math.random();
    let currentBet = document.getElementById('current-bet');
    // Make computer more likely to call game if quantity of dice is higher
    if (currentBet.getAttribute('quantity') > 2) {
        randomNumTwo += (currentBet.getAttribute('quantity')-2) * scepticism/3;
    }
    // If opponent is playing first, make the chance of calling zero
    if (currentBet.getAttribute('last-winner') === "opponent") {
        randomNumTwo = 0;
    }
    // Randomly call or bet
    if ( randomNumTwo > 0.85) {
        callGame('opponent');
    } else {
        // Make bet
        let newBet = new Bet(0, 0);
        currentQuantity = document.getElementById('current-bet').getAttribute('quantity');
        // If opponent is betting first, then bet at least two
        if (currentQuantity == 0) {
            currentQuantity++;
        }
        if (randomNum < 0.9) {
            newBet.quantity = parseInt(currentQuantity) + 1;
        } else {
            newBet.quantity = parseInt(currentQuantity) + 2;
        }
        let opponentDice = returnDiceArray('opponent-hand');
        let pipOptions = [1, 2, 3, 4, 5, 6];
        let pipObject = {}
        for (let option of pipOptions) {
            let count = 0;
            for (let pips of opponentDice) {
                if (option == pips) {
                    count += 1;
                }
            }
            pipObject[option] = count;
        }
        let highest = [0, 0];
        for (const [key, value] of Object.entries(pipObject)) {
            if (value > highest[1]) {
                highest[1] = value;
                highest[0] = key;
            } else if (value == highest[1]) {
                if (Math.random() > 0.5) {
                    highest[1] = value;
                    highest[0] = key;
                }
            }
        }
        if (Math.random() < 0.22) {
            newBet.pips = generateDiceNumber();
        } else {
            newBet.pips = highest[0];
        }
        if (newBet.pips > currentBet.getAttribute('pips')) {
            if (Math.random < 0.72) {
                newBet.quantity -= 1;
            }
        }
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
    // If first turn of game, don't add an option for one die
    if (quantity == 0) {
        quantity = 1;
    }
    for (i = 1; i <= 5; i++) {
        let newOption = document.createElement('option');
        newOption.value = quantity + i;
        newOption.innerHTML = quantity + i;
        quantitySelector.appendChild(newOption);
    }
}

/** 
 * Reveal the opponent's dice 
 */
function revealDice() {
    let opponentHand = document.getElementById('opponent-hand');
    for (let die of opponentHand.children) {
        die.src = getDiceImage(die.getAttribute('pips'));
    }
}

/**
 * Handles the next turn button
 */
function handleNextTurn() {
    updateComputerResponse("The computer is awaiting your move.");
    // Enable the bet form
    document.getElementById('bet-button').disabled = false;
    document.getElementById('quantity-selector').disabled = false;
    document.getElementById('pip-selector').disabled = false;
    // Disable the 'next turn' button
    document.getElementById('next-turn').disabled = true;
    // Remove outcome text
    document.getElementById('outcome-text').innerHTML = "";
    // If either player's hand is empty, restart the game
    let playerHand = document.getElementById('player-hand');
    let opponentHand = document.getElementById('opponent-hand');
    if (opponentHand.getAttribute('dice') <= 0 || playerHand.getAttribute('dice') <= 0) {
        startNewGame();
        return;
    }
    // Reset current bet
    updateCurrentBet(null);
    // Populate hands with updated dice count
    populateHand('player-hand', playerHand.getAttribute('dice'));
    populateHand('opponent-hand', opponentHand.getAttribute('dice'));
    // Starts new round with opponent bet if player lost the last round
    if (document.getElementById('current-bet').getAttribute('last-winner') == 'opponent') {
        createOpponentResponse();
        document.getElementById('call-button').disabled = false;
    }
    updateBetOptions();
}