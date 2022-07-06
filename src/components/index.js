import avatar from '../images/Avatar.png';
import logo from '../images/logo.svg';
import buttonImgEdit from '../images/Edit_Button__1.svg';
import buttonImgAdd from '../images/Add_Button___.svg';
const imgLocal = [
    // меняем исходные пути на переменные
    { name: 'Avatar', image: avatar },
    { name: 'Logo Mesto', link: logo },
    { name: 'Pan', link: buttonImgEdit },
    { name: 'Plus', link: buttonImgAdd },
  ]; 
import '../pages/index.css';
import {imagePopup, profilePopup, buttonEdit, nameInput,informationInput, buttonCloseProfile, profileForm, nameTitle, profileSubtitle,buttonCloseImg,buttonAdd,cardPopup, picPopup, imgSubtitle, cardPopupCloseButton } from './modal.js'; 
import {openPopup, closePopup, keyHandlerEsc, createName, closeByClickOverlay, handleClickImage} from './modal.js'; 
import {validationConfig, showError, hideError, checkInpitValidity, toggleButtonState, setEventListener, enableValidation, resetCardForm, resetProfifleForm } from './validate.js'; 
import {initialCards, handleClickButtonDelete, createCard, renderCard, addCard ,cardForm, titleInput, linkInput} from './card.js';
import {cardsContainer} from './card.js';











