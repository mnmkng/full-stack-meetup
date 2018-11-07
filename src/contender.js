/**
 * Only true and battle hardened `Contenders` may enter the {@link Arena}.
 *
 * @param {String} [name='Skeleton Warrior']
 *   Unless a name is chosen, a Skeleton Warrior will rise from the dead.
 *   In Greek mythology, the Skeleton Warriors were known as Spartoi
 *   and were creatures that were created by planting the teeth
 *   of a dragon sacred to Ares that was killed by Cadmus.
 *   Once the hero removed the teeth from the fallen monster,
 *   he planted them in black soil and plowed the land with
 *   a breed of ox that was rumored to have extremely thick
 *   armor plating. When this was done, from every tooth in the ground,
 *   a warrior clad in full Greek armor would burst from the earth.
 *   Cadmus later threw a jewel in the recently created Spartoi
 *   to determine who was the strongest, and only five survived the fighting.
 *   Those five later helped build the city of Thebes,
 *   nd many of its inhabitants were descended from them.
 * @param {Number} [strength=20] Strength points.
 * @param {Number} [armor=15] Armor points.
 * @param {Number} [health=30] Health points.
 */
class Contender {
    constructor(name = 'Skeleton Warrior', strength = 20, armor = 15, health = 30) {
        this.name = name;
        this.strength = strength;
        this.armor = armor;
        this.health = health;
    }

    /**
     * Strike your enemy with a fearsome blow that breaks his
     * neck and shatters his bones and makes him bleed and die
     * a horrible death. There's no coming back from death in
     * the arena, even the gods know that. This description
     * is not very clever, but it's long, which is to show
     * how a long description would look like in the generated
     * docs.
     *
     * **Example usage:**
     *
     * ```
     * const hero = new Contender('Hero', 30, 50, 100);
     * const skeletonWarrior = new Contender();
     *
     * hero.attack(skeletonWarrior);
     * ```
     *
     * @param {Contender} enemy
     */
    attack(enemy) {
        const strike = this.strength + this._rollDice();
        console.log(`${this.name} strikes ${enemy.name} for ${strike} points.`);
        enemy.defend(strike);
    }

    /**
     * Defend your life against your enemies' attacks.
     * @param {Number} strike
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
