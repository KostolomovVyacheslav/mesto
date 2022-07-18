export class Card {
   constructor(data, templateElement, handleCardClick) {
      this._name = data.name;
      this._link = data.link;

      this._templateElement = templateElement;

      this._handleCardClick = handleCardClick;

      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._likeButton = this._element.querySelector('.element__like-button');
      this._deleteButton = this._element.querySelector('.element__delete-button');
   }

   _getTemplate() {
      const cardElement = document
         .querySelector(this._templateElement)
         .content
         .querySelector('.element')
         .cloneNode(true);

      return cardElement;
   }

   
   _subscribeToEvents() {
      this._likeButton.addEventListener('click', this._handleLikeElement);

      this._deleteButton.addEventListener('click', this._handleDeleteElement);

      this._elementImage.addEventListener('click', () => {
         this._handleCardClick(this._name, this._link);
      });
   }

  
   // Лайк элемента
   _handleLikeElement = (evt) => {
      evt.target.classList.toggle('element__like-button_active');
   }

   
   // Удаление элемента
   _handleDeleteElement = () => {
      this._element.remove();
      this._element = null;
   }


   // Собираем новую карточку
   generateCard() {
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__title').textContent = this._name;
      this._element.querySelector('.element__image').alt = this._name;

      this._subscribeToEvents(this._element);
      
      return this._element;
   }
}