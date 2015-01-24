var React = require('react');

var AddUser = React.createClass({
  getInitialState: function(){
    return {
      emails: ''
    }
  },
  handleChange: function(e){
    this.setState({
      emails: e.target.value
    });
  },
  render: function() {
    return (
      <form>
        <div className="form-group">
          <textarea className="form-control" placeholder="tyler.mcginnis@devmtn.com, ean@devmtn.com, jacob.turner@devmtn.com" value={this.state.emails} onChange={this.handleChange} ></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-success" onClick={this.props.handleSubmit.bind(this, this.props.user, this.state.emails)} >Add {this.props.user}</button>
        </div>
      </form>
    );
  }
});

module.exports = AddUser;