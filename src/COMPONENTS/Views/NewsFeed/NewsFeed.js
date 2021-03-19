import React from 'react';
import './NewsFeed.css';
// import Shortcuts from '../../Widgets/Shortcuts/Shortcuts';
// import WhoisFollowing from '../../Widgets/WhoisFollowing/WhoisFollowing';
// import RecentActivity from '../../Widgets/RecentActivity/RecentActivity';
// import SideBar from "../../Includes/SideBar/SideBar";
import Lists from "../../Includes/Lists/Lists";
import PlayLists from "../../Includes/Lists/PlayLists";
import api from "../../../Store/api";

 export default class NewsFeed extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                songs: [],
                embeds: [],
                playlists: [],
                postRequestDone: false
            }     
        }
        showPosts = (post_type) =>{
            if(post_type === "songs"){
              return this.state.songs.length > 0? <Lists list_type="ListWithImageType" 
                      items_type="song" items={this.state.songs} 
                      nowPlayingTrackId={this.props.nowPlayingTrackId}
                      updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                      updateDownload={this.props.updateDownload}
                      pauseAudio={this.props.pauseAudio}
                      toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/> : <div style={{padding: '10px'}}>no songs yet</div>
            }
            else if(post_type === "playlists"){
              return this.state.playlists.length > 0? <PlayLists 
                      divListType
                      list_type="ListWithImageType" 
                      items_type="songlist" items={this.state.playlists} 
                      updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                      nowPlayingTrackId={this.props.nowPlayingTrackId}
                      updateNowPlayingListId={this.props.updateNowPlayingListId}
                      updateDownload={this.props.updateDownload}
                      pauseAudio={this.props.pauseAudio}
                      toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/> : <div style={{padding: '10px'}}>no playlists yet</div>
            }
            else if(post_type === "embeds"){
              return this.state.playlists.length > 0? <Lists 
                      items_type="embed" 
                      items={this.state.embeds} 
                      UserInfo={this.props.UserInfo}
                      /> : <div style={{padding: '10px'}}>no videos yet</div>
            }
            else{
              return 
            }
          }
        async componentDidMount(){
              this.props.logUrl();
             // use create Item because getting feed uses a post request method
              this.setState({
                 songs: await api.createItem("/newsfeed", { userId: this.props.UserInfo._id, post_type: "music", fields: " ", limit: 12}),
                 embeds: await api.createItem("/newsfeed", { userId: this.props.UserInfo._id, post_type: "embed", fields: " ", limit: 12}),
                 playlists: await api.createItem("/newsfeed/playlists", { userId: this.props.UserInfo._id, post_type: "music", fields: " ", limit: 12})
             },()=>{
                this.setState({
                  postRequestDone: true
                })
            })
        }

        render(){ 
            return (   
                <section className="scrollable padder-lg w-f-md" id="bjax-target"> <a href="#" className="pull-right text-muted m-t-lg" data-toggle="class:fa-spin"><i className="icon-refresh i-lg inline" id="refresh" /></a> <h2 className="font-thin m-b">Feed 
                  
                  <span className="musicbar animate inline m-l-sm" style={{width: '20px', height: '20px'}}> 
                  
                  <span className="bar1 a1 bg-primary lter" /> 
                  
                  <span className="bar2 a2 bg-info lt" /> 
                  
                  <span className="bar3 a3 bg-success" /> 
                  
                  <span className="bar4 a4 bg-warning dk" /> 
                  
                  <span className="bar5 a5 bg-danger dker" /> 
                  </span></h2> 
                  <aside className="bg-white">
                    <section className="vbox">
                    
                    <header className="header bg-light lt">
                        
                        <ul className="nav nav-tabs nav-white">
                        
                        <li className="active">
                            <a href="#usersongs" data-toggle="tab">
                            <i className="icon-music-tone-alt icon text-info"></i>    
                            Music
                            </a>
                        </li>
                        <li className>
                            <a href="#playlists" data-toggle="tab">
                            <i className="icon-playlist icon text-info-dker"></i>
                            PlayLists
                            </a>
                        </li>
                        <li className>
                            <a href="#videos" data-toggle="tab">
                            <i className="icon-social-youtube icon text-danger"></i>
                            Videos
                            </a>
                        </li>
                        </ul>
                    </header>
                    <section className="scrollable">
                        
                        <div className="tab-content">
                        
                        <div className="tab-pane active" id="usersongs">
                        {this.state.postRequestDone? this.showPosts("songs") : <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
                        </div>
                        <div className="tab-pane" id="playlists">
                            
                            <div className="text-center wrapper">
                            {this.state.postRequestDone? this.showPosts("playlists") : <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
                            </div>
                        </div>
                        <div className="tab-pane" id="videos">
                            
                            <div className="text-center wrapper">
                            {this.state.postRequestDone? this.showPosts("embeds") : <div style={{width:"100%", margin: "0 auto", textAlign: "center"}}><i className="fa fa-spinner fa fa-spin fa fa-large text-info" /></div>}
                            </div>
                        </div>
                        </div>
                    </section>
                    </section>
                </aside>
        
                  </section>
            );
        }
 }