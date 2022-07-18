import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
   constructor(popupSelector) {
      super(popupSelector);
      this._photoPopupImage = this._popup.querySelector('.popup__image');
      this._photoPopupCaption = this._popup.querySelector('.popup__caption');
   }

   
   open(name, link) {
      super.open();
      this._photoPopupImage.src = link;
      this._photoPopupImage.alt = name;
      this._photoPopupCaption.textContent = name;
   }
}