import React from "react";
import "./NewVideoForm.css";
import Uploader from "../../../Includes/Uploader/Uploader";

function Fields(props) {
    
  return (
    <div style={{textAlign:"left"}}>
      <h5>Upload Video</h5> 
      <Uploader addVideo={props.addVideo} UploaderType="video"/>
      <h5>Video Thumbnail</h5> 
      <Uploader addPhoto={props.addPhoto} UploaderType="image"/>
    </div>
  );
}


export default class NewVideoForm extends React.Component{

        render(){
            return(
                <div>
                    <Fields addVideo={this.props.addVideo} addPhoto={this.props.addPhoto}/>
                </div>
            );
        }
}
