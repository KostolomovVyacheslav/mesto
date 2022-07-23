export class Popup {
   constructor(popupSelector) {
      this._popup = document.getElementById(popupSelector);
      this._closeButton = this._popup.querySelector('.popup__close-button');
   }

   open() {
      document.addEventListener('keydown', this._handleEscClose);
      this._popup.classList.add('popup_opened');
   }

   close() {
      document.removeEventListener('keydown', this._handleEscClose);
      this._popup.classList.remove('popup_opened');
   }

   setEventListeners() {
      this._closeButton.addEventListener('click', this.close.bind(this));

      this._popup.addEventListener('click', this._handleCloseByClick);
   }

   _handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
         this.close();
      }
   }

   _handleCloseByClick = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
         this.close();
      }
   }
}