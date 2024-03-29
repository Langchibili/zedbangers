import React from "react";
import api from "../../../Store/api";
import Song from "../../Includes/Song/Song";
import Lists from "../../Includes/Lists/Lists";
import { Redirect } from "react-router-dom";
import Loader from "../../Includes/Loader/Loader";
import "./SinglePostPage.css";

export default class SinglePostPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           post: null,
           songs: [],
           currentPostUrl: this.props.match.url,
           postRequestDone: false,
           recentSongs: [],
           updatedOnce: false
       }
   }

   getPost = async () =>{
    const postId = this.props.postId;
    if(!postId){
      return
    }
    else{
     const post = await api.getItemById("/posts", postId, " ");
     this.setState(
        {
          post: post 
        },
        ()=>{
            //const songs = this.state.songs;
            //songs.push(this.state.post) // add current song
            this.setState({
               // songs: songs,
                postRequestDone: true
            },
            async ()=>{
                const song = this.state.songs[0];
                const userId = this.state.post.userId;
                let moresongs = await api.createItem("/posts/timeline",{userId: userId, limit: 20})// add artist more songs to state
                moresongs = moresongs.filter((song)=>{ return postId !== song._id});
               // moresongs.unshift(song) // remove this curent song id, add it only to the beginning and add more songs to songs list
                this.setState({
                    songs: moresongs // remove this curent song id and add more songs to songs list
                },
                  async ()=>{
                    let recentSongs = await api.getItems("/posts","","music","","","",12);
                    recentSongs = recentSongs.filter((song)=>{ return postId !== song._id});
                    this.setState({
                        recentSongs: recentSongs
                    }) // more songs, recent songs
                })
            } 
           )
        } 
     );
    }
  }

  changeBottonNavTheme = ()=>{
    const BottomNav = document.querySelector(".bottom-nav .white-theme");
    const pathArray  = window.location.pathname.split("/");
    if(pathArray[1] === "song"){
         BottomNav.className = BottomNav.className.replace("white-theme","black-theme");
    }
    else{
         BottomNav.className = BottomNav.className.replace("black-theme","white-theme");
    }
  }
  changeHeaderTheme = () =>{
    const header = document.getElementById("header");
    const pathArray  = window.location.pathname.split("/");
    // this.changeBottonNavTheme();
    if(pathArray[1] === "song"){
         header.className = header.className.replace("bg-white-only","bg-black lter");
    }
    else{
         header.className = header.className.replace("bg-black lter","bg-white-only");
    }
  }
  componentWillMount(){
    this.changeHeaderTheme();
    this.getPost();
  }
  componentDidMount(){
    this.props.logUrl();
  }
  componentDidUpdate(prevProps){
    if(prevProps.match.url !== this.props.match.url) {
      this.props.logUrl();
      this.getPost();
    }
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
                
                <span className="pull-right text-sm">{this.state.post? this.state.post.counts.downloads : ""}
                <br />Downloads
                </span> 
                
                <span className="h2 font-thin">{this.state.post? this.state.post.artist.artistName : "unknown"}
                </span> 
                    </div> <img className="img-full" src={this.state.post? this.state.post.thumbnail.cover : ""} alt="song thumnail" />  
                </div> 
                <Song
                list_type="PlainListType" 
                items_type="song" song={this.state.post} 
                UserInfo={this.props.UserInfo}
                nowPlayingSongClass = "list-group-item now-play-song"
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowfocusedSongId = {this.props.postId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
                <Lists 
                list_type="PlainListType" 
                items_type="song" items={this.state.songs} 
                UserInfo={this.props.UserInfo}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowfocusedSongId = {this.props.postId}
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
        </section>: <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>
     );
  } 
}