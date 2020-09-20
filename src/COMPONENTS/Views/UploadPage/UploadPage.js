import React from "react";
import NewSongForm from "./NewSongForm/NewSongForm";
import NewVideoForm from "./NewVideoForm/NewVideoForm";
import api from "../../../Store/api";

export default class UploadPage extends React.Component{
    constructor(props){
        super(props);
        // set text as default, if this.props.initialPostObject is not set
        this.state = {
              post_type: this.props.post_type === "song"? "music" : "video",
              postingText: "post",
              showTitleBox: false,
              buttonState: {backgroundColor: "lightgrey",disabled:true}
        }
      //   this.addUserInfo();
        this.postBox = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderFormType = this.renderFormType.bind(this);
     }

     renderFormType(addPhotoFunction, addAudioFunction, addVideoFunction, addGenre, removeGenre, toggleLyricsType){
         if(this.props.post_type === "song"){
          return <NewSongForm 
                 addPhoto={addPhotoFunction} 
                 addAudio={addAudioFunction}
                 addGenre={addGenre}
                 removeGenre={removeGenre} 
                 toggleLyricsType={toggleLyricsType} 
                 />;
        }
         else {
          return <NewVideoForm addPhoto={addPhotoFunction} addVideo={addVideoFunction}/>;
         }
     }
     componentWillMount(){
      // set initial uploading user state   
      this.addUserInfo();
     }


     addUserInfo = () =>{
      let updatedStated = {
          ...this.state,
          title: "untitled",
          genres: [],
          description: "",
          short_description: "",
          isExplicit: false,
          artist: {
              artistName: this.props.UserInfo.niceName,
              artistId: this.props.UserInfo._id,
              picture_xl: this.props.UserInfo.picture.small? this.props.UserInfo.picture.small : "",
              artistUserName: this.props.UserInfo.username
          },
          author: {
              authorName: this.props.UserInfo.niceName,
              authorId: this.props.UserInfo._id,
              picture_xl: this.props.UserInfo.picture.small? this.props.UserInfo.picture.small : "",
              authorUserName: this.props.UserInfo.username
          },
          categories: ["music"],
          userName: this.props.UserInfo.username,
          userId: this.props.UserInfo._id,
          userFullName: this.props.UserInfo.niceName
      }
      this.setState(updatedStated, ()=>{ console.log(this.state)});
     }

    
      
      handleChange = ()=>{
          const description = this.postBox.current.value;
          const userName = this.state.userName;
          if(description.length > 0 && userName){
              let updatedStated;
              updatedStated = {
                  ...this.state,
                  description: description,
                  buttonState: {backgroundColor:"#cd0829",disabled:false}
              }
              this.setState(updatedStated);
          }
      }

      setTitle = (e)=>{
          const userName = this.state.userName;
          const title = e.target.value;
          if(title.length > 0 && userName){
              let updatedStated = {
                  ...this.state,
                  title: title,
                  buttonState: {backgroundColor:"#cd0829",disabled:false}
              }
              this.setState(updatedStated);
          }
      }

      addPhoto = (photoObject) =>{
           this.setState({
               thumbnail: photoObject
           })
      }
      addAudio = (audioObject) =>{
          this.setState({
              track: audioObject
          })
     }
     addVideo = (videoObject) =>{
          this.setState({
              video: videoObject.video,
              thumbnail: videoObject.image
          })
     }
     
     addGenre = (genre) => {
          const initialState = this.state.genres;
          if(initialState.includes(genre)){
              return;
          }
          else{
              initialState.push(genre)
              this.setState({
                  genres: initialState
              }, ()=>{ console.log(this.state)})
          }
     }


     removeGenre = (genreValuesLeft) => {
      if(genreValuesLeft === "clear"){
          this.setState({
              genres: []
          })
      }
      else{
          this.setState({
              genres: genreValuesLeft
          })
      } 
    }
     
     toggleLyricsType  = (value) =>{
         this.setState({
             isExplicit: value
         })
     }

      handleSubmit(e){
          e.preventDefault();
          const description = this.postBox.current.value;
          let shortDescription;
          if(description.length > 120){
              let cutDescription = description.substring(0,101);
              shortDescription = cutDescription + "...";
          }
          let updatedStated = {
              ...this.state,
              description: description,
              postingText: "posting...",
              short_description: shortDescription ? shortDescription : description
          }
          this.setState(updatedStated, async ()=>{
              //post data to api
              let stateObjectclone = Object.assign({}, this.state);
              delete stateObjectclone.buttonState; // remove buttonstate property from state 
              delete stateObjectclone.postingText; // remove postingText property from state 
              if(this.state.post_type === "video"){
              delete stateObjectclone.artist; // remove artist property from state if song
              delete stateObjectclone.genres; // remove genres property from state if song
              delete stateObjectclone.isExplicit; // remove artist property from state if song
              delete stateObjectclone.featuredArtists; // remove genres property from state if song
              }
              const newPost = await api.createItem("/posts",stateObjectclone);
              if(newPost){this.setState({postingText: "done",buttonState: {backgroundColor: "lightgrey",disabled:true}})}
          })        
     }

   render(){
    return (   
        <section className="panel panel-default"> 

        <header className="panel-heading font-bold">Upload {this.props.post_type === "song"? "Song" : "Video" }</header> 
        
        <div className="panel-body"> 
        
        <form role="form"> 
        
        <div className="form-group">
        <input type="text" className="form-control" placeholder="title" onChange={this.setTitle} /> 
        </div> 
        {this.renderFormType(this.addPhoto, this.addAudio, this.addVideo, this.addGenre, this.removeGenre, this.toggleLyricsType)}
        <textarea id="editor" onChange={this.handleChange} ref={this.postBox} className="form-control" style={{overflow: 'scroll', height: '150px', maxHeight: '150px'}} placeholder={this.props.post_type === "song"? "about song..." : "about video..." } />
        <br/>
        <button className="btn btn-sm btn-default" onClick={this.handleSubmit} disabled={this.state.buttonState.disabled} style={{backgroundColor: this.state.buttonState.backgroundColor, color:"white !important", fontWeight:"bold"}}>{this.state.postingText}</button>
        </form> 
        </div> 
       </section>
        );
      } 
}