/**
 * This example represents a fight between Batman and Joker,
 * two ancient rivals.
 */

const Arena = require('./src/arena');
const Hero = require('./src/contender');

const Batman = new Hero('Batman', 20, 18, 30);
const Joker = new Hero('Joker', 18, 16, 50);

const arena = new Arena(Batman, Joker);

arena.fight();
