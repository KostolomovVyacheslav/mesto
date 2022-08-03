export class UserInfo{
   constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
      this._profileName = document.querySelector(profileNameSelector);
      this._profileJob = document.querySelector(profileJobSelector);
      this._profileAvatar = document.querySelector(profileAvatarSelector);
   }

   getUserInfo() {
      const dataValues = {
         inputUserName: this._profileName.textContent,
         inputUserJob: this._profileJob.textContent
      };

      return dataValues;
   }

   setUserInfo(data) {
      this._profileName.textContent = data.name;
      this._profileJob.textContent = data.about;
      this._profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      this._userId = data._id;
   }

   getUserId() {
      return this._userId;
   }
}