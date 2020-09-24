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
      nowPlayingSongId: null,
      headerTheme: "bg-white-only"
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

changeHeaderTheme = () =>{
  this.setState({
    headerTheme: "bg-black lter"
  })
}

componentDidMount(){
  console.log(this);
}

   render(){
    return ( 
      <div>
       <section className="vbox">
          <Header UserInfo={this.UserInfo} headerTheme={this.state.headerTheme}/>
         
          <section>
            <section className="hbox stretch">
            <BrowserRouter>
              <Navigation />    
               <section id="content">
                <section className="hbox stretch">
                 <section>
                   <section className="vbox">
                     <section className="w-f-md">
                        <Views updateNowPlayingSongId={this.updateNowPlayingSongId} UserInfo={this.UserInfo} changeHeaderTheme={this.changeHeaderTheme}/>
                        <Footer />
                      </section>
                   </section>
                 </section>
                 <SideBar />
                </section>
              </section>
          </BrowserRouter>
           </section>
          </section>
        </section>
      {/* <AudioPlayer nowPlayingSongId={this.state.nowPlayingSongId} /> */}
      </div>
      );
      } 
}