/* @flow */
var {Route, DefaultRoute, RouteHandler, Link} = ReactRouter

var App = React.createClass({
    render() {
        var i: integer = 3
        var another = i + "asd"
        return (
            <div className="container">
                <nav>
                    <Link to="root">Home</Link>
                    <Link to="comments">Comments</Link>
                    <Link to="dashboard">Dashboard</Link>
                </nav>
                <div>
                    <RouteHandler />
                </div>
            </div>
        )
    }
})

var Routes = (
    <Route handler={App} name="root" path="/">
        <DefaultRoute handler={Dashboard} name="dashboard" />
        <Route handler={Comments} name="comments" />
    </Route>
)

ReactRouter.run(Routes, ReactRouter.HistoryLocation, function(Handler) {
    React.render(<Handler />, document.getElementById("app"))
})
