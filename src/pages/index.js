import './index.css';
import {
btnAdd, btnOpenProfileEdit, nameInput, nameProfile, photo, popupAdd, popupImg, popupProfile, work, workInput, namePlaceInput, urlImgInput, popupDelete
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
  const inputPlace = { name: item.placename, link: item.urlimg, likes: [] };
  photo.prepend(renderer(inputPlace))
};

const popupImage = new PopupWithImage(popupImg);

const popupImgPreview = (name, link) => {
  popupImage.open(name, link);
};

const renderer = (item) => {
  const cardCreate = new Card(item.name, item.link, '.photo-card', () => popupImgPreview(item.name, item.link));
  const cardElement = cardCreate.generateCard(item.likes.length );
  console.log(item)

  return cardElement
}

api.getInitialCards().then((res) => {const cardList = new Section(
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
  submit: (item) => { userInfo.setUserInfo(item),
    api.updateUserInfo(nameInput.value, workInput.value),
    popupWithFormProfile.close()}
});

popupImage.setEventListeners();

validNewCard.enableValidation();
validProfile.enableValidation();

popupWithFormAdd.setEventListeners();

popupWithFormProfile.setEventListeners();

btnOpenProfileEdit.addEventListener('click', () => {
  popupWithFormProfile.open(),
    validProfile.resetValidation(),
    checkProfileText()
});

btnAdd.addEventListener('click', () => {
  validNewCard.resetValidation(),
  popupWithFormAdd.open()
});

api.getUserInfo()
  .then((res)=>{
  nameProfile.textContent = res.name,
  work.textContent = res.about
})