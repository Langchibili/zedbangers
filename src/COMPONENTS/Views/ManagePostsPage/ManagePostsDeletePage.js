import React from "react";
import api from "../../../Store/api";
import Lists from "../../Includes/Lists/Lists";

export default class ManagePostsDeletePage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           songs: [],
           postRequestDone: false
       }
   }

   getUserSongs = async () =>{
    const userId = this.props.UserInfo._id;
    this.setState({
      songs: await api.createItem("/posts/timeline",{userId: userId, limit: 20})// add artist songs to state
     }, ()=>{
       this.setState({
        postRequestDone: true
       })
     })
  }
  changeHeaderTheme = () =>{
    const header = document.getElementById("header");
    const pathArray  = window.location.pathname.split("/");
    if(pathArray[1] === "song"){
         header.className = header.className.replace("bg-white-only","bg-black lter");
    }
    else{
         header.className = header.className.replace("bg-black lter","bg-white-only");
    }
  }
  componentWillMount(){
    this.changeHeaderTheme();
    this.getUserSongs();
  }
  componentDidMount(){
    this.props.logUrl();
  }
   render(){
    return (
      <section className="scrollable">
           {this.state.postRequestDone? <Lists list_type="ListWithImageType" 
                del
                items_type="song" items={this.state.songs} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/> :  <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
      </section>
      
    );
  } 
}