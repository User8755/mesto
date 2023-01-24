export default class UserInfo {
  constructor(getInputName, getInputWork) {
    this._getInputName = getInputName
    this._getInputWork = getInputWork;
  };

  getUserInfo() {
    const userInfo = {
      profilename: this._getInputName.textContent,
      profilework: this._getInputWork.textContent
    };
  
    return userInfo
  };

  setUserInfo(item) {
    this._getInputName.textContent = item.profilename;
    this._getInputWork.textContent = item.profilework;
  };
};