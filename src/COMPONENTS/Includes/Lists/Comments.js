import React from "react";
import NewComment from "../NewComment/NewComment";
import Comment from "../Comment/Comment";

import api from "../../../Store/api";


export default class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            comments: []
        }
    }

    getComments = async () =>{
        const postId = this.props.postId;
        const comments = await api.createItem("/comments/get",{postId: postId, limit: 5});
        this.setState({
            comments: comments
        });
    }
    componentWillMount(){
        this.getComments();
    }
    renderComments = () =>{
        const UserInfo = this.props.UserInfo;
        const updateCounts = this.props.updateCounts;
        return this.state.comments.map(function(comment){
            if(comment.comment_type === "comment"){
            return <Comment updateCounts={updateCounts} key={comment._id} comment={comment} UserInfo={UserInfo}/>;
            }
            return 
        });
    }
    
  
    addComment = (object) =>{
        const comments = this.state.comments;
        comments.push(object);
        this.setState({
            comments: comments
        })
    }
    render(){
        return (
            <div className="coment-area">
                <ul className="we-comet">
                    {this.renderComments()}   
                    <NewComment updateCounts={this.props.updateCounts} counts={this.props.counts} addComment={this.addComment} commentInfo={this.props.commentInfo}/>
                </ul>
            </div>
        );
    }
}