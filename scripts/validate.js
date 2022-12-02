const selectors = {
  formElement: '.form',
  inputElement: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


const showInputErr = (formElement, inputElement, errorText, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorText;
  errorElement.classList.add(selectors.errorClass);
};

const hideInputErr = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};

const checkValid = (formElement, inputElement, selectors) => {
  if (!inputElement.validity.valid) {
    showInputErr(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputErr(formElement, inputElement, selectors);
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

const disabledButton = (btnElement) => {
  btnElement.setAttribute('disabled', 'true');
}


const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputElement));
  const btnElement = formElement.querySelector(selectors.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkValid(formElement, inputElement, selectors);
      toggleButtonState(inputList, btnElement);
    });
  });
};

const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formElement));
  formList.forEach((formElement) => {
    setEventListeners(formElement, selectors);
  });
};

enableValidation(selectors);