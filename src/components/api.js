const config = {
  url: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
  headers: {
      authorization:'bfab4c9e-8154-4a65-a30a-fb47c451faea',
      'Content-Type':'application/json',
    },
};

const onResponce = (res) => {
return res.ok ? res.json() : Promise.reject(res);
};
//загрузка карточек
function getCards() {
 return fetch(`${config.url}/cards`,{
   headers: config.headers,
 }) .then(onResponce);
}

//загрузка юзера
function getUsers() {
return fetch(`${config.url}/users/me`,{
  headers: config.headers,
}) .then(onResponce);
}

function getAllInfo(){
return Promise.all([getUsers(),getCards()])
};

//редактирование информации о пользователе
function editPrifile(data){
return fetch(`${config.url}/users/me`,{
  method: "PATCH",
  headers: config.headers,
  body: JSON.stringify(data)
}).then(onResponce);
}


function likeInform (dataId, islike) {
  return fetch(`${config.url}/cards/likes/${dataId}`,{
    method: islike ? "DELETE" : "PUT",
    headers: config.headers,
  }).then(onResponce);
}



//добавление карточки
function getCard(dataCard){
  return fetch(`${config.url}/cards`,{
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(dataCard)
  }).then(onResponce);
}


// удаление карточки
function deleteCard(cardId) {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(onResponce);
}


//изменение аватара
function gatUserAvatar(dataAvatar){
  return fetch(`${config.url}/users/me/avatar`,{
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(dataAvatar)
  }) .then(onResponce);
}





export { config, onResponce, getCards, deleteCard, getUsers,editPrifile, likeInform,getAllInfo,getCard,gatUserAvatar};