export const config = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__save-button',
   inactiveButtonClass: 'popup__save-button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__input-error_visible'
};


// Объект для форм
export const formValidators = {};


// Кнопки
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');


// Селекторы, инпуты
export const cardsListSelector = '.elements__list';

export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__description';
export const profileSelectorsObj = {profileNameSelector, profileJobSelector};

export const photoPopupId = '#photo-popup';
export const addPopupId = '#add-popup';
export const editPopupId = '#edit-popup';