import './index.css';

import {
  btnAdd, btnOpenProfileEdit, initialCards, nameInput, nameProfile, photo, popupAdd, popupImg, popupProfile, work, workInput
} from '../utils/constlist.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import { selectors } from '../utils/selectors.js';
import UserInfo from '../components/UserInfo.js';

//Текст в полях ввода
const checkProfileText  = () => {
  nameInput.value = nameProfile.textContent;
  workInput.value = work.textContent;
};

// Добавление карточек
const submitInputPhoto = (item) => {
  const inputPlace = {name: item.placename, link: item.urlimg};
  console.log(item)
  renderer(inputPlace)
};

const popupImage = new PopupWithImage(popupImg);

const popupImgPreview = (name, link) => { 
  popupImage.open(name, link);
};

const   renderer = (item) => {
  const cardCreate = new Card(item.name, item.link,'.photo-card', () => popupImgPreview(item.name, item.link));
  const cardElement = cardCreate.generateCard();
  cardList.addItem(cardElement)
}

const cardList = new Section({
  items: initialCards,
  renderer}, photo);

const userInfo = new UserInfo(nameProfile, work);

const validProfile = new FormValidator(popupProfile, selectors);
const validNewCard = new FormValidator(popupAdd, selectors);

const popupWithFormAdd = new PopupWithForm({
  popup: popupAdd, 
  submit: (item) => {submitInputPhoto(item), popupWithFormAdd.close()}
});

const popupWithFormProfile = new PopupWithForm({
  popup: popupProfile, 
  submit: (item) => {userInfo.setUserInfo(item), popupWithFormProfile.close()}
});

popupImage.setEventListeners();

validNewCard.enableValidation();
validProfile.enableValidation();

popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();

cardList.rendererElement();

btnOpenProfileEdit.addEventListener('click',() => {
  popupWithFormProfile.open(), 
  validProfile.resetValidation(),
  checkProfileText()
  });

btnAdd.addEventListener('click', () => {
  validNewCard.resetValidation(),
  popupWithFormAdd.open()
});
