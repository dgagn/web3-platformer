import './entities';
import {draws, engine, game, update, updates} from './core/game';

console.log(game);

updates();
draws();

const audio = new Audio('music.ogg');
audio.loop = true;
audio.volume = 0.5;
document.addEventListener('mousemove', () => audio.play().catch(e => e));
document.addEventListener('keydown', () => audio.play().catch(e => e));
