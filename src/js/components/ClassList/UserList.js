var React = require('react');
var UserInfo = require('./UserInfo');
var classListActions = require('../../actions/ClassListActions');
var ClassListStore = require('../../stores/ClassListStore');

var UserList = React.createClass({
  getInitialState: function(){
    return ClassListStore.getState();
  },
  componentDidMount: function() {

  },
  render: function() {
    var list = this.state[this.props.user].users.map(function(info) {
      return (
        <UserInfo data={info} />
      )
    });
    return (
      <div>
        {list}
      </div>
    );
  }
});

module.exports = UserList;