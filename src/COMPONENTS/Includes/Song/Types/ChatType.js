import React from "react";
import { Link } from "react-router-dom";

export default class ChatType extends React.Component{ 

  render(){
    return ( 
        <li className="list-group-item clearfix">
          <span className="pull-right h2 text-muted m-l">1</span>
          <Link to={this.props.song? "/song/"+this.props.song.dashed_title+"/"+this.props.song._id  : "#"} className="pull-left thumb-sm m-r"><img src={this.props.song? this.props.song.thumbnail.small : ""} alt="..." /> </Link>   
          <Link to={this.props.song? "/song/"+this.props.song.dashed_title+"/"+this.props.song._id  : "#"} className="clear" >
           <span className="block text-ellipsis">{this.props.song? this.props.song.title : "untitled"}</span> <small className="text-muted"><Link to={this.props.song? "/user/"+this.props.song.userName : "#"}>by {this.props.song? this.props.song.artist.artistName : ""}</Link></small> 
          </Link>
        </li>
    );
     } 
}