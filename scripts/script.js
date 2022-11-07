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
const card = document.querySelector ('.card');
const photo = document.querySelector ('.photo');
const photoCard = document.querySelector ('.photo-card').content;
const btnAdd = document.querySelector ('.profile__btn-add');
const namePlaceInput = document.querySelector ('.popup__input_type_place-name');
const urlImgInput = document.querySelector ('.popup__input_type_url-img');
const popupAddSave = document.querySelector('.popup__add_btn-exit');
const popupAddBtnSave = document.querySelector ('.popup__add_btn-save');
const btnLike = document.querySelector ('.card__like');


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
function popupVisible () {
  popup.classList.add('popup_visible');
  nameInput.value = nameProfile.textContent;
  workInput.value = work.textContent;
};

function popupExit() {
  popup.classList.remove('popup_visible')
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = `${nameInput.value}`;
  work.textContent = `${workInput.value}`;
  popupExit();
};

// Popup карточек
function popupAddVisible () {
  popupAdd.classList.add('popup_visible');
};

function popupAddExit() {
  popupAdd.classList.remove('popup_visible');
};

// Добавление карточек
function inputSubmitPhoto (evt) {
  evt.preventDefault();
  initialCards.unshift({name: namePlaceInput.value, link: urlImgInput.value});
  const addCard = photoCard.cloneNode(true);
  addCard.querySelector('.card__img').src = initialCards[0].link;
  addCard.querySelector('.card__img').alt = initialCards[0].name;
  addCard.querySelector('.card__title').textContent = initialCards[0].name;
  addCard.querySelector('.card__btn-delete').addEventListener('click', (evt)=>{
    evt.target.closest('.card').remove();
  });
  addCard.querySelector('.card__btn-delete').addEventListener('click', (evt)=>{
    evt.target.closest('.card').remove();
  }) 
  photo.prepend(addCard);
  popupAddExit();
};

// Базовая загрузка карточек
initialCards.forEach((element) => {
  const addCard = photoCard.cloneNode(true);
  addCard.querySelector('.card__img').src = element.link;
  addCard.querySelector('.card__img').alt = element.name;
  addCard.querySelector('.card__title').textContent = element.name;
  addCard.querySelector('.card__like').addEventListener('click', (evt)=>{
    evt.target.classList.toggle('card__like_active');
  })
  addCard.querySelector('.card__btn-delete').addEventListener('click', (evt)=>{
    evt.target.closest('.card').remove();
  })
  photo.append(addCard);
});

// Вызовы функций
form.addEventListener('submit', formSubmitHandler);
openProfileEdit.addEventListener ('click', popupVisible);
exitProfilEdit.addEventListener ('click', popupExit);
btnAdd.addEventListener ('click', popupAddVisible);
exitPopupAdd.addEventListener ('click', popupAddExit);
formAdd.addEventListener ('submit', inputSubmitPhoto);
popupAddSave.addEventListener ('click', inputSubmitPhoto);