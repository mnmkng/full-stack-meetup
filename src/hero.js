/**
 * Only true and battle hardened `Contenders` may enter the {@link Arena}.
 *
 * @oaram {String} name Name of the `Contender`.
 * @param {Number} strength Strength points.
 * @param {Number} armor Armor points.
 * @param {Number} health Health points.
 */
class Contender {
    constructor(name, strength, armor, health) {
        this.name = name;
        this.strength = strength;
        this.armor = armor;
        this.health = health;
    }

    /**
     * Strike your enemy with a fearsome blow!
     * @param {Contender} enemy
     */
    attack(enemy) {
        const strike = this.strength + this._rollDice();
        console.log(`${this.name} strikes ${enemy.name} for ${strike} points.`);
        enemy.defend(strike);
    }

    /**
     * Defend your life against your enemies' attacks.
     * @param strike
     */
    defend(strike) {
        const block = this.armor + this._rollDice();
        console.log(`${this.name} blocks for ${block} points.`);
        const damage = Math.max(0, strike - block);
        if (damage > 0) {
            this.health = Math.max(0, this.health - damage);
            const healthMessage = this.health > 0
                ? `has ${this.health} health left.`
                : 'dies.';
            console.log(`${this.name} was hit for ${damage} damage and ${healthMessage}`);
        }
    }

    /**
     * Only the gods may know this number.
     * @param {Number} max
     * @returns {Number}
     * @ignore
     */
    _rollDice(max = 6) {
        return Math.ceil(Math.random() * max)
    }
}

module.exports = Contender;
