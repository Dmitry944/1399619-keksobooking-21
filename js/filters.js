'use strict';

(function () {
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
  const closeCard = window.map.closeCard;

  const debounce = window.debounce(appendPins);

  function checkType(offer) {
    return typeFilter.value === `any` ? true : offer.offer.type === typeFilter.value;
  }

  function checkPrice(offer) {
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
  }

  function checkRooms(offer) {
    return roomsFilter.value === `any` ? true : offer.offer.rooms.toString() === roomsFilter.value;
  }

  function checkGuests(offer) {
    return guestsFilter.value === `any` ? true : offer.offer.guests.toString() === guestsFilter.value;
  }

  function checkFeatures(offer) {
    let housingCheckbox = document.querySelectorAll(`.map__checkbox:checked`);

    return Array.from(housingCheckbox).every(function (feature) {
      return offer.offer.features.indexOf(feature.value) >= 0;
    });
  }

  function getAmountOffers(offers) {
    const sortedOffers = offers.slice(0, MAX_PINS);
    window.sortedOffers = sortedOffers;

    return sortedOffers;
  }

  function updateFilters(offers) {
    const filteredOffers = offers.filter(function (offer) {
      return checkType(offer) && checkPrice(offer) && checkRooms(offer) && checkGuests(offer) && checkFeatures(offer);
    });

    return getAmountOffers(filteredOffers);
  }

  mapFiltersForm.addEventListener(`change`, function () {
    removePins();
    closeCard();
    debounce(updateFilters(window.offers));
  });

})();
