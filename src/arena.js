/**
 * Here we are again in the gruesome arena where mighty heroes
 * get challenged by vile and dangerous villains. To find out
 * more about them, see the {@link Contender} class.
 *
 * @param {Contender} hero A mighty warrior and a stalwart protector.
 * @param {Contender} villain Honorless and heartless murderer.
 */
class Arena {
    constructor(hero, villain) {
        this.hero = hero;
        this.villain = villain;
        this.round = 1;
    }

    /**
     * By the ring of the gong, the arena starts and will not
     * end until one of the duelists lies dead on the ground.
     * @returns {Promise<void>}
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
     * @returns {boolean}
     * @ignore
     */
    _areBothAlive() {
        return this.hero.health > 0 && this.villain.health > 0;
    }

    /**
     * Makes sure the contenders can catch their breath.
     * @returns {Promise<void>}
     * @ignore
     */
    async _rest() {
        return new Promise(resolve => setTimeout(resolve, 500));
    }
}

module.exports = Arena;
