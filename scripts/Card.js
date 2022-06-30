import { openPopup } from './index.js';

const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const photoPopup = document.getElementById('#photo-popup');

export class Card {
   constructor(data, templateElement) {
      this._name = data.name;
      this._link = data.link;

      this._templateElement = templateElement;

      this._element = this._getTemplate();
      this._elementImage = this._element.querySelector('.element__image');
      this._likeButton = this._element.querySelector('.element__like-button');
      this._deleteButton = this._element.querySelector('.element__delete-button');
   };

   // Метод с шаблоном разметки, возвращающий клонированный элемент
   _getTemplate() {
      const cardElement = document
         .querySelector(this._templateElement)
         .content
         .querySelector('.element')
         .cloneNode(true);
      
      return cardElement;
   };

   // Добавляем события на открытие фото-попапа, лайк, удаления элемента
   _subscribeToEvents() {
      this._elementImage.addEventListener('click', () => {
         this._handleOpenCard();
      });

      this._likeButton.addEventListener('click', (evt) => {
         this._handleLikeElement(evt);
      });

      this._deleteButton.addEventListener('click', () => {
         this._handleDeleteElement();
      });
   };


   // Открываем попап с изображением, добавляем слушателей
   _handleOpenCard() {
      popupImage.src = this._link;
      popupImage.alt = this._name;
      popupCaption.textContent = this._name;
   
      openPopup(photoPopup);
   };

  
   // Лайк элемента
   _handleLikeElement(evt) {
      evt.target.classList.toggle('element__like-button_active');
   };

   
   // Удаление элемента
   _handleDeleteElement() {
      this._element.remove();
      this._element = null;
   };


   // Собираем новую карточку
   generateCard() {
      this._element.querySelector('.element__image').src = this._link;
      this._element.querySelector('.element__title').textContent = this._name;
      this._element.querySelector('.element__image').alt = this._name;

      this._subscribeToEvents(this._element);

      return this._element;
   };
};