var React = require('react');
var UserInfo = require('./UserInfo');

var UserList = React.createClass({
  getInitialState: function(){
    return {
      data: [{name: 'todo', email: 'todoemail'}, {name: 'Tyler', email: 'tylr@gmail.com'}]
    }
  },
  componentDidMount: function() {

  },
  render: function() {
    var list = this.state.data.map(function(info) {
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