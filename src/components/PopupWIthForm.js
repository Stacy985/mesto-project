import {Popup} from "./Popup.js"
export class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popup = super.takePopup();
        this._formPopup = this._popup.querySelector('.form')
        this._inputList = this._formPopup.querySelectorAll('.form__item');
        this._popupButton = this._formPopup.querySelector('.form__button');
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
      }

    setInputValues(dataInput) {
      this._inputList.forEach((input) => {
        input.value = dataInput[input.name]
      })
    }

    setEventListeners() {
        this._formPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
          });
    }
    
    renderLoading(loading) {
      if (loading) {
        this._popupButton.textContent = "Сохранение...";
      } else {
        this._popupButton.textContent = "Сохранить";
      }
    }
}