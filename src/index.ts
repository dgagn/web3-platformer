import $ from 'jquery';
import {setHomePage} from './pages/home';
import '../styles/main.scss';
import {eventModal} from './components/modal/modal';

/**
 * The main entry point to the `Collecteur` game.
 * The main will set the page to the home page and starts
 * listening for the modal events.
 */
function main() {
  setHomePage();
  eventModal();
}

/**
 * Start the main when the DOM is ready.
 */
$(main);
