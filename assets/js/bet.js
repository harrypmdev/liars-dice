 /**
 * A class for bets to simplify the game's data
 * @class
 */
 export class Bet {
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