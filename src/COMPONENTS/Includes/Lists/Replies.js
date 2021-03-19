import React from "react";
import Reply from "../Reply/Reply";
import NewReply from "../NewReply/NewReply";
import api from "../../../Store/api";
import Display from "../Display/Display";


export default class Replies extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            replies: [],
            toggleReplyForm: true
        }
    }
    getReplies = async () =>{
        const commentId = this.props.commentId;
        const replies = await api.createItem("/replies/get",{commentId: commentId, limit: 5});
        this.setState({
            replies: replies
        });
    }
    toggleReplyForm = (e) =>{
        e.preventDefault();
        this.setState({toggleReplyForm: true})
    }
    componentWillMount(){
        this.getReplies();
    }
    renderReplies = () =>{
        const toggleReplyForm = this.toggleReplyForm;
        return this.state.replies.map(function(reply){
            return <Reply key={reply._id} reply={reply}  toggleReplyForm={toggleReplyForm} />;
        });
    }

    addReply= (object) =>{
        const replies = this.state.replies;
        replies.push(object);
        this.setState({
            replies: replies
        })
    }
   
    render(){
        return (
            <ul>
                {this.renderReplies()}  
                <Display isVisible={this.state.toggleReplyForm}>
                  <NewReply updateCounts={this.props.updateCounts} counts = {this.props.counts} repliesInfo={this.props.repliesInfo} addReply={this.addReply}/>
                </Display> 
            </ul>
        );
    }
}