const profileEdit = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');

profileEdit.addEventListener('click', function() {
   if (popup.classList.contains('popup_open') !== true) {
      popup.classList.add('popup_open');
   }
});

closeButton.addEventListener('click', function() {
   if (popup.classList.contains('popup_open') !== false) {
      popup.classList.remove('popup_open');
   }
})





// const likeButton = document.querySelectorAll('.element__like-button');
// likeButton.addEventListener('click', function() {
   // for (let i = 0; i <= likeButton.length-1; i ++) {
   //    likeButton[i].classList.toggle('element__like-active');
   // }
//    alert('да да я');
// });

//    likeButton.classList.toggle('element__like-active');
//    alert('да да я');