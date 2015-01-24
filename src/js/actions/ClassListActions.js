var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var classListActions = {
  addUser: function(type, user) {
    //FIREBASE REQUEST
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD_USER,
      data: {
        type: type,
        user: user
      }
    });
  },
  removeUser: function(index) {
    AppDispatcher.handleAction({
      actionType: AppConstants.REMOVE_USER,
      data: index
    });
  },
  addEmails: function(type, emailStr){
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD_EMAILS,
      data: {
        type: type,
        emailStr: emailStr
      }
    })
  }
};

module.exports = classListActions