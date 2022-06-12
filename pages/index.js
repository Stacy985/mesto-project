const profilePopup = document.querySelector(".popup__profile");
const cardPopup = document.querySelector(".popup_card");
const imagePopup = document.querySelector(".popup__image");

//универсальное отркытие  и закрытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonCloseProfile = document.querySelector(".popup__button-profile");

//откытие попапа edit
buttonEdit.addEventListener("click", function () {
  openPopup(profilePopup);
  nameInput.value = nameTitle.textContent;
  informationInput.value = profileSubtitle.textContent;
});

buttonCloseProfile.addEventListener("click", () => closePopup(profilePopup));

const profileForm = document.querySelector(".form-profile");
const nameInput = profileForm.querySelector(".form__item-name");
const informationInput = profileForm.querySelector(".form__item-information");
const nameTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");

profileForm.addEventListener("submit", createName);
function createName(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameInput.value;
  profileSubtitle.textContent = informationInput.value;
  closePopup(profilePopup);
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
const cardForm = document.querySelector(".form-card");
const cardPopupCloseButton = document.querySelector(".popup__button_card");
const buttonAdd = document.querySelector(".profile__add-button");
const titleInput = cardForm.querySelector(".form__item-locality");
const linkInput = cardForm.querySelector(".form__item-link");
const picPopup = imagePopup.querySelector(".popup__img");
const imgSubtitle = imagePopup.querySelector(".popup__subtitle");

//открытие попапа с картинкой
const buttonCloseImg = document.querySelector(".popup__button_img");
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

//попап картинок
buttonAdd.addEventListener("click", () => openPopup(cardPopup));
cardPopupCloseButton.addEventListener("click", () => closePopup(cardPopup));

//добавление карточки
const buttonSaveCard = document.querySelector(".form__button-card");

const addCard = function (event) {
  event.preventDefault();
  const cardInfo = { name: titleInput.value, link: linkInput.value };
  renderCard(cardInfo, cardsContainer);
  closePopup(cardPopup);
  cardForm.reset();
};
cardForm.addEventListener("submit", addCard);
