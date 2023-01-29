export default class Card {
  constructor(name, link, templateSelector, handleOpenPopupWithImage) {
    this._templateSelector = templateSelector;
    this._link = link;
    this._name = name;
    this._handleOpenPopupWithImage = handleOpenPopupWithImage;
  };

_getCard() {
  const dataCard = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true)

    return dataCard
}

_likeCard() {
  this.classList.toggle('card__like_active');
};

_deleteCard() {
    this._element.closest('.card').remove();
    this._element = null;
};

_setEventListeners(item) {
  this._element.querySelector('.card__like').addEventListener('click', this._likeCard);
  //this._element.querySelector('.card__btn-delete').addEventListener('click', () => this._deleteCard());
  this._element.querySelector('.card__btn-delete').addEventListener('click',() => document.querySelector ('.popup_type_delete').classList.add('popup_visible'));
  this._cardImg.addEventListener('click', this._handleOpenPopupWithImage);
};

generateCard(item) {
  this._element = this._getCard();
  this._cardImg = this._element.querySelector('.card__img');
  this._cardImg.src = this._link; 
  this._cardImg.alt = this._name; 
  this._element.querySelector('.card__title').textContent = this._name;
  this._element.querySelector('.card__span').textContent = item;
  this._setEventListeners();
  
  return this._element
};

};
