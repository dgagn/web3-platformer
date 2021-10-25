import $ from 'jquery';
import {createHomePage} from './pages/home';
import {eventPlayButton} from './components/btn';
import '../styles/main.scss';
import {parallax} from './components/parallax';

function main() {
  const homePage = createHomePage();
  $('body').append(homePage);
  eventPlayButton();
  parallax();
}

$(main);
