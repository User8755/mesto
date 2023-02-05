import './index.css';
import {
  btnAdd, btnOpenProfileEdit, nameInput, nameProfile, photo, popupAdd, popupImg, popupProfile,
  work, workInput, popupDelete, myId, overlay, avatarEdit, popupAvatar,
  btnAvatarEdit, profileAvtar, PromesOverlay
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

//Зарание прошу прощения за говнокод(( стараюсь как могу

const popupWithConfirmation = new PopupWithConfirmation(popupDelete);

overlay.addEventListener('mouseover', () => avatarEdit.classList.add('profile__avatar-img-visibility'))
overlay.addEventListener('mouseout', () => avatarEdit.classList.remove('profile__avatar-img-visibility'))

//Текст в полях ввода 
const checkProfileText = () => {
  nameInput.value = userInfo.getUserInfo().profilename;
  workInput.value = userInfo.getUserInfo().profilework;
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
          })
          .catch((error) => {console.log(error)})
          .finally(setTimeout(()=>(popupWithConfirmation.close()), 500))
      })
    },
    id: myId,
    likesClickFunc: () => api.putLike(cardCreate.getCardId()),
    delLike: () => api.deleteLike(cardCreate.getCardId())
      .catch((error) => {console.log(error)}),
  })

  return cardCreate
};

api.getInitialCards()
  .then((res) => {
    const cardList = new Section(
      {
        items: res,
        renderer: (item) => { cardList.addItem(renderer(item).generateCard()) }
      },
      photo)
    cardList.rendererElement()
  })
  .catch((error) => {console.log(`OMG ERROR T_T: ${error}`)})

const userInfo = new UserInfo(nameProfile, work);

const validProfile = new FormValidator(popupProfile, selectors);
const validNewCard = new FormValidator(popupAdd, selectors);
const validAvatar = new FormValidator(popupAvatar, selectors);

const popupWithFormAdd = new PopupWithForm({
  popup: popupAdd,
  submit: (item) => {
    api.loadImg(item)
      .then((res) => {photo.prepend(renderer(res).generateCard())})
      .catch((err)=> console.log(err))
      .finally(setTimeout(()=>(popupWithFormAdd.close()), 500))
  }
});

const popupWithFormProfile = new PopupWithForm({
  popup: popupProfile,
  submit: (item) => {
    userInfo.setUserInfo(item),
    api.updateUserInfo(nameInput.value, workInput.value)
    .finally(setTimeout(()=>(popupWithFormProfile.close()), 500))
  }
});

const popupWithFormAvatar = new PopupWithForm({
  popup: popupAvatar,
  submit: (item) => {
    api.loadAvatar(item)
      .then(res => profileAvtar.src = res.avatar)
      .catch((error) => {console.log(error)})
      .finally(setTimeout(()=>(popupWithFormAvatar.close()), 500))
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
    validProfile.resetValidation(),
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

api.UserInfo()
  .then((res) => {
    nameProfile.textContent = res.name,
      work.textContent = res.about,
      profileAvtar.src = res.avatar
  })
  .catch((error) => {console.log(error)})

  const renderLoading = (isLoading) => {
    if (isLoading) {
      PromesOverlay.classList.add('popup_visible')
    } else {
      PromesOverlay.classList.remove('popup_visible')
    }
  }


  const promises = [api.UserInfo(), api.getInitialCards()]

  Promise.all(promises)
    .then(() =>{renderLoading(true)})
    .catch((error) => {console.log(`Почему????: ${error}`)})
    .finally(setTimeout(()=>{renderLoading(false)}, 2000))