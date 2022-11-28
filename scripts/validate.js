const inputErrShow = (formElement, inputElement, errorText) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorText;
  errorElement.classList.add('popup__input-error_active');
};

const inputErrHide = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

const checkValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    inputErrShow(formElement, inputElement, inputElement.validationMessage);
  } else {
    inputErrHide(formElement, inputElement);
  }
}; 

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, btnElement) => {
  if (hasInvalidInput(inputList)) {
    btnElement.setAttribute('disabled', 'true')
  } else {
    btnElement.removeAttribute('disabled');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const btnElement = formElement.querySelector('.popup__btn-save');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValid(formElement, inputElement);
      toggleButtonState(inputList, btnElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();
