'use strict';

const ENTER_KEY = window.consts.ENTER_KEY;

const map = window.elements.map;
const mapPinMain = window.elements.mapPinMain;
const adForm = window.elements.adForm;
const adFormElements = window.elements.adFormElements;
const mapFiltersElements = window.elements.mapFiltersElements;
const setAddress = window.form.setAddress;
const addAttribute = window.utils.addAttribute;
const removeAttribute = window.utils.removeAttribute;
const onMainPinMove = window.map.onMainPinMove;
const load = window.backend.load;
const appendPins = window.map.appendPins;
const removePins = window.map.removePins;
const resetPreviews = window.avatar.resetPreviews;
const mapFiltersForm = window.elements.mapFiltersForm;

const disablePage = (evt) => {
  if (evt) {
    evt.preventDefault();
  }
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  addAttribute(adFormElements, `disabled`);
  addAttribute(mapFiltersElements, `disabled`);
  removePins();
  adForm.reset();
  mapFiltersForm.reset();

  const card = document.querySelector(`.map__card`);
  if (card) {
    card.remove();
  }

  setAddress(false, true);
  resetPreviews();

  mapPinMain.addEventListener(`mousedown`, onClickStartPage);
  mapPinMain.addEventListener(`keydown`, onClickStartPage);
};

const activatePage = () => {
  load(appendPins, onError);

  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  removeAttribute(adFormElements, `disabled`);
  removeAttribute(mapFiltersElements, `disabled`);

  mapPinMain.removeEventListener(`mousedown`, onClickStartPage);
  mapPinMain.removeEventListener(`keydown`, onClickStartPage);

  setAddress(true);

  mapPinMain.addEventListener(`mousedown`, onMainPinMove);
};

const onClickStartPage = (evt) => {
  if (evt.button === 0 || evt.key === ENTER_KEY) {
    evt.preventDefault();
    activatePage();
  }
};

const onError = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: #f0f0ea; vertical-align: middle`;
  node.style.position = `absolute`;
  node.style.width = `80%`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.top = `30px`;
  node.style.fontSize = `30px`;

  node.textContent = `${errorMessage}.
    Укажите местоположение вашего объявления без соседних`;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.activatePage = {
  disablePage
};
