import {DefaultCard} from './card.js'

const formProfile = document.querySelector ('.popup__container_edit');
const popupProfile = document.querySelector ('.popup_type_profile');
const popupAdd = document.querySelector ('.popup_type_card-add');
const btnOpenProfileEdit = document.querySelector ('.profile__btn-edit');
const btnExitProfilEdit = document.querySelector ('.popup__btn-exit_edit')
const btnExitPopupAdd = document.querySelector ('.popup__btn-exit_add')
const nameProfile = document.querySelector ('.profile__name');
const work = document.querySelector ('.profile__work')
const formAdd = document.querySelector ('.popup__container_add');
const nameInput = document.querySelector ('.popup__input_type_name');
const workInput =  document.querySelector ('.popup__input_type_work');
const photo = document.querySelector ('.photo');
const btnAdd = document.querySelector ('.profile__btn-add');
const namePlaceInput = document.querySelector ('.popup__input_type_place-name');
const urlImgInput = document.querySelector ('.popup__input_type_url-img');
const popupImg = document.querySelector ('.popup_type_img');
const exitPopupImg = document.querySelector('.popup__btn-exit_img');
const forms =  document.forms.add;
const popupImgPreview = document.querySelector('.popup__img');
const popupFigcaption = document.querySelector('.popup__figcaption');
const btnSave = popupAdd.querySelector ('.popup__btn-save');

//Текст в полях ввода
const checkProfileText  = () => {
  nameInput.value = nameProfile.textContent;
  workInput.value = work.textContent;
}

//Закрытие popup по клавише esc
const exitPopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const closePopup = document.querySelector('.popup_visible');
    exitPopup(closePopup);
  };
};

//Закрытие popup по клику на оверлей
const clickPopupExit = (evt) => {
   if (evt.target.classList.contains("popup_visible")) {
    exitPopup(evt.target);
    }
  };

// Popup видимый
const visiblePopup = (item) => {
  item.classList.add('popup_visible');
  document.addEventListener('keydown', exitPopupEsc);
};
// Popup невидимый
const exitPopup = (item) => {
  item.classList.remove('popup_visible');
  document.removeEventListener('keydown', exitPopupEsc);
};

//Поля поапа редактирвоания профиля
const submitFormHandle = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  work.textContent = workInput.value;
  exitPopup(popupProfile);
};

//попап с оригиналом картинки
const  visiblePopupImg = (evt) => {
  popupImgPreview.src = evt.target.src;
  popupImgPreview.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
  visiblePopup(popupImg);
};

//Добавление карточек в DOM
const addCard = (item) => {
  const createCard = new DefaultCard(item.name, item.link,'.photo-card');
  const cardElement = createCard.addData(visiblePopupImg);
  photo.prepend(cardElement);
}

//Базовый список картинок
initialCards.forEach((item) => {addCard(item)});

// Добавление карточек
const submitInputtPhoto = (evt) => {
  evt.preventDefault();
  const input = {name: namePlaceInput.value, link: urlImgInput.value};
  addCard(input);
  exitPopup(popupAdd);
};

//Сброс формы
const clearInputPopup = () => {
  forms.reset()
};

formProfile.addEventListener('submit', submitFormHandle);
formAdd.addEventListener ('submit', submitInputtPhoto);
btnOpenProfileEdit.addEventListener ('click', () => {visiblePopup(popupProfile), checkProfileText ()});
btnAdd.addEventListener ('click', () => {clearInputPopup(), disabledButton(btnSave), visiblePopup(popupAdd) });
btnExitProfilEdit.addEventListener ('click', () => {exitPopup(popupProfile)});
btnExitPopupAdd.addEventListener ('click', () => {exitPopup(popupAdd)});
exitPopupImg.addEventListener ('click', () => {exitPopup(popupImg)});
document.addEventListener('mousedown', clickPopupExit);