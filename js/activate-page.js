'use strict';

(function () {
  const ENTER_KEY = window.consts.ENTER_KEY;
  const map = window.elements.map;
  const mapPinMain = window.elements.mapPinMain;
  const adForm = window.elements.adForm;
  const adFormElements = window.elements.adFormElements;
  const mapFiltersElements = window.elements.mapFiltersElements;
  const setAddress = window.form.setAddress;
  const addAttribute = window.utils.addAttribute;
  const removeAttribute = window.utils.removeAttribute;
  const mainPinMove = window.map.mainPinMove;

  function disabledPage() {
    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    addAttribute(adFormElements, `disabled`);
    addAttribute(mapFiltersElements, `disabled`);

    setAddress(false);
  }

  function activatePage() {
    window.map.appendPins();

    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    removeAttribute(adFormElements, `disabled`);
    removeAttribute(mapFiltersElements, `disabled`);

    mapPinMain.removeEventListener(`mousedown`, clickStartPage);
    mapPinMain.removeEventListener(`keydown`, clickStartPage);

    setAddress(true);

    mapPinMain.addEventListener(`mousedown`, mainPinMove);
  }

  function clickStartPage(evt) {
    if (evt.button === 0 || evt.key === ENTER_KEY) {
      evt.preventDefault();
      activatePage();
    }
  }

  window.activatePage = {
    disabledPage,
    clickStartPage
  };
})();
