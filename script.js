const btnOpenPopup = document.querySelector('.profile__btn-edit');
const popup = document.querySelector('.popup')
let btnPopupExit = document.querySelector('.popup__btn-exit')

function activePopup () {
  popup.classList.add('popup_visible');
}



//btnOpenPopup.addEventListener ('click', activePopup());

btnPopupExit.addEventListener ('click', function() {popup.classList.remove('popup_visible')});

btnOpenPopup.addEventListener ('click', function() {popup.classList.add('popup_visible')});