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
import HomeButton from "../Includes/Shortcuts/HomeButton";
import BackBtn from "../Includes/Shortcuts/BackBtn";
import ScrowDownBtn from "../Includes/Shortcuts/ScrowDownBtn";

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nowPlayingSongId: null,
      download: null,
      fileIsDownloading: false,
      isLoggedIn: false,
      sessionReqDone: false,
      UserInfo: null,
      previousUrl: null,
      updateView: true,
      pauseAudio: false,
      visitedUrls: [window.location.href]
    }
}
async checkUserSession(){
  const userStatus = await api.getItems("/user_status");
  if(userStatus){
     if(userStatus.isLoggedIn){
      //const allusers = await api.getItems("/users");
      const loggeInUserInfo = userStatus.loggedInUser;
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

setVideoInstance = (video)=>{
   this.setState({
     video: video
   })
}

toggleOffFileIsDownloading = ()=>{
  this.setState({
    fileIsDownloading: true
  })
}
toggleOnFileIsDownloading = ()=>{
  this.setState({
    fileIsDownloading: true
  })
}

updateDownload = (download) =>{
  this.setState({
    download: download,
    updateView: false
  })
}

updateNowPlayingSongId = (songId) =>{
  this.setState({
    nowPlayingSongId: songId,
    updateView: false
  })
}

pauseAudio =()=>{
  this.setState({
    pauseAudio: true
  })
}

logUrl = ()=>{
  console.log("logged");
  const currentUrl =  window.location.href;
  const urlArray = this.state.visitedUrls;
  const previousUrl = urlArray[urlArray.length-2];
  if(currentUrl !== urlArray[urlArray.length-1]){
    urlArray.push(currentUrl);
    this.setState({
      visitedUrls: urlArray,
      previousUrl: previousUrl
    }) 
  }
}

async componentWillMount(){
  await this.checkUserSession();
}
   render(){
    return ( 
      <div>
       <section className="vbox">
       <div id="topDiv"></div>
       <BrowserRouter>
           <Header 
            isLoggedIn={this.state.isLoggedIn} 
            UserInfo={this.state.UserInfo} /> 
          <section>
            <section className="hbox stretch">
             <Navigation isLoggedIn={this.state.isLoggedIn} /> 
               <section id="content">
                <section className="hbox stretch">
                 <section>
                   <section className="vbox">
                     <section className="w-f-md">
                     {this.state.previousUrl? 
                     <div>
                     <HomeButton />
                     <BackBtn previousUrl={this.state.previousUrl}/></div>:
                     ""}
                     {this.state.sessionReqDone? <Views 
                          logUrl={this.logUrl}
                          updateNowPlayingSongId={this.updateNowPlayingSongId} 
                          UserInfo={this.state.UserInfo} 
                          changeHeaderTheme={this.changeHeaderTheme}
                          updateDownload={this.updateDownload}
                          toggleOnFileIsDownloading={this.toggleOnFileIsDownloading}
                          pauseAudio={this.pauseAudio}
                          updateView={this.state.updateView}
                          isLoggedIn={this.state.isLoggedIn} /> : <Loader loaderContent="loading..." />}

                        <Display isVisible={this.state.fileIsDownloading}>
                          <VideoAd 
                           download={this.state.download} 
                           toggleOffFileIsDownloading={this.toggleOffFileIsDownloading}/>
                        </Display>
                        <ScrowDownBtn />
                        <Footer />
                      </section>
                   </section>
                 </section>
                 {/* <SideBar /> */}
                </section>
              </section>
           </section>
          </section>
          </BrowserRouter>
        </section>
       {this.state.sessionReqDone? <AudioPlayer nowPlayingSongId={this.state.nowPlayingSongId} pauseAudio={this.state.pauseAudio}/> : ""}  
       <div id="buttomDiv"></div>
      </div>
      );
      } 
}