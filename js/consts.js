'use strict';

(function () {
  const TYPES = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };

  const OFFSET_X = 25;
  const OFFSET_Y = 70;
  const ENTER_KEY = `Enter`;
  const ESC_KEY = `Escape`;
  const MAIN_PIN_ARROW = 16;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;

  window.consts = {
    TYPES,
    OFFSET_X,
    OFFSET_Y,
    ENTER_KEY,
    ESC_KEY,
    MAIN_PIN_ARROW,
    MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH,
    MAX_PRICE
  };
})();
