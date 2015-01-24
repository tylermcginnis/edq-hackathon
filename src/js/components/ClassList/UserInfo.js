var React = require('react');

var UserInfo = React.createClass({
  handleClick: function() {
    console.log('remove Student')
  },
  componentDidMount: function(){

  },
  render: function() {
    return (
      <div className="well">
        <div className="col-md-2">
          <span className="x" onClick={this.handleClick}>X</span>
        </div>
        <p>{this.props.data}</p>
      </div>
    );
  }
});

module.exports = UserInfo;