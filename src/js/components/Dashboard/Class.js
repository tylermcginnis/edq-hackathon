var React = require('react');

var Class = React.createClass({
  render: function(){
    return (
      <div className="col-sm-4 card">
        <span className="pull-right" onClick={this.props.removeClass.bind(this, this.props.index, this.props.info.name)}> PENCIL </span>
        <div className="col-sm-12 text-center">
          <h2> {this.props.info.name} </h2>
          <h5> 13 Members </h5>
          <h5> 4 in Queue </h5>
          <div className="btn btn-primary col-sm-12">
            Enter Queue
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Class;