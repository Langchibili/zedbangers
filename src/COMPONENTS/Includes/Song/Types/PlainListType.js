import React from "react";

export default class PlainListType extends React.Component{ 
   updateNowPlayingSong = (e) =>{
        e.preventDefault();
        this.props.updateNowPlayingSongId(this.props.song._id);
  }
  
  render(){
    return ( 
        <li className="list-group-item"> 
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" onClick={this.updateNowPlayingSong}  className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Faucibus dolor auctor
            </span> 
            
            <span className="text-muted"> -- 02:55
            </span> 
            </div> 
        </li> 
    );
     } 
}