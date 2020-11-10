'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const Methods = {
    GET: `GET`,
    POST: `POST`
  };
  const TIMEOUT = 10000;
  const StatusCode = {
    OK: 200
  };


  function upload(onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        window.offers = xhr.response;
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.open(Methods.GET, URL);
    xhr.send();
  }


  window.load = {
    upload
  };

})();
