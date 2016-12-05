import axios from 'axios';

import React from 'react';

class CommentForm extends React.Component{
  render(){
    return (
        <form  onSubmit={this._handleSubmit.bind(this)}>
            <h3>Join the discussion is great!</h3>
            <div>
              <input placeholder="Name:" ref={(input) => this._codeNames= input} />
              <textarea placeholder="Comment:" ref={(textarea) => this._altText = textarea}></textarea>
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

    let codeNames = this._codeNames;
    let altText = this._altText;

    this.props.addComment(codeNames.value, altText.value);
  }
}

class Comment extends React.Component{
  render(){
    return(
      <div className="comment" >
        <h4>{this.props.codeNames}</h4>
        <p>{this.props.altText}</p>
        <a>Delete Comment</a>
      </div>
    );
  }
}

class CommentBox extends React.Component{
  
  constructor() {
    super();

    this.state = {
      showComments: false,
      comments: []
    };


  }

  componentWillMount(){
    this._fetchComments();
  }

  render(){
    let comments = this._getComments();
    console.log("come " + comments)
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

  componentDidMount(event){
    event.preventDefault();
    this._timer = setInterval(() => this._fetchComments(), 5000);

  }

  componentWillUnmount(){
    clearInterval(this._timer);
  }

  _fetchComments(){
/*    jQuery.ajax({
      url: 'https://www.freecodecamp.com/json/cats.json',
      method: 'GET',
      //dataType: 'xml/html/script/json/jsonp',
      //data: {param1: 'value1'},
      complete: function(xhr, textStatus) {
        //called when complete
      },
      success: (comments) => {
        //called when successful
        this.setState({ comments })
      },
      error: function(xhr, textStatus, errorThrown) {
        //called when there is an error
      }
    });*/
    //http://cors-anywhere.herokuapp.com/
    axios.get('https://www.freecodecamp.com/json/cats.json').then(
        commentss => {
        //called when successful
        const comments = commentss.data;
        this.setState({ comments })
      }
      )
    

  }

  _getComments(){
   
    return this.state.comments.map((comment)=>{
    
      return (
          <Comment 
            codeNames={comment.codeNames[0]} 
            altText={comment.altText} 
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

  _addComment(codeNames, altText){
     console.log("codeNames " + codeNames);
    const comment = {
      id: this.state.comments.length+1,
      codeNames,
      altText
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