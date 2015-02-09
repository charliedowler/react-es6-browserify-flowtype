/* @flow */
var React = require("react")
var Router = require("react-router")
var {Route, DefaultRoute, RouteHandler, Link} = Router

var Main = require("./main.jsx")
var Navigation = require("./navigation.jsx")
var Dashboard = require("./dashboard.jsx")
var Comments = require("./comments/comments.jsx")

module.exports = (
    <Route handler={Main} path="/">
        <DefaultRoute handler={Dashboard} name="dashboard"/>
        <Route handler={Comments} name="comments"/>
    </Route>
)
