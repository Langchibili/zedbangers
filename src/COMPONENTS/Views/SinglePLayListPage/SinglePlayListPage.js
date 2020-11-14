import React from "react";
import api from "../../../Store/api";
import Song from "../../Includes/Song/Song";
import Lists from "../../Includes/Lists/Lists";
import PlayLists from "../../Includes/Lists/PlayLists";

export default class SinglePlayListPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           playlist: [],
           recentSongs: []
        //    playlists: [],
        //    updatedOnce: false
       }
   }

   getPlayList = async () =>{
    const playListId = this.props.playListId;
    if(!playListId){
      return
    }
    else{
     const playlistObject = await api.getItemById("/playlists", playListId, " "); // playlist object with song ids
     const playlist = await api.createItem("/playlists/songs", {postIds: playlistObject.postIds, limit: 12}); // playlist with song objects

     this.setState(
        {
          playlist: playlist 
        },
        async ()=>{
          let recentSongs = await api.getItems("/posts","","music","","","",12);
          recentSongs = recentSongs.filter((song)=>{ return !playlistObject.postIds.includes(song._id)});
          this.setState({
              recentSongs: recentSongs
          }) // more songs, recent songs
        }
        //,
        // ()=>{
        //     const songs = this.state.songs;
        //     songs.push(this.state.playlist) // add current song
        //     this.setState({
        //         songs: songs
        //     },
        //     async ()=>{
        //         const song = this.state.songs[0];
        //         const userId = this.state.playlist.userId;
        //         let moresongs = await api.createItem("/playlists/timeline",{userId: userId, limit: 5})// add artist more songs to state
        //         moresongs = moresongs.filter((song)=>{ return playListId !== song._id});
        //         moresongs.unshift(song) // remove this curent song id, add it only to the beginning and add more songs to songs list
        //         this.setState({
        //             songs: moresongs // remove this curent song id and add more songs to songs list
        //         },
        //           async ()=>{
        //             let recentSongs = await api.getItems("/song","","music","","","",12);
        //             recentSongs = recentSongs.filter((song)=>{ return playListId !== song._id});
        //             this.setState({
        //                 recentSongs: recentSongs
        //             }) // more songs, recent songs
        //         })
        //     } 
        //    )
        // } 
     );
    }
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
  }

//    shouldComponentUpdate(){
//        return this.props.playListId === this.state.playlist._id? false : true;
//    }
   
   componentWillMount(){    
    this.changeHeaderTheme(); 
    this.getPlayList();
   }

   render(){
    return ( 
        <section className="hbox stretch bg-black dker">
            <aside className="col-sm-5 no-padder" id="sidebar"> <section className="vbox animated fadeInUp"> <section className="scrollable"> 

                <div className="m-t-n-xxs item pos-rlt"> 
                
                <div className="top text-right"> 
                
                <span className="musicbar bg-success bg-empty inline m-r-lg m-t" style={{width: '25px', height: '30px'}}> 
                
                <span className="bar1 a3 lter" /> 
                
                <span className="bar2 a5 lt" /> 
                
                <span className="bar3 a1 bg" /> 
                
                <span className="bar4 a4 dk" /> 
                
                <span className="bar5 a2 dker" /> 
                </span> 
                </div> 
                
                <div className="bottom gd bg-info wrapper-lg"> 
                
                <span className="pull-right text-sm">{this.state.playlist? this.state.playlist.length : ""}
                <br />Songs
                </span> 
                
                <span className="h2 font-thin">{this.state.playlist? this.state.playlist.userNiceName : "unknown"}
                </span> 
                    </div> <img className="img-full" src={this.state.playlist? this.state.playlist[0].thumbnail.cover : ""} alt="song thumnail" />  
                </div> 
                <PlayLists 
                list_type="ListWithImageType" 
                items_type="songlist" items={this.state.playlist} 
                UserInfo={this.props.UserInfo}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowfocusedplayListId = {this.props.playListId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
            </section> 
            </section>
        </aside>
        <section className="col-sm-4 no-padder bg">
            <section className="vbox">
                <section className=" scrollable hover">
                <Lists list_type="ListWithImageType" 
                items_type="song" items={this.state.recentSongs} 
                UserInfo={this.props.UserInfo}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
            </section>
            </section>
        </section>
        </section>
     );
  } 
}