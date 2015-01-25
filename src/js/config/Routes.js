var React = require('React');
var App = require('../components/App');
var ClassList = require('../components/ClassList/ClassList');
var Registration = require('../components/Auth/Registration');
var Settings = require('../components/UserSettings/Settings');
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

console.log(Settings)

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="registration" handler={Registration} />
    <Route name="classList" handler={ClassList} />
    <Route name='settings' handler={Settings} />
  </Route>
);