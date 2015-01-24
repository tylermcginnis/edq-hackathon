var Firebase = require('firebase');
var AppConstants = require('../constants/AppConstants');

var firebaseUtils = {
  homeInstance: function(){
    return new Firebase(AppConstants.FIREBASE_HOST);
  },
  toArray: function(obj){
    var arr = [];
    for(var key in obj){
      arr.push(obj[key]);
    }
    return arr;
  },
  createUser: function(user) {
    var ref = this.homeInstance();
    ref.createUser(user, function(error) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", error);
        }
      } else if(error === null){
        console.log('User created!');
        return ref.authWithPassword(user, function(err, authData) {
          return authData;
        });
      }
    });
  }
};

module.exports = firebaseUtils;