import React from "react";
import api from "../../../Store/api";
import Song from "../../Includes/Song/Song";
import Lists from "../../Includes/Lists/Lists";

export default class SingleUserPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           artist: null,
           artistSongs: [],
           updatedOnce: false
       }
   }
   artist = {  // testing purpose
        username: "langson",
        niceName: "Langson chibili",
        picture: {
            small: "image.jpg"
        },
        _id: "ahdkkkajlfjjffsssjal"
      } 

   getArtistInfo = async () =>{
       //  const userId = this.props.userId; 
       //  const artist = await api.getItemById("/users", userId, " ");
       const artistSongs = this.artistSongs();
       
       this.setState({
           artist: this.artist      
       }, ()=>{
        this.setState({
           artistSongs: artistSongs
        })
       })
   }

   getArtistSongs = () =>{
    // return await api.getItems("/posts","","music","","","",10);
    // testing bellow
     return [{
        _id: "5f62957f8467921958e59951",
        title: "gliding"
      },{
        _id: "5f62957f8467921958e5995",
        title: "gliding"
      },{
        _id: "5f62957f8467921958e599",
        title: "gliding"
      },{
        _id: "5f62957f84679219pp58e5",
        title: "gliding"
      },{
        _id: "5f62957f8458e59951",
        title: "gliding"
      },
      ,{
        _id: "5297f846719559951",
        title: "gliding"
      },{
        _id: "5f957f871e59951",
        title: "gliding"
      },{
        _id: "5f62kkk84671958e59951",
        title: "gliding"
      },{
        _id: "56295??7f84671958e59951",
        title: "gliding"
      },{
        _id: "5f6295784619))58e59951",
        title: "gliding"
      }];
   }

   shouldComponentUpdate(){
       return this.state.updatedOnce? false : true;
   }

   componentWillMount(){    
    this.getArtistInfo();
   }
   componentDidUpdate(){
    this.setState({ updatedOnce: true})
   }
//    componentDidMount(){
//     this.props.changeHeaderTheme();
//    }
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
                <Lists list_type="PlainListType" items_type="song" items={this.state.songs} updateNowPlayingSongId={this.props.updateNowPlayingSongId}/>
            </section> 
            </section>
        </aside>
        <section className="col-sm-4 no-padder bg">
            <section className="vbox">
                <section className=" scrollable hover">
                <Lists list_type="ListWithImageType" items_type="song" items={this.state.songs} updateNowPlayingSongId={this.props.updateNowPlayingSongId}/>
            </section>
            </section>
        </section>
        </section>
     );
  } 
}