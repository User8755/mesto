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
  dataInput,
  popupImg,
  forms,
  popupFigcaption} from './list.js'
import Card from './Card.js'
import {selectors} from './selectors.js';
import FormValidator from './FormValidator.js'
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js'

const popupImgPreview = (name, link) => { 
  const popupImage = new PopupWithImage(popupImg, dataInput, popupFigcaption);
  popupImage.setEventListeners();
  popupImage.open(name, link);
  //dataInput.src = ''
}
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
  openNewProfile.close();
};

const   renderer = (item) => {
  const cardCreate = new Card(item.name, item.link,'.photo-card',() => popupImgPreview(item.name, item.link));
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
  popupNewCard.close();
};

//Сброс формы
const clearInputPopup = () => {
  forms.reset()
};

//Создание экземпляра класса валидации для popup
const validProfile = new FormValidator(popupProfile, selectors);
const validNewCard = new FormValidator(popupAdd, selectors);

const openNewProfile = new Popup(popupProfile);
const popupNewCard = new Popup(popupAdd);

openNewProfile.setEventListeners();
popupNewCard.setEventListeners();

renderCard.rendererElement()
//Вызовы
validNewCard.enableValidation();
validProfile.enableValidation();
btnOpenProfileEdit.addEventListener('click',() => {openNewProfile.open(), checkProfileText(), validProfile.resetValidation()})
btnAdd.addEventListener('click', () => {clearInputPopup(), popupNewCard.open(), validNewCard.resetValidation()});

formProfile.addEventListener('submit', submitFormProfile);
formAdd.addEventListener('submit', submitInputPhoto);