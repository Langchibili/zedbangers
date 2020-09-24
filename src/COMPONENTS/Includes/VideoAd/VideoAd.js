import React from "react";
import api from "../../../Store/api";
import "./VideoAd.css";
import UserExperience from "../UserExperience/UserExperience";


export default class VideoAd extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        showUx: false
      }
      this.video = React.createRef();
    }

    /*  
    ......video should preload when site is just reached......

    --- the parent component will be the music player, and
    the video will be on top of the screen over the player when in
    mobile mode the palyer takes up the sceen ----
 
     1 if song is at a minute preload the video
     show timer and information on a custom alert that 
          "in 10 seconds we will show an advert"
                 <Link to="faqpage">Why do we show ads?</Link>
    2 when video preloads for 10 seconds, pause song and show video
    3 after ad video reaches the duration limit, hide video ad completely,
      then send a prop to music player to play song again and continue
    4 repeat the same cycle for songs that are 2 minutes and beyond.
    

    if it's a download
    1 when download call to action button is clicked, toggle video then
    repeat above algorithm for streaming song from 2 to 3 skipping 4
    2 begin download of song. And open a thank you pop-up saying
     "thank you for downloading the song, please enjoy and come again for more songs"
    

    */
   renderDownloadProcessUx = (showUx)=>{
     if(showUx){
        return <UserExperience uxType="file_download_process"/>
     }
   }
  componentDidMount(){
    const video = this.video.current;
    video.load();
    video.oncanplay = ()=>{
      video.play();
      this.setState({
        showUx: true
      })
    }
    video.onerror = ()=>{
      video.play();
    }
  }
    
    render(){   
        return(
        <div className="video-ad-container">
          <span>wait while we process your file</span>
          {this.renderDownloadProcessUx(this.state.showUx)}
          <video ref={this.video} width="320" height="240" controls>
           <source src="/files/videos/Chris Brown, Young Thug - Go Crazy (Official Video)[via torchbrowser.com].mp4" type="video/mp4" />
           Your browser does not support the video tag.
          </video>
        </div>
        );
    }
}
