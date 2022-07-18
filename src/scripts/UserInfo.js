export class UserInfo{
   constructor({ profileNameSelector, profileDescriptionSelector }) {
      this._profileName = document.querySelector(profileNameSelector);
      this._profileDescription = document.querySelector(profileDescriptionSelector);
   }

   getUserInfo() {
      const dataValues = {
         profileName: this._profileName.textContent,
         profileDescription: this._profileDescription.textContent
      };

      return dataValues;
   }

   setUserInfo(data) {
      this._profileName.textContent = data.profileName;
      this._profileDescription.textContent = data.profileDescription;
   }
}