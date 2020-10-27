import React from "react";
import api from "../../../Store/api";
import Lists from "../../Includes/Lists/Lists";

export default class ManagePostsPage extends React.Component{ 
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
     const artistsongs = this.getartistsongs();
     this.setState(
        {
          user: await api.getItemByUsername("/users",username,"") 
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
           <Lists list_type="ListWithImageType" 
                items_type="song" items={this.state.songs} 
                updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                updateDownload={this.props.updateDownload}
                toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>
      </section>
      
    );
  } 
}