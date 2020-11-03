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
    const post = await api.getItemById("/posts", postId, " ");
     this.setState(
        {
          post: post 
        },
        ()=>{
            const songs = this.state.songs;
            songs.push(this.state.post) // add current song
            this.setState({
                songs: songs
            },
            async ()=>{
                const song = this.state.songs[0];
                const userId = this.state.post.userId;
                const moresongs = await api.createItem("/posts/timeline",{userId: userId, limit: 20})// add artist more songs to state
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

//    shouldComponentUpdate(){
//        return this.props.postId === this.state.post._id? false : true;
//    }
   
   componentWillMount(){    
    this.changeHeaderTheme(); 
    this.getPost();
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
                
                <span className="pull-right text-sm">{this.state.post? this.state.post.counts.downloads : ""}
                <br />Downloads
                </span> 
                
                <span className="h2 font-thin">{this.state.post? this.state.post.artist.artistName : "unknown"}
                </span> 
                    </div> <img className="img-full" src={this.state.post? this.state.post.thumbnail.cover : ""} alt="song thumnail" />  
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