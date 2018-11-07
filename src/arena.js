const Contender = require('./contender');

/**
 * Here we are again in the gruesome arena where mighty heroes
 * get challenged by vile and dangerous villains. To find out
 * more about them, see the {@link Contender} class.
 *
 * @param {Contender} hero
 * A hero (masculine) or heroine (feminine) is a real person or a main character of a literary work who,
 * in the face of danger, combats adversity through feats of ingenuity, bravery or strength;
 * the original hero type of classical epics did such things for the sake of glory and honor.
 * On the other hand are Medieval and modern heroes, who perform great deeds
 * for the common good instead of the classical goal of pride and fame.
 *
 * The concept of the hero can be found in classical literature. It is the main or revered character
 * in heroic epic poetry celebrated through ancient legends of a people,
 * often striving for military conquest and living by a continually flawed personal honor code.
 * The definition of a hero has changed throughout time. Merriam Webster dictionary defines
 * a hero as "a person who is admired for great or brave acts or fine qualities."
 * Examples of heroes range from mythological figures, such as Gilgamesh, Achilles and Iphigenia,
 * to historical figures, such as Joan of Arc or Sophie Scholl, modern heroes like Alvin York,
 * Audie Murphy and Chuck Yeager, and fictional superheroes, including Superman and Batman.
 * @param {Contender} villain Honorless and heartless murderer.
 */
class Arena {
    constructor(hero, villain) {
        this.hero = hero;
        this.villain = villain;
        this.round = 1;
    }

    /**
     * With the sound of a gong, the arena starts and will not
     * end until one of the duelists lies dead on the ground.
     * @returns {Promise}
     */
    async fight() {
        console.log(`${this.villain.name} challenges ${this.hero.name} in the arena! Who will prevail?`);
        while(this._areBothAlive()) {
            console.log(`Round ${this.round++}. Fight!`);
            this.villain.attack(this.hero);
            await this._rest();
            if (this._areBothAlive()) {
                this.hero.attack(this.villain);
                await this._rest();
            }
            console.log('--------------------------------------------')
        }
    }

    /**
     * Makes sure that at least one of the contenders is still alive.
     * @returns {Boolean}
     * @ignore
     */
    _areBothAlive() {
        return this.hero.health > 0 && this.villain.health > 0;
    }

    /**
     * Makes sure the contenders can catch their breath.
     * @returns {Promise}
     * @ignore
     */
    async _rest() {
        return new Promise(resolve => setTimeout(resolve, 500));
    }
}

module.exports = Arena;
