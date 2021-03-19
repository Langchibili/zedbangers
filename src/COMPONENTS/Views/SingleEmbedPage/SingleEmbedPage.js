import React from "react";
import api from "../../../Store/api";
import Lists from "../../Includes/Lists/Lists";
import Loader from "../../Includes/Loader/Loader";
// import "./SingleEmbedPage.css";
import Embed from "../../Includes/Embed/Embed";

export default class SingleEmbedPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           post: null,
           posts: [],
           currentPostUrl: this.props.match.url,
           postRequestDone: false,
           recentSongs: [],
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
            this.setState({
                postRequestDone: true
            },
            async ()=>{
                const userId = this.state.post.userId;
                let morePosts = await api.getItems("/posts","","embed","","","",12);
                morePosts = morePosts.filter((song)=>{ return postId !== song._id});
               // morePosts.unshift(song) // remove this curent song id, add it only to the beginning and add more songs to songs list
                this.setState({
                    posts: morePosts // remove this curent song id and add more songs to songs list
                },
                  async ()=>{
                    let recentSongs = await api.getItems("/posts","","music","","","",12);
                    recentSongs = recentSongs.filter((song)=>{ return postId !== song._id});
                    this.setState({
                        recentSongs: recentSongs
                    }) // more songs, recent songs
                })
            } 
           )
        } 
     );
    }
  }

  renderEmbed = (youtubeId)=>{
    return <div
       className="video"
       style={{
         position: "relative",
         paddingBottom: "56.25%" /* 16:9 */,
         paddingTop: 25,
         height: 0
       }}
     >
       <iframe
         style={{
           position: "absolute",
           top: 0,
           left: 0,
           width: "100%",
           height: "100%"
         }}
         src={`https://www.youtube.com/embed/${youtubeId}`}
         frameBorder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
       />
     </div>
}

  changeHeaderTheme = () =>{
    const header = document.getElementById("header");
    const pathArray  = window.location.pathname.split("/");
    if(pathArray[1] === "embed"){
         header.className = header.className.replace("bg-white-only","bg-black lter");
    }
    else{
         header.className = header.className.replace("bg-black lter","bg-white-only");
    }
  }
  componentWillMount(){
    this.changeHeaderTheme();
    this.getPost();
  }
  
  componentDidUpdate(prevProps){
    if(prevProps.match.url !== this.props.match.url) this.getPost();
  }
  componentDidMount(){
    this.props.logUrl();
  }
   render(){
    return ( 
        this.state.postRequestDone? 
        <section className="hbox stretch bg-black dker">
            <aside className="col-sm-5 no-padder" id="sidebar"> 
            <section className="vbox animated fadeInUp"> 
            <section className="scrollable"> 

                {/* <div className="m-t-n-xxs item pos-rlt"> 
                
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
                    </div> 
                  <img className="img-full" src={this.state.post? this.state.post.thumbnail.cover : ""} alt="song thumnail" />  
                </div> 
                 */}
                {this.renderEmbed(this.state.post.embed.youtubeId)}
                <div className="padder-v" style={{padding:"15px"}}> 
                <a href="#" className="text-ellipsis">{this.state.post? this.state.post.title : ""}</a>
                <a href="#" className="text-ellipsis text-xs text-muted">{this.state.post? this.state.post.artist.artistName : ""}</a>
                </div> 
                <Lists 
                items_type="embed" 
                items={this.state.posts} 
                UserInfo={this.props.UserInfo}
                />
            </section> 
            </section>
        </aside>
        <section className="col-sm-4 no-padder bg">
            <section className="vbox">
                <section className=" scrollable hover">
                <Lists list_type="ListWithImageType" 
                items_type="song" items={this.state.recentSongs} 
                UserInfo={this.props.UserInfo}
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                updateDownload={this.props.updateDownload}
                pauseAudio={this.props.pauseAudio}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
            </section>
            </section>
        </section>
        </section>: <Loader />
     );
  } 
}