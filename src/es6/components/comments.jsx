var Comments = React.createClass({
    getInitialState() {
        return {
            comments: []
        }
    },
    addNew(comment) {
        var comments = [].concat(this.state.comments, comment)
        this.setState({
            comments: comments
        })
    },
    render() {
        return (
            <div>
                <h1>Comments</h1>
                <AddComment addNewComment={this.addNew} />
                <ListComments comments={this.state.comments} />

                <RouteHandler />
            </div>
        )
    }
})
