import React from "react";
import api from "../../../Store/api";
import Song from "../../Includes/Song/Song";
import Lists from "../../Includes/Lists/Lists";

export default class SinglePostPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           post: null,
           songs: [],
           updatedOnce: false
       }
   }

   getPost = async () =>{
    const postId = this.props.postId;
    if(!postId){
      return
    }
    else{
    //  const post = await api.getItemById("/posts", postId, " ");
     const moresongs = this.getMoreSongs();
     this.setState(
        {
          //post: post // first update post, and render it
          post: { // for testing purposes
                _id: "5f62957f8467921958e59951",
                title: "gliding"
              } 
        },
        ()=>{
            const songs = this.state.songs;
            songs.push(this.state.post) // add current song
            this.setState({
                songs: songs
            },
            ()=>{
                const song = this.state.songs[0];
                moresongs.unshift(song)
                this.setState({
                    songs: moresongs // add more songs to songs list
                })
            } 
           )
        } 
     );
    }
  }

  changeHeaderTheme = () =>{
    const header = document.getElementById("header");
    header.className.replace("bg-white-only","bg-black lter");
  }

   getMoreSongs = () =>{
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
    this.changeHeaderTheme(); 
    this.getPost();
   }
   componentDidUpdate(){
    this.setState({ updatedOnce: true})
   }

   render(){
    return ( 
        <section className="hbox stretch bg-black dker">
            <aside className="col-sm-5 no-padder" id="sidebar"> <section className="vbox animated fadeInUp"> <section className="scrollable"> 

                <div className="m-t-n-xxs item pos-rlt"> 
                
                <div className="top text-right"> 
                
                <span className="musicbar bg-success bg-empty inline m-r-lg m-t" style={{width: '25px', height: '30px'}}> 
                
                <span className="bar1 a3 lter" /> 
                
                <span className="bar2 a5 lt" /> 
                
                <span className="bar3 a1 bg" /> 
                
                <span className="bar4 a4 dk" /> 
                
                <span className="bar5 a2 dker" /> 
                </span> 
                </div> 
                
                <div className="bottom gd bg-info wrapper-lg"> 
                
                <span className="pull-right text-sm">101,400 
                <br />Followers
                </span> 
                
                <span className="h2 font-thin">Soph Ashe
                </span> 
                    </div> {/*<img className="img-full" src={this.state.post? this.state.post.thumbnail.medium : ""} alt="song thumnail" />  */}
                </div> 
                <Lists 
                list_type="PlainListType" 
                items_type="song" items={this.state.songs} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                updateDownload={this.props.updateDownload}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
            </section> 
            </section>
        </aside>
        <section className="col-sm-4 no-padder bg">
            <section className="vbox">
                <section className=" scrollable hover">
                <Lists list_type="ListWithImageType" 
                items_type="song" items={this.state.songs} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                updateDownload={this.props.updateDownload}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
            </section>
            </section>
        </section>
        </section>
     );
  } 
}