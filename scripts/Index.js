import {initialCards} from './list.js'
import Card from './card.js'
import {selectors} from './selectors.js';
import FormValidator from './formValidator.js'

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

//Текст в полях ввода
const checkProfileText  = () => {
  nameInput.value = nameProfile.textContent;
  workInput.value = work.textContent;
}

//Закрытие popup по клавише esc
const handleCloseByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupClose = document.querySelector('.popup_visible');
    exitPopup(popupClose);
  };
};

//Закрытие popup по клику на оверлей
const handleCloseByOverlay = (evt) => {
   if (evt.target.classList.contains("popup_visible")) {
    exitPopup(evt.target);
    }
  };

// Popup видимый
const visiblePopup = (popup) => {
  popup.classList.add('popup_visible');
  document.addEventListener('keydown', handleCloseByEsc);
};
// Popup невидимый
const exitPopup = (popup) => {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown', handleCloseByEsc);
};

//Поля поапа редактирвоания профиля
const submitFormProfile = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  work.textContent = workInput.value;
  exitPopup(popupProfile);
};

//попап с оригиналом картинки
const  handleOpenPopupWithImage = (evt) => {
  popupImgPreview.src = evt.target.src;
  popupImgPreview.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
  visiblePopup(popupImg);
};

//Добавление карточек в DOM
const addCard = (item) => {
  const cardCreate = new Card(item.name, item.link,'.photo-card', handleOpenPopupWithImage);
  const cardElement = cardCreate.generateCard();

  return cardElement
};

const renderCard = (cardElement) => {
  photo.prepend(cardElement);
}; 

//Базовый список картинок
initialCards.forEach((item) => {renderCard(addCard(item))});

// Добавление карточек
const submitInputPhoto = (evt) => {
  evt.preventDefault();
  const input = {name: namePlaceInput.value, link: urlImgInput.value};
  renderCard(addCard(input));
  exitPopup(popupAdd);
};

//Сброс формы
const clearInputPopup = () => {
  forms.reset()
};

//Создание экземпляра класса валидации для popup
const validProfile = new FormValidator(popupProfile, selectors);
const validNewCard = new FormValidator(popupAdd, selectors);

validNewCard.enableValidation();
validProfile.enableValidation();

formProfile.addEventListener('submit', submitFormProfile);
formAdd.addEventListener('submit', submitInputPhoto);
btnOpenProfileEdit.addEventListener('click', () => {visiblePopup(popupProfile), checkProfileText(), validProfile.resetValidation()});
btnAdd.addEventListener('click', () => {clearInputPopup(), visiblePopup(popupAdd), validNewCard.resetValidation()});
btnExitProfilEdit.addEventListener('click', () => {exitPopup(popupProfile)});
btnExitPopupAdd.addEventListener('click', () => {exitPopup(popupAdd)});
exitPopupImg.addEventListener('click', () => {exitPopup(popupImg)});
document.addEventListener('mousedown', handleCloseByOverlay);