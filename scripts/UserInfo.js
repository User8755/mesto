export default class UserInfo {
  constructor(getInputName, getInputWork) {
    this._getInputName = getInputName;
    this._getInputWork = getInputWork;
  };

  getUserInfo() {
    const inputValue = {
      profilename: this._getInputName.value,
      profilework: this._getInputWork.value
    };
  
    return inputValue
  };

  setUserInfo(item) {
    console.log(item)
    this._getInputName.textContent = item.profilename;
    this._getInputWork.textContent = item.profilework;
  };
};