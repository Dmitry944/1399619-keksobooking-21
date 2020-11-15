'use strict';

const MAX_PINS = window.consts.MAX_PINS;
const URLS = {
  DATA: `https://21.javascript.pages.academy/keksobooking/data`,
  UPLOAD: `https://21.javascript.pages.academy/keksobooking`
};
const Methods = {
  GET: `GET`,
  POST: `POST`
};
const TIMEOUT = 10000;
const StatusCode = {
  OK: 200
};

const load = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      window.offers = xhr.response;
      window.sortedOffers = xhr.response.slice(0, MAX_PINS);
      onSuccess(window.sortedOffers);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.open(Methods.GET, URLS.DATA);
  xhr.send();
};

const upload = (data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess();
    } else {
      onError();
    }
  });

  xhr.addEventListener(`error`, onError);

  xhr.addEventListener(`timeout`, onError);

  xhr.open(Methods.POST, URLS.UPLOAD);
  xhr.send(data);
};

window.backend = {
  load,
  upload
};
