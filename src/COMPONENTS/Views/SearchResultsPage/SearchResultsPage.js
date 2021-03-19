import React from "react";
import api from "../../../Store/api";
import Lists from "../../Includes/Lists/Lists";

export default class SearchResultsPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           posts: [],
           users: [],
           postRequestDone: false
       }
   }

   getPosts = async () =>{
    const keyword = this.props.keyword;
    const postsResult = await api.getItems("/search/post/"+keyword,"","","","","","");
    // const usersResult = await api.getItems("/search/user/"+keyword);
    this.setState({
        posts: postsResult,
        // users: usersResult
    }, ()=>{ 
      this.setState({
      postRequestDone: true
    })})
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
    this.getPosts();
  }
  componentDidMount(){
    this.props.logUrl();
  }
  showResults = ()=>{
    return this.state.posts.length > 0? <Lists list_type="ListWithImageType" 
    items_type="song" items={this.state.posts} 
    nowPlayingTrackId={this.props.nowPlayingTrackId}
    updateNowPlayingSongId={this.props.updateNowPlayingSongId}
    updateDownload={this.props.updateDownload}
    pauseAudio={this.props.pauseAudio}
    toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>:
    <div>Sorry, no results found for your search.</div>
  }
   render(){
    return ( 
        <section className="hbox stretch bg-black dker">
        <section className="col-sm-4 no-padder bg">
            <section className="vbox">
                <section className=" scrollable hover">
                {this.state.postRequestDone? this.showResults() : <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
            </section>
            </section>
        </section>
        </section>
     );
  } 
}