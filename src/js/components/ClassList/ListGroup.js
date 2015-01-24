var React = require('react');
var AddUser = require('./AddUser');
var UserList = require('./UserList');

var ListGroup = React.createClass({
  render: function() {
    return (
      <div>
        <AddUser user={this.props.user} />
        <UserList user={this.props.user}/>
      </div>
    );
  }
});

module.exports = ListGroup;