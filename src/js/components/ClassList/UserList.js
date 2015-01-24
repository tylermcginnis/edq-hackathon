var React = require('react');
var UserInfo = require('./UserInfo');

var UserList = React.createClass({
  componentDidMount: function() {
    console.log('todo');
  },
  render: function() {
    var list = this.state.data.map(function(info) {
      <UserInfo data={info} />
    });
    return (
      <div>
        {list}
      </div>
    );
  }
});

module.exports = UserList;