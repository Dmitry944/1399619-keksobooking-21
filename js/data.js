'use strict';

(function () {
  const TIMES = window.consts.TIMES;
  const TYPES_KEYS = window.consts.TYPES_KEYS;
  const TITLES = window.consts.TITLES;
  const FEATURES = window.consts.FEATURES;
  const PHOTOS = window.consts.PHOTOS;
  const ADRESSES = window.consts.ADRESSES;
  const PRICES = window.consts.PRICES;
  const ROOMS = window.consts.ROOMS;
  const GUESTS = window.consts.GUESTS;
  const DESCRIPTIONS = window.consts.DESCRIPTIONS;
  const MIN_LOCATION_Y = window.consts.MIN_LOCATION_Y;
  const MAX_LOCATION_Y = window.consts.MAX_LOCATION_Y;
  const MIN_LOCATION_X = window.consts.MIN_LOCATION_X;
  const ARRAY_COUNT = window.consts.ARRAY_COUNT;
  const OFFSET_X = window.consts.OFFSET_X;

  const map = window.elements.map;
  const getRandomInt = window.utils.getRandomInt;
  const getRandomIntInclusive = window.utils.getRandomIntInclusive;

  function createObject(count) {
    const featuresLength = getRandomIntInclusive(1, FEATURES.length);
    const newFeatures = [];
    const photosLength = getRandomIntInclusive(1, PHOTOS.length);
    const newPhotos = [];

    for (let i = 0; i < featuresLength; i++) {
      newFeatures.push(FEATURES[i]);
    }

    for (let i = 0; i < photosLength; i++) {
      newPhotos.push(PHOTOS[i]);
    }

    return {
      'author': {
        'avatar': `img/avatars/user0${count + 1}.png`
      },
      'offer': {
        'title': TITLES[getRandomInt(TITLES.length)],
        'address': ADRESSES[getRandomInt(ADRESSES.length)],
        'price': PRICES[getRandomInt(PRICES.length)],
        'type': TYPES_KEYS[getRandomInt(TYPES_KEYS.length)],
        'rooms': ROOMS[getRandomInt(ROOMS.length)],
        'guests': GUESTS[getRandomInt(GUESTS.length)],
        'checkin': TIMES[getRandomInt(TIMES.length)],
        'checkout': TIMES[getRandomInt(TIMES.length)],
        'features': newFeatures,
        'description': DESCRIPTIONS[getRandomInt(DESCRIPTIONS.length)],
        'photos': newPhotos
      },
      'location': {
        'x': getRandomIntInclusive(MIN_LOCATION_X + OFFSET_X, map.clientWidth - OFFSET_X),
        'y': getRandomIntInclusive(MIN_LOCATION_Y, MAX_LOCATION_Y)
      }
    };
  }

  function createOffersArray() {
    const offers = [];
    for (let i = 0; i < ARRAY_COUNT; i++) {
      offers.push(createObject(i));
    }
    return offers;
  }

  window.data = {
    createOffersArray
  };

})();
