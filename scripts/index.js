const templateElement = document.querySelector('.element-template').content;

const profileEditButton = document.querySelector('.profile__edit-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const cardAddButton = document.querySelector('.profile__add-button');

const editPopup = document.getElementById('#edit-popup'); 
const addPopup = document.getElementById('#add-popup');

const addCardForm = document.getElementById('#add-img-form');
const formElement = document.getElementById('#edit-form');

const cardsList = document.querySelector('.elements__list');
const elementNameInput = document.querySelector('.popup__input_img-name');
const elementLinkInput = document.querySelector('.popup__input_img-link');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');


// Редактируем профиль
function formSubmitHandler(evt) {
   evt.preventDefault();

   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;

   closePopup(editPopup);
};

formElement.addEventListener('submit', formSubmitHandler); 


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
   const photoPopup = document.getElementById('#photo-popup');
   const popupImage = document.querySelector('.popup__image');
   const popupCaption = document.querySelector('.popup__caption');
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


// Открытие попапов: редактирования профиля и добавления нового элемента
function openPopup(popupElement) {
   popupElement.classList.add('popup_opened');
};

cardAddButton.addEventListener('click', function() {
   openPopup(addPopup);
});

profileEditButton.addEventListener('click', function() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
   openPopup(editPopup);
});

// Функция для закрытия попапов
function closePopup(popupElement) {
   popupElement.classList.remove('popup_opened');
}

// Закрытие попапов, нажатием на иконку "крестик"
function closePopupByClick(args) {
   const closeButton = args.target;
   const popupElement = closeButton.closest('.popup');
   closePopup(popupElement);
};

closePopupButtons.forEach((closePopupButton) => {
   closePopupButton.addEventListener('click', closePopupByClick);
});


// Собираем новый элемент
function prepareCard(evt) {
   evt.preventDefault();
   
   let name = elementNameInput.value;
   let link = elementLinkInput.value;
   let newCard = {name, link};
   
   renderItem(newCard);

   elementNameInput.value = null;
   elementLinkInput.value = null;

   closePopup(addPopup);
};


renderList(initialCards);

addCardForm.addEventListener("submit", prepareCard);