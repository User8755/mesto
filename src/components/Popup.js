export default class Popup {
  constructor (popupElement) {
    this._popup = popupElement;
    this._btnExit = this._popup.querySelector('.popup__btn-exit');
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    };
  };

  _handleCloseByOverlay(evt)  {
    if (evt.target.classList.contains("popup_visible")) {
      this.close(evt.target);
     }
   };

  setEventListeners() {
    this._btnExit.addEventListener('click', (evt) => this.close(evt));
    document.addEventListener('mousedown', (evt) => this._handleCloseByOverlay(evt));
  };
};