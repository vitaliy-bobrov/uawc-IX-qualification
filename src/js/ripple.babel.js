((window, document) => {
  'use strict';

  const rippleParentClass = 'js-ripple';
  const rippleClass = 'ripple-ink';
  const animateClass = `${rippleClass}_animate`;

  /**
   * Detect current browser animationend event name.
   * @return {string} - event name.
   */
  const detectAnimationEvent = () => {
    let eventName;
    let el = document.createElement('fakeelement');

    const animationEndEvents = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'animationend',
      WebkitAnimation: 'webkitAnimationEnd'
    };

    for (eventName in animationEndEvents) {
      if (typeof el.style[eventName] !== 'undefined') {
        return animationEndEvents[eventName];
      }
    }
  };

  /**
   * Deactivate link on animation end.
   * @param {object} event - object with event data.
   * @return {element} - event target.
   */
  const deactivateInk = event => event.target.classList.remove(animateClass);

  /**
   * Ripple effect.
   * @param {object} event - object with event data.
   */
  const rippleHandler = event => {
    let element = event.target;
    let ripple = element.querySelector(`.js-${rippleClass}`);

    if (ripple) {
      if (!ripple.offsetHeight && !ripple.offsetWidth) {
        ripple.effectSize = Math.max(element.offsetWidth, element.offsetHeight);
        ripple.style.width = ripple.style.height = `${ripple.effectSize}px`;
      }

      ripple.style.top = `${event.offsetY - ripple.effectSize / 2}px`;
      ripple.style.left = `${event.offsetX - ripple.effectSize / 2}px`;

      ripple.classList.add(animateClass);
    }
  };

  /**
   * Initialize ripple elements.
   */
  const createInks = () => {
    let parents = document.querySelectorAll(`.${rippleParentClass}`);
    const eventName = detectAnimationEvent();

    if (parents) {
      [].forEach.call(parents, parent => {
        let color = parent.getAttribute('data-ripple-color');
        let ripple = document.createElement('span');

        ripple.className = `${rippleClass} js-${rippleClass}`;

        if (color) {
          ripple.style.backgroundColor = color;
        }

        parent.insertBefore(ripple, parent.firstChild);

        parent.addEventListener('click', rippleHandler);
        ripple.addEventListener(eventName, deactivateInk);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', createInks);
})(window, document);
