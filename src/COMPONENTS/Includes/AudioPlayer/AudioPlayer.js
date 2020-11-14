import React from "react";
import "./AudioPlayer";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import api from "../../../Store/api";


export default class AudioPlayer extends React.Component{
    constructor(props){
      super(props);
      this.audioinstance = null
      this.state = {
        playList: [],
        playedSongs: [],
        clearPriorAudioLists: false
      }
    }

      
    options = {
      autoPlay: false,
      showDownload: false,
      showMediaSession : true
    }
    getDefaultPlaylist = async ()=>{
      const songs = await api.getItems("/posts","","music","","","",10);
      this.setState({
        playList: songs.map((song)=>{ return { key: song._id, musicSrc: song.track.uri_path, name: song.title, singer: song.artist.artistName, cover: song.thumbnail.medium}})
      })
    }

    addSongToPlaylist = async (nowPlayingSongId)=>{
        if(nowPlayingSongId){
          const song = await api.getItemById("/posts", nowPlayingSongId, "");
          const playList = this.state.playList;
          this.setState({
            clearPriorAudioLists: true,
            playList: [{key: song._id, musicSrc: song.track.uri_path, name: song.title, singer: song.artist.artistName, cover: song.thumbnail.medium},...playList]
          }, 
          ()=>{
            this.audioinstance.oncanplay = () =>{ 
              this.audioinstance.play();
            }
            this.audioinstance.onerror = (e)=>{
              this.audioinstance.load();
              this.audioinstance.oncanplay = () =>{
                this.audioinstance.play();
              }
              console.log(e);
            }
          }
          )
        }
        else{ 
          return
        }
    }
    logPlay = async (track)=>{
      const songId = track.key;
      const playedSongs = this.state.playedSongs;
      this.props.nowPlayingTrackId(track.key);
      if(playedSongs.includes(songId)){ return }
      const song = await api.getItemById("/posts", songId, ""); // get song once over
      document.getElementsByTagName("title")[0].innerText = song.title+" | "+song.artist.artistName;
      if(song){ 
        const user = await api.getItemByUsername("/users",song.userName,""); // get song owner
        if(!user.plays.includes(song._id)){
          song.counts.unique_plays = song.counts.unique_plays + 1; // update song's unique_play count
          user.plays.push(song._id); //push song id into song owner's play array only if not there before
          user.counts.unique_plays = user.counts.unique_plays + 1; // update song owner's unique_play count
        }
        user.counts.plays = user.counts.plays + 1; // update song owner's play count
        if(user){
          const updatedUser = await api.updateItem("/users",user,user._id); // update user's document
          if(updatedUser){
            song.counts.plays = song.counts.plays + 1; // update song's play count
            const updatedSong = await api.updateItem("/posts",song,song._id); // post counts
            const playedSongs = this.state.playedSongs;
            playedSongs.push(song._id)
            this.setState({
              playedSongs: playedSongs
            })
          }
        }
      } 
    }
    pauseAudio = ()=>{
      if(this.props.pauseAudio){
        this.audioinstance.pause();
      }
    }
    componentWillReceiveProps(nextProps){
      if(this.props.nowPlayingSongId != nextProps.nowPlayingSongId){
        this.addSongToPlaylist(nextProps.nowPlayingSongId); //update list then
      }
    }
    componentWillUpdate(){
      this.pauseAudio();
    }

    componentDidMount(){
      this.getDefaultPlaylist();
    }
    
    render(){   
        return(
        <div>
                <ReactJkMusicPlayer 
                onAudioPlay={this.logPlay}
                 defaultPosition = {{right: "0", bottom: "0"}}
                {...this.options} 
                clearPriorAudioLists = {this.state.clearPriorAudioLists}
                playIndex = {0}
                audioLists = {this.state.playList}
                getAudioInstance = {(instance) => {this.audioinstance = instance}}
               />
        </div>
        );
    }
}
