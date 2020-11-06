'use strict';

(function () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function getRandomIntInclusive(minValue, maxValue) {
    const min = Math.ceil(minValue);
    const max = Math.floor(maxValue);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addAttribute(elements, attribute) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute(attribute, ``);
    }
  }

  function removeAttribute(elements, attribute) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].removeAttribute(attribute);
    }
  }

  window.utils = {
    getRandomInt,
    getRandomIntInclusive,
    removeAttribute,
    addAttribute
  };
})();
