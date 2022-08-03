export class Api {
   constructor({url, headers}) {
      this._url = url;
      this._headers = headers;
   }


   getUserData() {
      return fetch(`${this._url}/users/me`, {
         method: 'GET',
         headers: {
            Authorization: `${this._headers}`
         }
      })
      .then(res => {
         if (res.ok) {
            return res.json();
         } else {
            Promise.reject(`Ошибка загрузки данных ${res.status}`);
         }
      })
   }


   getInitialCards() {
      return fetch(`${this._url}/cards`, {
         method: 'GET',
         headers: {
            Authorization: `${this._headers}`
         }
      })
      .then(res => {
         if (res.ok) {
            return res.json();
         } else {
            Promise.reject(`Ошибка загрузки данных ${res.status}`);
         }
      })
   }


   addNewCard(item) {
      return fetch(`${this._url}/cards`, {
         method: 'POST',
         headers: {
            Authorization: `${this._headers}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: item.name,
            link: item.link
         })
      })
      .then(res => {
         if (res.ok) {
            return res.json();
         } else {
            Promise.reject(`Ошибка загрузки данных ${res.status}`);
         }
      })
   }


   getUserId() {
      return fetch(`https://mesto.nomoreparties.co/v1/cohort-46/users/me`, {
         method: 'GET',
         headers: {
            Authorization: 'ddb2474c-5895-4c61-a372-bb2b9d4e6bd7'
         }
      })
      .then(res => {
         if (res.ok) {
            return res.json();
         } else {
            Promise.reject(`Ошибка загрузки данных ${res.status}`);
         }
      })
      .then(result => {
         return result._id;
      })
   }


   editProfile(userData) {
      return fetch(`${this._url}/users/me`, {
         method: 'PATCH',
         headers: {
            Authorization: `${this._headers}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: userData.inputUserName,
            about: userData.inputUserJob
          })
      })
      .then(res => {
         if (res.ok) {
            return res.json();
         } else {
            Promise.reject(`Ошибка загрузки данных ${res.status}`);
         }
      })
   }


   changeProfileAvatar(avatarData) {
      return fetch(`${this._url}/users/me/avatar`, {
         method: 'PATCH',
         headers: {
            Authorization: `${this._headers}`,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            avatar: avatarData.avatarLink
         })
      })
      .then(res => {
         if (res.ok) {
            return res.json();
         } else {
            Promise.reject(`Ошибка загрузки данных ${res.status}`);
         }
      })
   }


   deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
         method: 'DELETE',
         headers: {
            Authorization: `${this._headers}`,
            'Content-Type': 'application/json'
         }
      })
      .then(res => {
         if (res.ok) {
            return res.json();
         } else {
            Promise.reject(`Ошибка загрузки данных ${res.status}`);
         }
      })
   }


   changeLikeStatus(isLiked, id) {
      if (isLiked) {
         return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
               Authorization: `${this._headers}`,
               'Content-Type': 'application/json'
            }
         })
         .then(res => {
            if (res.ok) {
               return res.json();
            } else {
               Promise.reject(`Ошибка загрузки данных ${res.status}`);
            }
         })
      } else {
         return fetch(`${this._url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: {
               Authorization: `${this._headers}`,
               'Content-Type': 'application/json'
            }
         })
         .then(res => {
            if (res.ok) {
               return res.json();
            } else {
               Promise.reject(`Ошибка загрузки данных ${res.status}`);
            }
         })
      }
   }
}