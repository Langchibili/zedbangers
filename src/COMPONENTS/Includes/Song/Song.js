import React from "react";
import PlainListType from "./Types/PlainListType";
import ListWithImageType from "./Types/ListWithImageType";
import ChatType from "./Types/ChatType";
import ThumnailType from "./Types/ThumnailType";
import DivThumbnailType from "./Types/DivThumbnailType";
import DivLongThumbnailType from "./Types/DivLongThumbnailType";
import AddPlayListForm from "../AddPlayListForm/AddPlayListForm";
import { Link } from "react-router-dom";
import ExternalSiteAuthButtons from "../ExternalSiteAuthButtons/ExternalSiteAuthButtons";


export default class Song extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {
      showAddplayLisDiv: false
    }
  }
  showAddplayListModal = (e) =>{
    e.preventDefault();
    this.setState({
      showAddplayLisDiv: true
    })
  }
  hideAddplayListModal = (e) =>{
    e.preventDefault();
    this.setState({
      showAddplayLisDiv: false
    })
  }
  renderEmbed = (youtubeId, hasEmbeddedMusicVideo)=>{
    if(hasEmbeddedMusicVideo){
         return <div
            className="video"
            style={{
              position: "relative",
              paddingBottom: "56.25%" /* 16:9 */,
              paddingTop: 25,
              height: 0
            }}
          >
            <h3>Watch Video</h3>
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
              src={`https://www.youtube.com/embed/${youtubeId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
            />
          </div>
    }
  }
  renderSongType = ()=>{
    const list_type = this.props.list_type; 
    const updateNowPlayingSongId= this.props.updateNowPlayingSongId;
    const nowPlayingTrackId=this.props.nowPlayingTrackId;
    const nowfocusedSongId = this.props.nowfocusedSongId;
    const nowPlayingSongClass = this.props.nowPlayingSongClass;
    const pauseAudio = this.props.pauseAudio;
    const updateDownload= this.props.updateDownload;
    const toggleOnFileIsDownloading= this.props.toggleOnFileIsDownloading;
    const UserInfo= this.props.UserInfo;
    const song = this.props.song;
    const edit = this.props.edit;
    const del = this.props.del;
    
 const renderAddPlayListForm = ()=>{
   if(UserInfo){
       return <div style={{padding: "10px"}}><AddPlayListForm UserInfo={UserInfo} songId={song._id} songThumbnail={song.thumbnail}/></div>;
   }
   else{
      return <div style={{padding: "10px"}}><Link to="/singup"> Signup </Link>or<Link to="/login"> Login </Link> to create a playlist<hr/> <ExternalSiteAuthButtons /></div>
   }
 }   
    if(list_type === "PlainListType"){
       return <div>
            <PlainListType 
              song={song} 
              pauseAudio={pauseAudio}
              updateNowPlayingSongId={updateNowPlayingSongId}
              nowPlayingSongClass = {nowPlayingSongClass} 
              nowPlayingTrackId={nowPlayingTrackId}
              nowfocusedSongId={nowfocusedSongId}
              showAddplayListModal={this.showAddplayListModal}
              hideAddplayListModal={this.hideAddplayListModal}
              updateDownload={updateDownload}
              toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
              {this.state.showAddplayLisDiv? renderAddPlayListForm() : ""}
              {this.renderEmbed(song.embed.youtubeId, song.hasEmbeddedMusicVideo)}
            </div>
    }
    else if(list_type === "ListWithImageType"){
       return <ListWithImageType 
              edit={edit}
              del={del}
              song={song} 
              pauseAudio={pauseAudio}
              updateNowPlayingSongId={updateNowPlayingSongId}
              updateDownload={updateDownload}
              toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
    }
    else if(list_type === "ChatType"){
      return <ChatType 
             song={song} />
    }
    else if(list_type === "ThumnailType"){
       return <ThumnailType 
              song={song} 
              pauseAudio={pauseAudio}
              updateNowPlayingSongId={updateNowPlayingSongId}
              updateDownload={updateDownload}
              toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
    }
    else if(list_type === "DivThumbnailType"){
      return <DivThumbnailType
             song={song} 
             pauseAudio={pauseAudio}
             updateNowPlayingSongId={updateNowPlayingSongId}
             updateDownload={updateDownload}
             toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
   }
   else if(list_type === "DivLongThumbnailType"){
      return <DivLongThumbnailType 
             song={song} 
             pauseAudio={pauseAudio}
             updateNowPlayingSongId={updateNowPlayingSongId}
             updateDownload={updateDownload}
             toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
   }
    else{
       return <div></div>;
    }

  }

  render(){return (this.renderSongType());} 
}