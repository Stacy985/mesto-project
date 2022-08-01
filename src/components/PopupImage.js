import {Popup} from "../components/Popup.js"
export class PopupImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._picPopup = this._popup.querySelector('.popup__img');
        this._imgSubtitle = this._popup.querySelector('.popup__subtitle');
    }
    open(item) {
        super.open();
        this._picPopup.src = item.link;
        this._picPopup.alt = item.name;
        this._imgSubtitle.textContent = item.name;
    }
}
