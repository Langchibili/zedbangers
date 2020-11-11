import React from "react";
import api from "../../../Store/api";
import Lists from "../../Includes/Lists/Lists";

export default class ManagePostsEditPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           songs: [],
           updatedOnce: false
       }
   }

   getUserSongs = async () =>{
    const userId = this.props.UserInfo._id;
    this.setState({
      songs: await api.createItem("/posts/timeline",{userId: userId, limit: 20})// add artist songs to state
     })
  }

   componentWillMount(){    
    this.getUserSongs();
   }

   render(){
    return (
      <section className="scrollable">
           <Lists list_type="ListWithImageType" 
                edit
                items_type="song" items={this.state.songs} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
      </section>
      
    );
  } 
}