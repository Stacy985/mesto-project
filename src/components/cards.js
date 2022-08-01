export class Cards{
    //static _template = document.querySelector(".card-template").content
    constructor({data, delClickHandler, likeCLickHandler, imgClickHandler}, template){
        this._data = data;
        this._delClickHandler = delClickHandler;
        this._likeCLickHandler = likeCLickHandler;
        this._imgClickHandler = imgClickHandler;
        // this._template = document.querySelector(template)).content
        this._template = template
    }

    _getElement () {
      this._cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(this._card)
      .cloneNode(true)

      return this._cardElement
  }


    createCard (data, userId, handlerLike, deleteCard) {
        //console.log(data);
        //дата-данные которые передаем
        const cardImg = this._view.querySelector(".card__img");
        const titleCard = this._view.querySelector(".card__title");
        const buttonTrashCard = this._view.querySelector(".card__trash");
        const cardButtonLike = this._view.querySelector(".card__like");
        const cardLikeCounter = this._view.querySelector(".card__like-count");
  
      
        cardLikes.forEach((like) => {
          if (like._id === userId) {
            alreadyLiked = true;
          }
        });
      
        // если уже лайкнули, добавляем заполненное средечко
        if (alreadyLiked) {
          cardButtonLike.classList.add("card__like_active");
        }
      
        // проверка на авторство
        if (userId !== ownerId) {
          // мы - не владелец фотки
          // прячем иконку удаления
          buttonTrashCard.classList.add("card__trash_disabled");
        } else {
          isMyImage = true;
        }
      
        cardImg.src = this._data.link;
        titleCard.textContent = this._data.name;
        cardImg.alt = this._data.name;
        cardLikeCounter.textContent = cardLikes.length;
      
        cardImg.addEventListener("click", () => this._imgClickHandlere(this._data)); //обработчик событий
      
        // buttonTrashCard.addEventListener("click", () => {
        //   if (isMyImage) {
        //     deleteCard(cardId);
        //     this._delClickHandler(cardElement);
        //   }
        // });

        buttonTrashCard.addEventListener("click", (e) => {this._delClickHandler()});

        cardButtonLike.addEventListener("click", () => {
          alreadyLiked = !alreadyLiked;
          this._likeCLickHandler(cardId, !alreadyLiked, cardElement);
        });
      
        return cardElement;
      };
}