'use strict';

(function () {
  const MAX_PINS = window.consts.MAX_PINS;
  const mapFiltersForm = window.elements.mapFiltersForm;
  const typeFilter = window.elements.typeFilter;
  const appendPins = window.map.appendPins;
  const removePins = window.map.removePins;
  const closeCard = window.map.closeCard;

  function checkType(offer) {
    return typeFilter.value === `any` ? true : offer.offer.type === typeFilter.value;
  }

  function getAmountOffers(offers) {
    const sortedOffers = offers.slice(0, MAX_PINS);
    window.sortedOffers = sortedOffers;

    return sortedOffers;
  }

  function updateFilters(offers) {
    const filteredOffers = offers.filter(function (offer) {
      return checkType(offer);
    });

    return getAmountOffers(filteredOffers);
  }

  mapFiltersForm.addEventListener(`change`, function () {
    removePins();
    closeCard();
    appendPins(updateFilters(window.offers));
  });

})();
