import React from "react";
import PlainListType from "./Types/PlainListType";
import ListWithImageType from "./Types/ListWithImageType";
import ThumnailType from "./Types/ThumnailType";

export default class Song extends React.Component{ 

  renderSongType = ()=>{
    const list_type = this.props.list_type; 
    const updateNowPlayingSongId= this.props.updateNowPlayingSongId;
    const updateDownloadId= this.props.updateDownloadId;
    const toggleOnFileIsDownloading= this.props.toggleOnFileIsDownloading;
    const song = this.props.song;
    
    if(list_type === "PlainListType"){
       return <PlainListType 
              song={song} 
              updateNowPlayingSongId={updateNowPlayingSongId} 
              updateDownloadId={updateDownloadId}
              toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
    }
    else if(list_type === "ListWithImageType"){
       return <ListWithImageType 
              song={song} 
              updateNowPlayingSongId={updateNowPlayingSongId}
              updateDownloadId={updateDownloadId}
              toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
    }
    else if(list_type === "ThumnailType"){
       return <ThumnailType 
              song={song} 
              updateNowPlayingSongId={updateNowPlayingSongId}
              updateDownloadId={updateDownloadId}
              toggleOnFileIsDownloading={toggleOnFileIsDownloading}/>
    }
    else{
       return <div></div>;
    }

  }

  render(){return (this.renderSongType());} 
}