import { handleClickImage, cardPopup, closePopup } from "./modal.js";
import {
  toggleButtonState,
  validationConfig,
  resetValidation,
} from "./validate.js";


let userId = null;
export const cardsContainer = document.querySelector(".cards__container");
export const cardForm = document.querySelector(".form-card");
export const titleInput = cardForm.querySelector(".form__item-locality");
export const linkInput = cardForm.querySelector(".form__item-link");
export const avatarImg = document.querySelector(".profile__avatar");
export const buttonCardSave = document.querySelector(".form__button-card");
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

export const cardLikeCounter = document.querySelector(".card__like-count");

//создание карточек
const createCard = function (data, userId, handlerLike, deleteCard) {
  //console.log(data);
  //дата-данные которые передаем
  const cardId = data._id;
  const cardLikes = data.likes;
  const ownerId = data.owner._id;
  const cardElement = cardTemplate.cloneNode(true); //  делаем клон и с тру клонируем весь элемент
  const cardImg = cardElement.querySelector(".card__img");
  const titleCard = cardElement.querySelector(".card__title");
  const buttonTrashCard = cardElement.querySelector(".card__trash");
  const cardButtonLike = cardElement.querySelector(".card__like");
  const cardLikeCounter = cardElement.querySelector(".card__like-count");
  let alreadyLiked = false;
  let isMyImage = false;

  // проверка на лайк при создании карточки
  cardLikes.forEach((like) => {
    if (like._id === userId) {
      alreadyLiked = true;
    }
  });

  // если уже лайкнули, добавляем заполненное средечко
  if (alreadyLiked) {
    cardButtonLike.classList.add("card__like_active");
  }

  // проверка на авторство
  if (userId !== ownerId) {
    // мы - не владелец фотки
    // прячем иконку удаления
    buttonTrashCard.classList.add("card__trash_disabled");
  } else {
    isMyImage = true;
  }

  cardImg.src = data.link;
  titleCard.textContent = data.name;
  cardImg.alt = data.name;
  cardLikeCounter.textContent = cardLikes.length;

  cardImg.addEventListener("click", () => handleClickImage(data)); //обработчик событий

  buttonTrashCard.addEventListener("click", () => {
    // handleClickButtonDelete(cardElement)
    if (isMyImage) {
      // 1 - удалить из АПИ
      deleteCard(cardId);

      // 2 - удалить из верстки
      handleClickButtonDelete(cardElement);
    }
  });

  cardButtonLike.addEventListener("click", () => {
    alreadyLiked = !alreadyLiked;
    handlerLike(cardId, !alreadyLiked, cardElement);
  });

  /*   if (data.owner._id !== userId){
    buttonTrashCard.remove();
  }
 */
  return cardElement;
};

export const likedCreate = (likeArray, userId) => {
  return Boolean(
    likeArray.find((likeobj) => {
      return likeobj._id === userId;
    })
  );
};

const likeStatus = (cardElement, likeArray, userId) => {
  const cardCounterContainer = cardElement.querySelector(".card__like-count");
  const cardLike = cardElement.querySelector(".card__like");

  cardCounterContainer.textContent = likeArray.length;

  if (likedCreate(likeArray, userId)) {
    cardLike.classList.add("card__like_active");
  } else {
    cardLike.classList.remove("card__like_active");
  }
};

const renderCard = function (data, container, userId, handlerLike, deleteCard) {
  /*  console.log(data, data.owner, userId); */
  const card = createCard(data, userId, handlerLike, deleteCard); //вызов функции(создаем карточку)
  container.prepend(card); // добавить карточку в начало страницы
};

// initialCards.forEach(function (item) {
//   renderCard(item, cardsContainer, userId);
// });
export { handleClickButtonDelete, createCard, renderCard, likeStatus };
