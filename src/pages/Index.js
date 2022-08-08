// /* import avatar from "../images/Avatar.png";
// import logo from "../images/logo.svg";
// import buttonImgEdit from "../images/Edit_Button__1.svg";
// import buttonImgAdd from "../images/Add_Button___.svg";
// const imgLocal = [
//   // меняем исходные пути на переменные
//   { name: "Avatar", image: avatar },
//   { name: "Logo Mesto", link: logo },
//   { name: "Pan", link: buttonImgEdit },
//   { name: "Plus", link: buttonImgAdd },
// ];*/
import "./index.css";

import { Api } from "../components/Api.js";
import { Section } from "../components/Section.js";
import { Userinfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { FormValidator } from "../components/ FormValidator.js";
import { Card } from "../components/Card.js";
import { PopupWithForm } from "../components/PopupWIthForm.js";
import {
  editButtonProfile,
  addButtonCard,
  profileAvatar,
  popupButton,
  validationObj,
  formProfile,
  cardForm,
  avatarForm,
  inputAvatar,
  inputCardName,
  inputCardLink,
} from "../utils/constants.js";

const config = {
  url: "https://mesto.nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "bfab4c9e-8154-4a65-a30a-fb47c451faea",
    "Content-Type": "application/json",
  },
};

let userId = null;
//апи
const api = new Api(config);

const cardList = new Section(".cards__container", (data) => {
  const card = new Card({
    data: data,
    cardTemplate: "#card-template",
    delClickHandler: (data) => {
      api
        .deleteCard(data._id)
        .then(() => {
          card.removeCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    likeClickHandler: () => {
      if (card.isLiked) {
        api
          .deleteLike(data._id)
          .then((responce) => {
            card.toogleLike(responce);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api
          .putLike(data._id)
          .then((responce) => {
            card.toogleLike(responce);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    },
    imgClickHandler: (dataImage) => {
      popupImg.open(dataImage);
    },
  });
  const newCard = card.generate(userId, data);
  return newCard;
});

const popupImg = new PopupWithImage(".popup_image");

const popupEditProfile = new PopupWithForm(".popup_profile", (value) => {
    popupEditProfile.renderLoading(true);
    api
    .editProfile({ name: value.profileTitle, about: value.profileSubtitle })
    .then((res) => {
      userInfo.renderUserProfile(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
});
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(".popup_card", (value) => {
  console.log(value);
  popupAddCard.renderLoading(true);

  api
  .getCard(value)
  .then((res) => {
    cardList.addCard(res, "prepend");
    popupAddCard.close();
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => {
    popupAddCard.renderLoading(false);
  })
});

popupAddCard.setEventListeners();

const popupGetAvatar = new PopupWithForm(".popup_avatar", (value) => {
  popupGetAvatar.renderLoading(true);
  api
    .gatUserAvatar({ avatar: value.avatarlink })
    .then((res) => {
      userInfo.renderUserAvatar(res);
      popupGetAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupGetAvatar.renderLoading(false);
    });
});

popupGetAvatar.setEventListeners();

const userInfo = new Userinfo({
  userTitleSelector: ".profile__title",
  userSubtitleSelector: ".profile__subtitle",
  userAvatarSelector: ".profile__avatar",
});

api
  .getAllInfo()
  .then(([userData, cards]) => {
    userId = userData._id;
    console.log(userId);
    userInfo.renderUserProfile(userData);
    userInfo.renderUserAvatar(userData);
    cardList.renderItem(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

editButtonProfile.addEventListener("click", () => {
  popupEditProfile.setInputValues(userInfo.returnUserInfo());
  popupEditProfile.open();
  formProfileValidation.doFormBasic();
});

addButtonCard.addEventListener("click", () => {
  popupAddCard.open();
  inputCardName.value = "";
  inputCardLink.value = "";
  formCardValidation.doFormBasic();
});

profileAvatar.addEventListener("click", () => {
  popupGetAvatar.open();
  inputAvatar.value = "";
  formaAvatarValidation.doFormBasic();
});

const formProfileValidation = new FormValidator(validationObj, formProfile);
const formCardValidation = new FormValidator(validationObj, cardForm);
const formaAvatarValidation = new FormValidator(validationObj, avatarForm);
formProfileValidation.enableValidation();
formCardValidation.enableValidation();
formaAvatarValidation.enableValidation();
