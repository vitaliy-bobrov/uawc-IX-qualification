(document => {
  'use strict';

  let button = document.querySelector('.js-scroll-top');

  if (button) {
    button.addEventListener('click', event => {
      event.preventDefault();

      setTimeout(() => window.scrollTo(0, 0), 225);
    });
  }
})(document);
