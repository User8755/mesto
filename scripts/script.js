const formProfile = document.querySelector ('.popup__container_edit');
const popupProfile = document.querySelector ('.popup_type_profile');
const popupAdd = document.querySelector ('.popup_type_card-add');
const openProfileEdit = document.querySelector ('.profile__btn-edit');
const exitProfilEdit = document.querySelector ('.popup__btn-exit_edit')
const exitPopupAdd = document.querySelector ('.popup__btn-exit_add')
const nameProfile = document.querySelector ('.profile__name');
const work = document.querySelector ('.profile__work')
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

//Текст в полях ввода
const popupProfileText = () => {
  nameInput.value = nameProfile.textContent;
  workInput.value = work.textContent;
}

//Закрытие popup по клавише esc
const popupExitEsc = (evt) => {
  if (evt.key === 'Escape') {
    popupExit(popupProfile);
    popupExit(popupAdd);
    popupExit(popupImg);
  };
};

//Закрытие popup по клику на оверлей
const popupExitClick = (evt) => {
    if (evt.target.classList.contains("popup_visible")) {
      popupExit(popupProfile);
      popupExit(popupAdd);
      popupExit(popupImg);
    }
  };

// Popup видимый
const popupVisible = (item) => {
  item.classList.add('popup_visible');
};
// Popup невидимый
const popupExit = (item) => {
  item.classList.remove('popup_visible');
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  work.textContent = workInput.value;
  popupExit(popupProfile);
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
    popupImgVisible(evt);
  });
  return addCard
}

const renderCard = (addCard) => {
  photo.prepend(addCard);
};

// Базовая загрузка карточек
initialCards.forEach(item => renderCard(createCard(item)));

// Добавление карточек
const inputSubmitPhoto = (evt) => {
  evt.preventDefault();
  const input = {name: namePlaceInput.value, link: urlImgInput.value};
  renderCard(createCard(input));
  popupExit(popupAdd);
};

//попап с оригиналом картинки
const  popupImgVisible = (evt) => {
  popupVisible(popupImg);
  document.querySelector('.popup__img').src = evt.target.src;
  document.querySelector('.popup__img').alt = evt.target.alt;
  document.querySelector('.popup__figcaption').textContent = evt.target.alt;
};

formProfile.addEventListener('submit', formSubmitHandler);
formAdd.addEventListener ('submit', inputSubmitPhoto);
openProfileEdit.addEventListener ('click', () => {popupVisible(popupProfile), popupProfileText()});
btnAdd.addEventListener ('click', () => {popupVisible(popupAdd)});
exitProfilEdit.addEventListener ('click', () => {popupExit(popupProfile)});
exitPopupAdd.addEventListener ('click', () => {popupExit(popupAdd)});
exitPopupImg.addEventListener ('click', () => {popupExit(popupImg)});
document.addEventListener('keydown', popupExitEsc);
document.addEventListener('click', popupExitClick);