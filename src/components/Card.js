export default class Card {
  constructor(name, link, templateSelector, handleOpenPopupWithImage, data, openPopupDel) {
    this._templateSelector = templateSelector;
    this._link = link;
    this._name = name;
    this._handleOpenPopupWithImage = handleOpenPopupWithImage;
    this._data = data;
    this._openPopupDel = openPopupDel;
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
    //this._element = null;
};

_setEventListeners() {
  this._element.querySelector('.card__like').addEventListener('click', this._likeCard);
  this._element.querySelector('.card__btn-delete').addEventListener('click', this._openPopupDel);

  

  // this._element.querySelector('.card__btn-delete').addEventListener('click',() => {
  //   document.querySelector ('.popup_type_delete').classList.add('popup_visible'), 
  //   document.querySelector('.popup__btn-delete').addEventListener('click', () => {this._deleteCard()})
  // });
  //console.log(this)
  this._cardImg.addEventListener('click', this._handleOpenPopupWithImage);
};

generateCard() {
  this._element = this._getCard();
  this._cardImg = this._element.querySelector('.card__img');
  this._cardImg.src = this._link; 
  this._cardImg.alt = this._name; 
  this._element.querySelector('.card__title').textContent = this._name;
  this._element.querySelector('.card__span').textContent = this._data.likes.length;
  if (this._data.owner._id != "44ed7b7962d6cfb8fdf85daa")
  {
    this._element.querySelector ('.card__btn-delete').classList.add('popup__btn-delete_hiden')
  }
  this._setEventListeners();
  
  return this._element
};

};