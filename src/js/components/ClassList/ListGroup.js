var React = require('react');

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