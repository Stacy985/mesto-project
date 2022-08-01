import {Popup} from "../components/Popup.js"
export class PopupForm{
    constructor({popupSelector, handleFormSubmit}){
        super(popupSelector);
        this._form = this._popup.querySelector('.form-profile');
        this._inputs = this._form.querySelectorAll('.form__item');
        this._popupButton = this._popup.querySelector('.form__button');
        this.handleSubmitForm = handleSubmitForm;
        this._popupButtonTextContent = this._popupButton.textContent;
    }
    _getInputValues() {
        this._formValues = {};
        this._inputsList = Array.from(this._inputs);
        this._inputsList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
      }
    setEventListeners(){
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
          })
          this._popup.querySelector('.form').reset();
          super.setEventListeners();
    }
    close() {
        super.close();
      }
}