const popup = document.querySelector ('.popup');
const popupAdd = document.querySelector ('.popup__add');
const openProfileEdit = document.querySelector ('.profile__btn-edit');
const exitProfilEdit = document.querySelector ('.popup__btn-exit')
const exitPopupAdd = document.querySelector ('.popup__add_btn-exit')
const nameProfile = document.querySelector ('.profile__name');
const work = document.querySelector ('.profile__work')
const form = document.querySelector ('.popup__container');
const formAdd = document.querySelector ('.popup__add_container');
const nameInput = document.querySelector ('.popup__input_type_name');
const workInput =  document.querySelector ('.popup__input_type_work');
const photoCard = document.querySelector ('.photo-card').content;
const card = photoCard.querySelector ('.card');
const photo = document.querySelector ('.photo');
const btnAdd = document.querySelector ('.profile__btn-add');
const namePlaceInput = document.querySelector ('.popup__input_type_place-name');
const urlImgInput = document.querySelector ('.popup__input_type_url-img');
const popupImg = document.querySelector ('.popup__img-open');
const exitPopupImg = document.querySelector('.popup__img_btn-exit');
const cardImg = document.querySelector('.card__img');

const initialCards = [

  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Popup профиля
const popupVisible = () => {
  popup.classList.add('popup_visible');
  nameInput.value = nameProfile.textContent;
  workInput.value = work.textContent;
};

const popupExit = () => {
  popup.classList.remove('popup_visible')
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = `${nameInput.value}`;
  work.textContent = `${workInput.value}`;
  popupExit();
};

// Popup карточек
const popupAddVisible = () => {
  popupAdd.classList.add('popup_visible');
};

const popupAddExit = () => {
  popupAdd.classList.remove('popup_visible');
};

// Добавление карточек
const inputSubmitPhoto = (evt) => {
  evt.preventDefault();
  initialCards.unshift({name: namePlaceInput.value, link: urlImgInput.value});
  const addCard = photoCard.cloneNode(true);
  addCard.querySelector('.card__img').src = initialCards[0].link;
  addCard.querySelector('.card__img').alt = initialCards[0].name;
  addCard.querySelector('.card__title').textContent = initialCards[0].name;
  addCard.querySelector('.card__like').addEventListener('click', (evt)=>{
    evt.target.classList.toggle('card__like_active');
  });
  addCard.querySelector('.card__btn-delete').addEventListener('click', (evt)=>{
    evt.target.closest('.card').remove();
  });
  addCard.querySelector('.card__img').addEventListener('click', (evt)=>{
    popupImgVisible(evt)
  });
  photo.prepend(addCard);
  popupAddExit();
};

const  popupImgVisible = (evt) => {
  popupImg.classList.add('popup_visible');
  document.querySelector('.popup__img').src = evt.target.src;
  document.querySelector('.popup__img').alt = evt.target.alt;
  document.querySelector('.popup__figcaption').textContent = evt.target.alt;
};

// Базовая загрузка карточек
initialCards.forEach((element) => {
  const addCard = photoCard.cloneNode(true);
  addCard.querySelector('.card__img').src = element.link;
  addCard.querySelector('.card__img').alt = element.name;
  addCard.querySelector('.card__title').textContent = element.name;
  addCard.querySelector('.card__like').addEventListener('click', (evt)=>{
    evt.target.classList.toggle('card__like_active');
  });
  addCard.querySelector('.card__btn-delete').addEventListener('click', (evt)=>{
    evt.target.closest('.card').remove();
  });
  addCard.querySelector('.card__img').addEventListener('click', (evt)=>{
    popupImgVisible(evt)
  });
  photo.append(addCard);
});

const  popupImgExit = () => {
  popupImg.classList.remove('popup_visible');
}

// Вызовы функций
form.addEventListener('submit', formSubmitHandler);
openProfileEdit.addEventListener ('click', popupVisible);
exitProfilEdit.addEventListener ('click', popupExit);
btnAdd.addEventListener ('click', popupAddVisible);
exitPopupAdd.addEventListener ('click', popupAddExit);
formAdd.addEventListener ('submit', inputSubmitPhoto);
exitPopupImg.addEventListener ('click', popupImgExit);