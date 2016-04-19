(document => {
  'use strict';

  let menuButton = document.querySelector('.js-menu-toggle');
  let menu = document.querySelector('.js-menu');
  const menuButtonOpenClass = 'menu-toggle_open';
  const menuOpenClass = 'menu_open';
  const a11yMenuButton = 'aria-expanded';
  const a11yMenu = 'aria-hidden';

  /**
   * Click on menu button handler.
   * @param {object} event - object with event data.
   */
  const menuButtonHandler = event => {
    event.preventDefault();

    if (menu.className.indexOf(menuOpenClass) === -1) {
      menuButton.setAttribute(a11yMenuButton, false);
      menuButton.classList.add(menuButtonOpenClass);

      menu.setAttribute(a11yMenu, true);
      menu.classList.add(menuOpenClass);
    } else {
      menuButton.setAttribute(a11yMenuButton, true);
      menuButton.classList.remove(menuButtonOpenClass);

      menu.setAttribute(a11yMenu, false);
      menu.classList.remove(menuOpenClass);
    }
  };

  if (menuButton && menu) {
    document.addEventListener('DOMContentLoaded', () => {
      menuButton.addEventListener('click', menuButtonHandler);
    });
  }
})(document);
