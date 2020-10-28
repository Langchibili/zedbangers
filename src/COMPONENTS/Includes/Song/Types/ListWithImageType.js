import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../ActionButton/ActionButton";

export default class ListWithImageType extends React.Component{ 
 updateNowPlayingSong = (e) =>{
        e.preventDefault();
        this.props.updateNowPlayingSongId(this.props.song._id);
  }
  render(){
    return ( 
        <li className="list-group-item clearfix">
          <ActionButton
                linkClassList = "jp-play-me pull-right m-t-sm m-l text-md"
                linkContent = {<i className="icon-control-play text" /> }
                action_type="play"
                song={this.props.song}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                 />
            <a href="#" className="pull-left thumb-sm m-r"><img src={this.props.song? this.props.song.thumbnail.small : ""} alt="..." /> 
            </a> 
            <Link to={this.props.song? "/song/"+this.props.song.title+"/"+this.props.song._id  : "#"} className="clear" >
                <span className="block text-ellipsis">{this.props.song? this.props.song.title : "untitled"}</span> <small className="text-muted"><Link to={this.props.song? "/user/"+this.props.song.userName : "#"}>by {this.props.song? this.props.song.artist.artistName : ""}</Link></small> 
            </Link> 
        </li>
    );
     } 
}