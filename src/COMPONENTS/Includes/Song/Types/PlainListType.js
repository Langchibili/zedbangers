import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../ActionButton/ActionButton";

export default class PlainListType extends React.Component{ 
  constructor(props){
      super(props);
      this.state = {
        showPostInfo: false
      }
  } 
  showPostInfo = (e)=>{
     e.preventDefault();
      this.setState({
        showPostInfo: true
      })
  }
  nowfocusedSongStyles = {
    backgroundColor: "#66023c !important"
  }
  
  render(){
    console.log(this.props.nowfocusedSongId)
    return ( 
        <li className="list-group-item" style={this.props.nowfocusedSongId === this.props.song._id? this.nowfocusedSongStyles: {}}> 
            <div className="pull-right m-l"> 
            <ActionButton
                action_type="download"
                song={this.props.song}
                updateDownload={this.props.updateDownload}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading} /> 
             <ActionButton
                action_type="add"
                showAddplayListModal={this.props.showAddplayListModal}
            /> 
            <ActionButton
                action_type="info"
                showPostInfo={this.showPostInfo}
            /> 
            </div> 
            <span className="text-muted m-r-sm pull-left" style={{fontWeight: "900 !important", fontSize: "14px !important", color:"#66023c !important"}}> {this.props.song? this.props.song.counts.plays+" " : ""} </span> 
            <ActionButton
                linkClassList = "jp-play-me m-r-sm pull-left"
                linkContent = {<i className="icon-control-play text" /> }
                pauseLinkContent = {<i className="icon-control-pause text"></i> }
                action_type="play"
                song={this.props.song}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                 /> 
            <div className="clear text-ellipsis"> 
            <Link to={this.props.song? "/song/"+this.props.song.title+"/"+this.props.song._id  : "#"}>
            <span>{this.props.song? this.props.song.title : "untitled"}
            </span> 
            </Link>
            </div> 
    {this.state.showPostInfo? <div className="song-description" style={{padding: "10px"}}>{this.props.song? this.props.song.description: ""}<br/>Full Title: {this.props.song.title}</div>: ""}
        </li> 
    );
     } 
}