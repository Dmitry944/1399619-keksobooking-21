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
const ENTER_KEY = `Enter`;
const ESC_KEY = `Escape`;
const MAIN_PIN_ARROW = 16;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;


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
const mapPinMain = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const adFormElements = adForm.querySelectorAll(`.ad-form__element, .ad-form-header`);
const addressForm = adForm.querySelector(`#address`);
const titleForm = adForm.querySelector(`#title`);
const typeForm = adForm.querySelector(`#type`);
const priceForm = adForm.querySelector(`#price`);
const roomNumberForm = adForm.querySelector(`#room_number`);
const capacityForm = adForm.querySelector(`#capacity`);
const timeInForm = adForm.querySelector(`#timein`);
const timeOutForm = adForm.querySelector(`#timeout`);
const avatarInputForm = adForm.querySelector(`#avatar`);
const imagesInputForm = adForm.querySelector(`#images`);
const mapFilters = document.querySelector(`.map__filters-container`);
const mapFiltersElements = mapFilters.querySelectorAll(`.map__filter, .map__features`);


addressForm.setAttribute(`readonly`, ``);
titleForm.setAttribute(`required`, ``);
priceForm.setAttribute(`required`, ``);
avatarInputForm.setAttribute(`accept`, `image/*`);
imagesInputForm.setAttribute(`accept`, `image/*`);
adForm.action = `https://21.javascript.pages.academy/keksobooking`;


function addAttribute(elements, attribute) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].setAttribute(attribute, ``);
  }
}

function removeAttribute(elements, attribute) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].removeAttribute(attribute);
  }
}

function disabledPage() {
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  addAttribute(adFormElements, `disabled`);
  addAttribute(mapFiltersElements, `disabled`);

  setAddress(false);
}

disabledPage();

function activatePage() {
  appendPins();

  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  removeAttribute(adFormElements, `disabled`);
  removeAttribute(mapFiltersElements, `disabled`);

  mapPinMain.removeEventListener(`mousedown`, clickStartPage);
  mapPinMain.removeEventListener(`keydown`, clickStartPage);

  setAddress(true);
}

function clickStartPage(evt) {
  if (evt.button === 0 || evt.key === ENTER_KEY) {
    evt.preventDefault();
    activatePage();
  }
}

mapPinMain.addEventListener(`mousedown`, clickStartPage);
mapPinMain.addEventListener(`keydown`, clickStartPage);

function setAddress(isActive) {
  const left = mapPinMain.offsetLeft;
  const top = mapPinMain.offsetTop;
  const width = mapPinMain.clientWidth;
  const height = mapPinMain.clientHeight;

  const coordX = Math.round(left + width / 2);
  const coordY = isActive ? Math.round(top + MAIN_PIN_ARROW + height) : Math.round(top + height / 2);

  addressForm.value = `${coordX}, ${coordY}`;
}

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

function appendPins() {
  const offerObject = document.createDocumentFragment();

  for (let i = 0; i < offerObjectsArr.length; i++) {
    offerObject.appendChild(createPinElement(offerObjectsArr[i], i));
  }

  mapPins.appendChild(offerObject);
}

const cardTemplate = document.querySelector(`#card`);

function createCardElement(offerObject) {
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

  offerTitle.textContent = offerObject.offer.title;
  offerAddress.textContent = offerObject.offer.address;
  offerPrice.textContent = `${offerObject.offer.price}₽/ночь`;
  offerType.textContent = TYPES[offerObject.offer.type];
  offerTextCapacity.textContent = `${offerObject.offer.rooms} комнаты для ${offerObject.offer.guests} гостей`;
  offerTextTime.textContent = `Заезд после ${offerObject.offer.checkin}, выезд до ${offerObject.offer.checkout}`;
  offerDescription.textContent = offerObject.offer.description;
  offerAvatar.src = offerObject.author.avatar;

  offerFeaturesList.innerHTML = ``;
  for (let i = 0; i < offerObject.offer.features.length; i++) {
    const item = document.createElement(`li`);
    item.classList.add(`popup__feature`, `popup__feature--${offerObject.offer.features[i]}`);
    offerFeaturesList.appendChild(item);
  }

  offerPhotosList.innerHTML = ``;
  for (let i = 0; i < offerObject.offer.photos.length; i++) {
    const img = document.createElement(`img`);
    img.classList.add(`popup__photo`);
    img.width = 45;
    img.height = 40;
    img.alt = `Фотография жилья`;
    img.src = offerObject.offer.photos[i];
    offerPhotosList.appendChild(img);
  }

  return cardElement;
}

titleForm.addEventListener(`input`, function (evt) {
  const inputLength = evt.target.value.length;

  if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity(`Поле обязательно для заполнения`);
  } else if (inputLength < MIN_TITLE_LENGTH) {
    evt.target.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - inputLength} символов`);
  } else if (inputLength > MAX_TITLE_LENGTH) {
    evt.target.setCustomValidity(`Необходимо уменьшить на ${inputLength - MAX_TITLE_LENGTH} символов`);
  } else {
    evt.target.setCustomValidity(``);
  }

  evt.target.reportValidity();
});

let typeOfHouse = `flat`;

const typeOfPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

priceForm.placeholder = typeOfPrice[typeOfHouse];

function priceValidation(target) {
  const value = target.value;


  if (target.validity.valueMissing) {
    target.setCustomValidity(`Поле обязательно для заполнения`);
  } else if (value < typeOfPrice[typeOfHouse]) {
    target.setCustomValidity(`Минимальная цена ${typeOfPrice[typeOfHouse]}`);
  } else if (value > MAX_PRICE) {
    target.setCustomValidity(`Максимальная цена ${MAX_PRICE}`);
  } else {
    target.setCustomValidity(``);
  }

  target.reportValidity();
}

priceForm.addEventListener(`input`, function (evt) {
  priceValidation(evt.target);
});

typeForm.addEventListener(`change`, function (evt) {
  typeOfHouse = evt.target.value;
  priceForm.placeholder = typeOfPrice[evt.target.value];

  priceValidation(priceForm);
});

let typeOfRoom = `1`;

const roomsOfGuests = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};

const roomsValidationText = {
  '1': `Только на одного гостя`,
  '2': `Только на одного или двух гостей`,
  '3': `Только на одного, двух или трех гостей`,
  '100': `Только не для гостей`
};

function roomsValidation(target) {
  const value = target.value;
  const isValid = roomsOfGuests[typeOfRoom].some(function (elem) {
    return elem === value;
  });
  if (!isValid) {
    target.setCustomValidity(roomsValidationText[typeOfRoom]);
  } else {
    target.setCustomValidity(``);
  }

  target.reportValidity();
}

roomNumberForm.addEventListener(`change`, function (evt) {
  typeOfRoom = evt.target.value;

  roomsValidation(capacityForm);
});

capacityForm.addEventListener(`change`, function (evt) {
  roomsValidation(evt.target);
});

timeInForm.addEventListener(`change`, function (evt) {
  timeOutForm.value = evt.target.value;
});

timeOutForm.addEventListener(`change`, function (evt) {
  timeInForm.value = evt.target.value;
});

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

map.addEventListener(`click`, pinClickHandler);
