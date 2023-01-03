import {initialCards,
  formProfile,
  popupProfile,
  popupAdd,
  btnOpenProfileEdit,
  nameProfile,
  work,
  formAdd,
  nameInput,
  workInput,
  photo,
  btnAdd,
  namePlaceInput,
  urlImgInput,
  popupImg,
  exitPopupImg,
  forms,
  popupImgPreview,
  popupFigcaption} from './list.js'
import Card from './Card.js'
import {selectors} from './selectors.js';
import FormValidator from './FormValidator.js'
import Section from './Section.js';
import Popup from './Popup.js';



//Текст в полях ввода
const checkProfileText  = () => {
  nameInput.value = nameProfile.textContent;
  workInput.value = work.textContent;
};

//Поля поапа редактирвоания профиля
const submitFormProfile = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  work.textContent = workInput.value;
  openProfile.close();
};

//попап с оригиналом картинки
const  handleOpenPopupWithImage = (evt) => {
  popupImgPreview.src = evt.target.src;
  popupImgPreview.alt = evt.target.alt;
  popupFigcaption.textContent = evt.target.alt;
};

const   renderer = (item) => {
  const cardCreate = new Card(item.name, item.link,'.photo-card', handleOpenPopupWithImage);
  const cardElement = cardCreate.generateCard();
  renderCard.addItem(cardElement)
}

const renderCard = new Section({
  items: initialCards,
  renderer}, photo);


// Добавление карточек
const submitInputPhoto = (evt) => {
  evt.preventDefault();
  const inputPlace = {name: namePlaceInput.value, link: urlImgInput.value};
  renderer(inputPlace)
  openAdd.close();
};

//Сброс формы
const clearInputPopup = () => {
  forms.reset()
};

//Создание экземпляра класса валидации для popup
const validProfile = new FormValidator(popupProfile, selectors);
const validNewCard = new FormValidator(popupAdd, selectors);

const openProfile = new Popup(popupProfile);
const openAdd = new Popup(popupAdd);

openProfile.setEventListeners();
openAdd.setEventListeners();

renderCard.rendererElement()
//Вызовы
validNewCard.enableValidation();
validProfile.enableValidation();
btnOpenProfileEdit.addEventListener('click',() => {openProfile.open(), checkProfileText(), validProfile.resetValidation()})
btnAdd.addEventListener('click', () => {clearInputPopup(), openAdd.open(), validNewCard.resetValidation()});

formProfile.addEventListener('submit', submitFormProfile);
formAdd.addEventListener('submit', submitInputPhoto);