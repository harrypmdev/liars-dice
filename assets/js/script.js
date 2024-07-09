import {Bet} from './bet.js';

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
    updateCurrentBet(new Bet(0, 0)); // Sets current bet to 'none'
    populateHand('player-hand', 6);
    populateHand('opponent-hand', 6);
    updateBetOptions();
    document.getElementById('next-turn').textContent = 'Next turn';
}

/**
 * Updates the current bet on the page.
 * Produces 'Current Bet: None' if bet has no pips.
 * @param {Bet} bet Bet object to update the current bet with
 */
function updateCurrentBet(bet) {
    let currentBet = document.getElementById('current-bet');
    let pipGrammar = bet.pips == 1 ? 'pip' : 'pips';
    currentBet.innerHTML = bet.pips !== 0 ? `Current Bet: ${bet.quantity} dice with ${bet.pips} ${pipGrammar}` : 'Current Bet: None';
    // Update current bet attributes so quantity and pips easily accessible
    currentBet.setAttribute("quantity", bet.quantity)
    currentBet.setAttribute("pips", bet.pips);
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
        let dieNumber = generateDiceNumber();
        newDie.setAttribute('pips', dieNumber);
        newDie.style.margin = '20px';
        newDie.style.width = '20%';
        newDie.style.height = 'auto';
        newDie.style.objectFit = 'contain';
        newDie.src = hand == 'player-hand' ? getDiceImage(dieNumber) : 'assets/images/dice-faces/dice-unknown.webp';
        cachedHand.appendChild(newDie);
    }
}

/**
 * Generates a random number between 1 and 6.
 * Takes no parameters
 */
function generateDiceNumber() {
    return Math.ceil(Math.random() * 6);
}

/**
 * Returns the webp file of the relevant dice image for a dice number.
 * @param {integer} dieNumber The dice number (1-6)
 * @return {string} The path of the relevant dice image. Erroneous arguments will return the 'dice unknown' image
 */
function getDiceImage(dieNumber) {
    dieNumber = parseInt(dieNumber);
    if (!([1, 2, 3, 4, 5, 6].includes(dieNumber))){
        return 'assets/images/dice-faces/dice-unknown.webp'; // Returns 'dice unknown' image if passed value other than 1-6
    }
    let DiceImages = ['assets/images/dice-faces/dice-one.webp',
        'assets/images/dice-faces/dice-two.webp',
        'assets/images/dice-faces/dice-three.webp',
        'assets/images/dice-faces/dice-four.webp',
        'assets/images/dice-faces/dice-five.webp',
        'assets/images/dice-faces/dice-six.webp'
    ]
    return DiceImages[dieNumber - 1]; // Returns relevant image
}

/**
 * Handles the submission of the bet form
 * @param {*} event The callback event 
 */
function handleBet(event) {
    event.preventDefault();
    document.getElementById('call-button').disabled = false;
	updateCurrentBet(new Bet(document.getElementById('quantity-selector').value, document.getElementById('pip-selector').value));
    createOpponentResponse();
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
 * Returns the pips from the dice of either or both hands in an array.
 * @param {string} hand The hand for which the dice pips should be counted - 'player-hand', 'opponent-hand', or 'both'.
 * @returns {Array} An array of all the dice pips in question.
 */
function returnDiceArray(hand) {
    let totalPips = [];
    let cachedHand = document.getElementById(hand);
    for (let die of cachedHand.children) {
        totalPips.push(die.getAttribute('pips'));
    }
    return totalPips;
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
    // If the computer called the game, put out a message from the computer
    if (caller === 'opponent') {
        updateComputerResponse('The computer has called!');
    }
    let allPipsObject = tallyPipTotals(returnDiceArray('player-hand') + returnDiceArray('opponent-hand'));
    let quantity = allPipsObject[currentBet.getAttribute('pips')] // Quantity is the total times the current pip appears
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
 * Create a bet from the opponent
 */
function createOpponentResponse() {
    // Variables that determine the opponent's response style
    let confidence = 0.47; // How likely the computer is to refrain from calling based on how its dice match the bet - (0 is never, 1 is very likely)
    let scepticism = 0.51; // How likely the computer is to call based on the overall dice quantity - (0 is never, 1 is very likely)
    let chanceOfPickingRandom = 0.15; // How likely the computer is to bet a random pip number - (0 is never, 1 is very likely)
    let chanceOfSame = 0.85; // How likely the computer is pick the same quantity of dice when possible - (0 is never, 1 is very likely)
    // Choose randomly whether to 'call' or bet
    let callChanceRandomNum = Math.random();
    let currentBet = document.getElementById('current-bet');
    // Find the pip number which occurs the most in the hand, and the second most
    let totalPipTally = tallyPipTotals(returnDiceArray('opponent-hand'));
    let highestPip = findHighestPipTotal(totalPipTally)[0];
    let highestPipOccurrences = findHighestPipTotal(totalPipTally)[1];
    delete totalPipTally[highestPip];
    let secondHighestPip = findHighestPipTotal(totalPipTally)[0];
    let secondHighestPipOccurrences = findHighestPipTotal(totalPipTally)[1];
    // Make computer more likely to call game if overall quantity of dice is higher
    let currentQuantity = document.getElementById('current-bet').getAttribute('quantity');
    if (currentQuantity > 2) {
        callChanceRandomNum += (currentQuantity-2) * (scepticism/3);
    }
    // Make computer less likely to call game if bet matches dice in hand
    if (currentBet.getAttribute('pips') == highestPip) {
        callChanceRandomNum -= (highestPipOccurrences*(confidence/3));
    } else if (currentBet.getAttribute('pips') == secondHighestPip) {
        callChanceRandomNum -= (secondHighestPipOccurrences*(confidence/3));     
    }
    // If opponent is playing first, make the chance of calling zero
    let lastWinner = false;
    if (currentBet.getAttribute('last-winner') === "opponent") {
        callChanceRandomNum = 0;
        currentBet.setAttribute('last-winner', '');
        // Make sure a quantity of two is bet later in the function
        lastWinner = true;
    }
    // Randomly call or bet
    if (callChanceRandomNum > 0.9) {
        callGame('opponent');
    } else {
        // Make bet
        let newBet = new Bet(0, 0);
        // Pick the pip number
        let pipChoiceRandomNum = Math.random();
        let smartPipChoiceRandomNum = Math.random();
        // Depending on the 'chanceOfPickingRandom' variables, potentially pick a random number
        if (pipChoiceRandomNum < chanceOfPickingRandom) {
            newBet.pips = generateDiceNumber();
        // Otherwise, pick the highest occuring pip number, second highest, or raise the current bet
        } else if (smartPipChoiceRandomNum < 0.33) {
            newBet.pips = highestPip;
        } else if (smartPipChoiceRandomNum < 0.66) {
            newBet.pips = secondHighestPip;
        } else {
            if (lastWinner) {
                newBet.pips = highestPip;
            } else {
                newBet.pips = currentBet.getAttribute('pips');
            }
        }
        // Pick quantity - either the current quantity if the pip number allows, or higher if not
        if (newBet.pips > currentBet.getAttribute('pips') && Math.random() < chanceOfSame) {
            newBet.quantity = currentQuantity;
        } else {
            newBet.quantity = parseInt(currentQuantity) + 1;
        }
        // Pick 2 if playing the starting bet
        if (lastWinner) {
            newBet.quantity = 2;
        }
        // Update the board
        updateCurrentBet(newBet);
        updateComputerResponse(`The computer has bet ${newBet.quantity} dice with ${newBet.pips} pips.`);
    }
}

/**
 * Tallies up the total amount of times pip numbers occur in a hand.
 * @param {Array} diceArray An array of the dice in a hand, usually the returned value of returnDiceArray().
 * @returns {Object} A dictionary for which the key is the pip number and the value the amount of times it occurs.
 */
function tallyPipTotals(diceArray) {
    let pipObject = {};
    for (let pip of diceArray) {
        pipObject[pip] = pip in pipObject ? pipObject[pip] + 1 : 1;
    }
    return pipObject;
}

/**
 * Finds the pip number that occurs the most from a tally of pip totals.
 * @param {Object} pipTally A dictionary which has the tally of the total amount of times
 * pip numbers occur in a hand, usually the returned value of tallyPipTotals().
 * @returns {Array} An array with two values: the pip number that occurs the most and the amount of times it occurs.
 */
function findHighestPipTotal(pipTally) {
    let highest = [0, 0];
    for (const [key, value] of Object.entries(pipTally)) {
        if (value > highest[1]) {
            highest[1] = value;
            highest[0] = key;
        }
    }
    return highest;
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
    updateCurrentBet(new Bet(0, 0)); // Resets current bet
    populateHand('player-hand', playerDice);
    populateHand('opponent-hand', opponentDice);
    // Starts new round with opponent bet if player lost the last round
    if (document.getElementById('current-bet').getAttribute('last-winner') == 'opponent') {
        createOpponentResponse();
        document.getElementById('call-button').disabled = false;
    }
    updateBetOptions();
}