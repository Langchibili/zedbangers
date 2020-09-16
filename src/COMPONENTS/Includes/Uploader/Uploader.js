import React from "react";
import "./Uploader.css";
import AudioUploader from "./AudioUploader/AudioUploader";
import VideoUploader from "./VideoUploader/VideoUploader";
import ImageUploader from "./ImageUploader/ImageUploader";


export default class Uploader extends React.Component{
        constructor(props){
           super(props);
           this.renderUploader = this.renderUploader.bind(this);
        }
        renderUploader(UploaderType, addPhoto, addAudio, addVideo){
            if(UploaderType === "audio"){
                return <AudioUploader 
                addPhoto={addPhoto} 
                addAudio={addAudio}/>;
            }
            else if(UploaderType === "video"){
                return <VideoUploader 
                addPhoto={addPhoto} 
                addVideo={addVideo}/>;
            }
            else {
                return <ImageUploader addPhoto={addPhoto}/>;
            } 
        }
        render(){
            return(
                <div>
                    {this.renderUploader(this.props.UploaderType,this.props.addPhoto, this.props.addAudio, this.props.addVideo,)}
                </div>
            );
        }
}

