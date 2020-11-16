(()=>{"use strict";window.consts={TYPES:{palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},OFFSET_X:25,OFFSET_Y:70,ENTER_KEY:"Enter",ESC_KEY:"Escape",MAIN_PIN_ARROW:16,MIN_TITLE_LENGTH:30,MAX_TITLE_LENGTH:100,MAX_PRICE:1e6,MAX_PINS:5,DEBOUNCE_INTERVAL:500,LOW_PRICE:1e4,HIGH_PRICE:5e4,FILE_TYPES:["gif","jpg","jpeg","png"],PHOTO_SIZE:70,PHOTO_ALT:"Фоторафия жилья"},(()=>{const e=document.querySelector("main"),t=document.querySelector(".map"),o=document.querySelector(".map__pins"),n=document.querySelector(".map__pin--main"),r=document.querySelector(".ad-form"),s=r.querySelectorAll(".ad-form__element, .ad-form-header"),i=r.querySelector("#address"),a=r.querySelector("#title"),d=r.querySelector("#type"),c=r.querySelector("#price"),l=r.querySelector("#room_number"),m=r.querySelector("#capacity"),u=r.querySelector("#timein"),p=r.querySelector("#timeout"),w=r.querySelector("#avatar"),f=r.querySelector("#images"),v=document.querySelector(".map__filters"),y=v.querySelector("#housing-type"),_=v.querySelector("#housing-price"),E=v.querySelector("#housing-rooms"),g=v.querySelector("#housing-guests"),h=document.querySelector(".map__filters-container"),L=h.querySelectorAll(".map__filter, .map__features"),S=document.querySelector("#success"),q=document.querySelector("#error"),F=r.querySelector(".ad-form__reset"),C=document.querySelector(".ad-form__field input[type=file]"),P=document.querySelector(".ad-form-header__preview img"),T=document.querySelector(".ad-form__upload input[type=file]"),M=document.querySelector(".ad-form__photo");window.elements={main:e,map:t,mapPins:o,mapPinMain:n,adForm:r,adFormElements:s,addressForm:i,titleForm:a,typeForm:d,priceForm:c,roomNumberForm:l,capacityForm:m,timeInForm:u,timeOutForm:p,avatarInputForm:w,imagesInputForm:f,mapFilters:h,mapFiltersElements:L,successMessage:S,errorMessage:q,adFormReset:F,mapFiltersForm:v,typeFilter:y,priceFilter:_,roomsFilter:E,guestsFilter:g,avatarChooser:C,avatarPreview:P,photoChooser:T,photoPreview:M}})(),(()=>{const e=window.consts.FILE_TYPES,t=window.consts.PHOTO_SIZE,o=window.consts.PHOTO_ALT,n=window.elements.avatarChooser,r=window.elements.avatarPreview,s=window.elements.photoChooser,i=window.elements.photoPreview,a=(t,o)=>{const n=t.target.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result})),e.readAsDataURL(n)}};n.addEventListener("change",(e=>{a(e,r)})),s.addEventListener("change",(e=>{const n=document.createElement("img");n.width=t,n.height=t,n.alt=o,i.appendChild(n),a(e,n)})),window.avatar={resetPreviews:()=>{r.src="img/muffin-grey.svg",i.innerHTML=""}}})(),(()=>{const e=window.consts.DEBOUNCE_INTERVAL;window.debounce=t=>{let o=null;return(...n)=>{o&&window.clearTimeout(o),o=window.setTimeout((()=>{t(...n)}),e)}}})(),(()=>{const e=window.consts.MAX_PINS,t="https://21.javascript.pages.academy/keksobooking/data",o="https://21.javascript.pages.academy/keksobooking",n="GET",r="POST";window.backend={load:(o,r)=>{const s=new XMLHttpRequest;s.responseType="json",s.timeout=1e4,s.addEventListener("load",(()=>{200===s.status?(window.offers=s.response,window.sortedOffers=s.response.slice(0,e),o(window.sortedOffers)):r(`Статус ответа: ${s.status} ${s.statusText}`)})),s.addEventListener("error",(()=>{r("Произошла ошибка соединения")})),s.addEventListener("timeout",(()=>{r(`Запрос не успел выполниться за ${s.timeout} мс`)})),s.open(n,t),s.send()},upload:(e,t,n)=>{const s=new XMLHttpRequest;s.responseType="json",s.addEventListener("load",(()=>{200===s.status?t():n()})),s.addEventListener("error",n),s.addEventListener("timeout",n),s.open(r,o),s.send(e)}}})(),window.utils={removeAttribute:(e,t)=>{Array.from(e).forEach((e=>{e.removeAttribute(t)}))},addAttribute:(e,t)=>{Array.from(e).forEach((e=>{e.setAttribute(t,"")}))}},(()=>{const e=window.consts.MAIN_PIN_ARROW,t=window.consts.MIN_TITLE_LENGTH,o=window.consts.MAX_TITLE_LENGTH,n=window.consts.MAX_PRICE,r=window.consts.ESC_KEY,s=window.elements.main,i=window.elements.adForm,a=window.elements.addressForm,d=window.elements.titleForm,c=window.elements.priceForm,l=window.elements.roomNumberForm,m=window.elements.capacityForm,u=window.elements.timeInForm,p=window.elements.timeOutForm,w=window.elements.avatarInputForm,f=window.elements.imagesInputForm,v=window.elements.typeForm,y=window.elements.mapPinMain,_=window.elements.successMessage,E=window.elements.errorMessage,g=y.offsetLeft,h=y.offsetTop;let L="flat";const S={bungalow:0,flat:1e3,house:5e3,palace:1e4};let q="1";const F={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},C={1:"Только на одного гостя",2:"Только на одного или двух гостей",3:"Только на одного, двух или трех гостей",100:"Только не для гостей"};a.setAttribute("readonly",""),d.setAttribute("required",""),c.setAttribute("required",""),w.setAttribute("accept","image/*"),f.setAttribute("accept","image/*"),i.action="https://21.javascript.pages.academy/keksobooking",d.addEventListener("input",(e=>{const n=e.target.value.length;e.target.validity.valueMissing?e.target.setCustomValidity("Поле обязательно для заполнения"):n<t?e.target.setCustomValidity(`Ещё ${t-n} символов`):n>o?e.target.setCustomValidity(`Необходимо уменьшить на ${n-o} символов`):e.target.setCustomValidity(""),e.target.reportValidity()})),c.placeholder=S[L];const P=e=>{const t=e.value;e.validity.valueMissing?e.setCustomValidity("Поле обязательно для заполнения"):t<S[L]?e.setCustomValidity("Минимальная цена "+S[L]):t>n?e.setCustomValidity("Максимальная цена "+n):e.setCustomValidity(""),e.reportValidity()};c.addEventListener("input",(e=>{P(e.target)})),v.addEventListener("change",(e=>{L=e.target.value,c.placeholder=S[e.target.value],P(c)}));const T=e=>{const t=e.value;F[q].some((e=>e===t))?e.setCustomValidity(""):e.setCustomValidity(C[q]),e.reportValidity()};l.addEventListener("change",(e=>{q=e.target.value,T(m)})),m.addEventListener("change",(e=>{T(e.target)})),u.addEventListener("change",(e=>{p.value=e.target.value})),p.addEventListener("change",(e=>{u.value=e.target.value}));const M=e=>{e.preventDefault();const t=s.querySelector(".success");document.removeEventListener("click",M),document.removeEventListener("keydown",b),s.removeChild(t)},b=e=>{e.key===r&&M(e)},k=e=>{e.preventDefault();const t=s.querySelector(".error"),o=t.querySelector(".error__button");document.removeEventListener("click",k),document.removeEventListener("keydown",A),o.removeEventListener("click",k),s.removeChild(t)},A=e=>{e.key===r&&k(e)};window.form={setAddress:(t,o)=>{o&&(y.style.left=g+"px",y.style.top=h+"px");const n=y.offsetLeft,r=y.offsetTop,s=y.clientWidth,i=y.clientHeight,d=Math.round(n+Math.round(s/2)),c=t?Math.round(r+e+i):Math.round(r+i/2);a.value=`${d}, ${c}`},showSuccessMessage:()=>{const e=_.content.cloneNode(!0);document.addEventListener("click",M),document.addEventListener("keydown",b),s.appendChild(e)},showErrorMessage:()=>{const e=E.content.cloneNode(!0),t=e.querySelector(".error__button");document.addEventListener("click",k),document.addEventListener("keydown",A),t.addEventListener("click",k),s.appendChild(e)}}})(),(()=>{const e=window.consts.OFFSET_Y,t=window.consts.OFFSET_X,o=document.querySelector("#pin");window.pin={createElement:(n,r)=>{const s=o.content.cloneNode(!0),i=s.querySelector(".map__pin");i.dataset.id=r,i.style.cssText=`left: ${n.location.x-t}px; top: ${n.location.y-e}px;`;const a=i.querySelector("img");return a.alt=n.offer.title,a.src=n.author.avatar,s}}})(),(()=>{const e=window.consts.TYPES,t=document.querySelector("#card");window.card={createElement:o=>{const n=t.content.cloneNode(!0),r=n.querySelector(".popup__title"),s=n.querySelector(".popup__text--address"),i=n.querySelector(".popup__text--price"),a=n.querySelector(".popup__type"),d=n.querySelector(".popup__text--capacity"),c=n.querySelector(".popup__text--time"),l=n.querySelector(".popup__features"),m=n.querySelector(".popup__description"),u=n.querySelector(".popup__photos"),p=n.querySelector(".popup__avatar");return r.textContent=o.offer.title,s.textContent=o.offer.address,i.textContent=o.offer.price+"₽/ночь",a.textContent=e[o.offer.type],d.textContent=`${o.offer.rooms} комнаты для ${o.offer.guests} гостей`,c.textContent=`Заезд после ${o.offer.checkin}, выезд до ${o.offer.checkout}`,m.textContent=o.offer.description,p.src=o.author.avatar,l.innerHTML="",o.offer.features.forEach((e=>{const t=document.createElement("li");t.classList.add("popup__feature","popup__feature--"+e),l.appendChild(t)})),u.innerHTML="",o.offer.photos.forEach((e=>{const t=document.createElement("img");t.classList.add("popup__photo"),t.width=45,t.height=40,t.alt="Фотография жилья",t.src=e,u.appendChild(t)})),n}}})(),(()=>{const e=window.consts.ESC_KEY,t=window.consts.MAIN_PIN_ARROW,o=window.elements.map,n=window.elements.mapPins,r=window.elements.mapPinMain,s=window.elements.mapFilters,i=window.card.createElement,a=window.form.setAddress,d=0,c=o.offsetWidth,l=130,m=630,u=e=>{e.querySelector(".popup__close").addEventListener("click",p),document.addEventListener("keydown",w),o.insertBefore(e,s)},p=()=>{const e=o.querySelector(".map__card"),t=o.querySelector(".map__pin--active");e&&(e.querySelector(".popup__close").removeEventListener("click",p),document.removeEventListener("keydown",w),e.remove()),t&&t.classList.remove("map__pin--active")},w=t=>{t.key===e&&(t.preventDefault(),p())};window.map={appendPins:e=>{const t=document.createDocumentFragment();for(let o=0;o<e.length;o++)t.appendChild(window.pin.createElement(e[o],o));n.appendChild(t)},onPinClick:e=>{e.target.classList.contains("map__pin")&&!e.target.classList.contains("map__pin--main")?(p(),u(i(window.sortedOffers[e.target.dataset.id])),e.target.classList.add("map__pin--active")):e.target.parentElement.classList.contains("map__pin")&&!e.target.parentElement.classList.contains("map__pin--main")&&(p(),u(i(window.sortedOffers[e.target.parentElement.dataset.id])),e.target.parentElement.classList.add("map__pin--active"))},onMainPinMove:e=>{e.preventDefault();let o={x:e.clientX,y:e.clientY};const n=e=>{e.preventDefault();const n=o.x-e.clientX,s=o.y-e.clientY;o={x:e.clientX,y:e.clientY},r.style.top=r.offsetTop-s+"px",r.style.left=r.offsetLeft-n+"px",r.offsetLeft<d-Math.round(r.offsetWidth/2)?r.style.left=d-Math.round(r.offsetWidth/2)+"px":r.offsetLeft>c-Math.round(r.offsetWidth)/2&&(r.style.left=c-Math.round(r.offsetWidth/2)+"px"),r.offsetTop<l-r.offsetHeight-t?r.style.top=l-r.offsetHeight-t+"px":r.offsetTop>m-r.offsetHeight-t&&(r.style.top=m-r.offsetHeight-t+"px"),a(!0)},s=e=>{e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",s)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",s)},onCloseCard:p,removePins:()=>{o.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))}}})(),(()=>{const e=window.consts.ENTER_KEY,t=window.elements.map,o=window.elements.mapPinMain,n=window.elements.adForm,r=window.elements.adFormElements,s=window.elements.mapFiltersElements,i=window.form.setAddress,a=window.utils.addAttribute,d=window.utils.removeAttribute,c=window.map.onMainPinMove,l=window.backend.load,m=window.map.appendPins,u=window.map.removePins,p=window.avatar.resetPreviews,w=window.elements.mapFiltersForm,f=a=>{0!==a.button&&a.key!==e||(a.preventDefault(),l(m,v),t.classList.remove("map--faded"),n.classList.remove("ad-form--disabled"),d(r,"disabled"),d(s,"disabled"),o.removeEventListener("mousedown",f),o.removeEventListener("keydown",f),i(!0),o.addEventListener("mousedown",c))},v=e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: #f0f0ea; vertical-align: middle",t.style.position="absolute",t.style.width="80%",t.style.left=0,t.style.right=0,t.style.top="30px",t.style.fontSize="30px",t.textContent=e+".\n    Укажите местоположение вашего объявления без соседних",document.body.insertAdjacentElement("afterbegin",t)};window.activatePage={disablePage:e=>{e&&e.preventDefault(),t.classList.add("map--faded"),n.classList.add("ad-form--disabled"),a(r,"disabled"),a(s,"disabled"),u(),n.reset(),w.reset();const d=document.querySelector(".map__card");d&&d.remove(),i(!1,!0),p(),o.addEventListener("mousedown",f),o.addEventListener("keydown",f)}}})(),(()=>{const e=window.consts.MAX_PINS,t=window.consts.LOW_PRICE,o=window.consts.HIGH_PRICE,n=window.elements.mapFiltersForm,r=window.elements.typeFilter,s=window.elements.priceFilter,i=window.elements.roomsFilter,a=window.elements.guestsFilter,d=window.map.appendPins,c=window.map.removePins,l=window.map.onCloseCard,m=window.debounce(d);n.addEventListener("change",(()=>{c(),l(),m((t=>{const o=t.slice(0,e);return window.sortedOffers=o,o})(window.offers.filter((e=>(e=>"any"===r.value||e.offer.type===r.value)(e)&&(e=>{const n=e.offer.price;switch(s.value){case"low":return n<t;case"middle":return n>=t&&n<=o;case"high":return n>o;default:return!0}})(e)&&(e=>"any"===i.value||e.offer.rooms.toString()===i.value)(e)&&(e=>"any"===a.value||e.offer.guests.toString()===a.value)(e)&&(e=>{let t=document.querySelectorAll(".map__checkbox:checked");return Array.from(t).every((t=>e.offer.features.indexOf(t.value)>=0))})(e)))))}))})(),(()=>{const e=window.elements.map,t=window.form.showSuccessMessage,o=window.form.showErrorMessage,n=window.activatePage.disablePage,r=window.backend.upload,s=window.elements.adForm,i=window.elements.adFormReset;n(),e.addEventListener("click",window.map.onPinClick),i.addEventListener("click",n),s.addEventListener("submit",(e=>{e.preventDefault(),r(new FormData(s),(()=>{n(),t()}),o)}))})()})();