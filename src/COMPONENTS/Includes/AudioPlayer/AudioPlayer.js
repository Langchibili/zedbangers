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
        clearPriorAudioLists: false
      }
    }

      
    options = {
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
      console.log(track);
      const songId = track.key;
      const song = await api.getItemById("/posts", songId, ""); // get song once over
      if(song){ 
        const user = await api.getItemByUsername("/users",song.userName,""); // get song owner
        user.plays.push(song._id); //push song id into song owner's play array
        user.counts.plays += user.counts.plays; // update song owner's play count
        if(user){
          const updatedUser = await api.updateItem("/users",user,user._id); // update user's document
          if(updatedUser){
            song.counts.plays += song.counts.plays; // update song's play count
            const updatedSong = await api.updateItem("/posts",user,song._id); // post counts
            if(updatedSong){console.log("song play logged");}
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
                // onAudioPlay={this.logPlay}
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
