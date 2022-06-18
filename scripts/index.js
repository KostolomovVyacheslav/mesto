const templateElement = document.querySelector('.element-template').content;

const profileEditButton = document.querySelector('.profile__edit-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const cardAddButton = document.querySelector('.profile__add-button');

const allPopups = document.querySelectorAll('.popup');
const editPopup = document.getElementById('#edit-popup'); 
const addPopup = document.getElementById('#add-popup');
const photoPopup = document.getElementById('#photo-popup');

const addCardForm = document.getElementById('#add-img-form');
const formEditProfile = document.getElementById('#edit-form');

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

const cardsList = document.querySelector('.elements__list');
const elementNameInput = document.querySelector('.popup__input_img-name');
const elementLinkInput = document.querySelector('.popup__input_img-link');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');


// Редактируем профиль
function submitEditProfileForm(evt) {
   evt.preventDefault();

   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;

   closePopup(editPopup);
};

formEditProfile.addEventListener('submit', submitEditProfileForm); 


// Картинки "ИЗ КОРОБКИ"
function renderList(data) {
   data.forEach(item => renderItem(item));
};


// Лайк элемента
function likeListItem(evt) {
   const buttonElement = evt.target;
   buttonElement.classList.toggle('element__like-button_active');
};


// Удаление элемента
function removeListItem(evt) {
   const buttonElement = evt.target;
   const listItemElement = buttonElement.closest('.element');
   listItemElement.remove();
};


// Открытие попапа с фото
function openPhotoPopup(evt) {
   const elementImage = evt.target.closest('.element__image');
   popupImage.src = elementImage.src;
   popupImage.alt = elementImage.alt;
   popupCaption.textContent = elementImage.alt;
   openPopup(photoPopup);
};


// Картинки "ИЗ КОРОБКИ"
function createCard(text) {
   const listElement = templateElement.querySelector('.element').cloneNode(true);
   const nameElement = listElement.querySelector('.element__title');
   const elementImage = listElement.querySelector('.element__image');
   nameElement.textContent = text.name;
   elementImage.src = text.link;
   elementImage.alt = text.name;

   subscribeToEvents(listElement);
   return listElement;
};


function renderItem(cardData) {
   cardsList.prepend(createCard(cardData));
};


// События на лайк, удаление и открытие фото-попапа
function subscribeToEvents(listElement) {
   const likeButton = listElement.querySelector('.element__like-button');
   likeButton.addEventListener('click', likeListItem);
   const removeButton = listElement.querySelector('.element__delete-button');
   removeButton.addEventListener('click', removeListItem);
   const elementImage = listElement.querySelector('.element__image');
   elementImage.addEventListener('click', openPhotoPopup);
};


function closeByEsc(evt) {
   if (evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
      closePopup(activePopup);
   };
};


// Функция для открытия попапов
function openPopup(popupElement) {
   popupElement.classList.add('popup_opened');
   document.addEventListener('keydown', closeByEsc);
};

cardAddButton.addEventListener('click', function() {
   openPopup(addPopup);
});

profileEditButton.addEventListener('click', function() {
   const buttonElement = editPopup.querySelector('.popup__save-button');
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
   resetValidationErrors(editPopup);
   disableSubmitButton(buttonElement);
   openPopup(editPopup);
});


// Настраиваем состояние кнопки у попапа редактирования профиля и прячем ошибки, перед его открытием
// const preparePopup = (popupElement) => {
//    if (popupElement === editPopup) {
//       const popupSaveButton = popupElement.querySelector('.popup__save-button');
//       const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));

//       inputList.forEach((inputElement) => {
//          const errorElement = inputElement.nextElementSibling;
         
//          inputElement.classList.remove('popup__input_type_error');
//          errorElement.classList.remove('popup__input-error_visible');
//       });
//       popupSaveButton.removeAttribute('disabled', true);
//       popupSaveButton.classList.remove('popup__save-button_disabled');
//       openPopup(popupElement);
//    };
// };

// const resetValidationErrors = (popupElement) => {
//    if (popupElement === editPopup) {
//          const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
      
//          inputList.forEach((inputElement) => {
//          const errorElement = inputElement.nextElementSibling;
//          errorElement.textContent = '';

//          inputElement.classList.remove('popup__input_type_error');
//          errorElement.classList.remove('popup__input-error_visible');
//       });
//    };
// };

// const disableSubmitButton = (popupElement) => {
//    const popupSaveButton = popupElement.querySelector('.popup__save-button');
//    popupSaveButton.setAttribute('disabled', true);
//    popupSaveButton.classList.add('popup__save-button_disabled');
// }

// Функция для закрытия попапов
function closePopup(popupElement) {
   document.removeEventListener('keydown', closeByEsc);
   popupElement.classList.remove('popup_opened');
};

// Закрытие попапов кликом "мимо попапа", и кликом на иконку "крестик"
function closePopupByClick(args) {
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
function prepareCard(evt) {
   evt.preventDefault();
   
   const formSaveButton = evt.target.querySelector('.popup__save-button');
   const name = elementNameInput.value;
   const link = elementLinkInput.value;
   const newCard = {name, link};
   
   renderItem(newCard);

   elementNameInput.value = null;
   elementLinkInput.value = null;
   
   formSaveButton.classList.add('popup__save-button_disabled');
   formSaveButton.setAttribute('disabled', true);

   closePopup(addPopup);
};


renderList(initialCards);

addCardForm.addEventListener("submit", prepareCard);