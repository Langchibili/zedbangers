import React from "react";
import ActionButton from "../../ActionButton/ActionButton";

export default class PlainListType extends React.Component{ 
   
  
  render(){
    return ( 
        <li className="list-group-item"> 
            <div className="pull-right m-l"> 
            <ActionButton
                action_type="download"
                songId={this.props.song._id}
                updateDownloadId={this.props.updateDownloadId}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading} /> 
             <a href="#"><i className="icon-plus" /></a> 
            </div> 
            <ActionButton
                action_type="play"
                songId={this.props.song._id}
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