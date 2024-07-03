document.addEventListener("DOMContentLoaded", function() {
    accountForHeader();
    // Find current page and assign to fileName
    let path = window.location.pathname;
    let fileName = path.substring(path.lastIndexOf('/') + 1);
    if (fileName === 'play.html') {
        startNewGame();
    }
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

}

/**
 * Populates the player or opponents hand with six new dice
 * Takes one string parameter, 'player-hand' or 'opponent-hand'
 */
function populateHand(hand) {
    let myHand = document.getElementById(hand);
    for(i = 0; i < 6; i++) {
        let newDice = document.createElement(img);
    }
    myHand.appendChild();
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
 * Takes one integer parameter, the dice number (1-6)
 */
function getDiceImage(diceNumber) {
    let DiceImages = ['../images/dice-faces/dice-one.webp',
        '../images/dice-faces/dice-two.webp',
        '../images/dice-faces/dice-three.webp',
        '../images/dice-faces/dice-four.webp',
        '../images/dice-faces/dice-five.webp',
        '../images/dice-faces/dice-six.webp'
    ]
    return DiceImages[diceNumber - 1];
}