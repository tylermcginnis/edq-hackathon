var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var FirebaseUtils = require('../utils/FirebaseUtils');

var dispatcherCallback = function(authObj) {
  if(authObj){
    AppDispatcher.handleAction({
      actionType: AppConstants.INITIALIZE_USER,
      data: authObj
    });
  }
};

var registrationActions = {
  registerUser: function(user) {
    FirebaseUtils.createUser(user, dispatcherCallback);
  },
  updateUser: function(userObj){
    AppDispatcher.handleAction({
      actionType: AppConstants.UPDATE_USER,
      data: userObj
    });
  },
  login: function(email, pw){
    FirebaseUtils.login({
      email: email,
      password: pw
    }, function(err, authData){
      // console.log(err, authData);
      console.log(authData.name);
      AppDispatcher.handleAction({
        actionType: AppConstants.UPDATE_USER,
        data: {
          email: authData.password.email,
          name: authData.name
        }
      })
    })
  }
};

module.exports = registrationActions;