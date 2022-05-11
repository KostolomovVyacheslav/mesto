const profileEdit = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

profileEdit.addEventListener('click', function() {
   nameInput.value = profileName.textContent;
   jobInput.value = profileDescription.textContent;
   if (popup.classList.contains('popup_opened') !== true) {
      popup.classList.add('popup_opened');
   }
});

closeButton.addEventListener('click', function() {
   if (popup.classList.contains('popup_opened') !== false) {
      popup.classList.remove('popup_opened');
   }
})

let formElement = document.querySelector('.popup__form');

function formSubmitHandler (evt) {
   evt.preventDefault();

   profileName.textContent = nameInput.value;
   profileDescription.textContent = jobInput.value;
   popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 