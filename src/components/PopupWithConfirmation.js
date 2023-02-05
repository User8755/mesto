import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('.form')
  }

  setSubmitHandler(cardId, handler) {
    this._cardId = cardId
    this._handleSubmitHandler = handler
  }

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit',(evt)=>{
      evt.preventDefault();
      this._handleSubmitHandler(this._cardId)})
  }

open() {
  super.open()
}

close() {
  super.close();
};

}