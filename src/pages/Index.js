import { Api } from "../components/Api.js";
import { Section } from "../components/Section.js";
import { Userinfo } from "../components/UserInfo.js";
import { PopupImage } from "../components/PopupImage.js";
import { Cards } from "../components/cards.js";
import { PopupForm } from "../components/PopupForm.js";
import {
  editButtonProfile,
  addButtonCard,
  profileAvatar,
  popupButton,
} from "../utils/constants.js";

const config = {
  url: "https://mesto.nomoreparties.co/v1/plus-cohort-13",
  headers: {
    authorization: "bfab4c9e-8154-4a65-a30a-fb47c451faea",
    "Content-Type": "application/json",
  },
};

//апи
const api = new Api(config);

function renderLoading(loading) {
  if (loading) {
    popupButton.value = "Сохранение...";
  } else {
    popupButton.value = "Сохраненить";
  }
}

const popupImg = new PopupImage(".popup_image");

const cardList = new Section(".cards__container", (data) => {
  const card = new Cards({
    data: data,
    cardTemplate: "#card-template",
    delClickHandler: (data) => {
      api
        .deleteCard(data._id)
        .then(() => {
          this._element.remove();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    likeClickHandler: () => {
      if (card.isLiked) {
        api
          .deleteLike(data._id)
          .then(() => {
            card.toogleLike(data);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api
          .putLike(data._id)
          .then(() => {
            card.toogleLike(data);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
    },
    imgClickHandler: () => {
      popupImg.open(data);
    },
  });
  const newCard = card.generate(userInfo._id, data);
  return newCard;
});

const popupEditProfile = new PopupForm(".popup__profile", (value) => {
  renderLoading(true);
  api
    .editProfile({ name: value.profileTitle, about: value.profileSubtitle })
    .then((res) => {
      userInfo.renderUserProfile(res);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
});

const popupAddCard = new PopupForm(".popup_card", (value) => {
  renderLoading(true);
  api.getCard({ name: value.titlename, link: value.cardlink }).then((res) => {
    cardList.renderItem(card, "prepend");
    popupAddCard.close();
  });
});

const popupGetAvatar = new PopupForm(".popup_avatar", (value) => {
  renderLoading(true);
  api
    .gatUserAvatar({ avatar: value.avatarlink })
    .then((res) => {
      userInfo.renderUserAvatar(res);
      popupGetAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
});

const userInfo = new Userinfo({
  userTitleSelector: ".profile__title",
  userSubtitleSelector: ".profile__subtitle",
  userAvatarSelector: ".profile__avatar",
});

api
  .getAllInfo()
  .then(([userData, cards]) => {
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
});

addButtonCard.addEventListener("click", () => {
  popupAddCard.open();
});
profileAvatar.addEventListener("click", () => {
  popupGetAvatar.open();
});
