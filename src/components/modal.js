export const profileForm = document.querySelector(".form-profile");
export const imagePopup = document.querySelector(".popup__image");
export const profilePopup = document.querySelector(".popup__profile");
export const buttonEdit = document.querySelector(".profile__edit-button");
export const nameInput = profileForm.querySelector(".form__item-name");
export const informationInput = profileForm.querySelector(
  ".form__item-information"
);
export const buttonCloseProfile = document.querySelector(
  ".popup__button-profile"
);
export const nameTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const cardPopup = document.querySelector(".popup_card");
export const picPopup = imagePopup.querySelector(".popup__img");
export const imgSubtitle = imagePopup.querySelector(".popup__subtitle");
export const cardPopupCloseButton = document.querySelector(
  ".popup__button_card"
);
import { resetValidation } from "./validate.js";
import { toggleButtonState, validationConfig } from "./validate.js";

//универсальное отркытие  и закрытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  window.addEventListener("keydown", keyHandlerEsc);
  window.addEventListener("mousedown", closeByClickOverlay);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  window.removeEventListener("keydown", keyHandlerEsc);
  window.removeEventListener("mousedown", closeByClickOverlay);
}

export { openPopup, closePopup };

//фунция закрытия popup по esc
function keyHandlerEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}

export { keyHandlerEsc };

//функция закрытия попапа по клику на оверлей
function closeByClickOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

export { closeByClickOverlay };

//откытие попапа edit

buttonEdit.addEventListener("click", function (event) {
  openPopup(profilePopup);
  nameInput.value = nameTitle.textContent;
  informationInput.value = profileSubtitle.textContent;
});
buttonCloseProfile.addEventListener("click", () => {
  closePopup(profilePopup);
});

profileForm.addEventListener("submit", createName);
function createName(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  profileSubtitle.textContent = informationInput.value;
  closePopup(profilePopup);
  toggleButtonState(evt.submitter, false, validationConfig);
}

export { createName };

//открытие попапа с картинкой
export const buttonCloseImg = document.querySelector(".popup__button_img");
buttonCloseImg.addEventListener("click", function () {
  closePopup(imagePopup);
});

//картинка в попапе
const handleClickImage = function (data) {
  picPopup.src = data.link;
  picPopup.alt = data.name;
  imgSubtitle.textContent = data.name;
  openPopup(imagePopup);
};
export { handleClickImage };

//попап картинок
const buttonAdd = document.querySelector(".profile__add-button");
buttonAdd.addEventListener("click", (event) => {
  openPopup(cardPopup);
});
export { buttonAdd };

cardPopupCloseButton.addEventListener("click", () => {
  closePopup(cardPopup);
});
