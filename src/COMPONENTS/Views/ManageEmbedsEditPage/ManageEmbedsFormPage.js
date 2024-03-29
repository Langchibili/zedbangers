import React from "react";
import api from "../../../Store/api";
import { Link } from "react-router-dom";

export default class ManageEmbedsEditFormPage extends React.Component{
    constructor(props){
        super(props);
        // set text as default, if this.props.initialPostObject is not set
        this.state = {
              postingText: "update",
              showTitleBox: false,
              post_link: null,
              buttonState: {backgroundColor: "lightgrey",disabled:true}
        }
      //   this.addUserInfo();
        this.postBox = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
     //   this.renderFormType = this.renderFormType.bind(this);
     }
     
     getPost = async ()=>{ 
        const post = await api.getItemById("/posts", this.props.postId);
        this.setState({
            ...post,
            postingText: "update",
            showTitleBox: false,
            buttonState: {backgroundColor: "lightgrey",disabled:true}
        })
     }

    //  renderFormType(addPhotoFunction, addAudioFunction, addVideoFunction, addGenre, removeGenre, toggleLyricsType){
    //      if(this.state.post_type === "music"){
    //       return <NewSongForm 
    //              addPhoto={addPhotoFunction} 
    //              addAudio={addAudioFunction}
    //              addGenre={addGenre}
    //              removeGenre={removeGenre} 
    //              toggleLyricsType={toggleLyricsType} 
    //              />;
    //     }
    //      else {
    //       return <NewVideoForm addPhoto={addPhotoFunction} addVideo={addVideoFunction}/>;
    //      }
    //  }
    
     componentDidMount(){
        this.getPost();
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

      handleEmbed = (e) =>{
        let linkSplit = ''; // initalize empty string
        let embedLinkEnd = "" // initalize empty string
        let youtubeId =  "" // initalize empty string
        let linkIndexInSplit = 0; // initalize empty number
        const embed = {}; // initialize empty embed object
        let embedLink = e.target.value;
        const isWatchTypeLink = embedLink.includes("watch");
        if(isWatchTypeLink){
            linkSplit = embedLink.split("=");
            linkIndexInSplit = linkSplit.length - 1;
            embedLinkEnd = linkSplit[linkIndexInSplit];
            youtubeId = embedLinkEnd;
            embed.embedUri = 'https://www.youtube.com/embed/'+embedLinkEnd;
            embed.embedHtml = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+embedLinkEnd+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        }
        else{
            const containsOtherParts = embedLink.includes("?");
            if(containsOtherParts){
                const mixedLink = embedLink.split("?");
                embedLink = mixedLink[0];
            }
            linkSplit = embedLink.split("/");
            linkIndexInSplit = linkSplit.length - 1;
            embedLinkEnd = linkSplit[linkIndexInSplit];
            youtubeId = embedLinkEnd;
            embed.embedUri = 'https://www.youtube.com/embed/'+embedLinkEnd;
            embed.embedHtml = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+embedLinkEnd+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        }
        const hasEmbeddedMusicVideo = this.state.post_type === "song"
        embed.youtubeId = youtubeId;
        embed.belongsToSong = hasEmbeddedMusicVideo;
        this.setState({
            embed: embed,
            hasEmbeddedMusicVideo: hasEmbeddedMusicVideo, 
            buttonState: {backgroundColor:"#cd0829",disabled:false}
        })
      }

    //   addPhoto = (photoObject) =>{
    //        this.setState({
    //            thumbnail: photoObject
    //        })
    //   }
    //   addAudio = (audioObject) =>{
    //       this.setState({
    //           track: audioObject
    //       })
    //  }
    //  addVideo = (videoObject) =>{
    //       this.setState({
    //           video: videoObject.video,
    //           thumbnail: videoObject.image
    //       })
    //  }
     
    //  addGenre = (genre) => {
    //       const initialState = this.state.genres;
    //       if(initialState.includes(genre)){
    //           return;
    //       }
    //       else{
    //           initialState.push(genre)
    //           this.setState({
    //               genres: initialState
    //           }, ()=>{ console.log(this.state)})
    //       }
    //  }
   

    //  removeGenre = (genreValuesLeft) => {
    //   if(genreValuesLeft === "clear"){
    //       this.setState({
    //           genres: []
    //       })
    //   }
    //   else{
    //       this.setState({
    //           genres: genreValuesLeft
    //       })
    //   } 
    // }
     
    //  toggleLyricsType  = (value) =>{
    //      this.setState({
    //          isExplicit: value
    //      })
    //  }
     
     renderPostTypeOnLink = ()=>{
         if(this.state.post_type === "music"){
             return "song";
         }
         return this.state.post_type
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
              postingText: "updating...",
              short_description: shortDescription ? shortDescription : description
          }
          this.setState(updatedStated, async ()=>{
              //post data to api
              let stateObjectclone = Object.assign({}, this.state);
              delete stateObjectclone.buttonState; // remove buttonstate property from state 
              delete stateObjectclone.postingText; // remove postingText property from state 
              delete stateObjectclone.post_link; // remove post_link property from state
              if(this.state.post_type === "video"){
              delete stateObjectclone.artist; // remove artist property from state if song
              delete stateObjectclone.genres; // remove genres property from state if song
              delete stateObjectclone.isExplicit; // remove artist property from state if song
              delete stateObjectclone.featuredArtists; // remove genres property from state if song
              }
              const updatedPost = await api.updateItem("/posts",stateObjectclone, this.state._id);
              this.state.post_link = '/'+this.renderPostTypeOnLink()+'/'+this.state.dashed_title+'/'+this.state._id;
              if(updatedPost){this.setState({postingText: "done",buttonState: {backgroundColor: "lightgrey",disabled:true}})}
          })        
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
      componentDidMount(){
        this.props.logUrl();
      }
   render(){
    return (   
        this.state._id? 
        <section className="panel panel-default"> 

        <header className="panel-heading font-bold">Update Embed</header> 
        
        <div className="panel-body"> 
        
        <form role="form"> 
        
        <div className="form-group">
        <input type="text" className="form-control" defaultValue={this.state.title} placeholder={this.state.title} onChange={this.setTitle} /> 
        </div> 
        {/* {this.renderFormType(this.addPhoto, this.addAudio, this.addVideo, this.addGenre, this.removeGenre, this.toggleLyricsType)}
        <div><img src={this.state.thumbnail.medium} style={{maxWidth: 200, marginBottom: "10px"}}/></div> */}
        <textarea id="editor" defaultValue={this.state.description} onChange={this.handleChange} ref={this.postBox} className="form-control" style={{overflow: 'scroll', height: '150px', maxHeight: '150px'}} placeholder={this.state.description} />
        <br/>
        <div className="form-group">
          <input type="text" className="form-control" placeholder={this.state.hasEmbeddedMusicVideo? 'https://youtube.com/embed/'+this.state.embed.youtubeId : "youtube video link"} onChange={this.handleEmbed} /> 
        </div> 
        <br/>
        <button className="btn btn-sm btn-default" onClick={this.handleSubmit} disabled={this.state.buttonState.disabled} style={{backgroundColor: this.state.buttonState.backgroundColor, color:"white !important", fontWeight:"bold"}}>{this.state.postingText}</button>
        <br/>{this.state.post_link? <Link to={this.state.post_link} className="text-success">View Updated Embed</Link> : ""}
        </form> 
        </div> 
       </section> : <div></div>
        );
      } 
}