import React from "react";

export default class ActionButton extends React.Component{ 

  updateNowPlayingSong = (e) =>{
      e.preventDefault();
      this.props.updateNowPlayingSongId(this.props.song._id);
  }
  triggerDownload = (e) =>{
    e.preventDefault();
    const downloadObject = {}
    downloadObject.title = this.props.song.title;
    downloadObject.file = this.props.song.track;
    this.props.updateDownload(downloadObject);
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
    const linkClassList = this.props.linkClassList;
    const linkContent = this.props.linkContent;
     
    if(action_type === "play"){
       return <span href="#" onClick={this.updateNowPlayingSong}  className={linkClassList? linkClassList: "" }> {linkContent} </span>
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