import React from "react";
import api from "../../../Store/api";
import Lists from "../../Includes/Lists/Lists";
import PlayLists from "../../Includes/Lists/PlayLists";
import { Link } from "react-router-dom";

export default class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        posts: [],
        embeds: [],
        playlists: [],
        chatsongs: [],
        postRequestDone: false
    }
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
  // updateChatSongs(songs){
  //   const songsWithAddedMetrics = songs.map((song)=>{
  //     const songDownloads = song.counts.downloads;
  //     const songPlays = song.counts.plays;
  //     const songTotalCounts = songDownloads + songPlays;
  //     song.songTatalCounts = songTotalCounts;
  //     return song;
  //   })  
  // }
  componentWillMount(){
    this.changeHeaderTheme();
  }
   getPosts  = async ()=>{
      this.setState({
        posts: await api.getItems("/posts","","music","","","",12),
        embeds: await api.getItems("/posts","","embed","","","",12),
        playlists: await api.getItems("/playlists","","music","","","",12),
        chatsongs: await api.getItems("/posts","","music","","","",12)
      }, ()=>{
        this.setState({
          postRequestDone: true
        })
      })
   }
  componentDidMount(){
    this.props.logUrl();
    this.getPosts();
  }
  
   render(){
    return (   
          <section className="scrollable padder-lg w-f-md" id="bjax-target"> <a href="#" className="pull-right text-muted m-t-lg" data-toggle="class:fa-spin"><i className="icon-refresh i-lg inline" id="refresh" /></a> <h2 className="font-thin m-b">Discover 
            
            <span className="musicbar animate inline m-l-sm" style={{width: '20px', height: '20px'}}> 
            
            <span className="bar1 a1 bg-primary lter" /> 
            
            <span className="bar2 a2 bg-info lt" /> 
            
            <span className="bar3 a3 bg-success" /> 
            
            <span className="bar4 a4 bg-warning dk" /> 
            
            <span className="bar5 a5 bg-danger dker" /> 
            </span></h2> 
            
            <div className="row row-sm"> 
             {this.state.postRequestDone? <Lists 
                divListType
                list_type="DivLongThumbnailType" 
                items_type="song" items={this.state.posts} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/> : <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
            </div>
            <div className="row"> 
               <h3 className="font-thin" style={{padding: "15px"}}>Videos</h3>
                {this.state.postRequestDone? <Lists 
                items_type="embed" 
                items={this.state.embeds} 
                UserInfo={this.props.UserInfo}
                /> : <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
             </div>
            <div className="row"> 
            
            <div className="col-md-7"> <h3 className="font-thin">New Songs</h3> 
            <div className="row row-sm"> 
            { this.state.postRequestDone? <Lists 
                divListType
                list_type="DivThumbnailType" 
                items_type="song" items={this.state.posts} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/> : <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
            </div>
            
            <div className="row row-sm" style={{padding: "10px"}}>
              <h3 className="font-thin">PlayLists</h3> 
              {this.state.postRequestDone? <PlayLists 
                  divListType
                  list_type="ListWithImageType" 
                  items_type="songlist" items={this.state.playlists} 
                  updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                  nowPlayingTrackId={this.props.nowPlayingTrackId}
                  updateNowPlayingListId={this.props.updateNowPlayingListId}
                  updateDownload={this.props.updateDownload}
                  pauseAudio={this.props.pauseAudio}
                  toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/> : <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
            </div>
            </div> 
            
            <div className="col-md-5"> <h3 className="font-thin">Top Songs</h3> 
            
            <div className="list-group bg-white list-group-lg no-bg auto"> 
           {this.state.postRequestDone? <Lists 
                divListType
                list_type="ChatType" 
                items_type="song" items={this.state.chatsongs} /> : <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
            </div>
            </div> 
            </div> 
            
            <div className="row m-t-lg m-b-lg"> 
            
            <div className="col-sm-6"> 
            
            <div className="bg-primary wrapper-md r"> <Link to="/signup"> 
            
            <span className="h4 m-b-xs block"><i className=" icon-user-follow i-lg" /> Login or Create account
            </span> 
            
            <span className="text-muted">Save and share your playlist with your friends when you log in or create an account.
            </span> </Link> 
            </div> 
            </div> 
            
            {/* <div className="col-sm-6"> 
            
            <div className="bg-black wrapper-md r"> <a href="#"> 
            
            <span className="h4 m-b-xs block"><i className="icon-cloud-download i-lg" /> Download our app
            </span> 
            
            <span className="text-muted">Get the apps for desktop and mobile to start listening music at anywhere and anytime.
            </span> </a> 
            </div> 
            </div>  */}
            </div> 
        </section>
      );
      } 
}