'use strict';

(function () {
  const MAIN_PIN_ARROW = window.consts.MAIN_PIN_ARROW;
  const MIN_TITLE_LENGTH = window.consts.MIN_TITLE_LENGTH;
  const MAX_TITLE_LENGTH = window.consts.MAX_TITLE_LENGTH;
  const MAX_PRICE = window.consts.MAX_PRICE;

  const adForm = window.elements.adForm;
  const addressForm = window.elements.addressForm;
  const titleForm = window.elements.titleForm;
  const priceForm = window.elements.priceForm;
  const roomNumberForm = window.elements.roomNumberForm;
  const capacityForm = window.elements.capacityForm;
  const timeInForm = window.elements.timeInForm;
  const timeOutForm = window.elements.timeOutForm;
  const avatarInputForm = window.elements.avatarInputForm;
  const imagesInputForm = window.elements.imagesInputForm;
  const typeForm = window.elements.typeForm;
  const mapPinMain = window.elements.mapPinMain;

  let typeOfHouse = `flat`;

  const typeOfPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

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

  addressForm.setAttribute(`readonly`, ``);
  titleForm.setAttribute(`required`, ``);
  priceForm.setAttribute(`required`, ``);
  avatarInputForm.setAttribute(`accept`, `image/*`);
  imagesInputForm.setAttribute(`accept`, `image/*`);
  adForm.action = `https://21.javascript.pages.academy/keksobooking`;

  function setAddress(isActive) {
    const left = mapPinMain.offsetLeft;
    const top = mapPinMain.offsetTop;
    const width = mapPinMain.clientWidth;
    const height = mapPinMain.clientHeight;

    const coordX = Math.round(left + width / 2);
    const coordY = isActive ? Math.round(top + MAIN_PIN_ARROW + height) : Math.round(top + height / 2);

    addressForm.value = `${coordX}, ${coordY}`;
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

  window.form = {
    setAddress
  };
})();
