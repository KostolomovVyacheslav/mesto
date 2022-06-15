// Показываем сообщение об ошибке
const showError = (config, inputElement, errorMessage) => {
   const errorElement = inputElement.nextElementSibling;
   errorElement.textContent = errorMessage;
   errorElement.classList.add(config.errorClass);
   inputElement.classList.add(config.inputErrorClass);
};


// Скрываем сообщение об ошибке
const hideError = (config, inputElement) => {
   const errorElement = inputElement.nextElementSibling;
   errorElement.textContent = '';
   errorElement.classList.remove(config.errorClass);
   inputElement.classList.remove(config.inputErrorClass);
};


// Проверяем поля ввода на корректность заполнения
const checkInputValidity = (config, inputElement) => {
   if (!inputElement.validity.valid) {
      showError(config, inputElement, inputElement.validationMessage);
   } else {
      hideError(config, inputElement);
   };
};


// Добавляем события всем полям ввода у формы
const setEventListeners = (config, formElement, inputElement) => {
   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
   const buttonElement = formElement.querySelector(config.submitButtonSelector);

   toggleButtonState(config, inputList, buttonElement);

   inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function (evt) {
         checkInputValidity(config, inputElement);
         toggleButtonState(config, inputList, buttonElement);
      });
   });
};


// Проверяем поля ввода на корректность заполнения
const hasInvalidInput = (inputList) => {
   return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
   });
};


// Управляем состоянием кнопки формы
function toggleButtonState(config, inputList, buttonElement) {
   if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', true);
      buttonElement.classList.add(config.inactiveButtonClass);
   } else {
      buttonElement.removeAttribute('disabled', true);
      buttonElement.classList.remove(config.inactiveButtonClass);
   };
};


//  Добавляем события всем формам и сбрасываем стандартное поведение
const enableValidation = (config) => {
   const formList = Array.from(document.querySelectorAll(config.formSelector));

   formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
         evt.preventDefault();
      });

      setEventListeners(config, formElement);
   });
};


enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'popup__save-button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_visible'
});