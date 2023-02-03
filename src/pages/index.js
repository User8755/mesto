import './index.css';
import {
btnAdd, btnOpenProfileEdit, nameInput, nameProfile, photo, popupAdd, popupImg, popupProfile,
work, workInput, namePlaceInput, urlImgInput, popupDelete, btnDel, myId
} from '../utils/constlist.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import { selectors } from '../utils/selectors.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

//Текст в полях ввода 
const checkProfileText = () => {
  nameInput.value = userInfo.getUserInfo().profilename;
  workInput.value = userInfo.getUserInfo().profilework;
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {authorization: '7c6cea5c-eb7c-4e88-9a77-da060e3d6f29',
  'Content-Type': 'application/json'}
})

// Добавление карточек 
const submitInputPhoto = (item) => {
  const inputPlace = { name: item.placename, link: item.urlimg, likes: [], owner:{_id: '44ed7b7962d6cfb8fdf85daa'} };
  photo.prepend(renderer(inputPlace))
};

const popupImage = new PopupWithImage(popupImg);

const popupImgPreview = (name, link) => {
  popupImage.open(name, link);
};

const renderer = (item) => {
  const cardCreate = new Card(
    item.name,
    item.link,
    '.photo-card',
    () => popupImgPreview(item.name, item.link),
    item,
    ()=> popupWithFormDeleting.open(),
    myId,
    () => api.putLike(cardCreate.getCardId()._id),
    () => api.deleteLike(cardCreate.getCardId()._id)
  )
  return cardCreate.generateCard()
};

api.getInitialCards()
  .then((res) => {const cardList = new Section(
    {
      items: res,
      renderer: (item) => {cardList.addItem(renderer(item))}
    },
      photo)
    cardList.rendererElement()
  }
  );

const userInfo = new UserInfo(nameProfile, work);

const validProfile = new FormValidator(popupProfile, selectors);
const validNewCard = new FormValidator(popupAdd, selectors);

const popupWithFormAdd = new PopupWithForm({
  popup: popupAdd,
  submit: (item) => {api.loadImg(namePlaceInput.value, urlImgInput.value),
    submitInputPhoto(item),
    popupWithFormAdd.close()}
});

const popupWithFormProfile = new PopupWithForm({
  popup: popupProfile,
  submit: (item) => {userInfo.setUserInfo(item),
    api.updateUserInfo(nameInput.value, workInput.value),
    popupWithFormProfile.close()}
});

const popupWithFormDeleting = new PopupWithForm({
  popup: popupDelete,
  submit: () => {
    popupWithFormDeleting.close()}
    
});
popupImage.setEventListeners();

validNewCard.enableValidation();
validProfile.enableValidation();

popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormDeleting.setEventListeners();

//Открытие попап профиля по кнопке
btnOpenProfileEdit.addEventListener('click', () => {
  popupWithFormProfile.open(),
    validProfile.resetValidation(),
    checkProfileText()
});

//Открытие попап добаления места по кнопке
btnAdd.addEventListener('click', () => {
  validNewCard.resetValidation(),
  popupWithFormAdd.open()
});

api.getUserInfo()
  .then((res)=>{
  nameProfile.textContent = res.name,
  work.textContent = res.about
})