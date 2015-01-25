var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var FirebaseUtils = require('../utils/FirebaseUtils');

var settingsActions = {
	changePassword: function(obj){
		FirebaseUtils.changePassword(obj, function(err){
			if(err){
				console.log(err);
			} else {
				AppDispatcher.handleAction({
					actionType: AppConstants.UPDATE_USER,
					data: obj
				});
				//Does this really need to happen? ^^
				//The store won't change.  The password
				//remains private.  Probably remove.
			};
		});
	},

	resetPassword: function(email){
		FirebaseUtils.resetPassword(email, function(err, message){
			if(err){
				console.log(err)
			} else{
				console.log(message);
			}
		})
	},

	changeName: function(obj){
		FirebaseUtils.changeName(obj, function(err){
			if(err){
				console.log(err);
			} else {
				AppDispatcher.handleAction({
					actionType: AppConstants.UPDATE_USER,
					data: {
						name: obj.newName,
						email: obj.user.email
					}
				});
			};
		});
	}

};

module.exports = settingsActions;