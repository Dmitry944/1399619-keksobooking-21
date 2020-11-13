'use strict';

(function () {
  const main = document.querySelector(`main`);
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
  const mapFiltersForm = document.querySelector(`.map__filters`);
  const typeFilter = mapFiltersForm.querySelector(`#housing-type`);
  const priceFilter = mapFiltersForm.querySelector(`#housing-price`);
  const roomsFilter = mapFiltersForm.querySelector(`#housing-rooms`);
  const guestsFilter = mapFiltersForm.querySelector(`#housing-guests`);
  const mapFilters = document.querySelector(`.map__filters-container`);
  const mapFiltersElements = mapFilters.querySelectorAll(`.map__filter, .map__features`);
  const successMessage = document.querySelector(`#success`);
  const errorMessage = document.querySelector(`#error`);
  const adFormReset = adForm.querySelector(`.ad-form__reset`);


  window.elements = {
    main,
    map,
    mapPins,
    mapPinMain,
    adForm,
    adFormElements,
    addressForm,
    titleForm,
    typeForm,
    priceForm,
    roomNumberForm,
    capacityForm,
    timeInForm,
    timeOutForm,
    avatarInputForm,
    imagesInputForm,
    mapFilters,
    mapFiltersElements,
    successMessage,
    errorMessage,
    adFormReset,
    mapFiltersForm,
    typeFilter,
    priceFilter,
    roomsFilter,
    guestsFilter
  };
})();
