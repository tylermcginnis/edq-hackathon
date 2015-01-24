var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var fbRef = require('../utils/FirebaseUtils').homeInstance();

var CHANGE_EVENT = 'change';

var _state = {
  user: {
    name: '',
    email: '',
    password: ''
  }
};

var initializeUser = function(user) {
  _state = {
    user: user
  }
};

var updateUser = function(obj){
  _state.user[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]]
}

var UserStore = objectAssign({}, EventEmitter.prototype, {
  getState: function() {
    return _state;
  },
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  switch(action.actionType) {
    case AppConstants.INITIALIZE_USER :
      initializeUser(action.data);
      UserStore.emit(CHANGE_EVENT);
    break;
    case AppConstants.UPDATE_USER :
      updateUser(action.data);
      UserStore.emit(CHANGE_EVENT);
    default :
      return true;
  }
});

module.exports = UserStore;