/* import avatar from "../images/Avatar.png";
import logo from "../images/logo.svg";
import buttonImgEdit from "../images/Edit_Button__1.svg";
import buttonImgAdd from "../images/Add_Button___.svg";
const imgLocal = [
  // меняем исходные пути на переменные
  { name: "Avatar", image: avatar },
  { name: "Logo Mesto", link: logo },
  { name: "Pan", link: buttonImgEdit },
  { name: "Plus", link: buttonImgAdd },
];
import "../pages/index.css"; */

import {
  imagePopup,
  profilePopup,
  buttonEdit,
  nameInput,
  informationInput,
  buttonCloseProfile,
  profileForm,
  nameTitle,
  profileSubtitle,
  buttonCloseImg,
  buttonAdd,
  cardPopup,
  picPopup,
  imgSubtitle,
  cardPopupCloseButton,
  buttonAvatar,
  avatarPopupCloseButton,
  avatarForm,
  buttonProfilesave,
  closeByClickOverlay,
  avatarImg,
  inputAvatar,
  avatarPopup,
  avatarButton,
} from "./modal.js";

import {
  validationConfig,
  showError,
  hideError,
  checkInpitValidity,
  toggleButtonState,
  setEventListener,
  enableValidation,
  resetValidation,
} from "./validate.js";
import {
  initialCards,
  handleClickButtonDelete,
  createCard,
  renderCard,
  cardForm,
  titleInput,
  linkInput,
  cardsContainer,
  likeStatus,
  likedCreate,
  cardLikeCounter,
  buttonCardSave,
} from "./card.js";

import {
Api
} from "./api.js";
import  {Popup} from "./Popup.js";

const config = {
  url: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
  headers: {
      authorization:'bfab4c9e-8154-4a65-a30a-fb47c451faea',
      'Content-Type':'application/json',
    },
};

//апи
const api = new Api(config);

//откртие картинки
const popupImage = new Popup('.popup__image'); 
/* popupImage.setEventListener(); */




import { buttonSave, loading } from "./utils.js";

let userId = null;

//изменение профиля
function profileChanges(evt) {
  loading(buttonProfilesave, true);
  api.editPrifile({ name: nameInput.value, about: informationInput.value })
    .then((data) => {
      nameTitle.textContent = nameInput.value;
      profileSubtitle.textContent = informationInput.value;
      closePopup(profilePopup);
      toggleButtonState(evt.submitter, false, validationConfig);
      console.log(
        `Профиль изменен успешно! Имя пользователя ${data.name}, профессия: ${data.about}`
      );
    })
    .then(() => {
      closePopup(profilePopup);
    })
    .catch((err) => {
      console.log(`Ошибка при изменении данных: ${err}`);
    })
    .finally(() => loading(buttonProfilesave, false));
}
profileForm.addEventListener("submit", createName);
function createName(evt) {
  evt.preventDefault();
  profileChanges(evt);
}

const handlerLike = (cardId, likedCreate, cardElement) => {
  api.likeInform(cardId, likedCreate)
    .then((data) => {
      likeStatus(cardElement, data.likes, userId);
    })
    .catch((err) => {
      console.log(`Ошибка при постановке лайка:${err}`);
    });
};

api.getAllInfo().then(([user, cards]) => {
  nameTitle.textContent = user.name;
  profileSubtitle.textContent = user.about;
  avatarImg.src = user.avatar;
  userId = user._id;

  cards.reverse().forEach((data) => {
    renderCard(data, cardsContainer, userId, handlerLike, api.deleteCard);
  });
});

// добавление карточки
cardForm.addEventListener("submit", addCard);

const cardChange = function (evt) {
  evt.preventDefault();
  loading(buttonCardSave, true);
  api.getCard({ name: titleInput.value, link: linkInput.value })
    .then((data) => {
      renderCard(data, cardsContainer, userId, handlerLike, deleteCard);
      closePopup(cardPopup);
      resetValidation(cardForm);
      toggleButtonState(evt.submitter, false, validationConfig);
    })
    .catch((err) => {
      console.log(`Ошибка. Запрос не выполнен:${err}`);
    })
    .finally(() => loading(buttonProfilesave, false));
};

function addCard(event) {
  event.preventDefault();
  cardChange(event);
}

avatarForm.addEventListener("submit", createAvatar);
function changeCreateAvatar(evt) {
  loading(avatarButton, true);
  api.gatUserAvatar({ avatar: inputAvatar.value })
    .then((data) => {
      avatarImg.src = data.link;
      avatarImg.src = inputAvatar.value;
      console.log(`Аватар изменен успешно!`);
    })
    .then(() => {
      closePopup(avatarPopup);
      resetValidation(avatarForm);
      toggleButtonState(evt.submitter, false, validationConfig);
    })
    .catch((err) => {
      console.log(`Ошибка при изменении данных: ${err}`);
    })
    .finally(() => loading(avatarButton, false));
}

function createAvatar(evt) {
  evt.preventDefault();
  changeCreateAvatar(evt);
}
