'use strict';

(function () {
  const OFFSET_Y = window.consts.OFFSET_Y;
  const OFFSET_X = window.consts.OFFSET_X;

  const pinTemplate = document.querySelector(`#pin`);

  function createPinElement(offerObject, index) {
    const pinElement = pinTemplate.content.cloneNode(true);
    const mapPin = pinElement.querySelector(`.map__pin`);
    mapPin.dataset.id = index;

    mapPin.style.cssText = `left: ${offerObject.location.x - OFFSET_X}px; top: ${offerObject.location.y - OFFSET_Y}px;`;

    const mapPinImg = mapPin.querySelector(`img`);
    mapPinImg.alt = offerObject.offer.title;
    mapPinImg.src = offerObject.author.avatar;

    return pinElement;
  }

  window.pin = {
    createPinElement
  };
})();
