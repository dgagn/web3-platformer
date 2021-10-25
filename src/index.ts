import $ from 'jquery';
import {createHomePage, setHomePage} from './pages/home';
import '../styles/main.scss';

import {eventModal} from './components/modal';

function main() {
  setHomePage();
  eventModal();
}

$(main);
