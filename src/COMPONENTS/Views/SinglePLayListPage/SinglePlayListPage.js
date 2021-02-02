import React from "react";
import api from "../../../Store/api";
import Song from "../../Includes/Song/Song";
import Lists from "../../Includes/Lists/Lists";
import PlayLists from "../../Includes/Lists/PlayLists";
import PlayList from "../../Includes/PlayList/PlayList";
import Loader from "../../Includes/Loader/Loader";

export default class SinglePlayListPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           playlist: null,
           playListSongs : [],
           currentPostUrl: this.props.match.url,
           postRequestDone: false,
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
     const playlist = await api.getItemById("/playlists", playListId, ""); // playlist object with song ids
     const playListSongs = await api.createItem("/playlists/songs", {postIds: playlist.postIds, limit: 12}); // playlist with song objects
     const morePlayLists = await api.getItems("/playlists","","music","","","",12)
     this.setState(
        {
          playlist: playlist,
          playListSongs: playListSongs
        },
        async ()=>{
          let recentSongs = await api.getItems("/posts","","music","","","",12);
          recentSongs = recentSongs.filter((song)=>{ return !playlist.postIds.includes(song._id)});
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
    if(pathArray[1] === "song" || pathArray[1] === "playlist"){
         header.className = header.className.replace("bg-white-only","bg-black lter");
    }
    else{
         header.className = header.className.replace("bg-black lter","bg-white-only");
    }
  }
  // componentWillMount(){
  //   this.changeHeaderTheme();
  // }

//    shouldComponentUpdate(){
//        return this.props.playListId === this.state.playlist._id? false : true;
//    }
   
   componentWillMount(){    
    this.changeHeaderTheme(); 
    this.getPlayList();
   }
   componentDidUpdate(prevProps){
    if(prevProps.match.url !== this.props.match.url) this.getPlayList();
   }
   render(){
    return ( 
        this.state.postRequestDone? <section className="hbox stretch bg-black dker">
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
                
                <span className="pull-right text-sm">{this.state.playlist? this.state.playlist.counts.plays : ""}
                <br />Streams
                </span> 
                
                <span className="h2 font-thin">{this.state.playlist? this.state.playlist.userNiceName : "unknown"}
                </span> 
                    </div> 
                    {this.state.playlist? <img className="img-full" src={ this.state.playlist.thumbnail? this.state.playlist.thumbnail.cover : ""} alt="song thumnail" /> : ""} 
                </div> 
                {this.state.playlist? <PlayList
                list_type="ListWithImageType" 
                items_type="songlist" playlist={this.state.playlist} 
                UserInfo={this.props.UserInfo}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                updateNowPlayingListId={this.props.updateNowPlayingListId}
                nowfocusedplayListId = {this.props.playListId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>: ""}
             {this.state.recentSongs? <Lists 
                list_type="PlainListType" 
                items_type="song" items={this.state.playListSongs} 
                UserInfo={this.props.UserInfo}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowfocusedSongId = {this.props.postId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>:""}
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
        </section>: <Loader />
     );
  } 
}