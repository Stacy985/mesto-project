
export class Api {
  _onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject(res);
    };
  constructor(config){
    this._url = config.url;
    this._headers = config.headers;
  }

    
    //загрузка карточек
 _getCards() {
     return fetch(`${this._url}/cards`,{
       headers: this._headers,
     }) .then(this._onResponce);
    }
    
    //загрузка юзера
  _getUsers() {
    return fetch(`${this._url}/users/me`,{
      headers: this._headers,
    }) .then(this._onResponce);
    }
    
  getAllInfo(){
    return Promise.all([this._getUsers(), this._getCards()])
    };
    
    //редактирование информации о пользователе
    editProfile(data){
    return fetch(`${this._url}/users/me`,{
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    }).then(this._onResponce);
    }
    
    
/*    likeInform (dataId, islike) {
      return fetch(`${this._url}/cards/likes/${dataId}`,{
        method: islike ? "DELETE" : "PUT",
        headers: this._headers,
      }).then(this._onResponce);
    } */

   putLike (dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`,{
      method: "PUT",
      headers: this._headers,
    }).then(this._onResponce);
  };

  deleteLike (dataId) {
    return fetch(`${this._url}/cards/likes/${dataId}`,{
      method: "DELETE",
      headers: this._headers,
    }).then(this._onResponce);
  };
    
    
    
    //добавление карточки
   getCard(dataCard){
      return fetch(`${this._url}/cards`,{
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(dataCard)
      }).then(this._onResponce);
    }
    
    
    // удаление карточки
 deleteCard(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._onResponce);
    }
    
    
    //изменение аватара
   gatUserAvatar(dataAvatar){
      return fetch(`${this._url}/users/me/avatar`,{
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(dataAvatar)
      }) .then(this._onResponce);
    }

}






