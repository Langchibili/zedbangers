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
      autoPlay: false,
      showMediaSession : true
    }
    getDefaultPlaylist = async ()=>{
      const songs = await api.getItems("/posts","","music","","","",10);
      this.setState({
        playList: songs.map((song)=>{ return { musicSrc: song.track.uri_path, name: song.title, singer: song.artist.artistName, cover: song.thumbnail.medium}})
      })
    }

    addSongToPlaylist = async (nowPlayingSongId)=>{
        if(nowPlayingSongId){
          const song = await api.getItemById("/posts", nowPlayingSongId, "");
          const playList = this.state.playList;
          this.setState({
            clearPriorAudioLists: true,
            playList: [{musicSrc: song.track.uri_path, name: song.title, singer: song.artist.artistName, cover: song.thumbnail.medium},...playList]
          }, 
          ()=>{
            this.audioinstance.oncanplay = () =>{ 
              this.audioinstance.play();
            }
          }
          )
        }
        else{ 
          return
        }
    }
    componentWillReceiveProps(nextProps){
      if(this.props.nowPlayingSongId != nextProps.nowPlayingSongId){
        this.addSongToPlaylist(nextProps.nowPlayingSongId); //update list then
      }
    }

    componentDidMount(){
      this.getDefaultPlaylist();
    }
    
    render(){   
        return(
        <div>
                <ReactJkMusicPlayer 
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
