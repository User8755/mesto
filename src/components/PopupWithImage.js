import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup, popupImgPreview, popupFigcaption) {
    super(popup);
    this._img = popupImgPreview;
    this._popupFigcaption = popupFigcaption;
  };

open(name, link) {
  this._img.src = ''
  super.open()
  this._img.src = link
  this._img.alt = name
  this._popupFigcaption.textContent = name
};

};