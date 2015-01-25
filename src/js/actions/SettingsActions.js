var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var FirebaseUtils = require('../utils/FirebaseUtils');

var settingsActions = {
	changePassword: function(obj){

		//FireBase utils here first

		FirebaseUtils.changePassword(obj, function(err){
			if(err){
				console.log(err);
			} else {
				console.log('got Here!')
				AppDispatcher.handleAction({
					actionType: AppConstants.UPDATE_USER,
					data: obj
				});
			}
		})
	}
};

module.exports = settingsActions;