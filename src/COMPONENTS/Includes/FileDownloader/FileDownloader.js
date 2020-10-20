import React from "react";
import download from "downloadjs";


export default class FileDownloader extends React.Component{
  async componentDidUpdate(){
    // const res = await fetch("http://localhost:1000/downloads/download/?type=audio&filename=Chris Brown - Go Off[via torchbrowser.com].aac");
    // const blob = await res.blob();
    // download(blob, "test.mp3");
    console.log(this.props.downloadObject)
  }
    
    render(){ 
        return(
        <div></div>
        );
    }
}
