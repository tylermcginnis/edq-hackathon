var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var FirebaseUtils = require('../utils/FirebaseUtils');

var getClassesCallback = function(classes){
  AppDispatcher.handleAction({
    actionType: AppConstants.GET_CLASSES,
    data: classes
  })
};

var dashboardActions = {
  addClass: function(klass) {
    AppDispatcher.handleAction({
      actionType: AppConstants.ADD_CLASS,
      data: klass
    });
    FirebaseUtils.addClassToFirebase(klass);
  },
  removeClass: function(index, name, email) {
    AppDispatcher.handleAction({
      actionType: AppConstants.REMOVE_CLASS,
      data: index
    });
    FirebaseUtils.removeClass(name, email);
  },
  getClasses: function(userEmail){
    FirebaseUtils.getClasses(userEmail, getClassesCallback);
  }
};

module.exports = dashboardActions;