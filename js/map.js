'use strict';

(function () {
  const ESC_KEY = window.consts.ESC_KEY;
  const MAIN_PIN_ARROW = window.consts.MAIN_PIN_ARROW;

  const map = window.elements.map;
  const mapPins = window.elements.mapPins;
  const mapPinMain = window.elements.mapPinMain;
  const mapFilters = window.elements.mapFilters;
  const createCardElement = window.card.createCardElement;
  const setAddress = window.form.setAddress;

  const Coordinates = {
    x: {
      min: 0,
      max: map.offsetWidth
    },
    y: {
      min: 130,
      max: 630
    }
  };

  function appendPins(offerObjectsArr) {
    const offerObject = document.createDocumentFragment();

    for (let i = 0; i < offerObjectsArr.length; i++) {
      offerObject.appendChild(window.pin.createPinElement(offerObjectsArr[i], i));
    }

    mapPins.appendChild(offerObject);
  }

  function removePins() {
    const pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach(function (pin) {
      pin.remove();
    });
  }

  function pinClickHandler(evt) {
    if (evt.target.classList.contains(`map__pin`) && !evt.target.classList.contains(`map__pin--main`)) {
      closeCard();
      openCard(createCardElement(window.offers[evt.target.dataset.id]));
      evt.target.classList.add(`map__pin--active`);
    } else if (evt.target.parentElement.classList.contains(`map__pin`) && !evt.target.parentElement.classList.contains(`map__pin--main`)) {
      closeCard();
      openCard(createCardElement(window.offers[evt.target.parentElement.dataset.id]));
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

  function mainPinMove(evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + `px`;
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + `px`;

      if (mapPinMain.offsetLeft < Coordinates.x.min - mapPinMain.offsetWidth / 2) {
        mapPinMain.style.left = (Coordinates.x.min - mapPinMain.offsetWidth / 2) + `px`;
      } else if (mapPinMain.offsetLeft > Coordinates.x.max - mapPinMain.offsetWidth / 2) {
        mapPinMain.style.left = (Coordinates.x.max - mapPinMain.offsetWidth / 2) + `px`;
      }

      if (mapPinMain.offsetTop < Coordinates.y.min - mapPinMain.offsetHeight - MAIN_PIN_ARROW) {
        mapPinMain.style.top = Coordinates.y.min - mapPinMain.offsetHeight - MAIN_PIN_ARROW + `px`;
      } else if (mapPinMain.offsetTop > Coordinates.y.max - mapPinMain.offsetHeight - MAIN_PIN_ARROW) {
        mapPinMain.style.top = Coordinates.y.max - mapPinMain.offsetHeight - MAIN_PIN_ARROW + `px`;
      }

      setAddress(true);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }

  window.map = {
    appendPins,
    pinClickHandler,
    mainPinMove,
    removePins
  };

})();
