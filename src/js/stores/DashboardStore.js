var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var fbRef = require('../utils/FirebaseUtils').homeInstance();

var CHANGE_EVENT = 'change';

var _store = {
  classes: []
};

var addClass = function(klass){
  _store.classes.push(klass);
};

var removeClass = function(index){
  _store.classes.splice(index, 1);
};

var updateClasses = function(classes){
  _store.classes = classes;
}

var DashboardStore = objectAssign({}, EventEmitter.prototype, {
  getState: function() {
    return _store;
  },
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case AppConstants.ADD_CLASS :
      addClass(action.data);
      DashboardStore.emit(CHANGE_EVENT);
      break;
    case AppConstants.REMOVE_CLASS :
      removeClass(action.data);
      DashboardStore.emit(CHANGE_EVENT);
      break;
    case AppConstants.GET_CLASSES :
      updateClasses(action.data);
      DashboardStore.emit(CHANGE_EVENT);
      break;
    default :
      return true;
  }
});

module.exports = DashboardStore;