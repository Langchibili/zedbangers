import React from "react";
import api from "../../../Store/api";
import Lists from "../../Includes/Lists/Lists";
import PlayLists from "../../Includes/Lists/PlayLists";

export default class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        posts: [],
        playlists: []
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
  componentWillMount(){
    this.changeHeaderTheme();
  }
   getPosts  = async ()=>{
      this.setState({
        posts: await api.getItems("/posts","","music","","","",12),
        playlists: await api.getItems("/playlists","","music","","","",12)
      },()=>{console.log(this.state);})
   }
  componentDidMount(){
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
             <Lists 
                divListType
                list_type="DivLongThumbnailType" 
                items_type="song" items={this.state.posts} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
            </div>
            <div className="row"> 
            
            <div className="col-md-7"> <h3 className="font-thin">New Songs</h3> 
            <div className="row row-sm"> 
             <Lists 
                divListType
                list_type="DivThumbnailType" 
                items_type="song" items={this.state.posts} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
            </div>
            
            <div className="row row-sm"> 
            <h3 className="font-thin">PlayLists</h3> 
             <PlayLists 
                divListType
                list_type="ListWithImageType" 
                items_type="songlist" items={this.state.playlists} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                nowPlayingTrackId={this.props.nowPlayingTrackId}
                updateNowPlayingListId={this.props.updateNowPlayingListId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
            </div>
            </div> 
            
            <div className="col-md-5"> <h3 className="font-thin">Top Songs</h3> 
            
            <div className="list-group bg-white list-group-lg no-bg auto"> 
            <Lists 
                divListType
                list_type="ChatType" 
                items_type="song" items={this.state.posts} />
            </div>
            </div> 
            </div> 
            
            <div className="row m-t-lg m-b-lg"> 
            
            <div className="col-sm-6"> 
            
            <div className="bg-primary wrapper-md r"> <a href="#"> 
            
            <span className="h4 m-b-xs block"><i className=" icon-user-follow i-lg" /> Login or Create account
            </span> 
            
            <span className="text-muted">Save and share your playlist with your friends when you log in or create an account.
            </span> </a> 
            </div> 
            </div> 
            
            <div className="col-sm-6"> 
            
            <div className="bg-black wrapper-md r"> <a href="#"> 
            
            <span className="h4 m-b-xs block"><i className="icon-cloud-download i-lg" /> Download our app
            </span> 
            
            <span className="text-muted">Get the apps for desktop and mobile to start listening music at anywhere and anytime.
            </span> </a> 
            </div> 
            </div> 
            </div> 
        </section>
      );
      } 
}