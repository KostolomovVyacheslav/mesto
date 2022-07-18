// import '../pages/index.css'; 
// добавьте импорт главного файла стилей 
import { initialItems } from './initialItems.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { Section } from './Section.js';
import { UserInfo } from './UserInfo.js';

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
const photoPopup = document.getElementById('#photo-popup');

const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

// Формы
const addCardForm = document.getElementById('#add-img-form');
const editProfileForm = document.getElementById('#edit-form');

// Сабмит кнопки форм
const profileFormSaveButton = document.getElementById('#profile-form-save-button');
const addFormSaveButton = document.getElementById('#add-form-save-button');

// Селекторы, инпуты
const cardsList = document.querySelector('.elements__list');
const cardsListSelector = '.elements__list';
const elementNameInput = document.querySelector('.popup__input_img-name');
const elementLinkInput = document.querySelector('.popup__input_img-link');

const profileNameSelector = '.profile__name';
const profileDescriptionSelector = '.profile__description';
const profileSelectorsObj = {profileNameSelector, profileDescriptionSelector};
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');

const photoPopupId = '#photo-popup';
const addPopupId = '#add-popup';
const editPopupId = '#edit-popup';




// Открываем попап добавления нового изображения
const openAddForm = new Popup(addPopupId);
cardAddButton.addEventListener('click', () => {
   openAddForm.open();
});


// Открытие фото попапа
const openPhotoPopup = new PopupWithImage(photoPopupId);
const handleCardClick = (name, link) => {
   openPhotoPopup.open(name, link);
};


// Рендерим массив, "Картинки из коробки"
const cardList = new Section({
   items: initialItems,
   renderer: (item) => {
      const card = new Card (item, '.element-template', handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
   }
}, cardsListSelector);

cardList.renderItems();


// Добавляем новое изображение
const addNewItem = (newCard) => {
   const newItem = new Card(newCard, '.element-template', handleCardClick);
   const newCardElement = newItem.generateCard();

   console.log(newCardElement);
   return newCardElement;
};


// ЛОГИКА ДОБАВЛЕНИЯ НОВОГО ИЗОБРАЖЕНИЯ ПО КЛИКУ НА КНОПКУ СОХРАНИТЬ В ПОПАПЕ ДОБАВЛЕНИЯ НОВОГО ИЗОБРАЖЕНИЯ
   // КНОПКА СОХРАНЕНИЯ 
const addCardSubmitHandler = new PopupWithForm({
   popupSelector: addPopupId,
   handleFormSubmit: (newCard) => {
      newCard = {
         name: elementNameInput.value,
         link: elementLinkInput.value
      };
      console.log(elementNameInput.value, elementLinkInput.value, newCard);
      cardsList.prepend(addNewItem(newCard));
      addCardSubmitHandler.close();
      }
});


addFormSaveButton.addEventListener('click', (evt) => {
   addCardSubmitHandler.setEventListeners(evt);
});




// Редактируем профиль
const userProfileInfo = new UserInfo(profileSelectorsObj);

// Открытие попапа редактирования профиля
const profileEditPopup = new Popup(editPopupId);

profileEditButton.addEventListener('click', () => {
   profileEditPopup.open();
   setProfile(userProfileInfo.getUserInfo());
});

// Подставляем .textContent в input.value
const setProfile = (data) => {
   nameInput.value = data.profileName;
   jobInput.value = data.profileDescription;
};

// Изменяем имя профиля
const profileSubmitHandler = new PopupWithForm({
   popupSelector: editPopupId,
   handleFormSubmit: (data) => {
      data = {
         profileName: nameInput.value,
         profileDescription: jobInput.value
      };
      console.log(data);
      userProfileInfo.setUserInfo(data);
      profileSubmitHandler.close();
   }
});

// Слушатель сабмит кнопки
profileFormSaveButton.addEventListener('click', () => {
   profileSubmitHandler.setEventListeners();
});




// Валидация формы редактирования профиля
const editForm = new FormValidator(config, editProfileForm);
editForm.enableValidation();

// Валидация формы доабвления нового изображения
const addForm = new FormValidator(config, addCardForm);
addForm.enableValidation();