var React = require('react');
var SettingsActions = require('../../actions/SettingsActions');
var UserStore = require('../../stores/UserStore');
var addOns = require('react/addons');

var Settings = React.createClass({
	getInitialState: function(){
		return UserStore.getState();
	},
	handleChangePassword: function(){

	},
	render: function(){
		return (
			<div className='container'>
				<h1>Settings</h1>
				<div className='panel panel-default'>
					<span>Name:</span><span>{this.state.name}</span><button>EDIT</button>
				</div>
				<div className='panel panel-default'>
					<span>Email:</span><span>{this.state.email}</span><button>EDIT</button>
				</div>
				<button className='btn btn-default' onClick={this.handleChangePassword}>Change Password</button>
			</div>
		)
	}
});

module.exports = Settings;