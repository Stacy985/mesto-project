import {Popup} from "./Popup.js"
export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = super.takePopup();
        this._picPopup = this._popup.querySelector('.popup__img');
        this._imgSubtitle = this._popup.querySelector('.popup__subtitle');
    }
    open(data) {
        this._picPopup.src = data.link;
        this._picPopup.alt = data.name;
        this._imgSubtitle.textContent = data.name;
        super.open();
    }
}



