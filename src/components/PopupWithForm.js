import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popup, submit}) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._submit = submit;
    this._input = this._form.querySelectorAll('.popup__input');
    this._btnSave = this._popup.querySelector('.popup__btn-save');
  };

  _getInputValues() {
      this._inputData = {};
      this._input.forEach((item) => {this._inputData[item.name] = item.value});
      
      return this._inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues())
      this._btnSave.textContent = 'Сохранение...'
    });
  };

  close() {
    super.close();
    this._form.reset();
  };
};