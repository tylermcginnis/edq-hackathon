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
  createUser: function(user, cb) {
    var ref = this.homeInstance();
    console.log('The user is ', user);
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
        ref.authWithPassword(user, function(err, authData) {
          if(err === null){
            cb(authData);
          }
        });
      }
    });
  }
};

module.exports = firebaseUtils;