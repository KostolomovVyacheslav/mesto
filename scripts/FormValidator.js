import { config, editPopup } from './index.js';

export class FormValidator {
   constructor(config, form) {
      this._config = config;
      this._form = form;
   };

   //  Сбрасываем стандартное поведение у формы, вызываем метод со слушателями
   enableValidation() {
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });

      this._setEventListeners();
   };

   // Добавляем события всем полям ввода
   _setEventListeners() {
      this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
      this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
   
      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
         });
      });
   };

   // Проверяем поле ввода на корректность заполнения
   _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
         this._showError(inputElement);
      } else {
         this._hideError(inputElement);
      };
   };

   // Проверяем поле ввода на корректность заполнения
   _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
         return !inputElement.validity.valid;
      });
   };

   // Управляем состоянием кнопки формы
   _toggleButtonState() {
      if (this._hasInvalidInput()) {
         this._buttonElement.setAttribute('disabled', true)
         this._buttonElement.classList.add(this._config.inactiveButtonClass);
      } else {
         this._buttonElement.removeAttribute('disabled', true)
         this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      };
   };

   // Показываем сообщение об ошибке
   _showError(inputElement) {
      this._errorElement = inputElement.nextElementSibling;
      this._errorElement.textContent = inputElement.validationMessage;
      this._errorElement.classList.add(this._config.errorClass);
      inputElement.classList.add(this._config.inputErrorClass);
   };

   // Скрываем сообщение об ошибке
   _hideError(inputElement) {
      this._errorElement = inputElement.nextElementSibling;
      this._errorElement.textContent = '';
      this._errorElement.classList.remove(this._config.errorClass);
      inputElement.classList.remove(this._config.inputErrorClass);
   };

   // Публичный метод для сброса ошибок у попапа редактирования профиля, перед открытием
   resetValidationErrors(popupElement) {
      if (popupElement === editPopup) {
         const inputList = Array.from(popupElement.querySelectorAll(config.inputSelector));

         inputList.forEach((inputElement) => {
            const errorElement = inputElement.nextElementSibling;
            errorElement.textContent = '';

            inputElement.classList.remove(config.inputErrorClass);
            errorElement.classList.remove(config.errorClass);
         })
      } else {
         return;
      };
   };

   // Публичный метод для отключения кнопки у попапа редактирования профиля, перед открытием
   disableSubmitButton(buttonElement) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(config.inactiveButtonClass);
   };
};