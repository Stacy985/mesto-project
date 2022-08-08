export class Userinfo {
    constructor({userTitleSelector, userAvatarSelector, userSubtitleSelector}) {
        this._userTitleElement = document.querySelector(userTitleSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
        this._userSubtitleElement = document.querySelector(userSubtitleSelector)
    }

    _getUserInfo ({name, avatar, about, _id}) {
        this._profileTitle = name; 
        this._profileSubtitle = about;
        this._userAvatar = avatar;
        this._userId = _id
    }

    returnUserInfo () {
        return {
            profileTitle : this._profileTitle,
            profileSubtitle : this._profileSubtitle
        }
    }

    renderUserProfile ({name, avatar, about, _id}) {
        this._getUserInfo({name, avatar, about, _id});
        this._userTitleElement.textContent = this._profileTitle;
        this._userSubtitleElement.textContent = this._profileSubtitle;
    }

    renderUserAvatar ({name, avatar, about, _id}) {
        this._getUserInfo({name, avatar, about, _id});
        this._userAvatarElement.src = this._userAvatar
    }
}