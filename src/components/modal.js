export const profileForm = document.querySelector(".form-profile");
export const imagePopup = document.querySelector(".popup__image");
export const profilePopup = document.querySelector(".popup__profile");
export const buttonEdit = document.querySelector(".profile__edit-button");
export const nameInput = profileForm.querySelector(".form__item-name");
export const informationInput = profileForm.querySelector(".form__item-information");
export const buttonCloseProfile = document.querySelector(".popup__button-profile");
export const nameTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const cardPopup = document.querySelector(".popup_card");
export const picPopup = imagePopup.querySelector(".popup__img");
export const imgSubtitle = imagePopup.querySelector(".popup__subtitle");
export const cardPopupCloseButton = document.querySelector(".popup__button_card");
import {resetCardForm} from './validate.js'; 
import {resetProfifleForm} from './validate.js'; 
import{toggleButtonState, validationConfig} from './validate.js'


//универсальное отркытие  и закрытие попапа
function openPopup(popup) {
    popup.classList.add("popup_opened");
  }
  function closePopup(popup) {
    popup.classList.remove("popup_opened");
  }

  export {openPopup, closePopup}; 

  //фунция закрытия popup по esc
function keyHandlerEsc(evt) {
    if (evt.key === "Escape") {
      closePopup(imagePopup);
    }
  }

  export {keyHandlerEsc}; 


//откытие попапа edit

buttonEdit.addEventListener("click", function (event) {
    const sabmitButton = document.querySelector( ".form__button");
    toggleButtonState(sabmitButton, false, validationConfig); 
    openPopup(profilePopup);
    nameInput.value = nameTitle.textContent;
    informationInput.value = profileSubtitle.textContent;
  });
  buttonCloseProfile.addEventListener("click", () => {
      closePopup(profilePopup)
      resetProfifleForm();
     
    });
  
  profileForm.addEventListener("submit", createName);
  function createName(evt) {
    evt.preventDefault();
    nameTitle.textContent = nameInput.value;
    profileSubtitle.textContent = informationInput.value;
    closePopup(profilePopup);
    
  }


  export {createName}; 



//функция закрытия попапа по клику на оверлей
function closeByClickOverlay(evt) {
    const popup = document.querySelector(".popup_opened");
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  }
export{closeByClickOverlay};

  //открытие попапа с картинкой
  export const buttonCloseImg = document.querySelector(".popup__button_img");
  buttonCloseImg.addEventListener("click", function () {
    closePopup(imagePopup);
    window.addEventListener("keydown", keyHandlerEsc);
    window.addEventListener("mousedown", closeByClickOverlay);
  });
  

  //картинка в попапе
const handleClickImage = function (data) {
    picPopup.src = data.link;
    picPopup.alt = data.name;
    imgSubtitle.textContent = data.name;
    openPopup(imagePopup);
  };
  export {handleClickImage};

  //попап картинок
  const buttonAdd = document.querySelector(".profile__add-button");
buttonAdd.addEventListener("click", (event) => {
    const sabmitButton = document.querySelector( ".form__button-card");
  
    openPopup(cardPopup);
    toggleButtonState(sabmitButton, false, validationConfig); 
  }); 
  export {buttonAdd};
  


  cardPopupCloseButton.addEventListener("click", () => {
    closePopup(cardPopup);
    resetCardForm();
  });
   