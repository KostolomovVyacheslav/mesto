export class Section {
   constructor({ renderer }, containerSelector) {
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
   }
   
   renderItems(res) {
      res.forEach(item => {
         this._renderer(item);
      });
   }

   renderer(newCard) {
      this._renderer(newCard);
   }

   addItem(cardElement) {
      this._container.prepend(cardElement);
   }
}