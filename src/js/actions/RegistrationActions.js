var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var FirebaseUtils = require('../utils/FirebaseUtils');

var dispatcherCallback = function(authObj) {
  AppDispatcher.handleAction({
    actionType: AppConstants.INITIALIZE_USER,
    data: authObj
  });
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
      //you are logged in redirect
    })
  }
};

module.exports = registrationActions;