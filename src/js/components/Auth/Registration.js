var React = require('react');
var AuthActions = require('../../actions/AuthActions');
var UserStore = require('../../stores/UserStore');

var Registration = React.createClass({
  getInitialState: function() {
    return UserStore.getState();
  },
  componentDidMount: function(){
    UserStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    UserStore.removeChangeListener(this._onChange)
  },
  handleChange: function(prop, e) {
    var obj = {};
    obj[prop] = e.target.value;
    AuthActions.updateUser(obj);
  },
  handleSubmit: function() {
    AuthActions.registerUser(this.state.user);
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
              <input type="text" placeholder="name" className="form-control" value={this.state.user.name} onChange={this.handleChange.bind(this, 'name')}/>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" placeholder="email" className="form-control" value={this.state.user.email} onChange={this.handleChange.bind(this, 'email')}/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="password" className="form-control" value={this.state.user.password} onChange={this.handleChange.bind(this, 'password')}/>
            </div>
            <div className="form-group">
              <button className="btn btn-default" onClick={this.handleSubmit}>Register</button>
            </div>
          </div>
        </div>
      </div>
    );
  },
  _onChange: function(userObj){
    this.setState(
      UserStore.getState()
    );
  }
});

module.exports = Registration;