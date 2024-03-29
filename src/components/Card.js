export default class Card {
  constructor({name, link, templateSelector, handleOpenPopupWithImage, data, openPopupDel, id, likesClickFunc, delLike}) {
    this._templateSelector = templateSelector;
    this._link = link;
    this._name = name;
    this._handleOpenPopupWithImage = handleOpenPopupWithImage;
    this._data = data;
    this._openPopupDel = openPopupDel;
    this._id = id
    this._likesClickFunc = likesClickFunc
    this._delLike = delLike
  };

_getCard() {
  const dataCard = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true)

    return dataCard
}

deleteCard() {
    this._element.closest('.card').remove();
    this._element = null;
};

_hideBtnTrash() {
  if (this._data.owner._id != this._id)
  {
    this._element.querySelector ('.card__btn-delete').classList.add('popup__btn-delete_hiden')
  }
};

_setEventListeners() {
  this._cardLike = this._element.querySelector('.card__like');
  this._cardImg.addEventListener('click', this._handleOpenPopupWithImage);
  this._element.querySelector('.card__btn-delete').addEventListener('click',()=> {this._openPopupDel()})
  this._cardLike.addEventListener('click',() => { 
    this._statusLike()
  });
  
  this._hideBtnTrash()
};

_statusLike() {
  this._likesToggleStatus = this._cardLike.classList.toggle('card__like_active')
  if(this._data.likes.some(id => id._id === this._id)) {
    this._delLike()
    .then(res=>{this._data = res, this._likesToggleStatus, this._span.textContent = res.likes.length})
    .catch((error) => {console.log(error)})
  } else {
    this._likesClickFunc()
    .then(res=>{this._data = res, this._likesToggleStatus ,this._span.textContent = res.likes.length})
    .catch((error) => {console.log(error)})
  }
}

getCardId() {
  return this._data._id
};

generateCard() {
  this._element = this._getCard();
  this._span = this._element.querySelector('.card__span');
  this._cardImg = this._element.querySelector('.card__img');
  this._cardImg.src = this._link; 
  this._cardImg.alt = this._name; 
  this._element.querySelector('.card__title').textContent = this._name;
  this._span.textContent = this._data.likes.length;
  if(this._data.likes.some(id => id._id === this._id)) {
    this._element.querySelector('.card__like').classList.add('card__like_active')
  }
  this._setEventListeners();

  return this._element
};

};
