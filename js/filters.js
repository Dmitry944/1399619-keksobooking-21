'use strict';

const MAX_PINS = window.consts.MAX_PINS;
const LOW_PRICE = window.consts.LOW_PRICE;
const HIGH_PRICE = window.consts.HIGH_PRICE;

const mapFiltersForm = window.elements.mapFiltersForm;
const typeFilter = window.elements.typeFilter;
const priceFilter = window.elements.priceFilter;
const roomsFilter = window.elements.roomsFilter;
const guestsFilter = window.elements.guestsFilter;
const appendPins = window.map.appendPins;
const removePins = window.map.removePins;
const onCloseCard = window.map.onCloseCard;

const debounce = window.debounce(appendPins);

const checkType = (offer) => {
  return typeFilter.value === `any` ? true : offer.offer.type === typeFilter.value;
};

const checkPrice = (offer) => {
  const price = offer.offer.price;

  switch (priceFilter.value) {
    case `low`:
      return price < LOW_PRICE;
    case `middle`:
      return price >= LOW_PRICE && price <= HIGH_PRICE;
    case `high`:
      return price > HIGH_PRICE;
    default:
      return true;
  }
};

const checkRooms = (offer) => {
  return roomsFilter.value === `any` ? true : offer.offer.rooms.toString() === roomsFilter.value;
};

const checkGuests = (offer) => {
  return guestsFilter.value === `any` ? true : offer.offer.guests.toString() === guestsFilter.value;
};

const checkFeatures = (offer) => {
  let housingCheckbox = document.querySelectorAll(`.map__checkbox:checked`);

  return Array.from(housingCheckbox).every((feature) => {
    return offer.offer.features.indexOf(feature.value) >= 0;
  });
};

const getAmountOffers = (offers) => {
  const sortedOffers = offers.slice(0, MAX_PINS);
  window.sortedOffers = sortedOffers;

  return sortedOffers;
};

const updateFilters = (offers) => {
  const filteredOffers = offers.filter((offer) => {
    return checkType(offer) && checkPrice(offer) && checkRooms(offer) && checkGuests(offer) && checkFeatures(offer);
  });

  return getAmountOffers(filteredOffers);
};

mapFiltersForm.addEventListener(`change`, () => {
  removePins();
  onCloseCard();
  debounce(updateFilters(window.offers));
});
