(document => {
  'use strict';

  let sections = document.querySelectorAll('.js-section-aminate');
  let animateObj;

  const animateClass = 'content-section_animate';
  const animateFromWidth = 1340;
  const offset = 300;

  /**
   * Detect if animation needed.
   * @param {number} bp - min viewport vidth.
   * @return {boolean} - detection.
   */
  const isAnimatable = bp => matchMedia ?
                            matchMedia(`(min-width: ${bp}px)`).matches :
                            innerWidth >= bp;

  /**
   * Find element top offset.
   * @param {element} element - target element.
   * @return {number} - offset.
   */
  const findOffset = element => element.offsetTop;

  /**
   * Check element to animate.
   */
  const filterMap = () => {
    let key;

    for (key in animateObj) {
      if (key <= pageYOffset + offset) {
        animateObj[key].classList.add(animateClass);
      }
    }
  };

  /**
   * Scroll animation handler.
   */
  const scrollHandler = () => {
    let timeoutId;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      filterMap();
    }, 100);
  };

  /**
   * Add elements to animate in object.
   */
  const mapSections = () => {
    if (isAnimatable(animateFromWidth)) {
      animateObj = {};

      [].map.call(sections, element => {
        animateObj[findOffset(element)] = element;
      });

      filterMap();

      window.addEventListener('scroll', scrollHandler);
    } else {
      animateObj = null;
      window.removeEventListener('scroll', scrollHandler);
    }
  };

  if (sections) {
    window.addEventListener('load', mapSections);
    window.addEventListener('resize', mapSections);
  }
})(document);
