'use strict';

const TYPES = window.consts.TYPES;

const cardTemplate = document.querySelector(`#card`);

const createElement = (offerObject) => {
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
  offerObject.offer.features.forEach((feature) => {
    const item = document.createElement(`li`);
    item.classList.add(`popup__feature`, `popup__feature--${feature}`);
    offerFeaturesList.appendChild(item);
  });

  offerPhotosList.innerHTML = ``;
  offerObject.offer.photos.forEach((photo) => {
    const img = document.createElement(`img`);
    img.classList.add(`popup__photo`);
    img.width = 45;
    img.height = 40;
    img.alt = `Фотография жилья`;
    img.src = photo;
    offerPhotosList.appendChild(img);
  });

  return cardElement;
};

window.card = {
  createElement
};
