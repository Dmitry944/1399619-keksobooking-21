'use strict';

const FILE_TYPES = window.consts.FILE_TYPES;
const PHOTO_SIZE = window.consts.PHOTO_SIZE;
const PHOTO_ALT = window.consts.PHOTO_ALT;

const avatarChooser = window.elements.avatarChooser;
const avatarPreview = window.elements.avatarPreview;
const photoChooser = window.elements.photoChooser;
const photoPreview = window.elements.photoPreview;

const previewLoader = (evt, preview) => {
  const photo = evt.target.files[0];
  const photoName = photo.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return photoName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(photo);
  }
};

const onAvatarLoader = (evt) => {
  previewLoader(evt, avatarPreview);
};

const onPhotoLoader = (evt) => {
  const img = document.createElement(`img`);
  img.width = PHOTO_SIZE;
  img.height = PHOTO_SIZE;
  img.alt = PHOTO_ALT;

  photoPreview.appendChild(img);

  previewLoader(evt, img);
};

avatarChooser.addEventListener(`change`, onAvatarLoader);

photoChooser.addEventListener(`change`, onPhotoLoader);

const resetPreviews = () => {
  avatarPreview.src = `img/muffin-grey.svg`;
  photoPreview.innerHTML = ``;
};

window.avatar = {
  resetPreviews
};
