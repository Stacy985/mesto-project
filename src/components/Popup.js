/* export class Popup {
    constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    }
    _hadleEscUp = (evt) =>{
        if(evt.key === 'Escape'){
           this.close();
        }
    }
    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup',this._hadleEscUp )
    }
    close(){
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keyup',this._hadleEscUp )
    }
    setEventListener(){
        this._popup.addEventListener('mouseup',()=>{
            if(evt.target.class.contains('popup')|| evt.target.class.contains('popup__icon')){
                this.close();
            }
        })
    }
}  */

export  class Popup {
    components (popupSelector) {
        this._popup = document.querySelector(popupSelector)
    }

    open() {
        this._popup.classList.add('.popup_opened');
        this._setEventListeners ();
    }

    close() {
        this._popup.classList.remove('.popup_opened');
        this._removeEventListeners ();
    }

    _handleEscape (evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    _handleClick (evt) {
        if (
            evt.target.classList.contains(popup_opened) 
            ||
            evt.target.classList.contains(popup__button)
            ) {
                this.close()
            }
    }

    _setEventListeners() {
        this._popup.addEventListener('click', _handleClick());
        document.addEventListener('keydown', _handleEscape());
    }

    _removeEventListeners () {
        this._popup.removeEventListener('click', _handleClick());
        document.removeEventListener('keydown', _handleEscape());
    }
}