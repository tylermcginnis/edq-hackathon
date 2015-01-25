var Firebase = require('firebase');
var AppConstants = require('../constants/AppConstants');

var firebaseUtils = {
  homeInstance: function(){
    return new Firebase(AppConstants.FIREBASE_HOST);
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
  addUserToFirebase: function(authData){
    var key = this.formatEmailForFirebase(authData.email);
    this.homeInstance().child('user').child(key).set(authData);
  },
  addClassToFirebase: function(klass){
    var ref = this.homeInstance();
    var authData = ref.getAuth();
    if(authData){
      var classObj = {
        classId: this.formatURL(klass.name),
        name: klass.name,
      };
      var key = this.formatEmailForFirebase(authData.password.email);
      ref.child('/classes').child(key).child(classObj.classId).set(classObj);
    } else {
      //go back to home screen because not logged in?
    }
  },
  getClasses: function(userEmail, dispatcherCB){
    var ref = this.homeInstance();
    if(userEmail) {
      userEmail = formatEmailForFirebase(userEmail);
    } else {
      userEmail = this.formatEmailForFirebase(ref.getAuth().password.email);
    }

    ref.child('classes').child(userEmail).on('value', function(snapshot){
      var arr = this.toArray(snapshot.val());
      dispatcherCB(arr);
    }.bind(this))
  },
  formatURL: function(str){
    return str.toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
  },
  toArray: function(obj){
    var arr = [];
    for(var key in obj){
      arr.push(obj[key]);
    }
    return arr;
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