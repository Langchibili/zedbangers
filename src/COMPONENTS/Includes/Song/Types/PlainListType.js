import React from "react";
import ActionButton from "../../ActionButton/ActionButton";

export default class PlainListType extends React.Component{ 
   
  
  render(){
    return ( 
        <li className="list-group-item"> 
            <div className="pull-right m-l"> 
            <ActionButton
                action_type="download"
                song={this.props.song}
                updateDownload={this.props.updateDownload}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading} /> 
             <a href="#"><i className="icon-plus" /></a> 
            </div> 
            <ActionButton
                linkClassList = "jp-play-me m-r-sm pull-left"
                linkContent = {<i className="icon-control-play text" /> }
                action_type="play"
                song={this.props.song}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                 />  
            
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