let popup = document.querySelector('.popup')
let openPopup = document.querySelector('.profile__btn-edit');
let exitPopup = document.querySelector('.popup__btn-exit')
let Name = document.querySelector ('.profile__name');
let Work = document.querySelector ('.profile__work')
let Form = document.querySelector ('.popup__container');
let nameInput = document.querySelector ('.popup__input_name');
let workInput =  document.querySelector ('.popup__input_work');

function popupVisible () {
  popup.classList.add('popup_visible');
  nameInput.value = Name.textContent;
  workInput.value = Work.textContent;
}

function popupExit() {
  popup.classList.remove('popup_visible')
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  Name.textContent = `${nameInput.value}`;
  Work.textContent = `${workInput.value}`;
  popupExit();
}

Form.addEventListener('submit', formSubmitHandler);
openPopup.addEventListener ('click', popupVisible);
exitPopup.addEventListener ('click', popupExit);