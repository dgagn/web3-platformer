import $ from 'jquery';
import {setHomePage} from './pages/home';
import '../styles/main.scss';

import {eventModal} from './components/modal/modal';

function main() {
  setHomePage();
  eventModal();
}

$(main);
