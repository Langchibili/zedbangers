import React from "react";
import Filedownloadupdate from "./Filedownloadupdate";


export default class UserExperience extends React.Component{

    renderUx = () =>{
        const uxType = this.props.uxType;
        if(uxType === "file_download_process"){
            return <Filedownloadupdate />
        }
    }

    render(){   
        return(
        this.renderUx()
        );
    }
}
