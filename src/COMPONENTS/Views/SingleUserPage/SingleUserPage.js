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
    //  const user = await api.getItemByUsername("/users",username,"");
     const artistsongs = this.getartistsongs();
     this.setState(
        {
          //user: user // first update user, and render it
          user: { // for testing purposes
                _id: "5f62957f8467921958e59951",
                username: "cb"
              } 
        },
        ()=>{
          this.setState({
            songs: artistsongs // add artist songs to state
        })
        } 
     );
    }
  }


   getartistsongs = () =>{
    // return await api.getItems("/posts","","music","","","",10);
    // testing bellow
     return [{
        _id: "5f62964e8467921958e59952",
        title: "gliding"
      },{
        _id: "5f62957f8467921958e59951",
        title: "gliding"
      },{
        _id: "5f62957c8467921958e59950",
        title: "gliding"
      },{
        _id: "5f62957f8467.9219pp58e5",
        title: "gliding"
      },{
        _id: "5f62957f84k59951",
        title: "gliding"
      },
      ,{
        _id: "5297f846719j5;;;;;59951",
        title: "gliding"
      },{
        _id: "5f957f871el59951",
        title: "gliding"
      },{
        _id: "5f62kkk84h671958e59951",
        title: "gliding"
      },{
        _id: "56295??7fi84671958e59951",
        title: "gliding"
      },{
        _id: "5f6295784619))58te59951",
        title: "gliding"
      }];
   }

   shouldComponentUpdate(){
       return this.state.updatedOnce? false : true;
   }
   
   componentWillMount(){    
    this.getUser();
   }
   componentDidUpdate(){
    this.setState({ updatedOnce: true})
   }

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
                      
                      <img src="images/a0.png" className="img-circle" />
                    </a>
                    <div>
                      
                      <div className="h3 m-t-xs m-b-xs">John.Smith</div>
                      <small className="text-muted">
                        <i className="fa fa-map-marker" /> London, UK
                      </small>
                    </div>
                  </div>
                  <div className="panel wrapper">
                    
                    <div className="row text-center">
                      
                      <div className="col-xs-6">
                        
                        <a href="#">
                          
                          <span className="m-b-xs h4 block">245</span>
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                      id neque quam. Aliquam sollicitudin venenatis ipsum ac feugiat.
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
                    <a href="#activity" data-toggle="tab">
                      Activity
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
                  
                  <div className="tab-pane active" id="activity">
                  <Lists list_type="ListWithImageType" 
                items_type="song" items={this.state.songs} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                updateDownloadId={this.props.updateDownloadId}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
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