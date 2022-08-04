export class Card {
   constructor(data, templateElement, handleCardClick, deleteCardPopup, userId, handleLikeIconClick) {
      this._name = data.name;
      this._link = data.link;

      this._likes = data.likes;

      this._templateElement = templateElement;

      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._elementTitle = this._element.querySelector('.element__title');
      this._likeButton = this._element.querySelector('.element__like-button');
      this._likeCounter = this._element.querySelector('.element__like-counter');
      this._deleteButton = this._element.querySelector('.element__delete-button');

      this._handleCardClick = handleCardClick;
      this._handleLikeIconClick = handleLikeIconClick;
      this._deleteCardPopup = deleteCardPopup;

      this._userId = userId;
      this._cardOwnerId = data.owner._id;
      this._cardId = data._id;
   }

   
   _getTemplate() {
      const cardElement = document
         .querySelector(this._templateElement)
         .content
         .querySelector('.element')
         .cloneNode(true);

      return cardElement;
   }


   setLikesCount = (res) => {
      if (res >= 1) {
         this._likeCounter.textContent = res;
      } else {
         this._likeCounter.textContent = '';
      }
   }


   toggleLikeButtonState() {
      this._likeButton.classList.toggle('element__like-button_active');
   }
   

   _subscribeToEvents() {
      this._likeButton.addEventListener('click', () => {
         if (this._likeButton.classList.contains('element__like-button_active')) {
            this._handleLikeIconClick(true, this._cardId, this);
         } else {
            this._handleLikeIconClick(false, this._cardId, this);
         }
      });

      this._deleteButton.addEventListener('click', () => {
         this._deleteCardPopup(this._cardId, this._element)
      });

      this._elementImage.addEventListener('click', () => {
         this._handleCardClick(this._name, this._link);
      });
   }


   // Собираем новую карточку
   generateCard() {
      this._elementImage.src = this._link;
      this._elementImage.alt = this._name;
      this._elementTitle.textContent = this._name;

      if (this._userId !== this._cardOwnerId) {
         this._deleteButton.remove();
      }

      if (this._likes.length >= 1) {
         this._likeCounter.textContent = this._likes.length;
      }

      this._likes.forEach(like => {
         if (like._id === this._userId) {
            this._likeButton.classList.add('element__like-button_active');
         }
      })

      this._subscribeToEvents();
      
      return this._element;
   }
}