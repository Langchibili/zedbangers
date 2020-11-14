import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../ActionButton/ActionButton";

export default class DivThumbnailType extends React.Component{ 
    updateNowPlayingSong = (e) =>{
        e.preventDefault();
        this.props.updateNowPlayingSongId(this.props.song._id);
    }
  render(){
    return ( 
        <div className="col-xs-6 col-sm-3">

            <div className="item">

            <div className="pos-rlt">

                <div className="item-overlay opacity r r-2x bg-black">
                
                <div className="center text-center m-t-n"> 
                    <ActionButton
                    action_type="play"
                    song={this.props.song}
                    linkContent = {<i className="icon-control-play i-2x"></i> }
                    pauseLinkContent = {<i className="icon-control-pause i-2x"></i> }
                    pauseAudio={this.props.pauseAudio}
                    updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                    nowPlayingTrackId={this.props.nowPlayingTrackId}
                    />  
                </div>
                </div> <a href="#"><img src={this.props.song? this.props.song.thumbnail.medium : ""} alt="" className="r r-2x img-full" /></a>
            </div>

            <div className="padder-v"> <Link to={this.props.song? "/song/"+this.props.song.title+"/"+this.props.song._id  : "#"} className="text-ellipsis">{this.props.song? this.props.song.title : ""}</Link> <Link to={this.props.song? "/user/"+this.props.song.userName : "#"} className="text-ellipsis text-xs text-muted">{this.props.song? this.props.song.artist.artistName : ""}</Link>
            </div>
            </div>
        </div>
    );
    } 
}










