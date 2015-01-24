var React = require('react');

var UserInfo = React.createClass({
  handleClick: function() {
    console.log('remove Student')
  },
  render: function() {
    return (
      <div className="well">
        <div className="col-md-10">
          <h3>{this.props.data.name}</h3>
        </div>
        <div className="col-md-2">
          <span className="x" onClick={this.handleClick}>X</span>
        </div>
        <p>{this.props.data.email}</p>
      </div>
    );
  }
});

module.exports = UserInfo;