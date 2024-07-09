/**
 * Generates a random number between 1 and 6.
 * Takes no parameters
 */
export function generateDiceNumber() {
    return Math.ceil(Math.random() * 6);
}

/**
 * Returns the webp file of the relevant dice image for a dice number.
 * @param {integer} dieNumber The dice number (1-6)
 * @return {string} The path of the relevant dice image. Erroneous arguments will return the 'dice unknown' image
 */
export function getDiceImage(dieNumber) {
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
* Returns the pips from the dice of either or both hands in an array.
* @param {string} hand The hand for which the dice pips should be counted - 'player-hand', 'opponent-hand', or 'both'.
* @returns {Array} An array of all the dice pips in question.
*/
export function returnDiceArray(hand) {
   let totalPips = [];
   let cachedHand = document.getElementById(hand);
   for (let die of cachedHand.children) {
       totalPips.push(die.getAttribute('pips'));
   }
   return totalPips;
}

/**
 * Tallies up the total amount of times pip numbers occur in a hand.
 * @param {Array} diceArray An array of the dice in a hand, usually the returned value of returnDiceArray().
 * @returns {Object} A dictionary for which the key is the pip number and the value the amount of times it occurs.
 */
export function tallyPipTotals(diceArray) {
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
export function findHighestPipTotal(pipTally) {
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
 * Constructs a sentence to output to the player describing the outcome of calling the game.
 * @param {string} caller The caller of the game, 'player' or 'opponent'.
 * @param {Boolean} betIsCorrect Whether or not they called it currently.
 * @param {number} pipOccurrences How many times the bet pip actually occurred on the board.
 * @returns 
 */
export function constructOutcomeText(caller, betIsCorrect, pipOccurrences) {
    let rightOrWrong;
    let currentBet = document.getElementById('current-bet');
    if (betIsCorrect) {
        rightOrWrong = caller == 'player' ? 'You called but you were wrong!' : 'The computer called but it was wrong!';
    } else {
        rightOrWrong = caller == 'player' ? 'You called and you were right!' : 'The computer called and it was right!';      
    }
    let noDice = pipOccurrences == 0 ? 'were no' : 'was a quantity of';
    if (pipOccurrences == 0) {
        pipOccurrences = "";
    }
    let diePhrasing = pipOccurrences == 1 ? 'die' : 'dice';
    let pipPhrasing = currentBet.getAttribute('pips') == 1 ? 'pip' : 'pips';
    let sentence = `${rightOrWrong} There ${noDice} ${pipOccurrences} ${diePhrasing} with ${currentBet.getAttribute('pips')} ${pipPhrasing}.`;
    return sentence;
}