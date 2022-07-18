export class Section {
   constructor({ items, renderer }, containerSelector) {
      this._item = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
   }

   renderItems() {
      this._item.forEach(item => {
         this._renderer(item);
      });
   }

   renderer() {
      this._renderer(this._item);
   }
   
   addItem(cardElement) {
      this._container.prepend(cardElement);
   }
}