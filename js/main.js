
/*----------- main.js -----------*/


import { initTimeAndDate } from './TimeDate.js';
import { updateWeather } from './weather.js';
import { updateHoroscope } from './horoscope.js';
import { initLinks } from './links.js';
import { initNotes } from './notes.js';
import { initBackground } from './background.js';
import { initEditableHeader } from './header.js';

document.addEventListener('DOMContentLoaded', () => {
  initTimeAndDate();
  updateWeather();
  updateHoroscope();
  initLinks();
  initNotes();
  initBackground();
  initEditableHeader();
});
