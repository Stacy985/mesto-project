import{cardForm} from './card.js';
import {profileForm} from './modal.js'; 


//валидация форма

//классы для форм
const validationConfig = {
    formSelector: ".form",
    inputSelector: ".form__item",
    submitButtonSelector: ".form__button",
    inActibeButtonClass: "form__button_disabled",
    inpustErrorClass: "form__item_invalid",
  };
  //error
const showError = (erroreElement, inputElement) => {
    inputElement.classList.add("form__item_invalid");
    erroreElement.textContent = inputElement.validationMessage;
    //sconsole.log(erroreElement);
  };
const hideError = (erroreElement, inputElement) => {
    inputElement.classList.remove("form__item_invalid");
    erroreElement.textContent = '';
  };
const checkInpitValidity = (inputElement, formElement) => {
    
    const isInputValid = inputElement.validity.valid; //false невалиднл
  
    const erroreElement = formElement.querySelector(`#${inputElement.id}-error`);
  
    if (inputElement.value.length < 1) {
      inputElement.setCustomValidity("Вы пропустили это поле.");
    } else {
      inputElement.setCustomValidity("");
    } 
  
    if (!isInputValid) {
      showError(erroreElement, inputElement);
    } else {
      hideError(erroreElement, inputElement);
    }
  };
  //работа с кнопкой
const toggleButtonState = (button, active = false, configClassButton) => {
    //console.log(button, active, configClassButton);
  
  
    if (active) {
      button.classList.remove(configClassButton.inActibeButtonClass);
      button.disabled = false;
    } else {
      button.classList.add(configClassButton.inActibeButtonClass);
      button.disabled = "disabled";
    }
  };
  
const setEventListener = (formElement, config) => {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const sabmitButton = formElement.querySelector(config.submitButtonSelector);
  
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        checkInpitValidity(input, formElement, config);
        toggleButtonState(sabmitButton, formElement.checkValidity(), config);
      });
    });
  };
  
const enableValidation = (config) => {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
      setEventListener(form, config);
    });
  };
enableValidation(validationConfig);





  const resetCardForm = () => {
    // 1 - найти форму и сделать резет
    cardForm.reset();
  
    // 2 - убрать сообщения о валидации
    const inputs = cardForm.querySelectorAll(".form__item");
  
    inputs.forEach((input) => {
      const inputId = input.id;
      const inputErrorElement = cardForm.querySelector(`#${inputId}-error`);
  
      hideError(inputErrorElement, input);
      input.setCustomValidity('');
    });
  
  }


const resetProfifleForm = () => {
  profileForm.reset();
  
    // 2 - убрать сообщения о валидации
    const inputs = profileForm.querySelectorAll(".form__item");
  
    inputs.forEach((input) => {
      const inputId = input.id;
      const inputErrorElement = profileForm.querySelector(`#${inputId}-error`);
  
      hideError(inputErrorElement, input);
      input.setCustomValidity('');
    });
  
  } 

  export {validationConfig, showError, hideError, checkInpitValidity, toggleButtonState, setEventListener, enableValidation, resetCardForm, resetProfifleForm }; 
  