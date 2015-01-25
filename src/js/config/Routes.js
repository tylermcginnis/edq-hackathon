var React = require('React');
var App = require('../components/App');
var ClassList = require('../components/ClassList/ClassList');
var Registration = require('../components/Auth/Registration');
var Login = require('../components/Auth/Login');
var Dashboard = require('../components/Dashboard/Dashboard');
var Settings = require('../components/UserSettings/Settings');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;


module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="registration" handler={Registration} />
    <Route name="dashboard" handler={Dashboard} />
    <Route name="classList" handler={ClassList} />
    <Route name='settings' handler={Settings} />
    <Route name='login' handler={Login} />
  </Route>
);