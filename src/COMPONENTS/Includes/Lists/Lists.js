import React from "react";
import Song from "../Song/Song";

export default class Lists extends React.Component{ 
   

  renderPostType = ()=>{
    const list_type = this.props.list_type; 
    const items_type = this.props.items_type; 
    const updateNowPlayingSongId= this.props.updateNowPlayingSongId;
    const updateDownloadId= this.props.updateDownloadId;
    const toggleOnFileIsDownloading= this.props.toggleOnFileIsDownloading;
    const items = this.props.items;

    return items.map((item)=>{ 
         if(items_type === "song"){
            return <Song 
                    song={item} 
                    key={item._id} list_type={list_type} 
                    updateNowPlayingSongId={updateNowPlayingSongId}
                    updateDownloadId={updateDownloadId}
                    toggleOnFileIsDownloading={toggleOnFileIsDownloading}
                    />
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
        <ul className="list-group list-group-lg no-radius no-border no-bg m-t-n-xxs m-b-none auto"> 
           {this.renderPostType()}
        </ul>
    );
     } 
}