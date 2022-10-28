let popup = document.querySelector('.popup')
let openPopup = document.querySelector('.profile__btn-edit');
let exitPopup = document.querySelector('.popup__btn-exit')
let name = document.querySelector ('.profile__name');
let work = document.querySelector ('.profile__work')
let form = document.querySelector ('.popup__container');
let nameInput = document.querySelector ('.popup__input_name');
let workInput =  document.querySelector ('.popup__input_work');

function popupVisible () {
  popup.classList.add('popup_visible');
  nameInput.value = name.textContent;
  workInput.value = work.textContent;
}

function popupExit() {
  popup.classList.remove('popup_visible')
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  name.textContent = `${nameInput.value}`;
  work.textContent = `${workInput.value}`;
  popupExit();
}

form.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener ('click', popupVisible);
exitPopup.addEventListener ('click', popupExit);