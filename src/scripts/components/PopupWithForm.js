import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
   constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
      this._form = this._popup.querySelector('.popup__form');
      this._inputList = this._popup.querySelectorAll('.popup__input');
   }
   
   _getInputValues() {
      this._formValues = {};

      this._inputList.forEach(input => {
         this._formValues[input.name] = input.value;
      });

      return this._formValues;
   }

   setEventListeners(evt) {
      super.setEventListeners(evt);
      this._form.addEventListener('submit', (evt) => {
         evt.preventDefault();
         this._handleFormSubmit(this._getInputValues());
      });
   }

   setInputValues(data) {
      this._inputList.forEach((input) => {
         input.value = data[input.name];
      });
   }

   close() {
      super.close();
      this._form.reset();
   }
}