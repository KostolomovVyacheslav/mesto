import './index.css'; 

import { initialItems } from '../scripts/utils/initialItems.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { Section } from '../scripts/components/Section.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

import {
   formValidators,
   config,
   profileEditButton,
   cardAddButton,
   cardsListSelector,
   profileSelectorsObj,
   photoPopupId,
   addPopupId,
   editPopupId 
} from '../scripts/utils/constants.js';



// Открываем попап добавления нового изображения
cardAddButton.addEventListener('click', () => {
   formValidators['img-form'].resetValidationErrors();
   formValidators['img-form'].disableSubmitButton();
   addCardPopup.open();
});   

// Открытие фото попапа
const openPhotoPopup = new PopupWithImage(photoPopupId);
const handleCardClick = (name, link) => {
   openPhotoPopup.open(name, link);
};

// Обработчики фото попапа
openPhotoPopup.setEventListeners();


// Рендерим массив, "Картинки из коробки"
const cardList = new Section({
   items: initialItems,
   renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
   }
}, cardsListSelector);


// Собираем карточку
const createCard = (item) => {
   const card = new Card (item, '.element-template', handleCardClick);
   const cardElement = card.generateCard();
   return cardElement;
};

cardList.renderItems();


const addCardPopup = new PopupWithForm({
   popupSelector: addPopupId,
   handleFormSubmit: (newCard) => {
      const item = {
         name: newCard.inputImgName,
         link: newCard.inputImgLink
      };
      cardList.renderer(item);
      addCardPopup.close();
      }
});

// Обработчики попапа добавления нового изображения
addCardPopup.setEventListeners();



// Редактируем профиль
const userProfileInfo = new UserInfo(profileSelectorsObj);

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
   profilePopup.setInputValues(userProfileInfo.getUserInfo());
   formValidators['edit-form'].resetValidationErrors();
   formValidators['edit-form'].disableSubmitButton();
   profilePopup.open();
});

// Изменяем имя профиля
const profilePopup = new PopupWithForm({
   popupSelector: editPopupId,
   handleFormSubmit: (data) => {
      const userData = {
         inputUserName: data.inputUserName,
         inputUserJob: data.inputUserJob
      };
      userProfileInfo.setUserInfo(userData);
      profilePopup.close();
   }
});

// Обработчики попапа редактирования профиля
profilePopup.setEventListeners();



// Валидация форм
const enableValidation = (config) => {
   const formList = Array.from(document.querySelectorAll(config.formSelector));
   formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement);
      const formName = formElement.getAttribute('name');
      
      formValidators[formName] = validator;
      validator.enableValidation();
   });
};

enableValidation(config);