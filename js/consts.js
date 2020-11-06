'use strict';

(function () {
  const TIMES = [`12:00`, `13:00`, `14:00`];
  const TYPES = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };
  const TYPES_KEYS = Object.keys(TYPES);
  const TITLES = [`Квартира не дорого`, `Сдам квартиру`, `Аренда квартиры`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const ADRESSES = [`600, 250`, `500, 350`, `500, 250`, `400, 150`];
  const PRICES = [10000, 15000, 20000, 25000];
  const ROOMS = [1, 2, 3, 4];
  const GUESTS = [1, 2, 3, 4, 5];
  const DESCRIPTIONS = [`Очень удобная квартира`, `Большая квартира с видом на парк`, `Квартира недалеко от метро`];
  const MIN_LOCATION_Y = 130;
  const MAX_LOCATION_Y = 630;
  const MIN_LOCATION_X = 0;
  const ARRAY_COUNT = 8;
  const OFFSET_X = 25;
  const OFFSET_Y = 70;
  const ENTER_KEY = `Enter`;
  const ESC_KEY = `Escape`;
  const MAIN_PIN_ARROW = 16;
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;

  window.consts = {
    TIMES,
    TYPES,
    TYPES_KEYS,
    TITLES,
    FEATURES,
    PHOTOS,
    ADRESSES,
    PRICES,
    ROOMS,
    GUESTS,
    DESCRIPTIONS,
    MIN_LOCATION_Y,
    MAX_LOCATION_Y,
    MIN_LOCATION_X,
    ARRAY_COUNT,
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
