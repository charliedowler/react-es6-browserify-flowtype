var ListComments = React.createClass({
    propTypes: {
        comments: React.PropTypes.array.isRequired
    },
    render() {
        var allComments = this.props.comments.map((comment) =>
            <div>{comment}</div>
        )
        return (
            <div>
                <h2>All Comments</h2>
                {allComments}
            </div>
        )
    }
})
