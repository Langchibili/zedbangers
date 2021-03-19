import React from "react";
import "./Comment.css";
import Replies from "../Lists/Replies";
import { Link } from "react-router-dom";

export default class Comment extends React.Component{
    constructor(props){
        super(props);
    }
    updateCounts = (updatedCountsObject) =>{
        this.setState({
            counts : updatedCountsObject
        })
    }
    repliesInfo = {
        reply_body: this.props.comment.comment_body,
        user_id: this.props.UserInfo._id,
        post_id: this.props.comment.post_id,
        comment_id: this.props.comment._id,
        user_picture_xl: this.props.UserInfo.picture.small,
        user_nice_name: this.props.UserInfo.niceName,
        user_name: this.props.UserInfo.username
    }
    render(){
        return (
            <li>
                <div className="comet-avatar">
                 <img src={this.props.comment.user_picture_xl} alt="" />
                </div>
                <div className="we-comment">
                    <div className="coment-head">
                        <Link to={"/"+this.props.comment.user_name || ""}>{this.props.comment.user_nice_name ? this.props.comment.user_nice_name : "unknown commenter"}</Link>
                        <span>{this.props.comment.date.uploadedDate + " " +this.props.comment.date.uploadedTime}</span>
                        <a className="we-reply" href="#" title="Reply"><i className="fa fa-reply"></i></a>
                    </div>
                    <p>{this.props.comment.comment_body? this.props.comment.comment_body.body :  "this comment is blank"}</p>
                </div>
                <Replies updateCounts={this.props.updateCounts} commentId={this.props.comment._id} repliesInfo={this.repliesInfo}/>
            </li>
        );
    }
}