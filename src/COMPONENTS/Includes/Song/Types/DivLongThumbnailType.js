import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../ActionButton/ActionButton";

export default class DivLongThumbnailType extends React.Component{ 
    updateNowPlayingSong = (e) =>{
        e.preventDefault();
        this.props.updateNowPlayingSongId(this.props.song._id);
    }
  render(){
    return ( 
        <div className="col-xs-6 col-sm-4 col-md-3 col-lg-2">

            <div className="item">

            <div className="pos-rlt">

            <div className="item-overlay opacity r r-2x bg-black">
            <div className="text-info padder m-t-sm text-sm"> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star"></i> <i className="fa fa-star-o text-muted"></i>
            </div>
            <div className="center text-center m-t-n"> 
            <ActionButton
                action_type="play"
                song={this.props.song}
                linkContent = {<i className="icon-control-play i-2x"></i> }
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                 />  
            </div>
            <div className="bottom padder m-b-sm"> <a href="#" className="pull-right"> <i className="fa fa-heart-o"></i> </a> <a href="#"> <i className="fa fa-plus-circle"></i> </a>
            </div>
            </div>
            <div className="top">
            <span className="pull-right m-t-n-xs m-r-sm text-white"> <i className="fa fa-bookmark i-lg"></i>
            </span>
            </div> <a href="#"><img src={this.props.song? this.props.song.thumbnail.medium : ""} alt="" className="r r-2x img-full" /></a>
            </div>

            <div className="padder-v"> <Link to={this.props.song? "/song/"+this.props.song.title+"/"+this.props.song._id : "#"} className="text-ellipsis">{this.props.song? this.props.song.title : ""}</Link> <Link to={this.props.song? "/user/"+this.props.song.artist.userName : "#"} className="text-ellipsis text-xs text-muted">{this.props.song? this.props.song.artist.userName : ""}</Link>
            </div>
        </div>
     </div>
    );
    } 
}







