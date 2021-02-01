import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../ActionButton/ActionButton";
import Lists from "../../Lists/Lists";
import api from "../../../../Store/api";

export default class ListWithImageType extends React.Component{ 
  constructor(props){
    super(props);
}
  // updateNowPlayingList = (e) =>{
  //       e.preventDefault();
  //       this.props.updateNowPlayingListId(this.props.playlist._id);
  // }
 
  renderListLink = ()=>{
    const edit = this.props.edit;
    const del = this.props.del;
    if(edit){
      return <Link to={this.props.playlist? "/playlist/edit/"+this.props.playlist.playlistName+"/"+this.props.playlist._id  : "#"} className="clear" >
      <span className="block text-ellipsis">{this.props.playlist? this.props.playlist.playlistName : "untitled"}</span> <small className="text-muted"><Link to={this.props.playlist? "/user/"+this.props.playlist.userName : "#"}>List by {this.props.playlist? this.props.playlist.userNiceName : ""}</Link></small> 
     </Link>
    }
    else if(del){
      return <Link to={this.props.playlist? "/playlist/delete/"+this.props.playlist.playlistName+"/"+this.props.playlist._id  : "#"} className="clear" >
      <span className="block text-ellipsis">{this.props.playlist? this.props.playlist.playlistName : "untitled"}</span> <small className="text-muted"><Link to={this.props.playlist? "/user/"+this.props.playlist.userName : "#"}>List by {this.props.playlist? this.props.playlist.userNiceName : ""}</Link></small> 
     </Link>
    }
    else{
      return <Link to={this.props.playlist? "/playlist/"+this.props.playlist.playlistName+"/"+this.props.playlist._id  : "#"} className="clear" >
      <span className="block text-ellipsis">{this.props.playlist? this.props.playlist.playlistName : "untitled"}</span> <small className="text-muted"><Link to={this.props.playlist? "/user/"+this.props.playlist.userName : "#"}>List by {this.props.playlist? this.props.playlist.userNiceName : ""}</Link></small> 
     </Link>
    }
      
  }
  render(){
    return ( 
        <li className="list-group-item clearfix">
          {/* <ActionButton
                linkClassList = "jp-play-me pull-right m-t-sm m-l text-md"
                linkContent = {<i className="icon-control-play text" /> }
                pauseLinkContent = {<i className="icon-control-pause text"></i> }
                action_type="play"
                playlist={this.props.playlist}
                updateNowPlayingListId={this.props.updateNowPlayingListId}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                 /> */}
                 <ActionButton
                linkClassList = "pull-right m-r"
                linkContent = {<><i class="icon-playlist icon text-success-lter"></i> 
                                        <b class="badge bg-success dker pull-right">{this.props.playlist.postIds.length}</b>
                                        <span>PlayAll</span> </>}
                action_type="play list"
                playlist={this.props.playlist}
                updateNowPlayingListId={this.props.updateNowPlayingListId}
                 />
          <Link to={this.props.playlist? "/playlist/"+this.props.playlist.playlistName+"/"+this.props.playlist._id  : "#"} className="pull-left thumb-sm m-r"><img src={this.props.playlist.thumbnail? this.props.playlist.thumbnail.small : ""} alt="..." /> </Link>   
          {/* <Link to={this.props.playlist? "/playlist/"+this.props.playlist.playlistName+"/"+this.props.playlist._id  : "#"} className="pull-right m-r">
            
          </Link> */}
          {this.renderListLink()}
          {/* <Lists
                list_type="PlainListType" 
                items_type="song" items={this.state.posts} 
                UserInfo={this.props.UserInfo}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowfocusedSongId = {this.props.postId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/> */}
        </li>
    );
     } 
}