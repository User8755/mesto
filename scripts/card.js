class Card {
	constructor(templateSelector) {
		this._templateSelector = templateSelector;
	};

_getCard() {
  const dataCard = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true)

    return dataCard
};


_likeCard() {
  this._like = this._element.querySelector('.card__like');
  this._like.addEventListener('click', ()=>{
    this._like.classList.toggle('card__like_active');
  });
};

_deleteCard() {
  this._del = this._element.querySelector('.card__btn-delete');
  this._del.addEventListener('click', ()=>{
    this._del.closest('.card').remove();
  });
};

};

export class DefaultCard extends Card {
  constructor(name, link, templateSelector) {
  super(templateSelector)
  this._link = link;
  this._name = name;
  }

  addData(item) {
    this._element = this._getCard();
    this._cardImg = this._element.querySelector('.card__img');
    this._cardImg.src = this._link; 
    this._cardImg.alt = this._name; 
    this._element.querySelector('.card__title').textContent = this._name;
    this._cardImg.addEventListener('click', item)
    super._likeCard()
    super._deleteCard()

    return this._element
  };

};