var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var fbRef = require('../utils/FirebaseUtils').homeInstance();

var CHANGE_EVENT = 'change';

var _state = {
  Student: {
    emails: '',
    users: [{name: 'todo', email: 'todoemail'}, {name: 'Tyler', email: 'tylr@gmail.com'}]
  },
  Assistant: {
    emails: '',
    users: [{name: 'stdent name', email: 't@gm.com'}]
  },
  Teacher: {
    emails: '',
    users: []
  }
};

var setUsers = function(usersObj){
  _state[usersObj.type].users = usersObj.user;
};

var setEmails = function(emailObj){
  _state[emailObj.type].emails = emailObj.emailStr;
}

var removeUser = function(index) {
  _state.users.splice(index, 1); //todo
}

var ClassListStore = objectAssign({}, EventEmitter.prototype, {
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
  console.log(action);
  switch(action.actionType) {
    case AppConstants.ADD_USER :
      setUsers(action.data);
      ClassListStore.emit(CHANGE_EVENT);
    break;
    case AppConstants.REMOVE_USER :
      removeUser(action.data);
      ClassListStore.emit(CHANGE_EVENT);
    break;
    case AppConstants.ADD_EMAILS :
      setEmails(action.data);
      console.log(_state)
      ClassListStore.emit(CHANGE_EVENT);
    default :
      return true;
  }
});

module.exports = ClassListStore;