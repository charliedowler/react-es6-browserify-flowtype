/* @flow */
var React = require("react")
var {Link} = require("react-router")

var Navigation = React.createClass({
    render(): any {
        return (
            <nav>
                <Link to="comments">Comments</Link>
                <Link to="dashboard">Dashboard</Link>
            </nav>
        )
    }
})

module.exports = Navigation
