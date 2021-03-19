import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React from "react";
import api from "../../../../Store/api";

 function ArtistSelector(props) {
    const addArtist = props.addArtist;
    const removeArtist = props.removeArtist;
    const artists = props.artists;
     return (
       <div>
         <Autocomplete
           style={{width: "100%"}}
           id="tags-outlined"
           options={artists}
           onChange={(event, value, reason)=>{
            const artist = {
                artistName: value.niceName,
                artistId: value._id,
                picture_xl: value.picture.small? value.picture.small : "",
                artistUserName: value.username
            }
            addArtist(artist);
            if(reason === "remove-option"){
            removeArtist(artist);
            }
            else if(reason === "clear"){
            removeArtist("clear");
            }
           }}
           getOptionLabel={(option) => option.niceName}
           filterSelectedOptions
           renderInput={(params) => (
             <TextField
               fullWidth
               {...params}
               variant="outlined"
               margin = "normal"
               label="artists"
               placeholder="artists"
             />
           )}
         />
         
       </div>
     );
   };

export default class NotOwnSong extends React.Component{
    constructor(props){
        super(props);
        // set text as default, if this.props.initialPostObject is not set
        this.state = {
            copyrightAgreed: false,
            showSongWonershipForm: true,
            artists: [],
            artist: null,
            noneLocalArtistName: null,
            btnType: "danger",
            addingText: "Add Artist",
            showAddBtn: false,
            postRequestIsDone: false
        }
    }
    handleChange = (e)=>{
        const copyrightAgreed = e.target.checked
        if(copyrightAgreed){
            this.setState({
                copyrightAgreed: copyrightAgreed
            })
        }
    }
    showUploadForm = (e)=>{
        if(this.state.artist === null){
            return
        }
        e.preventDefault();
        this.setState({
            showSongWonershipForm: false
        }, ()=>{
            this.props.showUploadForm(this.state.copyrightAgreed, this.state.showSongWonershipForm);
            this.props.changeArtist(this.state.artist)
        })  
    }

    getArtists = async () =>{
        const artists = await api.getItems("/users","","","","","",12)
        this.setState({
            artists: artists
        }, ()=>{
            this.setState({
                postRequestIsDone: true  
            })
        })
    }
    addArtist = (artist) =>{
        console.log(artist)
        this.setState({
            artist: artist
        })
    }
    removeArtist = () =>{
        this.setState({
            artist: null
        })
    }
    setNoneLocalArtist = (e) =>{
        const noneLocalArtistName = e.target.value;
        if(noneLocalArtistName.length > 0){
            this.setState({
                showAddBtn: true
            })
        }
        else{
            this.setState({
                showAddBtn: false
            })
        }
        this.setState({
            noneLocalArtistName:noneLocalArtistName
        })
    }
    
    addNoneLocalArtist = ()=>{
        if(this.state.artist){
            return
        }
        const noneLocalArtistName = this.state.noneLocalArtistName;
        const artist = {
            isNotLocalArtist: true, 
            googleSearch: 'https://www.google.com/search?q='+noneLocalArtistName,
            artistName: noneLocalArtistName,
            picture_xl: '/files/images/blankprofile.png',
            artistUserName: noneLocalArtistName+'-unregistered'
        }
        this.props.showUploadForm(this.state.copyrightAgreed, this.state.showSongWonershipForm);
        this.setState({
            artist: artist
        }, ()=>{
            this.props.changeArtist(this.state.artist)
            this.setState({
                addingText: "Artist Added",
                btnType: "default"
            })
        })
    }
    componentDidMount(){
        this.getArtists();
    }
    render(){
    return (  
        <section style={{padding:"20px"}} className="panel panel-default"> 
            <br/><p>By selecting the option "no", you are agreeing to being subject for copyright, because you likely don't own the rights to this song. Any legal actions taken by the onwer agains't you is not our business as an online media plartform, so this is a contract between you and us stating that you have agreed to taking full responsibity for this song. Do you agree to this contract? </p>
            <div className="checkbox i-checks"> <label> <input onChange={this.handleChange} type="checkbox" /><i></i> I agree </label> </div>
            {this.state.postRequestIsDone? 
               <div><br/><span>add this song's artist</span><br/>
               <ArtistSelector artists={this.state.artists} addArtist={this.addArtist} removeArtist={this.removeArtist}/><br/><div className="form-group"> <input type="text" className="form-control" required={window.location.pathname === "/upload/song"} placeholder="Artist Full Name" onChange={this.setNoneLocalArtist} /> </div></div> : 
               <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}>wait a sec...<i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
               {this.state.showAddBtn? <button onClick={this.addNoneLocalArtist} className={"btn btn-sm btn-"+this.state.btnType}>{this.state.addingText}</button>: ""}<span>{this.state.artist? this.state.artist.artistName: ""}</span><br/>
            {this.state.copyrightAgreed && this.state.artist? <a onClick={this.showUploadForm} href="#" className="btn btn-s-md btn-danger">NEXT</a> : <a onClick={this.showUploadForm} href="#" className="btn btn-s-md btn-default">NEXT</a>}
            
            <hr/>
       </section>
        );
      } 
}