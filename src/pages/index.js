import './index.css';
import {
btnAdd, btnOpenProfileEdit, nameInput, nameProfile, photo, popupAdd, popupImg, popupProfile,
work, workInput, namePlaceInput, urlImgInput, popupDelete, btnDel, myId, overlay, avatarEdit, popupAvatar,
btnAvatarEdit, profileAvtar
} from '../utils/constlist.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import { selectors } from '../utils/selectors.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

const popupWithConfirmation = new PopupWithConfirmation(popupDelete);

overlay.addEventListener('mouseover',() => avatarEdit.classList.add('profile__avatar-img-visibility'))
overlay.addEventListener('mouseout',() => avatarEdit.classList.remove('profile__avatar-img-visibility'))

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

const popupImage = new PopupWithImage(popupImg);

const popupImgPreview = (name, link) => {
  popupImage.open(name, link);
};

const renderer = (item) => {
  const cardCreate = new Card({
    name: item.name,
    link: item.link,
    templateSelector: '.photo-card',
    handleOpenPopupWithImage: () => popupImgPreview(item.name, item.link),
    data: item,
    openPopupDel: ()=> {
    popupWithConfirmation.open();
    popupWithConfirmation.setSubmitHandler(item,(item)=>{
      api.deleteCards(item._id)
      .then(()=>{
        popupWithConfirmation.close()
        cardCreate.deleteCard()
      })
    })
  },
    id: myId,
    likesClickFunc: () => api.putLike(cardCreate.getCardId()),
    del: () => api.deleteLike(cardCreate.getCardId()),
  })

  return cardCreate
};

api.getInitialCards()
  .then((res) => {const cardList = new Section(
    {
      items: res,
      renderer: (item) => {cardList.addItem(renderer(item).generateCard())}
    },
      photo)
    cardList.rendererElement()
  }
  );

const userInfo = new UserInfo(nameProfile, work);

const validProfile = new FormValidator(popupProfile, selectors);
const validNewCard = new FormValidator(popupAdd, selectors);
const validAvatar = new FormValidator(popupAvatar, selectors);


const popupWithFormAdd = new PopupWithForm({
  popup: popupAdd,
  submit: (item) => {
    api.loadImg(item)
    .then(res => photo.prepend(renderer(res).generateCard()))
    popupWithFormAdd.close()}
});

const popupWithFormProfile = new PopupWithForm({
  popup: popupProfile,
  submit: (item) => {userInfo.setUserInfo(item),
    api.updateUserInfo(nameInput.value, workInput.value),
    popupWithFormProfile.close()}
});

// const popupWithFormDeleting = new PopupWithForm({
//   popup: popupDelete,
//   submit: () => {
//     popupWithFormDeleting.close()
// }});

const popupWithFormAvatar = new PopupWithForm({
  popup: popupAvatar,
  submit: (item) => {
    api.loadAvatar(item).then(res => profileAvtar.src = res.avatar)
    popupWithFormAvatar.close()}
    
});

popupImage.setEventListeners();

// Валидация
validNewCard.enableValidation();
validProfile.enableValidation();
validAvatar.enableValidation();

popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithConfirmation.setEventListeners()

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

btnAvatarEdit.addEventListener('click', () => {
  popupWithFormAvatar.open(),
  validAvatar.resetValidation()
})

api.UserInfo()
  .then((res)=>{
  nameProfile.textContent = res.name,
  work.textContent = res.about,
  profileAvtar.src = res.avatar
})