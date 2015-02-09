/* @flow */
var React = require("react")
var Navigation = require("./navigation.jsx")
var {RouteHandler} = require("react-router")

var Main = React.createClass({
    render(): any {
        return (
            <div className="container">
                <Navigation/>
                <main>
                    <RouteHandler/>
                </main>
            </div>
        )
    }
})

module.exports = Main
