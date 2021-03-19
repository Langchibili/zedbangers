import React from "react";
import "./NewComment.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import api from "../../../Store/api";


export default class NewComment extends React.Component{
    constructor(props){
        super(props);
        this.postCommentBox = React.createRef();
        this.addComment = this.props.addComment.bind(this);
        this.updateCounts = this.props.updateCounts.bind(this);
    }
    handleActionSubmit = () =>{
        const postCommentBox = this.postCommentBox.current.value;
        const user_id = this.props.commentInfo.user_id;
        const post_id = this.props.commentInfo.post_id;
        const user_picture_xl = this.props.commentInfo.user_picture_xl;
        const user_nice_name = this.props.commentInfo.user_nice_name;
        const user_name = this.props.commentInfo.user_name;
        const post_thumbnail = this.props.commentInfo.comment_body.post_thumbnail
        const comment_body = {
            post_thumbnail: post_thumbnail,
            body: postCommentBox
        }
        if(postCommentBox.length < 0){
            return
        }
        else{
            this.setState({
                user_id: user_id,
                post_id: post_id,
                user_name: user_name,
                user_nice_name: user_nice_name,
                user_picture_xl: user_picture_xl,
                comment_body: comment_body
            }, async ()=>{
                const newComment = await api.createItem("/comments", this.state);
                this.addComment(newComment);
                const newCommentCount = await api.getItemById("/posts", post_id, "counts");
                this.updateCounts(newCommentCount.counts);
            })
        }
    }
    render(){
        return (
            <ul className="we-comet">
                <li>
                    <a href="#" title="" className="showmore underline">more comments</a>
                </li>
                <li className="post-comment">
                    <div className="comet-avatar">
                    <img src={this.props.commentInfo.user_picture_xl? this.props.commentInfo.user_picture_xl : ""} alt="author photo" />
                    </div>
                    <div className="post-comt-box">
                        <form method="post">
                            <textarea ref={this.postCommentBox} placeholder="Post your comment"></textarea>
                            {/*<div className="add-smiles">
                                <span className="em em-expressionless" title="add icon"></span>
                            </div>
                             <div className="smiles-bunch"> 
                                <i className="em em---1"></i>
                                <i className="em em-smiley"></i>
                                <i className="em em-anguished"></i>
                                <i className="em em-laughing"></i>
                                <i className="em em-angry"></i>
                                <i className="em em-astonished"></i>
                                <i className="em em-blush"></i>
                                <i className="em em-disappointed"></i>
                                <i className="em em-worried"></i>
                                <i className="em em-kissing_heart"></i>
                                <i className="em em-rage"></i>
                                <i className="em em-stuck_out_tongue"></i>
                                </div> */}
                            <IconButton onClick={this.handleActionSubmit}><SendIcon color="secondary"/></IconButton>
                        </form>	
                    </div>
                </li>
            </ul>
        );
    }
}