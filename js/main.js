'use strict';

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

// получение случайного значения из массива
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Максимум и минимум включаются
function getRandomIntInclusive(minValue, maxValue) {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const mapFilters = document.querySelector(`.map__filters-container`);
map.classList.remove(`map--faded`);

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

const offerObjectsArr = createOffersArray();

const pinTemplate = document.querySelector(`#pin`);

function createPinElement(offerObject) {
  const pinElement = pinTemplate.content.cloneNode(true);
  const mapPin = pinElement.querySelector(`.map__pin`);

  mapPin.style.cssText = `left: ${offerObject.location.x - OFFSET_X}px; top: ${offerObject.location.y - OFFSET_Y}px;`;

  const mapPinImg = mapPin.querySelector(`img`);
  mapPinImg.alt = offerObject.offer.title;
  mapPinImg.src = offerObject.author.avatar;

  return pinElement;
}

function appendPins() {
  const offerObject = document.createDocumentFragment();

  for (let i = 0; i < offerObjectsArr.length; i++) {
    offerObject.appendChild(createPinElement(offerObjectsArr[i]));
  }

  mapPins.appendChild(offerObject);
}

appendPins();

const cardTemplate = document.querySelector(`#card`);
const firstOffer = offerObjectsArr[0];

function createCardElement() {
  const cardElement = cardTemplate.content.cloneNode(true);
  const offerTitle = cardElement.querySelector(`.popup__title`);
  const offerAddress = cardElement.querySelector(`.popup__text--address`);
  const offerPrice = cardElement.querySelector(`.popup__text--price`);
  const offerType = cardElement.querySelector(`.popup__type`);
  const offerTextCapacity = cardElement.querySelector(`.popup__text--capacity`);
  const offerTextTime = cardElement.querySelector(`.popup__text--time`);
  const offerFeaturesList = cardElement.querySelector(`.popup__features`);
  const offerDescription = cardElement.querySelector(`.popup__description`);
  const offerPhotosList = cardElement.querySelector(`.popup__photos`);
  const offerAvatar = cardElement.querySelector(`.popup__avatar`);

  offerTitle.textContent = firstOffer.offer.title;
  offerAddress.textContent = firstOffer.offer.address;
  offerPrice.textContent = `${firstOffer.offer.price}₽/ночь`;
  offerType.textContent = TYPES[firstOffer.offer.type];
  offerTextCapacity.textContent = `${firstOffer.offer.rooms} комнаты для ${firstOffer.offer.guests} гостей`;
  offerTextTime.textContent = `Заезд после ${firstOffer.offer.checkin}, выезд до ${firstOffer.offer.checkout}`;
  offerDescription.textContent = firstOffer.offer.description;
  offerAvatar.src = firstOffer.author.avatar;

  offerFeaturesList.innerHTML = ``;
  for (let i = 0; i < firstOffer.offer.features.length; i++) {
    const item = document.createElement(`li`);
    item.classList.add(`popup__feature`, `popup__feature--${firstOffer.offer.features[i]}`);
    offerFeaturesList.appendChild(item);
  }

  offerPhotosList.innerHTML = ``;
  for (let i = 0; i < firstOffer.offer.photos.length; i++) {
    const img = document.createElement(`img`);
    img.classList.add(`popup__photo`);
    img.width = 45;
    img.height = 40;
    img.alt = `Фотография жилья`;
    img.src = firstOffer.offer.photos[i];
    offerPhotosList.appendChild(img);
  }

  return cardElement;
}

map.insertBefore(createCardElement(), mapFilters);
