export default class UserInfo {
  constructor(getInputName, getInputWork, getAvatar, getId) {
    this._getInputName = getInputName;
    this._getInputWork = getInputWork;
    this._getAvatar = getAvatar;
    this._getId = getId;
  };

  getUserInfo() {
    const userInfo = {
      profilename: this._getInputName.textContent,
      profilework: this._getInputWork.textContent,
      avatar: this._getAvatar,
      id: this._getId
    };
    return userInfo
  };

  setUserInfo(item) {
    this._getInputName.textContent = item.name;
    this._getInputWork.textContent = item.about
    this._getAvatar.src = item.avatar;
    this._getId = item._id;
  };
};