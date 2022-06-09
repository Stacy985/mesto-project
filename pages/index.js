const editButton = document.querySelector(
  ".profile__edit-button"
); /* открытие попапа */
const closeButton = document.querySelector(".popup__button");
const popup = document.querySelector(".popup");
const allPopups = document.querySelectorAll(".popup");

//откытие попапа add
editButton.addEventListener("click", function () {
  popup.classList.add("popup_opened");
}); /* слушатель кнопки */

closeButton.addEventListener("click", function () {
  popup.classList.remove("popup_opened");
});

const formModal = document.querySelector(".form");
const nameInput = formModal.querySelector(".form__item-name");
const informationInput = formModal.querySelector(".form__item-information");
const nameTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

//текст в инпуте
nameInput.value = nameTitle.textContent;
informationInput.value = profileSubtitle.textContent;
formModal.addEventListener("submit", createName);
function createName(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  profileSubtitle.textContent = informationInput.value;
}

const initialCards = [
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
//рендер карточек в темплейт
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsContainer = document.querySelector(".cards__container");
const popupCard = document.querySelector(".popup_card");
const popupCloseButton = document.querySelector(".popup__button_card");
const addButton = document.querySelector(".profile__add-button");
const titleInput = document.querySelector(".form__item-locality");
const linkInput = document.querySelector(".form__item-link");
const popupImage = document.querySelector(".popup_type-image");
const popupPic = popupImage.querySelector(".popup__img");
const imgSubtitle = popupImage.querySelector(".popup__subtitle");

//открытие попапа с картинкой
const openPopup = function (popup) {
  popup.classList.add("popup_opened");
};
const closePopupImg = document.querySelector(".popup__button_img");
closePopupImg.addEventListener("click", function () {
  allPopups.forEach((popup) => {
    popup.classList.remove("popup_opened");
  });
});
//картинка в попапе
const handleClickImage = function (data) {
  popupPic.src = data.link;
  imgSubtitle.innerText = data.name;
  openPopup(popupImage);
};
//удаление карточек
const handleClickButtonDelete = function (element) {
  element.remove();
};
//создание карточек
const createCard = function (data) {
  //дата-данные которые передаем
  const cardElement = cardTemplate.cloneNode(true); //  делаем клон и с тру клонируем весь элемент
  const imgCard = cardElement.querySelector(".card__img");
  const titleCard = cardElement.querySelector(".card__title");
  const buttonTrash = cardElement.querySelector(".card__trash");
  imgCard.src = data.link;
  titleCard.innerText = data.name;
  titleInput.innerText = data.name;
  linkInput.src = data.link;
  imgCard.addEventListener("click", () => handleClickImage(data)); //обработчик событий
  buttonTrash.addEventListener("click", () =>
    handleClickButtonDelete(cardElement)
  );
  //лайки
  const cardLike = cardElement.querySelector(".card__like");
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_active");
  });

  return cardElement;
};

const renderCard = function (data, contanir) {
  const card = createCard(data); //вызов функции(создаем карточку)
  contanir.prepend(card); // добавить карточку в начало страницы
};

initialCards.forEach(function (item) {
  renderCard(item, cardsContainer);
});

//добавление карточки
const cardForm = document.querySelector(".form-card");
const addCard = function (event) {
  event.preventDefault();
  const inputName = event.target.querySelector(".form__item-locality");
  const inpitLink = event.target.querySelector(".form__item-link");
  const cardInfo = { name: inputName.value, link: inpitLink.value };
  renderCard(cardInfo, cardsContainer);
};
cardForm.addEventListener("submit", addCard);

//попап картинок
addButton.addEventListener("click", function () {
  popupCard.classList.add("popup_card_opened");
});
popupCloseButton.addEventListener("click", function () {
  popupCard.classList.remove("popup_card_opened");
});
