/* @flow */
var React = require("react")
var {RouteHandler} = require("react-router")
var AddComment = require("./addComment.jsx")
var ListComments = require("./listComments.jsx")

type State = {
    comments: Array<any>
}

var Comments = React.createClass({
    getInitialState(): State {
        return {
            comments: []
        }
    },
    addNew(comment: any) {
        var comments = [].concat(this.state.comments, comment)
        this.setState({
            comments: comments
        })
    },
    render(): any {
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

module.exports = Comments
