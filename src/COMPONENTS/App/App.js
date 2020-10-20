import React from "react";
import Header from "../Includes/Header/Header";
import Footer from "../Includes/Footer/Footer";
import Navigation from "../Includes/Navigation/Navigation";
import Views from "../Views/Views";
import SideBar from "../Includes/SideBar/SideBar";
import { BrowserRouter } from "react-router-dom";
import AudioPlayer from "../Includes/AudioPlayer/AudioPlayer";
import VideoAd from "../Includes/VideoAd/VideoAd";
import Display from "../Includes/Display/Display";
import api from "../../Store/api";
import Loader from "../Includes/Loader/Loader";
import api_url from "../../constants/api_url";

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nowPlayingSongId: null,
      download: null,
      fileIsDownloading: false,
      isLoggedIn: false,
      sessionReqDone: false,
      UserInfo: null
    }
}
async checkUserSession(){
  const userStatus = await api.getItems("/user_status");
  if(userStatus){
     if(userStatus.isLoggedIn){
      const allusers = await api.getItems("/users");
      const loggeInUserInfo = await api.getItemByUsername("/users", userStatus.loggedUserName);
      this.setState({
          isLoggedIn: true,
          UserInfo: loggeInUserInfo,
          sessionReqDone: true
      })
    }
    else{
        this.setState(
          {
            isLoggedIn: false,
            sessionReqDone: true
          })
    }
  }
  else{
    return;
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

setVideoInstance = (video)=>{
   this.setState({
     video: video
   })
}

toggleOffFileIsDownloading = ()=>{
  this.setState({
    fileIsDownloading: false
  })
}
toggleOnFileIsDownloading = ()=>{
  this.setState({
    fileIsDownloading: true
  })
}

updateDownload = (download) =>{
  console.log(download)
  this.setState({
    download: download
  })
}

updateNowPlayingSongId = (songId) =>{
  this.setState({
    nowPlayingSongId: songId
  })
}

async componentWillMount(){
  await this.checkUserSession();
}


   render(){
    return ( 
      <div>
       <section className="vbox">
           <Header 
            isLoggedIn={this.state.isLoggedIn} 
            UserInfo={this.state.UserInfo} /> 
         
          <section>
            <section className="hbox stretch">
            <BrowserRouter>
             <Navigation isLoggedIn={this.state.isLoggedIn} /> 
               <section id="content">
                <section className="hbox stretch">
                 <section>
                   <section className="vbox">
                     <section className="w-f-md">

                     {this.state.sessionReqDone? <Views 
                          updateNowPlayingSongId={this.updateNowPlayingSongId} 
                          UserInfo={this.state.UserInfo} 
                          changeHeaderTheme={this.changeHeaderTheme}
                          updateDownload={this.updateDownload}
                          toggleOnFileIsDownloading={this.toggleOnFileIsDownloading}
                          isLoggedIn={this.state.isLoggedIn} /> : <Loader loaderContent="loading..." />}

                        <Display isVisible={this.state.fileIsDownloading}>
                          <VideoAd 
                           download={this.state.download} 
                           toggleOffFileIsDownloading={this.toggleOffFileIsDownloading}/>
                        </Display>

                        <Footer />
                      </section>
                   </section>
                 </section>
                 {/* <SideBar /> */}
                </section>
              </section>
          </BrowserRouter>
           </section>
          </section>
        </section>
       {/* <AudioPlayer nowPlayingSongId={this.state.nowPlayingSongId} />  */}
      </div>
      );
      } 
}