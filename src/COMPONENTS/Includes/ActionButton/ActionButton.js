import React from "react";

export default class ActionButton extends React.Component{ 

  updateNowPlayingSong = (e) =>{
      e.preventDefault();
      this.props.updateNowPlayingSongId(this.props.songId);
  }
  triggerDownload = (e) =>{
    e.preventDefault();
    this.props.updateDownloadId(this.props.songId);
    this.props.toggleOnFileIsDownloading();
    const video = document.getElementById("advideo");
    video.load();
    video.oncanplay = () =>{
      video.play();
    }
    video.onerror = (e)=>{
      console.log(e);
    }
  }   

  
  

  renderActionType = ()=>{
    const action_type = this.props.action_type;

    if(action_type === "play"){
       return <a href="#" onClick={this.updateNowPlayingSong}  className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a>
    }
    else if(action_type === "download"){
       return <a href="#" onClick={this.triggerDownload} className="m-r-sm"><i className="icon-cloud-download" /></a>
    }
    else{
    return <div></div>
    }
   
  }

  render(){
    return ( 
      this.renderActionType()
    );
     } 
}