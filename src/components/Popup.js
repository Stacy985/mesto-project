export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
    document.addEventListener("keydown", this._handleEscape);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
    document.removeEventListener("keydown", this._handleEscape);
  }

  _handleEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleClick = (evt) => {
    if (
      evt.target.classList.contains("popup__icon") ||
      evt.target.classList.contains("popup_opened")
    ) {
      this.close();
    }
  };

  _setEventListeners() {
    this._popup.addEventListener("click", this._handleClick);
   
  }

  _removeEventListeners() {
    this._popup.removeEventListener("click", this._handleClick);
    
  }
  takePopup() {
    return this._popup;
}
};

