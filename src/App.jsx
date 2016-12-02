import React from 'react';

class CommentForm extends React.Component{
  render(){
    return (
        <form  onSubmit={this._handleSubmit.bind(this)}>
            <h3>Join the discussion is great!</h3>
            <div>
              <input placeholder="Name:" ref={(input) => this._author = input} />
              <textarea placeholder="Comment:" ref={(textarea) => this._body = textarea}></textarea>
            </div>
            <div>
              <button type="submit">
                Post comment
              </button>
            </div>
        </form>
      )
  };

  _handleSubmit(event){
    event.preventDefault();

    let author = this._author;
    let body = this._body;

    this.props.addComment(author.value, body.value);
  }
}

class Comment extends React.Component{
  render(){
    return(
      <div className="comment" >
        <h4>{this.props.author}</h4>
        <p>{this.props.body}</p>
      </div>
    );
  }
}

class CommentBox extends React.Component{
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: [
        {id:1, author:"Melissa Ramirez", body:"Great picture!Great picture!Great picture!Great picture!Great picture!Great picture!"},
        {id:2, author:"Cesar Pino", body:"Excellent stuff"}
      ]
    };
  }

  render(){
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show Comments';

    if (this.state.showComments){
      //code for displaying comments
      buttonText = 'Hide Comments';
      commentNodes = <div> {comments} </div>;
    }
    const commentsTitle = this._getCommentsTitle(comments.length);
    return(
      <div>
          <CommentForm addComment={this._addComment.bind(this)} />
          <h3>{ commentsTitle }</h3>
          <button onClick={this._handleClick.bind(this)}>{ buttonText }</button>
          { commentNodes }
      </div>
    );
  }
  _getComments(){
   
    return this.state.comments.map((comment)=>{
      return (
          <Comment 
            author={comment.author} 
            body={comment.body} 
            key={comment.id}/>
        );
    });
  }

  _getCommentsTitle(commentCount){
    if (commentCount === 0) {
      return "No Comments yet";
    } else if (commentCount === 1){
      return "1 Comment";
    } else {
      return ` ${commentCount} Comments`;
    }
  }

  _addComment(author, body){
     console.log("author " + author);
    const comment = {
      id: this.state.comments.length+1,
      author,
      body
    }
    this.setState({ comments: this.state.comments.concat([comment])});
  }

  _handleClick(){
    this.setState({
      showComments: !this.state.showComments
    })
  }
}

export default CommentBox;