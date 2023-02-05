import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('.form')
    this._btnDel = this._popup.querySelector('.popup__btn-delete');
  };

  setSubmitHandler(cardId, handler) {
    this._cardId = cardId
    this._handleSubmitHandler = handler
  };

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit',(evt)=>{
      evt.preventDefault();
      this._handleSubmitHandler(this._cardId)
      this._btnDel.textContent = 'Удаляем...'})
  };

  open() {
    super.open()
  };

  close() {
    super.close();
    setTimeout(()=>(this._btnDel.textContent = 'Да'), 1000)
  };
};