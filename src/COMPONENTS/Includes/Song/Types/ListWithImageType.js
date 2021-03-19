import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../ActionButton/ActionButton";

export default class ListWithImageType extends React.Component{ 
 updateNowPlayingSong = (e) =>{
        e.preventDefault();
        this.props.updateNowPlayingSongId(this.props.song._id);
  }

  renderPostLink = ()=>{
    const edit = this.props.edit;
    const del = this.props.del;
    if(edit){
      return <Link to={this.props.song? "/post/edit/"+this.props.song.dashed_title+"/"+this.props.song._id  : "#"} className="clear" >
      <span className="block text-ellipsis">{this.props.song? this.props.song.title : "untitled"}</span> <small className="text-muted"><Link to={this.props.song? "/user/"+this.props.song.artist.artistUserName : "#"}>by {this.props.song? this.props.song.artist.artistName : ""}</Link></small> 
     </Link>
    }
    else if(del){
      return <Link to={this.props.song? "/post/delete/"+this.props.song.dashed_title+"/"+this.props.song._id  : "#"} className="clear" >
      <span className="block text-ellipsis">{this.props.song? this.props.song.title : "untitled"}</span> <small className="text-muted"><Link to={this.props.song? "/user/"+this.props.song.artist.artistUserName  : "#"}>by {this.props.song? this.props.song.artist.artistName : ""}</Link></small> 
     </Link>
    }
    else{
      return <Link to={this.props.song? "/song/"+this.props.song.dashed_title+"/"+this.props.song._id  : "#"} className="clear" >
      <span className="block text-ellipsis">{this.props.song? this.props.song.title : "untitled"}</span> <small className="text-muted"><Link to={this.props.song? "/user/"+this.props.song.artist.artistUserName  : "#"}>by {this.props.song? this.props.song.artist.artistName : ""}</Link></small> 
     </Link>
    }
      
  }
  render(){
    return ( 
        <li className="list-group-item clearfix">
          <ActionButton
                linkClassList = "jp-play-me pull-right m-t-sm m-l text-md"
                linkContent = {<i className="icon-control-play text" /> }
                pauseLinkContent = {<i className="icon-control-pause text"></i> }
                action_type="play"
                song={this.props.song}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                pauseAudio={this.props.pauseAudio}
                 />
          <Link to={this.props.song? "/song/"+this.props.song.dashed_title+"/"+this.props.song._id  : "#"} className="pull-left thumb-sm m-r"><img src={this.props.song? this.props.song.thumbnail.small : ""} alt="..." /> </Link>   
          {this.renderPostLink()}
        </li>
    );
     } 
}