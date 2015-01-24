var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var classListActions = {
  addUser: function(user) {
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD_USER,
      data: user
    });
  },
  removeUser: function(index) {
    AppDispatcher.handleAction({
      actionType: AppConstants.REMOVE_USER,
      data: index
    });
  },
  addEmails: function(emailStr){
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD_EMAILS,
      data: emailStr
    })
  }
};

module.exports = classListActions