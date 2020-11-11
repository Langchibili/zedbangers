import React from "react";
import api from "../../../Store/api";
import Song from "../../Includes/Song/Song";
import Lists from "../../Includes/Lists/Lists";

export default class SinglePostPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           user: null,
           songs: [],
           updatedOnce: false
       }
   }

   getUser = async () =>{
    const username = this.props.username;
    if(!username){
      return
    }
    else{
     this.setState(
        {
          user: await api.getItemByUsername("/users",username,"") 
        },
        async ()=>{
          const userId = this.state.user._id;
          this.setState({
            songs: await api.createItem("/posts/timeline",{userId: userId, limit: 20})// add artist songs to state
           })
        }
     );
    }
  }


   shouldComponentUpdate(){
       return this.state.updatedOnce? false : true;
   }
   
   componentWillMount(){    
    this.getUser();
   }
  //  componentDidUpdate(){
  //   this.setState({ updatedOnce: true})
  //  }

   render(){
    return (
      <section className="scrollable">
        <section className="hbox stretch">
          
          <aside className="aside-lg bg-light lter b-r">
            
            <section className="vbox">
              
              <section className="scrollable">
                
                <div className="wrapper">
                  
                  <div className="text-center m-b m-t">
                    
                    <a href="#" className="thumb-lg">
                      
                      <img src={this.state.user? this.state.user.picture.thumbnail: "" } className="img-circle" />
                    </a>
                    <div>
                      
                      <div className="h3 m-t-xs m-b-xs">{this.state.user? this.state.user.niceName: "" }</div>
                      <small className="text-muted">
                        <i className="fa fa-map-marker" /> {this.state.user? this.state.user.bio.location: "no location added" }
                      </small>
                    </div>
                  </div>
                  <div className="panel wrapper">
                    
                    <div className="row text-center">
                      
                      <div className="col-xs-6">
                        
                        <a href="#">
                          
                          <span className="m-b-xs h4 block">{this.state.user? this.state.user.counts.plays: 0 }</span>
                          <small className="text-muted">streams</small>
                        </a>
                      </div>
                      <div className="col-xs-6">
                        
                        <a href="#">
                          
                          <span className="m-b-xs h4 block">55</span>
                          <small className="text-muted">downloads</small>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="btn-group btn-group-justified m-b">
                    
                    <a className="btn btn-success btn-rounded" data-toggle="button">
                      
                      <span className="text">
                        
                        <i className="fa fa-eye" /> Follow
                      </span>
                      <span className="text-active">
                        
                        <i className="fa fa-eye" /> Following
                      </span>
                    </a>
                    <a className="btn btn-dark btn-rounded">
                      
                      <i className="fa fa-comment-o" /> Chat
                    </a>
                  </div>
                  <div>
                    
                    <small className="text-uc text-xs text-muted">
                      about me
                    </small>
                    <p>Artist</p>
                    <small className="text-uc text-xs text-muted">info</small>
                    <p>
                    {this.state.user? this.state.user.bio.about: "" }
                    </p>
                    <div className="line" />
                    <small className="text-uc text-xs text-muted">connection</small>
                    <p className="m-t-sm">
                      
                      <a href="#" className="btn btn-rounded btn-twitter btn-icon">
                        <i className="fa fa-twitter" />
                      </a>
                      <a href="#" className="btn btn-rounded btn-facebook btn-icon">
                        <i className="fa fa-facebook" />
                      </a>
                      <a href="#" className="btn btn-rounded btn-gplus btn-icon">
                        <i className="fa fa-google-plus" />
                      </a>
                    </p>
                  </div>
                </div>
              </section>
            </section>
          </aside>
          <aside className="bg-white">
            
            <section className="vbox">
              
              <header className="header bg-light lt">
                
                <ul className="nav nav-tabs nav-white">
                  
                  <li className="active">
                    <a href="#usersongs" data-toggle="tab">
                      Songs
                    </a>
                  </li>
                  <li className>
                    <a href="#events" data-toggle="tab">
                      Events
                    </a>
                  </li>
                  <li className>
                    <a href="#interaction" data-toggle="tab">
                      Interaction
                    </a>
                  </li>
                </ul>
              </header>
              <section className="scrollable">
                
                <div className="tab-content">
                  
                  <div className="tab-pane active" id="usersongs">
                  {this.state.songs.length > 0? <Lists list_type="ListWithImageType" 
                items_type="song" items={this.state.songs} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/> : <div>no songs yet</div>}
                  </div>
                  <div className="tab-pane" id="about">
                    
                    <div className="text-center wrapper">
                      
                      <i className="fa fa-spinner fa fa-spin fa fa-large" />
                    </div>
                  </div>
                  <div className="tab-pane" id="activities">
                    
                    <div className="text-center wrapper">
                      
                      <i className="fa fa-spinner fa fa-spin fa fa-large" />
                    </div>
                  </div>
                </div>
              </section>
            </section>
          </aside>
        </section>
      </section>
      
    );
  } 
}