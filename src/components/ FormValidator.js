export class FormValidator {
  constructor(validationObj, formElement) {
    this._formElement = formElement;
    this._validationObj = validationObj;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._validationObj.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._validationObj.submitButtonSelector
    );
  }

  _showError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    console.log(this._errorElement);
    inputElement.classList.add(this._validationObj.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._messageError(inputElement);
  }
  _messageError(inputElement) {
    if (inputElement.value.length < 1) {
      inputElement.setCustomValidity("Вы пропустили это поле.");
    } else {
      inputElement.setCustomValidity("");
    }
  }

  _hideError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    console.log(this._errorElement);
    inputElement.classList.remove(this._validationObj.inputErrorClass);
    this._errorElement.classList.remove(this._validationObj.inputErrorClass);
    this._errorElement.textContent = "";
  }

  _isValid(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }
  _inputInvalid() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _inactiveButton() {
    this._submitButton.classList.add(this._validationObj.inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  _activeButton() {
    this._submitButton.classList.remove(
      this._validationObj.inactiveButtonClass
    );
    this._submitButton.disabled = false;
  }
  _toggleButtonState() {
    if (this._inputInvalid()) {
      this._inactiveButton();
    } else {
      this._activeButton();
    }
  }

  doFormBasic() {
    this._inactiveButton();
    this._inputList.forEach((inputElement) => {
      //input.classList.remove(this._validationObj.inputErrorClass);
      this._hideError(inputElement);
      // inputElement.value = '';
    });
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
