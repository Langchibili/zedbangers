import React from "react";

export default class ActionButton extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {
      showPauseBtn: false
    }
  }
  updateNowPlayingSong = (e) =>{
      e.preventDefault();
      this.props.updateNowPlayingSongId(this.props.song._id);
      this.setState({
        showPauseBtn: true
      })
  }

  updateNowPlayingList = (e) =>{
    e.preventDefault();
    this.props.updateNowPlayingListId(this.props.playlist._id);
}
  
  pauseAudio = (e)=>{
    e.preventDefault();
    document.getElementsByTagName("audio")[0].pause();
    this.setState({
      showPauseBtn: false
    })
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
    const pauseLinkContent = this.props.pauseLinkContent;
     
    if(action_type === "play"){
       return this.state.showPauseBtn? 
       <a href="#" onClick={this.pauseAudio}  className={linkClassList? linkClassList: "" }> {pauseLinkContent} </a> : <a href="#" onClick={this.updateNowPlayingSong}  className={linkClassList? linkClassList: "" }> {linkContent} </a>
    }
    else if(action_type === "play list"){
      return <a href="#" onClick={this.updateNowPlayingList}  className={linkClassList? linkClassList: "" }> {linkContent} </a>
    }
    else if(action_type === "download"){
       return <a href="#" onClick={this.triggerDownload} className="m-r-sm"><i className="icon-cloud-download" /></a>
    }
    else if(action_type === "info"){
      return <a href="#" onClick={this.props.showPostInfo} className="m-r-sm"><i className="icon-info"></i></a>
   }
    else if(action_type === "add"){
      return <a href="#" onClick={this.props.showAddplayListModal} className="m-r-sm"><i className="icon-plus"></i></a>
   }
   else{
     return <div></div>
   }
   
  }
  // shouldComponentUpdate(prevProps, nextState){
  //     this.props.song?  this.props.song._id === this.props.nowPlayingTrackId && this.state.showPauseBtn : true
  // }
  // componentDidUpdate(){
  //   if(this.props.song){
  //     if(this.props.song._id === this.props.nowPlayingTrackId){
  //       this.setState({
  //         showPauseBtn: true
  //       })
  //     }
  //   }
  // }
  render(){
    return ( 
      this.renderActionType()
    );
  } 
}