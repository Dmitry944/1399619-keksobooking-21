'use strict';

const map = window.elements.map;
const showSuccessMessage = window.form.showSuccessMessage;
const showErrorMessage = window.form.showErrorMessage;
const disablePage = window.activatePage.disablePage;
const upload = window.backend.upload;
const adForm = window.elements.adForm;
const adFormReset = window.elements.adFormReset;

disablePage();

map.addEventListener(`click`, window.map.onPinClick);

adFormReset.addEventListener(`click`, disablePage);

adForm.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  upload(new FormData(adForm), () => {
    disablePage();
    showSuccessMessage();
  }, showErrorMessage);
});
