var React = require('react');
var RegistrationActions = require('../../actions/RegistrationActions');


var Registration = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  handleChange: function(e, prop) {
    var obj = {};
    obj[prop] = e.target.value
    this.setState(obj);
  },
  handleSubmit: function() {
    RegistrationActions.registerUser({
      email: this.state.email,
      password: this.state.password
    });
  },
  render: function() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h1>Register</h1>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="name" className="form-control" value={this.state.name} onChange={this.handleChange.bind(this, 'name')}/>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" placeholder="email" className="form-control" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="password" className="form-control" value={this.state.password} onChange={this.handleChange.bind(this, 'password')}/>
            </div>
            <div className="form-group">
              <button className="btn btn-default" onClick={handleSubmit}>Register</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});