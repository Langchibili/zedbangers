import React from "react";
import Embed from "../Embed/Embed";
import Song from "../Song/Song";

export default class Lists extends React.Component{ 
   

  renderPostType = ()=>{
    const list_type = this.props.list_type; 
    const items_type = this.props.items_type; 
    const updateNowPlayingSongId = this.props.updateNowPlayingSongId;
    const nowPlayingTrackId= this.props.nowPlayingTrackId;
    const nowfocusedSongId = this.props.nowfocusedSongId;
    const updateDownload= this.props.updateDownload;
    const toggleOnFileIsDownloading= this.props.toggleOnFileIsDownloading;
    const pauseAudio = this.props.pauseAudio;
    const UserInfo= this.props.UserInfo;
    const items = this.props.items;
    const edit = this.props.edit;
    const del = this.props.del;

    return items.map((item)=>{ 
         if(items_type === "song"){
            return <Song 
                    edit={edit}
                    del={del}
                    song={item} 
                    key={item._id} list_type={list_type} 
                    UserInfo={UserInfo}
                    pauseAudio={pauseAudio}
                    updateNowPlayingSongId={updateNowPlayingSongId}
                    nowPlayingTrackId={nowPlayingTrackId}
                    nowfocusedSongId={nowfocusedSongId}
                    updateDownload={updateDownload}
                    toggleOnFileIsDownloading={toggleOnFileIsDownloading}
                    />
         }
         else if(items_type === "embed"){
            return <div>
                    <Embed 
                      post={item}
                      key={item._id} 
                      UserInfo={UserInfo}/>
                  </div>
         }
         else if(items_type === "video"){
          return <div></div>
       }
         else{
           return <div></div>
         }
    });
   
  }

  render(){
    return ( 
        this.props.divListType? this.renderPostType() : <ul className="list-group list-group-lg no-radius no-border no-bg m-t-n-xxs m-b-none auto"> {this.renderPostType()}</ul>
    );
     } 
}