var AddComment = React.createClass({
    propTypes: {
        addNewComment: React.PropTypes.func.isRequired
    },
    getInitialState() {
        return {
            comment: ""
        }
    },
    updateComment(event) {
        this.setState({
            comment: event.target.value
        })
    },
    addComment() {
        this.props.addNewComment(this.state.comment)
        this.setState({
            comment: ""
        })
    },
    render() {
        return (
            <div>
                <h2>Add new comment</h2>
                <textarea value={this.state.comment} onChange={this.updateComment} cols="40" rows="5" placeholder="Your comment here..."></textarea>
                <div>
                    <button onClick={this.addComment}>Add comment</button>
                </div>
            </div>
        )
    }
})
