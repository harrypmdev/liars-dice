 /**
 * A class for bets to simplify the game's data
 * @class
 */
 export class Bet {
    /**
     * Create a bet.
     * @param {number} quantity The quantity of dice being bet.
     * @param {number} pips The number of pips being bet.
     */
    constructor(quantity, pips) {
        this.quantity = quantity;
        this.pips = pips;
    }
    /**
     * Updates the current bet on the page.
     * Produces 'Current Bet: None' if bet has no pips.
     */
    updateCurrentBet() {
        let currentBet = document.getElementById('current-bet');
        let pipGrammar = this.pips == 1 ? 'pip' : 'pips';
        currentBet.innerHTML = this.pips !== 0 ? `Current Bet: ${this.quantity} dice with ${this.pips} ${pipGrammar}` : 'Current Bet: None';
        // Update current bet attributes so quantity and pips easily accessible
        currentBet.setAttribute('quantity', this.quantity)
        currentBet.setAttribute('pips', this.pips);
    }
}