import React from "react";
import Header from "../Includes/Header/Header";
import Footer from "../Includes/Footer/Footer";
import Navigation from "../Includes/Navigation/Navigation";
import Views from "../Views/Views";
import SideBar from "../Includes/SideBar/SideBar";
import { BrowserRouter } from "react-router-dom";
import AudioPlayer from "../Includes/AudioPlayer/AudioPlayer";

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nowPlayingSongId: null
    }
}
UserInfo = {
  username: "langson",
  niceName: "Langson chibili",
  picture: {
      small: "image.jpg"
  },
  _id: "ahdkkkajlfjjffsssjal"
}
updateNowPlayingSongId = (songId) =>{
  this.setState({
    nowPlayingSongId: songId
  })
}


   render(){
    return ( 
      <div>
      <BrowserRouter>
       <section className="vbox">
          <Header />
          <section>
            <section className="hbox stretch">
              <Navigation />    
               <section id="content">
                <section className="hbox stretch">
                 <section>
                   <section className="vbox">
                       <Views updateNowPlayingSongId={this.updateNowPlayingSongId} UserInfo={this.UserInfo}/>
                       <Footer />
                   </section>
                 </section>
                 <SideBar />
                </section>
              </section>
           </section>
          </section>
        </section>
      </BrowserRouter>
      <AudioPlayer nowPlayingSongId={this.state.nowPlayingSongId} />
      </div>
      );
      } 
}