import {tallyPipTotals, findHighestPipTotal, generateDiceNumber} from './utility.js';

/**
 * Updates the opponent's response section on the board
 * @param {string} response The response the opponent should output
 */
export function updateResponseMessage(response) {
    let opponentResponse = document.getElementById('computer-response')
    opponentResponse.innerHTML = response;
}

/**
 * Create a bet from the opponent
 */
export function createResponse() {
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
        newBet.updateCurrentBet();
        opponent.updateResponseMessage(`The computer has bet ${newBet.quantity} dice with ${newBet.pips} pips.`);
    }
}