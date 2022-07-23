export class UserInfo{
   constructor({ profileNameSelector, profileJobSelector }) {
      this._profileName = document.querySelector(profileNameSelector);
      this._profileJob = document.querySelector(profileJobSelector);
   }

   getUserInfo() {
      const dataValues = {
         inputUserName: this._profileName.textContent,
         inputUserJob: this._profileJob.textContent
      };
      
      return dataValues;
   }

   setUserInfo(data) {
      this._profileName.textContent = data.inputUserName;
      this._profileJob.textContent = data.inputUserJob;
   }
}