import React from "react";
import { Link } from "react-router-dom";

export default class Notification extends React.Component{
        customStyles = {
            li: {
                borderBottom: "1px solid #e1e8ed",
                padding: "10px",
                display: "inline-block",
                position:" relative"
            },   
            mesgmeta: {
                display: "inline-block",
                paddingLeft: "10px",
                verticalAlign: "middle",
                width: "81%"
            },
            span: {
                fontSize:"13px",
                display:"inline-block",
                marginBottom:"2px"
            },
            i:{
                fontSize:"12px",
                display:"inline-block"
            }
        }
        renderNotification = () =>{
            if(this.props.displayType === "full"){
                return( 
                    <li>
                        <Link to={this.props.notification.otherUserName || "/#"}>
                         <figure><img src={this.props.notification.user_picture_xl} alt="" /></figure>
                        </Link>
                        <div className="notifi-meta">
                            <Link to={"/posts/#"}>
                                <p>{this.props.notification.description.body}</p>
                                <span>at {this.props.notification.date.uploadedTime + " "+ this.props.notification.date.uploadedDate}</span>
                            </Link>
                        </div>
                        <i className="del fa fa-close"></i>
                    </li>
                 );
            }
            else{
                return( 
                    <li style={this.customStyles.li}>
                        <Link to={"/"+this.props.notification.otherUserName || "#"}> <img src={this.props.notification.user_picture_xl} alt="" /> </Link>
                        <div className="mesg-meta" style={this.customStyles.mesgmeta}>
                            <Link to={"post/"+this.props.notification.postId || "#"}>
                                <h6>{this.props.notification.userNiceName || "unknown user"}</h6>
                                <span style={this.customStyles.span}>{this.props.notification.description.body}</span>
                                <i style={this.customStyles.i}>at {this.props.notification.date.uploadedTime + " "+ this.props.notification.date.uploadedDate}</i>
                            </Link>
                        </div>
                        <span className="tag green">New</span>
                    </li>
                 );
            }
        }
        render(){
           return(this.renderNotification()) 
        }
}



                               
