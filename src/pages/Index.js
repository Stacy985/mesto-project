import {Api} from "../components/Api.js";
import { Section } from "../components/Section.js";
import { Caard } from "../components/Caard.js";
import {Userinfo} from "../components/UserInfo.js"
import {PopupImage} from "../components/PopupImage.js"
import{ListCard} from "../components/ListCard.js"
import{Cards} from "../components/cards.js"



const config = {
    url: 'https://mesto.nomoreparties.co/v1/plus-cohort-13',
    headers: {
        authorization:'bfab4c9e-8154-4a65-a30a-fb47c451faea',
        'Content-Type':'application/json',
      },
  };
  
  //апи
  const api = new Api(config);

const cardList = new ListCard('.cards__container', (data)=>{
 const cardfItem = new Cards({
    data,
    delClickHandler: (cardInstance) => {
        api.deleteCard(data._id)
        .then (() => {
            e.target.closest()
        })
    },
    likeCLickHandler:() => {},
    imgClickHandler:() => {},
 })
})

// const cardList = api.getAllInfo()[1]

/* const elementImg = new PopupImage(elementImg); */

const user = new UserInfo({
	userName: userName, 
	userTitle : userTitle,
	userAvatar: profileAvatar
});

/* const renderCard = new Section('.cards__container', 
() => {
	const card = new Caard({
        data: data,
    })
}
) */

