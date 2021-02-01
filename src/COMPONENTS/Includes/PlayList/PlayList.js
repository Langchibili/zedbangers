import React from "react";
import PlainListType from "./Types/PlainListType";
import ListWithImageType from "./Types/ListWithImageType";
import ChatType from "./Types/ChatType";
import ThumnailType from "./Types/ThumnailType";
import DivThumbnailType from "./Types/DivThumbnailType";
import DivLongThumbnailType from "./Types/DivLongThumbnailType";
import AddPlayListForm from "../AddPlayListForm/AddPlayListForm";
import { Link } from "react-router-dom";


export default class PlayList extends React.Component{ 
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
  renderSongType = ()=>{
    const list_type = this.props.list_type; 
    const updateNowPlayingSongId= this.props.updateNowPlayingSongId;
    const nowPlayingTrackId=this.props.nowPlayingTrackId;
    const nowfocusedSongId = this.props.nowfocusedSongId;
    const nowPlayingListId = this.props.nowPlayingListId;
    const updateNowPlayingListId = this.props.updateNowPlayingListId;
    const pauseAudio = this.props.pauseAudio;
    const updateDownload= this.props.updateDownload;
    const toggleOnFileIsDownloading= this.props.toggleOnFileIsDownloading;
    const UserInfo= this.props.UserInfo;
    const playlist= this.props.playlist;
    const edit = this.props.edit;
    const del = this.props.del;
 const renderAddPlayListForm = ()=>{
//    if(UserInfo){
//        return <div style={{padding: "10px"}}><AddPlayListForm UserInfo={UserInfo} songId={song._id}/></div>;
//    }
//    else{
//       return <div style={{padding: "10px"}}><Link to="/singup"> Signup </Link>or<Link to="/login"> Login </Link> to create a playlist</div>
//    }
 }   
    if(list_type === "PlainListType"){
       return <div>
            <PlainListType 
              pauseAudio={pauseAudio}
              updateNowPlayingSongId={updateNowPlayingSongId} 
              nowPlayingTrackId={nowPlayingTrackId}
              nowfocusedSongId={nowfocusedSongId}
              showAddplayListModal={this.showAddplayListModal}
              hideAddplayListModal={this.hideAddplayListModal}
              updateDownload={updateDownload}
              toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
              {/* {this.state.showAddplayLisDiv? renderAddPlayListForm() : ""} */}
            </div>
    }
    else if(list_type === "ListWithImageType"){
       return <ListWithImageType 
              edit={edit}
              del={del}
              pauseAudio={pauseAudio}
              updateNowPlayingSongId={updateNowPlayingSongId}
              updateDownload={updateDownload}
              nowPlayingListId={nowPlayingListId}
              updateNowPlayingListId={updateNowPlayingListId}
              playlist={playlist}
              toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
    }
    else if(list_type === "ChatType"){
      return <ChatType 
              playlist={playlist} />
    }
    else if(list_type === "ThumnailType"){
       return <ThumnailType 
              pauseAudio={pauseAudio}
              updateNowPlayingSongId={updateNowPlayingSongId}
              updateDownload={updateDownload}
              toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
    }
    else if(list_type === "DivThumbnailType"){
      return <DivThumbnailType
             pauseAudio={pauseAudio}
             updateNowPlayingSongId={updateNowPlayingSongId}
             updateDownload={updateDownload}
             toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
   }
   else if(list_type === "DivLongThumbnailType"){
      return <DivLongThumbnailType 
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