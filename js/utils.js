'use strict';

const addAttribute = (elements, attribute) => {
  Array.from(elements).forEach((element) => {
    element.setAttribute(attribute, ``);
  });
};

const removeAttribute = (elements, attribute) => {
  Array.from(elements).forEach((element) => {
    element.removeAttribute(attribute);
  });
};

window.utils = {
  removeAttribute,
  addAttribute
};
