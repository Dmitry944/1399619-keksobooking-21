'use strict';

(function () {
  const ESC_KEY = window.consts.ESC_KEY;

  const map = window.elements.map;
  const mapPins = window.elements.mapPins;
  const mapFilters = window.elements.mapFilters;
  const createCardElement = window.card.createCardElement;
  const offerObjectsArr = window.data.createOffersArray();

  function appendPins() {
    const offerObject = document.createDocumentFragment();

    for (let i = 0; i < offerObjectsArr.length; i++) {
      offerObject.appendChild(window.pin.createPinElement(offerObjectsArr[i], i));
    }

    mapPins.appendChild(offerObject);
  }

  function pinClickHandler(evt) {
    if (evt.target.classList.contains(`map__pin`) && !evt.target.classList.contains(`map__pin--main`)) {
      closeCard();
      openCard(createCardElement(offerObjectsArr[evt.target.dataset.id]));
      evt.target.classList.add(`map__pin--active`);
    } else if (evt.target.parentElement.classList.contains(`map__pin`) && !evt.target.parentElement.classList.contains(`map__pin--main`)) {
      closeCard();
      openCard(createCardElement(offerObjectsArr[evt.target.parentElement.dataset.id]));
      evt.target.parentElement.classList.add(`map__pin--active`);
    }
  }

  function openCard(cardElement) {
    const closeButton = cardElement.querySelector(`.popup__close`);
    closeButton.addEventListener(`click`, closeCard);
    document.addEventListener(`keydown`, closeCardByEsc);

    map.insertBefore(cardElement, mapFilters);
  }

  function closeCard() {
    const mapCard = map.querySelector(`.map__card`);
    const activePin = map.querySelector(`.map__pin--active`);

    if (mapCard) {
      const closeButton = mapCard.querySelector(`.popup__close`);
      closeButton.removeEventListener(`click`, closeCard);
      document.removeEventListener(`keydown`, closeCardByEsc);
      mapCard.remove();
    }

    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  }

  function closeCardByEsc(evt) {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      closeCard();
    }
  }

  window.map = {
    appendPins,
    pinClickHandler
  };
})();
