export class Cards{
    //static _template = document.querySelector(".card-template").content
    constructor({data, cardTemplate, delClickHandler, likeClickHandler, imgClickHandler}){
        this._delClickHandler = delClickHandler;
        this._imgClickHandler = imgClickHandler;
        this._name = data.name;
        this._link = data.link;
        this._cardOwnerId = data.owner._id    // this._template = document.querySelector(template)).content
        this._cardTemplate = cardTemplate;
        this._delClickHandler = delClickHandler;
        this._imgClickHandler = imgClickHandler;
        this._likeClickHandler = likeClickHandler;
    }


    _getElement () {
      this._cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.card')
      .cloneNode(true)

      return this._cardElement
  }


    _setlikeCount (data) {
      this._likeCounter.textContent = data.likes.length;
    }


    _likeState (userId, data) {
      if (data.likes.some((like) => {userId === like._id})) {
        this._likeButton.classList.add('card__like_active');
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }
    };

    toogleLike (data) {
      if (this.isLiked) {
        this._likeButton.classList.remove('card__like_active');
        this.isLiked = false;
      } else {
        this._likeButton.classList.add('card__like_active');
        this.isLiked = true;
      }
      this._setlikeCount(data)
    }
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => {
        this._likeClickHandler()
      });
      this._elementImg.addEventListener('click', () => {
        this._imgClickHandler()
      });
      this._deleteButton.addEventListener('click', () => {
        this._delClickHandler()
      })
    }

    _removeCard () {
      this._element.remove();
    };

    _hasDeleteButton() {
      if (this._userId !== this._cardOwnerId) {
        this._deleteButton.remove();
      }
    }

    generate(userId, data) {
      this._element = this._getElement();
      this._elementTitle = this._element.querySelector('.card__title');
      this._elementImg = this._element.querySelector('.card__img');
      this._likeCounter = this._element.querySelector('.card__like-count');
      this._likeButton = this._element.querySelector('.card__like');
      this._deleteButton = this._element.querySelector('.card__trash');

      this._elementTitle.textContent = this._name;
      this._elementImg.src = this._link;
      this._elementImg.alt = this._link;
      this._setlikeCount(data)
      
      this._hasDeleteButton();
      this._likeState(userId, data);

      this._setEventListeners();

      return this._element
    }
}