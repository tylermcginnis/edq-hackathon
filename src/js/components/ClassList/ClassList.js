var React = require('react');
var ListGroup = require('./ListGroup');

var ClassList = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>Students</h3>
            <ListGroup user="Student"/>
          </div>
          <div className="col-md-4">
            <h3>Assistants</h3>
            <ListGroup user="Assistant"/>
          </div>
          <div className="col-md-4">
            <h3>Teachers</h3>
            <ListGroup user="Teacher"/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ClassList