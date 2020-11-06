'use strict';

(function () {
  const map = window.elements.map;
  const mapPinMain = window.elements.mapPinMain;
  const clickStartPage = window.activatePage.clickStartPage;

  window.activatePage.disabledPage();

  mapPinMain.addEventListener(`mousedown`, clickStartPage);
  mapPinMain.addEventListener(`keydown`, clickStartPage);

  map.addEventListener(`click`, window.map.pinClickHandler);
})();
