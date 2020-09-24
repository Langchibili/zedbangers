import React from "react";

export default class ActionButton extends React.Component{ 
   

  renderActionType = ()=>{
    const action_type = this.props.action_type;

    if(action_type === "play"){
    return <Song song={item} key={item._id} list_type={list_type} updateNowPlayingSongId={updateNowPlayingSongId}/>
    }
    else if(action_type === "download"){
    return <div> 
          2.5 seconds for each of the following
                preparing download, this may take upto 30 seconds...
           loading file for download...
           unpacking file...
           optmizing file quality...
           scanning file format for compatibility with your device...
           scanning file for any corruption...
           creating a secured download link...
           file will begin downloading asap the video finishes ...
           thanks for your patience, file is now downloading...
           thank you for downloading the song, please enjoy and come again for more songs
    </div>
    }
    else{
    return <div></div>
    }
   
  }

  render(){
    return ( 
        <ul className="list-group list-group-lg no-radius no-border no-bg m-t-n-xxs m-b-none auto"> 
           {this.renderActionType()}
        </ul>
    );
     } 
}