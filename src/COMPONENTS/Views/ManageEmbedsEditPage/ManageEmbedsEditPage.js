import React from "react";
import api from "../../../Store/api";
import Lists from "../../Includes/Lists/Lists";

export default class ManageEmbedsPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           embeds: [],
           updatedOnce: false
       }
   }

   getUserEmbeds = async () =>{
    const userId = this.props.UserInfo._id;
    this.setState({
      embeds: await api.createItem("/posts/timeline",{userId: userId, post_type: "embed", limit: 20})// add artist songs to state
     })
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
    this.getUserEmbeds();
  }
   

   render(){
    return (
      <section className="scrollable">
           <Lists 
            edit
            items_type="embed" 
            items={this.state.embeds} 
            />
      </section>
      
    );
  } 
}