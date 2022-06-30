import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

export const config = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'popup__save-button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_visible'
};

const allPopups = document.querySelectorAll('.popup');
const editPopup = document.getElementById('#edit-popup');
const addPopup = document.getElementById('#add-popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

const editPopupSaveButton = editPopup.querySelector('.popup__save-button');

const addCardForm = document.getElementById('#add-img-form');
const editProfileForm = document.getElementById('#edit-form');

const cardsList = document.querySelector('.elements__list');
const elementNameInput = document.querySelector('.popup__input_img-name');
const elementLinkInput = document.querySelector('.popup__input_img-link');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');


// Редактируем профиль
const submitEditProfileForm = (evt) => {
   evt.preventDefault();

   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;

   closePopup(editPopup);
};

editProfileForm.addEventListener('submit', submitEditProfileForm); 


// Функция для закрытия попапов нажатием на Escape
const closeByEsc = (evt) => {
   if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
   };
};


// Функция для открытия попапов
export const openPopup = (popupElement) => {
   popupElement.classList.add('popup_opened');
   document.addEventListener('keydown', closeByEsc);
};


// Слушатель на открытие попапа добавления нового изображения
cardAddButton.addEventListener('click', () => {
   openPopup(addPopup);
});


// Слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
   editForm.resetValidationErrors(editPopup);
   editForm.disableSubmitButton(editPopupSaveButton);
   openPopup(editPopup);
});


// Функция для закрытия попапов
const closePopup = (popupElement) => {
   document.removeEventListener('keydown', closeByEsc);
   popupElement.classList.remove('popup_opened');
};


// Закрытие попапов кликом "мимо попапа", и кликом на иконку "крестик"
const closePopupByClick = (args) => {
   const target = args.target;
   const popupElement = target.closest('.popup');
   if (target === args.currentTarget || target.classList.contains('popup__close-button')) {
      closePopup(popupElement);
   };
};

allPopups.forEach((popup) => {
   popup.addEventListener('click', closePopupByClick);
});


// Собираем новый элемент, отключаем кнопку у формы
const prepareCard = (evt) => {
   evt.preventDefault();
   
   const name = elementNameInput.value;
   const link = elementLinkInput.value;
   const newCard = {name, link};
   
   renderItem(newCard);

   elementNameInput.value = null;
   elementLinkInput.value = null;
   
   addForm.disableSubmitButton();

   closePopup(addPopup);
};


addCardForm.addEventListener("submit", prepareCard);


// Картинки "ИЗ КОРОБКИ", добавляем в список массив изображении
const renderList = (data) => {
   data.forEach((item) => {
      renderItem(item);
   });
};

// Создаём новый экземпляр класса
const  renderItem = (item) => {
   const card = new Card(item, '.element-template');
   
   return addNewItem(card.generateCard());
};

// Добавляем новую карточку в список
const addNewItem = (item) => {
   cardsList.prepend(item);
}

renderList(initialCards);


const editForm = new FormValidator(config, editProfileForm);
editForm.enableValidation();

const addForm = new FormValidator(config, addCardForm);
addForm.enableValidation();