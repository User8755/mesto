export default class UserInfo {
  constructor(getInputName, getInputWork) {
    this._getInputName = getInputName
    this._getInputWork = getInputWork;
  };

  getUserInfo() {
    const inputValue = {
      profilename: this._getInputName.textContent,
      profilework: this._getInputWork.textContent
    };
    console.log(inputValue)
    return inputValue
  };

  setUserInfo(item) {
    
    this._getInputName.textContent = item.profilename;
    this._getInputWork.textContent = item.profilework;
  };
};