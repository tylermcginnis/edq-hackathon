var React = require('react');
var SettingsActions = require('../../actions/SettingsActions');
var UserStore = require('../../stores/UserStore');
var ReactAddons = require('react/addons');

var Settings = React.createClass({
	getInitialState: function(){
		return {
			user: UserStore.getState(),
			hideNormal: false
		}
	},
	handleChangePassword: function(){

	},
	handleEditToggle: function(){
		this.setState({
			hideNormal: !this.state.hideNormal
		})
	},
	render: function(){
		var cx = ReactAddons.addons.classSet;
		var normalClasses = cx({
			hide: this.state.hideNormal
		});
		var inputClasses = cx({
			hide: !this.state.hideNormal,
			'form-control': true
		});
		return (
			<div className='col-md-6 col-md-offset-3'>
				<div className='panel panel-default'>
					<div className='panel-heading'>
						<div><h1>Profile</h1></div>
						<div><button className='btn btn-default' onClick={this.handleEditToggle}>EDIT</button></div>
					</div>
				<div className='panel-body'>
					<div className='form-group'>
						<label>Name:</label>
						<div className={normalClasses}>ME{this.state.user.name}</div><input type='text'className={inputClasses}/>
					</div>
					<div className='form-group'>
						<label>Email:</label>
						<div className={normalClasses}>MYEMAIL{this.state.user.email}</div><input type='text' className={inputClasses} />
					</div>
					<button className='btn btn-default' onClick={this.handleChangePassword}>Change Password</button>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Settings;