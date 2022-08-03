import './index.css'; 

import { Api } from '../scripts/components/Api.js'
import { Section } from '../scripts/components/Section.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

import {
   formValidators,
   validationConfig,
   apiConfig,
   avatarEditButton,
   profileEditButton,
   cardAddButton,
   cardsListSelector,
   profileSelectorsObj,
   photoPopupId,
   addPopupId,
   editPopupId,
   avatarPopupId,
   deletePopupId
} from '../scripts/utils/constants.js';



const api = new Api(apiConfig);


// Лоадер для попапов
function renderLoading(isLoading, currentPopup, text) {
   if (isLoading) {
      currentPopup.changeText(text)
   } else {
      currentPopup.setOriginalText();
   }
}


// Информация о пользователе с сервера
api.getUserData()
.then(res => {
   userProfileInfo.setUserInfo(res);
})
.catch(error => console.log(error));


// Класс section
const section = new Section({
   renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
   }
}, cardsListSelector);

// загрузка карточек с сервера
api.getInitialCards()
.then(res => {
   section.renderItems(res);
})
.catch(error => console.log(error));


// Попап добавления новой карточки
const addCardPopup = new PopupWithForm({
   popupSelector: addPopupId,
   handleFormSubmit: (newCard) => {
      const item = {
         name: newCard.inputImgName,
         link: newCard.inputImgLink
      };
      renderLoading(true, addCardPopup, 'Сохранение...')
      api.addNewCard(item)
      .then(res => {
         section.renderer(res);
         addCardPopup.close();
      })
      .catch(error => {
         console.log(error);
      })
      .finally(() => {
         renderLoading(false, addCardPopup)
      })
      }
});

// Обработчик попапа добавления новой карточки
addCardPopup.setEventListeners();

// Открываем попап добавления новой карточки
cardAddButton.addEventListener('click', () => {
   formValidators['img-form'].resetValidationErrors();
   formValidators['img-form'].disableSubmitButton();
   addCardPopup.open();
});

// Собираем карточку, класс card
const createCard = (item) => {
   const card = new Card (item, '.element-template', handleCardClick, deleteCard, userProfileInfo.getUserId(), handleLikeIconClick);
   const cardElement = card.generateCard();
   return cardElement;
};


// Фото попап
const openPhotoPopup = new PopupWithImage(photoPopupId);
const handleCardClick = (name, link) => {
   openPhotoPopup.open(name, link);
};

// Обработчик фото попапа
openPhotoPopup.setEventListeners();


// Лайк карточки
const handleLikeIconClick = (isLiked, id, createCard) => {
   api.changeLikeStatus(isLiked, id, createCard)
   .then(res => {
      createCard.setLikesCount(res.likes.length);
   })
   .catch(error => {
      console.log(error);
   })
}


// Попап удаления карточки
const deleteCardPopup = new PopupWithForm({
   popupSelector: deletePopupId, 
   handleFormSubmit: deleteCard
});

// Обработчик попапа удаления карточки
deleteCardPopup.setEventListeners();

// Функция удаления карточки
const deleteCard = (cardId, cardElement) => {
   deleteCardPopup.open();
   deleteCardPopup.submitHandler(() => {
      renderLoading(true, deleteCardPopup, 'Удаление...');
      api.deleteCard(cardId)
      .then(() => {
         cardElement.remove();
         cardElement = null;
         deleteCardPopup.close();
      })
      .catch(error => {
         console.log(error)
      })
      .finally(() => {
         renderLoading(false, deleteCardPopup)
      })
   })
}


// Редактируем профиль
const userProfileInfo = new UserInfo(profileSelectorsObj);

// Попап редактирования профиля
const profilePopup = new PopupWithForm({
   popupSelector: editPopupId,
   handleFormSubmit: (data) => {
      const userData = {
         inputUserName: data.inputUserName,
         inputUserJob: data.inputUserJob
      };
      renderLoading(true, profilePopup, 'Сохранение...');
      api.editProfile(userData)
      .then(res => {
         userProfileInfo.setUserInfo(res);
         profilePopup.close();
      })
      .catch(error => {
         console.log(error);
      })
      .finally(() => {
         renderLoading(false, profilePopup)
      })
   }
});

// Обработчик попапа редактирования профиля
profilePopup.setEventListeners();

// Открытие попапа редактирования профиля
profileEditButton.addEventListener('click', () => {
   profilePopup.setInputValues(userProfileInfo.getUserInfo());
   formValidators['edit-form'].resetValidationErrors();
   formValidators['edit-form'].disableSubmitButton();
   profilePopup.open();
});

// Попап редактирования аватара
const avatarEditPopup = new PopupWithForm({
   popupSelector: avatarPopupId,
   handleFormSubmit: (data) => {
      const avatarData = {
         avatarLink: data.inputAvatarLink
      };
      renderLoading(true, avatarEditPopup, 'Сохранение...')
      api.changeProfileAvatar(avatarData)
      .then(res => {
         userProfileInfo.setUserInfo(res);
         avatarEditPopup.close();
      })
      .catch(error => {
         console.log(error);
      })
      .finally(() => {
         renderLoading(false, avatarEditPopup)
      })
   }
});

// Обработчик попапа редактирования аватара
avatarEditPopup.setEventListeners();

// Открытие попапа редактирования аватара
avatarEditButton.addEventListener('click', () => {
   formValidators['avatar-form'].resetValidationErrors();
   formValidators['avatar-form'].disableSubmitButton();
   avatarEditPopup.open();
});


// Валидация форм
const enableValidation = (validationConfig) => {
   const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
   formList.forEach((formElement) => {
      const validator = new FormValidator(validationConfig, formElement);
      const formName = formElement.getAttribute('name');

      formValidators[formName] = validator;
      validator.enableValidation();
   });
};

enableValidation(validationConfig);


Promise.all([
   api.getUserData(), api.getInitialCards()
])
.then(([userDataResult, cardsResult]) => {
   api.getUserData(userDataResult);
   api.getInitialCards(cardsResult);
})
.catch((error) => {
   console.log(`Ошибка загрузки данных ${error}`)
});