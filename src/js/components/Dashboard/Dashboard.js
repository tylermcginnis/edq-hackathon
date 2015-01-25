var React = require('react');
var Class = require('./Class');
var DashboardActions = require('../../actions/DashboardActions');
var DashboardStore = require('../../stores/DashboardStore');
var UserStore = require('../../stores/UserStore');

var Dashboard = React.createClass({
  getInitialState: function(){
    return {
      classes: DashboardStore.getState().classes,
      newClass: ''
    }
  },
  handleChange: function(e){
    this.setState({
      newClass: e.target.value
    });
  },
  handleSubmit: function(){
    DashboardActions.addClass({name: this.state.newClass});
    this.setState({
      newClass: ''
    })
  },
  removeClass: function(index, name){
    DashboardActions.removeClass(index, name, UserStore.getState().user.email);
  },
  componentDidMount: function(){
    DashboardStore.addChangeListener(this._onChange);
    DashboardActions.getClasses(UserStore.getState().user.email);
  },
  componentWillUnmount: function(){
    DashboardStore.removeChangeListener(this._onChange)
  },
  render: function(){
    var list = this.state.classes.map(function(klass, index){
      return (
        <Class info={klass} index={index} removeClass={this.removeClass}/>
      )
    }.bind(this));
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4 card">
            <form>
              <div className="form-group">
                <label>Class Name</label>
                <input type="text" className="form-control" placeholder="Class Name" value={this.state.newClass} onChange={this.handleChange}/>
              </div>
              <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
            </form>
          </div>
          {list}
        </div>
      </div>
    )
  },
  _onChange: function(){
    this.setState(DashboardStore.getState())
  }
});

module.exports = Dashboard;