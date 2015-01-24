var React = require('React');
var App = require('../components/App');
var ClassList = require('../components/ClassList/ClassList')
var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

module.exports = (
  <Route name="app" path="/" handler={App}>
    <Route name="classList" handler={ClassList} />
  </Route>
);