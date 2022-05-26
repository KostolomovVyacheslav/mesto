const initialCards = [
   {
      name: 'Карелия',
      link: 'https://images.unsplash.com/photo-1525301472244-57e18fb6f028?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764'
   },
   {
      name: 'Северная Осетия',
      link: 'https://images.unsplash.com/photo-1612719734820-81784b7e6573?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687'
   },
   {
      name: 'Онежское озеро',
      link: 'https://images.unsplash.com/photo-1543699936-c901ddbf0c05?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686'
   },
   {
      name: 'Красноярск',
      link: 'https://images.unsplash.com/photo-1628872247398-888e0808c130?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627'
   },
   {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
      name: 'Крым',
      link: 'https://images.unsplash.com/photo-1565342403875-07a8dc5ed13c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764'
    }
]; 


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
   editPopup.classList.remove('popup_opened');
};

formElement.addEventListener('submit', formSubmitHandler); 


// Картинки "ИЗ КОРОБКИ"
function renderList(data) {
   data.forEach(item => renderItem(item));
};


// Лайк элемента
function likeListItem(evt) {
   const buttonElement = evt.target;
   buttonElement.closest('.element__like-button').classList.toggle('element__like-button_active');
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
   popupCaption.textContent = elementImage.alt;
   openPopup(photoPopup);
};


// Картинки "ИЗ КОРОБКИ"
function renderItem(text) {
   const templateElement = document.querySelector('.element-template').content;
   const listElement = templateElement.querySelector('.element').cloneNode(true);
   const nameElement = listElement.querySelector('.element__title');
   const elementImage = listElement.querySelector('.element__image');
   nameElement.textContent = text.name;
   elementImage.src = text.link;
   elementImage.alt = text.name;
   
   subscribeToEvents(listElement);
   cardsList.prepend(listElement);
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


// Закрытие попапов
function closePopup(args) {
   const closeButton = args.target;
   const popupElement = closeButton.closest('.popup');
   popupElement.classList.remove('popup_opened');
};

closePopupButtons.forEach((closePopupButton) => {
   closePopupButton.addEventListener('click', closePopup);
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

   addPopup.classList.remove('popup_opened');
};


renderList(initialCards);

addCardForm.addEventListener("submit", prepareCard);