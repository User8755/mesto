const popupProfile = document.querySelector ('.popup_type_profile');
const popupAdd = document.querySelector ('.popup_type_card-add');
const openProfileEdit = document.querySelector ('.profile__btn-edit');
const exitProfilEdit = document.querySelector ('.popup__btn-exit_edit')
const exitPopupAdd = document.querySelector ('.popup__btn-exit_add')
const nameProfile = document.querySelector ('.profile__name');
const work = document.querySelector ('.profile__work')
const form = document.querySelector ('.popup__container_edit');
const formAdd = document.querySelector ('.popup__container_add');
const nameInput = document.querySelector ('.popup__input_type_name');
const workInput =  document.querySelector ('.popup__input_type_work');
const photoCard = document.querySelector ('.photo-card').content;
const card = photoCard.querySelector ('.card');
const photo = document.querySelector ('.photo');
const btnAdd = document.querySelector ('.profile__btn-add');
const namePlaceInput = document.querySelector ('.popup__input_type_place-name');
const urlImgInput = document.querySelector ('.popup__input_type_url-img');
const popupImg = document.querySelector ('.popup_type_img');
const exitPopupImg = document.querySelector('.popup__btn-exit_img');
const cardImg = document.querySelector('.card__img');
//Нужно упорядочить переменные

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

const createCard = (element) => {
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
  photo.prepend(addCard);
}

// Базовая загрузка карточек
initialCards.forEach(item => createCard(item));

// Добавление карточек
const inputSubmitPhoto = (evt) => {
  evt.preventDefault();
  initialCards.unshift({name: namePlaceInput.value, link: urlImgInput.value});
  const element = initialCards[0];
  createCard(element);
  popupAddExit();
};

//попап с оригиналом картинки
const  popupImgVisible = (evt) => {
  popupImg.classList.add('popup_visible');
  const cardTitle = document.querySelector('.card__title');
  document.querySelector('.popup__img').src = evt.target.src;
  document.querySelector('.popup__img').alt = evt.target.alt;
  document.querySelector('.popup__figcaption').textContent = evt.target.alt;
};

//закртытие попап с картинкой
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
