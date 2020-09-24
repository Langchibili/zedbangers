import React from "react";
import PlainListType from "./Types/PlainListType";
import ListWithImageType from "./Types/ListWithImageType";
import ThumnailType from "./Types/ThumnailType";

export default class Song extends React.Component{ 

  renderSongType = ()=>{
    const list_type = this.props.list_type; 
    const updateNowPlayingSongId= this.props.updateNowPlayingSongId;
    const song = this.props.song;
    
    if(list_type === "PlainListType"){
       return <PlainListType song={song} updateNowPlayingSongId={updateNowPlayingSongId}/>
    }
    else if(list_type === "ListWithImageType"){
       return <ListWithImageType song={song} updateNowPlayingSongId={updateNowPlayingSongId}/>
    }
    else if(list_type === "ThumnailType"){
       return <ThumnailType song={song} updateNowPlayingSongId={updateNowPlayingSongId}/>
    }
    else{
       return <div></div>;
    }

  }

  render(){return (this.renderSongType());} 
}