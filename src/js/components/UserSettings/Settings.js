var React = require('react');
var SettingsActions = require('../../actions/SettingsActions');
var UserStore = require('../../stores/UserStore');
var ReactAddons = require('react/addons');

var Settings = React.createClass({
	getInitialState: function(){
		return {
			user: UserStore.getState().user,
			showNameInput: false,
			showPassInput: false,
			newName: '',
			originalPass: '',
			newPass: ''
		}
	},
	handleNameToggle: function(){
		this.setState({
			showNameInput: !this.state.showNameInput
		})
	},
	handlePasswordToggle: function(){
		this.setState({
			showPassInput: !this.state.showPassInput
		})
	},
	handleChange: function(prop, e){
		var obj = {};
		obj[prop] = e.target.value;
		this.setState(obj)
	},
	handleChangePassword: function(){
		SettingsActions.changePassword({
			user: this.state.user,
			oldPass: this.state.originalPass,
			newPass: this.state.newPass
		});
	},
	handleChangeName: function(){

	},
	render: function(){
		var cx = ReactAddons.addons.classSet;
		var normalClass = cx({
			hide: this.state.showNameInput
		});
		var nameInputClass = cx({
			hide: !this.state.showNameInput,
			'input-group': true
		});
		var passwordInputClass = cx({
			hide: !this.state.showPassInput,
			'input-group': true
		});
		return (
			<div className='col-md-6 col-md-offset-3'>
				<div className='panel panel-default'>
					<div className='panel-heading'>
						<div><h1>Profile</h1></div>
					</div>
				<div className='panel-body'>
					<div className='form-group'>
						<i onClick={this.handleNameToggle} className="fa fa-cog"></i><label>Name:</label>
						<div className={normalClass}>{this.state.user.name}</div>
						<div className={nameInputClass} >
							<input type='text' className='form-control'value={this.state.newName} onChange={this.handleChange.bind(this, 'newName')}/>
							<button className='btn btn-default' onClick={this.handleChangeName} >Submit</button>
						</div>
					</div>
					<div className='form-group'>
						<label>Email:</label>
						<div >{this.state.user.email}</div>
					</div>
					<button className='btn btn-default' onClick={this.handlePasswordToggle}>Change Password</button>
					<div className={passwordInputClass}>
						<input placeholder='Old Password' type='password' className='form-control' value={this.state.originalPass} onChange={this.handleChange.bind(this, 'originalPass')}/>
						<input placeholder='New Password' type='password' className='form-control' value={this.state.newPass} onChange={this.handleChange.bind(this, 'newPass')}/>
						<button className='btn btn-default' onClick={this.handleChangePassword} >Submit</button>
					</div>
				</div>
				</div>
			</div>
		)
	},
	_onChange: function(){
		
	}
});

module.exports = Settings;