import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._img = this._popup.querySelector('.popup__img');
    this._popupFigcaption = this._popup.querySelector('.popup__figcaption');
  };

open(name, link) {
  super.open()
  this._img.src = link
  this._img.alt = name
  this._popupFigcaption.textContent = name
};

};