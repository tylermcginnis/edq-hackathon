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
      this.getUser(function(userData){
        authData.name = userData.name;
        cb(error, authData);
      })
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
  resetPassword: function(email, cb){
    this.homeInstance().resetPassword({
      email: email
    }, function(error){
      if (error) {
        switch (error.code) {
          case "INVALID_USER":
            cb("The specified user account does not exist.");
            break;
          default:
            cb("Error resetting password:", error);
        }
      } else {
        cb(null, "Password reset email sent successfully!");
      }
    })
  },
  changeName: function(obj, cb){
    var id = this.formatEmailForFirebase(obj.user.email);
    this.homeInstance().child('user').child(id).child('name').set(obj.newName, cb)
  },
  addUserToFirebase: function(authData){
    var key = this.formatEmailForFirebase(authData.email);
    this.homeInstance().child('user').child(key).set(authData);
  },
  addClassToFirebase: function(klass){
    var ref = this.homeInstance();
    var authData = ref.getAuth();
    if(authData){
      var fbClassId = this.formatFBClassID(klass.name, authData.password.email);
      var email = this.formatEmailForFirebase(authData.password.email)
      ref.child('classes').child(fbClassId).set({
        name: klass.name
      });
      ref.child('classes').child(fbClassId).child('members').push({
        role: 'teacher',
        id: email
      });
      ref.child('user').child(email).child('classes').child(fbClassId).set({
        role: 'teacher'
      })
    } else {
      //go back to home screen because not logged in?
    }
  },
  getClasses: function(email, dispatcherCB){
    var ref = this.homeInstance();
    if(email) {
      var email = this.formatEmailForFirebase(email);
    } else {
      var email = this.formatEmailForFirebase(ref.getAuth().password.email);
    }

    ref.child('user').child(email).child('classes').on('value', function(snapshot){
      var classes = [];
      var data = snapshot.val();
      for(var key in data){
        classes.push({
          classID: key,
          role: data[key].role
        });
      };
      var finalClassList = [];
      for(var i = 0; i < classes.length; i++){
        (function(i){
          ref.child('classes').child(classes[i].classID).once('value', function(snapshot){
            if(snapshot.val()){
              var data = snapshot.val();
              finalClassList.push({
                role: classes[i].role,
                members: data.members,
                name: data.name,
                queue: data.queue
              });
              finalClassList = this.toArray(finalClassList).sort(this.sortData("name", true));
              dispatcherCB(finalClassList);
            }
          }.bind(this))
        }.bind(this))(i);
      };

      // var arr = this.toArray(snapshot.val()).sort(this.sortData("name", true));
      // dispatcherCB(arr);
    }.bind(this))
  },
  getUser: function(cb){
    var ref = this.homeInstance();
    var userEmail = this.formatEmailForFirebase(ref.getAuth().password.email);
    ref.child('user').child(userEmail).on('value', function(snapshot){
      var user = snapshot.val();
      cb(user);
    });
  },
  removeClass: function(className, email){
    var ref = this.homeInstance();
    if(email){
      var fbClassId = this.formatFBClassID(className, email);
    } else {
      email = ref.getAuth().password.email;
      var fbClassId = this.formatFBClassID(className, email);
    }
    ref.child('classes').child(fbClassId).remove();
    ref.child('user').child(this.formatEmailForFirebase(email)).child('classes').child(fbClassId).remove();
  },
  formatFBClassID: function(className, email){
    return this.formatEmailForFirebase(email) + className.toLowerCase().replace(/ /g,'-').replace(/[-]+/g, '-').replace(/[^\w-]+/g,'');
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
  },
  sortData: function(field, reverse, primer){
    var key = primer ?
      function(x) {return primer(x[field])} :
      function(x) {return x[field]};
    reverse = [-1, 1][+!!reverse];
    return function (a, b) {
      return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
  }
};

module.exports = firebaseUtils;