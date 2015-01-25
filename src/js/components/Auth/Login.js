var React = require('react');
var AuthActions = require('../../actions/AuthActions');
var UserStore = require('../../stores/UserStore');

var Login = React.createClass({
	getInitialState: function(){
		return {
			email: '',
			password: ''
		}
	},
	handleChange: function(prop, e) {
		console.log()
		var obj = {};
		obj[prop] = e.target.value;
		this.setState(obj);
	},
	handleSubmit: function(){
		AuthActions.login(this.state.email, this.state.password);
	},
	render: function(){
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h1>Login</h1>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label>Email</label>
              <input type="text" placeholder="email" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
            </div>
            <div className="form-group">
              <button className="btn btn-default" onClick={this.handleSubmit}>Login</button>
            </div>
          </div>
        </div>
      </div>
    );
	}
}); 

module.exports = Login;