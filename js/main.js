'use strict';

(function () {
  const map = window.elements.map;
  const showSuccessMessage = window.form.showSuccessMessage;
  const showErrorMessage = window.form.showErrorMessage;
  const disablePage = window.activatePage.disablePage;
  const upload = window.load.upload;
  const adForm = window.elements.adForm;
  const adFormReset = window.elements.adFormReset;

  disablePage();

  map.addEventListener(`click`, window.map.pinClickHandler);

  adFormReset.addEventListener(`click`, disablePage);

  adForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    upload(new FormData(adForm), function () {
      adForm.reset();
      disablePage();
      showSuccessMessage();
    }, showErrorMessage);
  });
})();
