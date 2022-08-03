export const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'popup__save-button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_visible'
};

export const apiConfig = {
   url: 'https://mesto.nomoreparties.co/v1/cohort-46',
   headers: 'ddb2474c-5895-4c61-a372-bb2b9d4e6bd7'
}


// Объект для форм
export const formValidators = {};


// Кнопки
export const avatarEditButton = document.querySelector('.profile__avatar-button')
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');


// Селекторы, инпуты
export const cardsListSelector = '.elements__list';

const profileAvatarSelector = '.profile__avatar';
const profileNameSelector = '.profile__name';
const profileJobSelector = '.profile__description';
export const profileSelectorsObj = {profileNameSelector, profileJobSelector, profileAvatarSelector};

export const photoPopupId = '#photo-popup';
export const addPopupId = '#add-popup';
export const editPopupId = '#edit-popup';
export const avatarPopupId = '#avatar-popup';
export const deletePopupId = '#delete-popup';