export class Section {
   constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
   }

   renderItems() {
      this._items.forEach(item => {
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