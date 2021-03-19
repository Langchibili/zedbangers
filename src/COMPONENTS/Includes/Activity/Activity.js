import React from "react";
import { Link } from "react-router-dom";

export default class Activity extends React.Component{
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
        renderActivity = () =>{
            if(this.props.displayType === "full"){
                return( 
                    <li>
                        <Link to={this.props.activity.otherUserName || "/#"}>
                         <figure><img src={this.props.activity.user_picture_xl} alt="" /></figure>
                        </Link>
                        <div className="notifi-meta">
                            <Link to={"/posts/#"}>
                                <p>{this.props.activity.description.body}</p>
                                <span>at {this.props.activity.date.uploadedTime + " "+ this.props.activity.date.uploadedDate}</span>
                            </Link>
                        </div>
                        <i className="del fa fa-close"></i>
                    </li>
                 );
            }
            else{
                return( 
                    <li style={this.customStyles.li}>
                        <Link to={"/"+this.props.activity.otherUserName || "#"}> <img src={this.props.activity.user_picture_xl} alt="" /> </Link>
                        <div className="mesg-meta" style={this.customStyles.mesgmeta}>
                            <Link to={"post/"+this.props.activity.postId || "#"}>
                                <h6>{this.props.activity.userNiceName || "unknown user"}</h6>
                                <span style={this.customStyles.span}>{this.props.activity.description.body}</span>
                                <i style={this.customStyles.i}>at {this.props.activity.date.uploadedTime + " "+ this.props.activity.date.uploadedDate}</i>
                            </Link>
                        </div>
                        <span className="tag green">New</span>
                    </li>
                 );
            }
        }
        render(){
           return(this.renderActivity()) 
        }
}



                               
