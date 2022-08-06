import {Popup} from "../components/Popup.js"
export class PopupImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popup = document.querySelector('.popup_image');
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



