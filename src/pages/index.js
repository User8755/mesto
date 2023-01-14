import './index.css';

import logo from '../images/logo.svg'
const images = [
  {name: 'logo', iamge: logo}
]
import {
  btnAdd, btnOpenProfileEdit, dataInput, initialCards, nameInput, namePlaceInput, nameProfile, photo, popupAdd, popupFigcaption, popupImg, popupProfile, urlImgInput, work, workInput
} from '../utils/constlist.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import { selectors } from '../utils/selectors.js';
import UserInfo from '../components/UserInfo.js';




const popupImgPreview = (name, link) => { 
  const popupImage = new PopupWithImage(popupImg, dataInput, popupFigcaption);
  popupImage.setEventListeners();
  popupImage.open(name, link);
}
//Текст в полях ввода
const checkProfileText  = () => {
  nameInput.value = nameProfile.textContent;
  workInput.value = work.textContent;
};


// Добавление карточек
const submitInputPhoto = () => {
  const inputPlace = {name: namePlaceInput.value, link: urlImgInput.value};
  renderer(inputPlace)
};

const   renderer = (item) => {
  const cardCreate = new Card(item.name, item.link,'.photo-card', () => popupImgPreview(item.name, item.link));
  const cardElement = cardCreate.generateCard();
  renderCard.addItem(cardElement)
}

const renderCard = new Section({
  items: initialCards,
  renderer}, photo);

const userInfo = new UserInfo(nameProfile, work);

const validProfile = new FormValidator(popupProfile, selectors);
const validNewCard = new FormValidator(popupAdd, selectors);

const popupWithFormAdd = new PopupWithForm({
  popup: popupAdd, 
  submit: () => {submitInputPhoto(), popupWithFormAdd.close()}
});

const popupWithFormProfile = new PopupWithForm({
  popup: popupProfile, 
  submit: (item) => {userInfo.setUserInfo(item), popupWithFormProfile.close()}
});

validNewCard.enableValidation();
validProfile.enableValidation();

popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();

renderCard.rendererElement();

btnOpenProfileEdit.addEventListener('click',() => {
  popupWithFormProfile.open(), 
  validProfile.resetValidation()
  checkProfileText()
  });

btnAdd.addEventListener('click', () => {
  validNewCard.resetValidation(),
  popupWithFormAdd.open()
});
