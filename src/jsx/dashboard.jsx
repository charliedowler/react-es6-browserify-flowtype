/* @flow */
var React = require("react")
var {RouteHandler} = require("react-router")

var Dashboard = React.createClass({
    render(): any {
        return (
            <div>
                <h1>Dashboard</h1>

                <RouteHandler />
            </div>
        )
    }
})

module.exports = Dashboard
