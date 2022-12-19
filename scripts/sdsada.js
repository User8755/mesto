export default class FormValidator {
  constructor(formElement, selectors) {
    this._selectors = selectors;
    this._formElement = formElement;
  };

  _showInputErr(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._selectors.errorClass);
  };

  _hideInputErr(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    this._errorElement.classList.remove(this._selectors.errorClass);
    this._errorElement.textContent = '';
  };
  
  _checkValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputErr(inputElement);
    } else {
      this._hideInputErr(inputElement);
    }
  }; 

  _hasInvalidInput() {
    return this._inputList.some((Element) => {
      return !Element.validity.valid;
      });
  };

  _disabledButton() {
    this._btnElement.setAttribute('disabled', 'true');
  };

  _enabledButton() {
    this._btnElement.removeAttribute('disabled');
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disabledButton();
    } else {
      this._enabledButton();
    }
  };

 

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputElement));
    this._btnElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValid(inputElement);
        this._toggleButtonState();
    });
  });
  };

  enableValidation() {
      this._setEventListeners();
  };

  };
