var React = require('react');
var AddUser = require('./AddUser');
var UserList = require('./UserList');
var ClassListStore = require('../../stores/ClassListStore');
var classListActions = require('../../actions/ClassListActions');

var ListGroup = React.createClass({
  getInitialState: function() {
    return ClassListStore.getState();
  },
  componentDidMount: function(){
    ClassListStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    ClassListStore.removeChangeListener(this._onChange)
  },
  handleChange: function(type, e) {
    classListActions.addEmails(type, e.target.value);
  },
  handleSubmit: function(type, emailStr){
    var arr = emailStr.split(",");
    for(var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    };
    classListActions.addUser(type, arr);
  },
  render: function() {
    return (
      <div>
        <AddUser user={this.props.user} handleSubmit={this.handleSubmit}/>
        <UserList user={this.props.user}/>
      </div>
    );
  },
  _onChange: function(){
    this.setState(
      ClassListStore.getState()
    )
  }
});

module.exports = ListGroup;