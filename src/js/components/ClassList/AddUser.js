var React = require('react');
var classListActions = require('../../actions/ClassListActions');
var ClassListStore = require('../../stores/ClassListStore');

var AddUser = React.createClass({
  getInitialState: function() {
    return ClassListStore.getState();
  },
  componentDidMount: function(){
    ClassListStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    ClassListStore.removeChangeListener(this._onChange)
  },
  handleChange: function(e) {
    classListActions.addEmails(e.target.value);
  },
  handleSubmit: function(){
    var arr = this.state.user.split(",");
    for(var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim();
    };
    classListActions.addUser(arr);
    this.setState({
      emails: ''
    });
  },
  render: function() {
    return (
      <form>
        <div className="form-group">
          <textarea className="form-control" placeholder="tyler.mcginnis@devmtn.com, ean@devmtn.com, jacob.turner@devmtn.com" value={this.state.emails} onChange={this.handleChange} ></textarea>
        </div>
        <div className="form-group">
          <button className="btn btn-success" onClick={this.handleSubmit} >Add {this.props.user}</button>
        </div>
      </form>
    );
  },
  _onChange: function(){
    this.setState(
      ClassListStore.getState()
    )
  }
});

module.exports = AddUser;