import './index.css';
import {
  btnAdd, btnOpenProfileEdit, nameInput, nameProfile, photo, popupAdd, popupImg, popupProfile,
  work, workInput, popupDelete, myId, overlay, avatarEdit, popupAvatar,
  btnAvatarEdit, profileAvatar, PromesOverlay, btnDelCards
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

//Спасибо за развернутые комментарии, к сожалению времени очень мало на проект осталось. 
//В связи с этим сделал акцент только на основные ошибки.

const popupWithConfirmation = new PopupWithConfirmation(popupDelete);

overlay.addEventListener('mouseover', () => avatarEdit.classList.add('profile__avatar-img-visibility'))
overlay.addEventListener('mouseout', () => avatarEdit.classList.remove('profile__avatar-img-visibility'))

//Текст в полях ввода 
const checkProfileText = () => {
  const infoInput = userInfo.getUserInfo();
  nameInput.value = infoInput.profilename;
  workInput.value = infoInput.profilework;
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '7c6cea5c-eb7c-4e88-9a77-da060e3d6f29',
    'Content-Type': 'application/json'
  }
})

const popupImage = new PopupWithImage(popupImg);

const popupImgPreview = (name, link) => {
  popupImage.open(name, link);
};

const toggleTextBtn = (popup) => {
  popup.querySelector('.popup__btn-save').textContent = 'Сохранить'
}

const renderer = (item) => {
  const cardCreate = new Card({
    name: item.name,
    link: item.link,
    templateSelector: '.photo-card',
    handleOpenPopupWithImage: () => popupImgPreview(item.name, item.link),
    data: item,
    openPopupDel: () => {
      popupWithConfirmation.open();
      popupWithConfirmation.setSubmitHandler(item, (item) => {
        api.deleteCards(item._id)
          .then(() => {
            cardCreate.deleteCard()
            setTimeout(()=>(popupWithConfirmation.close()), 200)
          })
          .catch((error) => {console.log(error)})
          .finally(setTimeout(()=>{btnDelCards.textContent = 'Да'}, 1000))
      })
    },
    id: userInfo.getUserInfo().id,
    likesClickFunc: () => api.putLike(cardCreate.getCardId()),
    delLike: () => api.deleteLike(cardCreate.getCardId())
      .catch((error) => {console.log(error)}),
  })

  return cardCreate
};

const cardList = new Section({
  renderer: (item) => {cardList.addItem(renderer(item).generateCard())}},
  photo)

// api.getInitialCards()
//   .then((res) => {
//     cardList.rendererElement(res)
//   })
//   .catch((error) => {console.log(`OMG ERROR T_T: ${error}`)})

const userInfo = new UserInfo(nameProfile, work, profileAvatar, myId);

const validProfile = new FormValidator(popupProfile, selectors);
const validNewCard = new FormValidator(popupAdd, selectors);
const validAvatar = new FormValidator(popupAvatar, selectors);

const popupWithFormAdd = new PopupWithForm({
  popup: popupAdd,
  submit: (item) => {
    api.loadImg(item)
      .then((res) => {
        cardList.addItem(renderer(res).generateCard()),
        setTimeout(()=>(popupWithFormAdd.close()), 500)
      })
      .catch((err)=> console.log(err))
      .finally(setTimeout(()=>(toggleTextBtn(popupAdd)), 1000))
  }
});

const popupWithFormProfile = new PopupWithForm({
  popup: popupProfile,
  submit: () => {
    api.updateUserInfo(nameInput.value, workInput.value)
    .then((res)=>{userInfo.setUserInfo(res), setTimeout(()=>(popupWithFormProfile.close()), 500)})
    .catch((err)=> console.log(err))
    .finally(setTimeout(()=>(toggleTextBtn(popupProfile)), 1000))
  }
});

const popupWithFormAvatar = new PopupWithForm({
  popup: popupAvatar,
  submit: (item) => {
    api.loadAvatar(item)
      .then(res => {profileAvatar.src = res.avatar, setTimeout(()=>(popupWithFormAvatar.close()), 500)})
      .catch((error) => {console.log(error)})
      .finally(setTimeout(()=>(toggleTextBtn(popupAvatar)), 1000))
  }
});


// Валидация
validNewCard.enableValidation();
validProfile.enableValidation();
validAvatar.enableValidation();

popupWithFormAdd.setEventListeners();
popupWithFormProfile.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupWithConfirmation.setEventListeners();
popupImage.setEventListeners();

//Открытие попап профиля по кнопке
btnOpenProfileEdit.addEventListener('click', () => {
  popupWithFormProfile.open(),
    validProfile.resetValidation()
    checkProfileText()
});

//Открытие попап
btnAdd.addEventListener('click', () => {
  validNewCard.resetValidation(),
    popupWithFormAdd.open()
});

btnAvatarEdit.addEventListener('click', () => {
  popupWithFormAvatar.open(),
    validAvatar.resetValidation()
})

// api.userInfoApi()
//   .then((res) => {
//     userInfo.setUserInfo(res)
//   })
//   .catch((error) => {console.log(error)})

  userInfo.getUserInfo()
  Promise.all([api.userInfoApi(), api.getInitialCards()])
    .then(([userData, cards]) =>{[
      userInfo.setUserInfo(userData),
      cardList.rendererElement(cards)
    ]})
    .catch((error) => {console.log(`Почему????: ${error}`)})
    .finally(setTimeout(()=>{PromesOverlay.classList.remove('popup_visible')}, 2000))