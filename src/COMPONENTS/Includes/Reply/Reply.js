import React from "react";
import "./Reply.css";
import { Link } from "react-router-dom";


export default class Reply extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
                <li>
                    <div className="comet-avatar">
                    <img src={this.props.reply.user_picture_xl} alt="" />
                    </div>
                    <div className="we-comment">
                        <div className="coment-head">
                            <Link to={"/"+this.props.reply.user_name || ""}>{this.props.reply.user_nice_name? this.props.reply.user_nice_name : "unkown commenter"}</Link>
                            <span>{this.props.reply.date.uploadedDate + " " +this.props.reply.date.uploadedTime}</span>
                            <a onClick={this.toggleReplyForm} className="we-reply" href="#" title="Reply"><i className="fa fa-reply"></i></a>
                        </div>
                        <p>{this.props.reply.reply_body.body || "this reply is blank"}</p>
                    </div>
                </li>
        );
    }
}