(document => {
  'use strict';

  const activeClass = 'gallery__item_show';
  const activeLinkClass = 'link-list__link_active';
  const dataAttrName = 'data-filter-category';
  const a11yExpanded = 'aria-expanded';
  const a11yHidden = 'aria-hidden';
  let topic = 'all';
  let filterLinks = document.querySelectorAll('.js-gallery-link');
  let filterItems = document.querySelectorAll('.js-gallery-item');

  if (filterLinks && filterItems) {
    /**
     * Make filter link active.
     * @param {element} link - link element node.
     */
    const activateLink = link => {
      link.setAttribute(a11yExpanded, true);
      link.classList.add(activeLinkClass);
    };

    /**
     * Make filter link inactive.
     * @param {element} link - link element node.
     */
    const deactivateLink = link => {
      link.setAttribute(a11yExpanded, false);
      link.classList.remove(activeLinkClass);
    };

    /**
     * Make gallery item active.
     * @param {element} item - gallery item element node.
     */
    const activateItem = item => {
      item.setAttribute(a11yHidden, false);
      item.classList.add(activeClass);
    };

    /**
     * Make gallery item inactive.
     * @param {element} item - gallery item element node.
     */
    const deactivateItem = item => {
      item.setAttribute(a11yHidden, true);
      item.classList.remove(activeClass);
    };

    /**
     * Click filter link handler.
     * @param {object} event - object with event data.
     * @return {boolean} - to prevent hash add to history.
     */
    const filterLinkHandler = event => {
      event.preventDefault();

      let newTopic = event.target.getAttribute(dataAttrName);

      if (topic === newTopic) {
        return false;
      }

      topic = newTopic;

      [].forEach.call(filterLinks, link => {
        deactivateLink(link);
      });

      activateLink(event.target);

      if (topic === 'all') {
        [].forEach.call(filterItems, item => {
          activateItem(item);
        });
      } else {
        [].forEach.call(filterItems, item => {
          if (item.getAttribute(dataAttrName) === topic) {
            activateItem(item);
          } else {
            deactivateItem(item);
          }
        });
      }

      return false;
    };

    /**
     * Set gallery initial state and add listeners.
     */
    const initGallery = () => {
      [].forEach.call(filterLinks, link => {
        if (link.getAttribute(dataAttrName) === topic) {
          activateLink(link);
        } else {
          deactivateLink(link);
        }

        link.addEventListener('click', filterLinkHandler);
      });

      [].forEach.call(filterItems, item => {
        activateItem(item);
      });
    };

    document.addEventListener('DOMContentLoaded', initGallery);
  }
})(document);
