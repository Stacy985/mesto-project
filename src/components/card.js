import { handleClickImage, cardPopup, closePopup } from "./modal.js";
import {
  toggleButtonState,
  validationConfig,
  resetValidation,
} from "./validate.js";

export const cardsContainer = document.querySelector(".cards__container");
export const cardForm = document.querySelector(".form-card");
export const titleInput = cardForm.querySelector(".form__item-locality");
export const linkInput = cardForm.querySelector(".form__item-link");

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//удаление карточек
const handleClickButtonDelete = function (element) {
  element.remove();
};
//создание карточек
const createCard = function (data) {
  //дата-данные которые передаем
  const cardElement = cardTemplate.cloneNode(true); //  делаем клон и с тру клонируем весь элемент
  const cardImg = cardElement.querySelector(".card__img");
  const titleCard = cardElement.querySelector(".card__title");
  const buttonTrashCard = cardElement.querySelector(".card__trash");
  cardImg.src = data.link;
  titleCard.textContent = data.name;
  cardImg.alt = data.name;
  cardImg.addEventListener("click", () => handleClickImage(data)); //обработчик событий
  buttonTrashCard.addEventListener("click", () =>
    handleClickButtonDelete(cardElement)
  );
  //лайки
  const cardLike = cardElement.querySelector(".card__like");
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_active");
  });

  return cardElement;
};

const renderCard = function (data, container) {
  const card = createCard(data); //вызов функции(создаем карточку)
  container.prepend(card); // добавить карточку в начало страницы
};

initialCards.forEach(function (item) {
  renderCard(item, cardsContainer);
});
export { handleClickButtonDelete, createCard, renderCard };

//добавление карточки

const addCard = function (event) {
  event.preventDefault();
  const cardInfo = { name: titleInput.value, link: linkInput.value };
  renderCard(cardInfo, cardsContainer);
  closePopup(cardPopup);
  resetValidation(cardForm);
  const sabmitButton = document.querySelector(".form__button");
  toggleButtonState(sabmitButton, false, validationConfig);
};
cardForm.addEventListener("submit", addCard);
export { addCard };
