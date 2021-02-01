import React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from "../../../Store/api";
import Loader from "../Loader/Loader";
import './AddPlayListForm.css';

function PlaylistSelector(props) {
   const selectPlaylist = props.selectPlaylist;
   const playlists = props.playlists;
   const unselectPlaylist = props.unselectPlaylist;
    return (
      <div>
        <Autocomplete
          style={{width: "100%"}}
          id="tags-outlined"
          options={playlists}
          onChange={(event, value, reason)=>{
            selectPlaylist(value);
            if(reason === "remove-option"){
                unselectPlaylist();
            }
            else if(reason === "clear"){
                unselectPlaylist();
            }
          }}
          getOptionLabel={(option) => option.playlistName}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              variant="outlined"
              margin = "normal"
              label="playlists"
              placeholder="playlists"
            />
          )}
        />
        
      </div>
    );
  };



export default class AddPlayListForm extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                playlistName: null,
                thumbnail: null,
                playLists: [],
                playlistsExist: false,
                selectedPlaylist: null,
                numberOfPlaylists: 0,
                postingText: "ADD NEW PLAYLIST",
                updatingText: "ADD SONG TO PLAYLIST",
                buttonState: {backgroundColor: "lightgrey",disabled:true},
                button2State: {backgroundColor: "lightgrey",disabled:true},
                requestDone: false
            }
        }
        getPlaylists = async ()=>{
            const userId = this.props.UserInfo._id;
            const playLists =  await api.createItem("/playlists/timeline",{userId: userId, limit: 20})// add artist songs to state 
            console.log(playLists);
            this.setState({
                playLists: playLists
            },()=>{
                const playlistsCount = this.state.playLists.length;
                this.setState({
                    numberOfPlaylists: playlistsCount,
                    requestDone: true
                })
            })
        }
        selectPlaylist = (playlist)=>{
            if(!playlist){ return;}
            if(playlist.postIds.includes(this.props.songId)){ return; }
            this.setState({
                button2State: {backgroundColor:"#cd0829",disabled:false}
            })
            playlist.postIds.push(this.props.songId);
            playlist.thumbnail = this.props.songThumbnail;
            // playlist.userName = this.props.UserInfo.username; 
            // playlist.userNiceName = this.props.UserInfo.niceName; 
            this.setState({
                selectedPlaylist: playlist
            })
        }
        unselectPlaylist = ()=>{
           this.setState({
               selectPlaylist: null
           })
        }
        updatePlaylist = async (e)=>{
            e.preventDefault();
            this.setState({
                updatingText: "UPDATING PLAYLIST...",
            })
            if(this.state.selectedPlaylist){
                const updatedPlaylistResponse = await api.updateItem("/playlists",this.state.selectedPlaylist,this.state.selectedPlaylist._id);
                if(updatedPlaylistResponse){
                    this.setState({
                        button2State: {backgroundColor: "lightgrey",disabled:true},
                        updatingText: "done",
                    })
                }
            }
        }
        
        setPlaylistTitle = (e)=>{
            const playlistName = e.target.value;
            if(playlistName.length > 0){
                let updatedStated = {
                    ...this.state,
                    playlistName: playlistName,
                    buttonState: {backgroundColor:"#cd0829",disabled:false}
                }
                this.setState(updatedStated);
            }
        }
        addPlaylist = async (e)=>{
            e.preventDefault();
            const newPlayList = {
                playlistName: this.state.playlistName,
                userName: this.props.UserInfo.username,
                userNiceName: this.props.UserInfo.niceName,
                userId: this.props.UserInfo._id,
                playlist_type: "music",
                user_picture_xl: this.props.UserInfo.picture.small
            }
            this.setState({
                postingText: "ADDING PLAYLIST...",
            })
            const newPlaylistResponse = await api.createItem("/playlists",newPlayList);
            if(newPlaylistResponse){
                const playLists = this.state.playLists;
                playLists.push(newPlaylistResponse);
                this.setState({
                       playLists: playLists
                },()=>{ this.setState({
                       buttonState: {backgroundColor: "lightgrey",disabled:true},
                       postingText: "done",
                       numberOfPlaylists: playLists.length
                })})
            }
        }
       componentWillMount(){
           this.getPlaylists();
       }

        render(){
            return(
                this.state.requestDone?  
                  <div className="playlist-form-wrapper">
                    <span className="num-of-playlists-found"> 
                       <strong>{this.state.numberOfPlaylists}</strong> Playlists Found
                    </span> <hr/>
                    {this.state.numberOfPlaylists > 0? 
                    <div><p>Select playlist to add song into.</p>
                    <PlaylistSelector 
                     selectPlaylist = {this.selectPlaylist}
                     playlists = {this.state.playLists}
                     unselectPlaylist = {this.unselectPlaylist}
                     />
                     <button className="btn btn-sm btn-danger" onClick={this.updatePlaylist} disabled={this.state.button2State.disabled} style={{backgroundColor: this.state.button2State.backgroundColor, color:"#fff", fontWeight:"bold"}}>{this.state.updatingText}</button>
                      <hr/></div>: ""}
                     <p>Add new playlist.</p>
                     <div className="form-group">
                        <input type="text" className="form-control" placeholder="title" onChange={this.setPlaylistTitle} /> 
                     </div> 
                     <div><button className="btn btn-sm btn-danger" onClick={this.addPlaylist} disabled={this.state.buttonState.disabled} style={{backgroundColor: this.state.buttonState.backgroundColor, color:"#fff", fontWeight:"bold"}}>{this.state.postingText}</button></div><br/>
                     <div><button className="btn btn-sm btn-danger" onClick={this.props.hideAddplayListModal}>done</button></div>
                  </div>:
                <Loader basicType loaderContent="loading..."/>
            );
        }
}
