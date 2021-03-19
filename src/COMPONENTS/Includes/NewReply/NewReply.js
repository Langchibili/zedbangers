import React from "react";
import "./NewReply.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import api from "../../../Store/api";


export default class NewReply extends React.Component{
    constructor(props){
        super(props);
        this.postCommentBox = React.createRef();
        this.addReply = this.props.addReply.bind(this);
        this.updateCounts = this.props.updateCounts.bind(this);
    }
    handleActionSubmit = () =>{
        const postCommentBox = this.postCommentBox.current.value;
        const post_id = this.props.repliesInfo.post_id;
        const user_id = this.props.repliesInfo.user_id;
        const comment_id = this.props.repliesInfo.comment_id;
        const user_picture_xl = this.props.repliesInfo.user_picture_xl;
        const user_nice_name = this.props.repliesInfo.user_nice_name;
        const user_name = this.props.repliesInfo.user_name;
        const post_thumbnail = this.props.repliesInfo.reply_body.post_thumbnail
        const reply_body = {
            body: postCommentBox,
            post_thumbnail: post_thumbnail
        }
        console.log(this.props.repliesInfo)
        if(postCommentBox.length < 0){
            return
        }
        else{
            this.setState({
                user_id: user_id,
                post_id: post_id,
                comment_id: comment_id,
                user_name: user_name,
                user_nice_name: user_nice_name,
                user_picture_xl: user_picture_xl,
                reply_body: reply_body
            }, async ()=>{
                const newReply = await api.createItem("/replies", this.state);
                this.addReply(newReply);
                const newReplyCount = await api.getItemById("/posts", post_id, "counts");
                this.updateCounts(newReplyCount.counts)
            })
        }
    }
    render(){
        return (
            <div>
                <div>
                    <a href="#" title="" className="showmore underline">more replies</a>
                </div>
                <li className="post-comment">
                    <div className="comet-avatar">
                    <img src={this.props.repliesInfo.user_picture_xl? this.props.repliesInfo.user_picture_xl : ""} alt="author photo" />
                    </div>
                    <div className="post-comt-box">
                        <form method="post">
                            <textarea ref={this.postCommentBox} placeholder="Reply"></textarea>
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
                            </div>
                           */}
                            <IconButton onClick={this.handleActionSubmit}><SendIcon color="secondary"/></IconButton>
                        </form>	
                    </div>
                </li>
            </div>
        );
    }
}