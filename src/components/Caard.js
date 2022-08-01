
export class Caard {
    constructor ({card, data, handleImgClick}, selector) {
        this._selector = selector;
        this._card = card;
        this._data = data;
        this._text = data.name;
        this._imageLink = data.link;
        this._handleImgClick = handleImgClick;
        this._handleDeite = handleDeite;
    }

    _getElement () {
        this._cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector(this._card)
        .cloneNode(true)

        return this._cardElement
    }
          
    generate() {
        this._element = this._getElement();
        this._image = this._element.querySelector('.card__img');
        this._likeButton = this._element.querySelector('.card__like');
        this._likeCount = this._element.querySelector('.card__like-count');
        this._title = this._element.querySelector('.card__title');
        this._image.src = this._imageLink;
        this._image.alt = this._text;
        this._title.textContent = this._text;

        return this._element
    }
    _setEventListeners() {
       this._image.addEventListener('click', this._handleImgClick)
      /*   обработчик лайка;
        удаление карточки; */
    

    }

    setLikeState (userId) {
        if (this._item.likes.some((ownerId) => {ownerId._id === userId})) {
            this._likeButton.classList.add('.card__like_active');
            this.isLiked = true
        } else {
            this._likeButton.classList.remove('.card__like_active');
            this.isLiked = false
        }
    }

    toogleLike () {
        if(this.isLiked = true) {
            this._likeButton.classList.remove('.card__like_active');
            this.isLiked = false
        } else {
            this._likeButton.classList.add('.card__like_active');
            this.isLiked = true
        }
    }

    likesCountUpdate(){
        this._likeCount.textContent = this._data.likes.length 
    }
};    