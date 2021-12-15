import React from "react";
import Header from "../Includes/Header/Header";
//import Footer from "../Includes/Footer/Footer";
import Navigation from "../Includes/Navigation/Navigation";
import Views from "../Views/Views";
// import SideBar from "../Includes/SideBar/SideBar";
import { BrowserRouter, Switch } from "react-router-dom";
import AudioPlayer from "../Includes/AudioPlayer/AudioPlayer";
import VideoAd from "../Includes/VideoAd/VideoAd";
import Display from "../Includes/Display/Display";
import api from "../../Store/api";
import Loader from "../Includes/Loader/Loader";
import HomeButton from "../Includes/Shortcuts/HomeButton";
import ScrollUpBtn from "../Includes/ScrollUpBtn/ScrollUpBtn";
import BottomNav from "../Includes/BottomNav/BottomNav";

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nowPlayingSongId: null,
      nowPlayingTrackId: null,
      nowPlayingListId: null,
      download: null,
      fileIsDownloading: false,
      isLoggedIn: false,
      sessionReqDone: false,
      UserInfo: null,
      currentUrl: null,
      previousUrl: null,
      updateView: true,
      pauseAudio: false,
      visitedUrlsLength: 1,
      visitedUrls: [window.location.pathname]
    }
}

redirectToHttps = () => {
  const httpUrl = window.location.href;
  const httpsUrl = httpUrl.replace("http", "https")
  if(window.location.protocol === "http:"){
     window.location = httpsUrl;
  }
}

redirectWww = () => {
  const wwwUrl = window.location.href;
  if(wwwUrl.includes("www")){
     const wwwLesUrl = wwwUrl.replace("www.", "")
     window.location = wwwLesUrl;
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
nowPlayingTrackId = (songId)=>{
  this.setState({
    nowPlayingTrackId: songId,
    updateView: false
  })
}
updateNowPlayingListId = (playingListId)=>{
  this.setState({
    nowPlayingListId: playingListId,
    updateView: false
  })
}
pauseAudio =()=>{
  this.setState({
    pauseAudio: true
  })
}

logUrl = ()=>{
  // window.history.pushState({ previousUrl: window.location.pathname },null,window.location.href);
  // return 
  let urlArray = this.state.visitedUrls;
  const currentUrl =  window.location.pathname;
  const rootUrl = urlArray[0]; //get the root url
  if(currentUrl !== rootUrl){ // check if this is the origin url
    urlArray.push(currentUrl);
    const visitedUrlsLength = urlArray.length;
    let previousUrl =  urlArray[visitedUrlsLength-1]; // get the last logged url as prevurl
    const currentUrlIndex = urlArray.findIndex((url, urlIndex)=>{ return currentUrl === url});
    if(urlArray.includes(currentUrl)){
       urlArray = urlArray.filter((url, indexOf)=>{
             return indexOf <= currentUrlIndex
       })
       previousUrl = urlArray[visitedUrlsLength-2] // then get the one 2 indexes in as prev url
    } 
    let prevUrlData = {
      currentUrl: currentUrl,
      visitedUrls: urlArray,
      visitedUrlsLength: visitedUrlsLength,
      previousUrl: previousUrl
    }
    window.history.pushState({ prevUrl: prevUrlData },null,window.location.href);
  }
  else{
    const prevUrlData = {
      currentUrl: null,
      previousUrl: null,
      visitedUrls: [window.location.pathname],
      visitedUrlsLength: 1
    }
    window.history.pushState({ prevUrl: prevUrlData },null,window.location.href);
  }
  console.log(window.history.state.prevUrl);
}
deletePrevUrl = ()=>{
  const urlArray = this.state.visitedUrls;
  urlArray.pop();
  this.setState({ 
     previousUrl: urlArray
  })
}

async componentWillMount(){
  this.redirectToHttps(); // redirect http requests to https
  this.redirectWww();
  await this.checkUserSession();
}
   render(){
    return ( 
      <div>
       <section className="vbox">
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
                      </div>: ""}
                     {this.state.sessionReqDone? <Views 
                          location = {this.props.location}
                          logUrl={this.logUrl}
                          currentUrl={this.state.currentUrl}
                          updateNowPlayingSongId={this.updateNowPlayingSongId} 
                          nowPlayingTrackId={this.state.nowPlayingTrackId}
                          updateNowPlayingListId={this.updateNowPlayingListId}
                          UserInfo={this.state.UserInfo} 
                          updateDownload={this.updateDownload}
                          toggleOnFileIsDownloading={this.toggleOnFileIsDownloading}
                          pauseAudio={this.pauseAudio}
                          updateView={this.state.updateView}
                          isLoggedIn={this.state.isLoggedIn} /> : <Loader loaderContent="loading..." />}
                        <div id="bottom-space" style={{minHeight:"50px"}}></div>
                        <Display isVisible={this.state.fileIsDownloading}>
                          <VideoAd 
                           download={this.state.download} 
                           toggleOffFileIsDownloading={this.toggleOffFileIsDownloading}/>
                        </Display>
                        <Switch>
                          {/* <BottomNav 
                                visitedUrlsLength = {this.props.visitedUrlsLength}
                                isLoggedIn={this.state.isLoggedIn} 
                                previousUrl={this.state.previousUrl}
                               deletePrevUrl={this.deletePrevUrl}/> */}
                        </Switch>
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
       {this.state.sessionReqDone? <AudioPlayer 
            nowPlayingSongId={this.state.nowPlayingSongId} 
            nowPlayingTrackId={this.nowPlayingTrackId} 
            nowPlayingListId={this.state.nowPlayingListId}
            pauseAudio={this.state.pauseAudio}/> : ""}  
       <ScrollUpBtn />     
      </div>
      );
      } 
}