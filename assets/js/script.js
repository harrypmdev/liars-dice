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
    populateHand('player-hand');
    populateHand('opponent-hand');
}

/**
 * Populates the player or opponents hand with six new dice
 * Takes one string parameter, 'player-hand' or 'opponent-hand'
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
        /* If player's hand, assign dice faces as per dice number.
        If opponent's hand, assign all dices faces to unknown dice face. */
        switch (hand) {
            case 'player-hand':
                newDice.src = getDiceImage(diceNumber);
                break;
            case 'opponent-hand':
                newDice.src = '../assets/images/dice-faces/dice-unknown.webp';
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
 * Takes one integer parameter, the dice number (1-6)
 */
function getDiceImage(diceNumber) {
    let DiceImages = ['../assets/images/dice-faces/dice-one.webp',
        '../assets/images/dice-faces/dice-two.webp',
        '../assets/images/dice-faces/dice-three.webp',
        '../assets/images/dice-faces/dice-four.webp',
        '../assets/images/dice-faces/dice-five.webp',
        '../assets/images/dice-faces/dice-six.webp'
    ]
    return DiceImages[diceNumber - 1];
}