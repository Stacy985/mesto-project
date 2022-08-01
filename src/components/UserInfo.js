export class Userinfo {
    constructor({userId, userName, userTitle, userAvatar}){
        this._userId = userId;
        this._userName = userName;
        this._userTitle = userTitle;
        this._userAvatar = userAvatar;
    }
    getUser(){
        const iserInfo = {
            _id: this._userId,
            name: this._userName.textContent,
            about: this._userTitle.textContent,
            avatar: this._userAvatar.src
        };
        return iserInfo;
    }
    setUserInfo(id, name, about, avatar) {
        this.userId = id;
        this._userName.textContent = name;
        this._userTitle.textContent = about;
        this._userAvatar.src = avatar
    }
}