import React from "react";
import api from "../../../Store/api";


export default class FileDownloader extends React.Component{
  componentDidMount(){
     // const downloadUri = await api.getItemById("/posts",this.props.downloadId,"")
    // construct donwload link
    //fire download
  }
    
    render(){ 
        return(
        <div className="video-ad-container">
                    downloading ......, {this.props.downloadId}
        </div>
        );
    }
}
