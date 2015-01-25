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
            cb(user);
            this.addUserToFirebase({
              email: user.email,
              name: user.name
            });
          }
        }.bind(this));
      }
    }.bind(this));
  },
  login: function(userObj, cb){
    this.homeInstance().authWithPassword(userObj, function(error, authData){
      cb(authData);
    }.bind(this));
  },
  changePassword: function(obj, cb){
    this.homeInstance().changePassword({
      email: obj.user.email,
      oldPassword: obj.oldPass,
      newPassword: obj.newPass
    }, function(error){
      if(error){
        switch(error.code){
          case "INVALID_PASSWORD":
            cb("The specified user account password is incorrect.");
            break;
          case "INVALID_USER":
            cb("The specified user account does not exist.");
            break;
          default:
            cb("Error changing password:", error);
        }
      } else {
        cb();
      };
    });
  },
  changeName: function(obj, cb){
    var id = this.formatEmailForFirebase(obj.user.email);
    this.homeInstance().child('user').child(id).child('name').set(obj.newName, cb)
  },
  addUserToFirebase: function(authData){
    var key = this.formatEmailForFirebase(authData.email);
    this.homeInstance().child('user').child(key).set(authData);
  },
  addClassToFirebase: function(){

  },
  formatEmailForFirebase : function(email){
    var key = email.replace('@', '^');
    if(key.indexOf('.') !== -1){
      return key.split('.').join('*');
    }
    return key;
  }
};

module.exports = firebaseUtils;