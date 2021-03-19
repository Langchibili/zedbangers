import React from "react";
import OwnSong from "./OwnSong";
import NotOwnSong from "./NotOwnSong";

export default class SongOwnership extends React.Component{
    constructor(props){
        super(props);
        // set text as default, if this.props.initialPostObject is not set
        this.state = {
            authorIsSongArtist: false
        }
    }
    yesSelect = (e)=>{
        this.setState({
            authorIsSongArtist: true,
            authorIsSongOwner: "yes"
         })
    }
    noSelect = (e)=>{
        this.setState({
            authorIsSongArtist: false,
            authorIsSongOwner: "no"
         })
    }
    render(){
    return (   
        <section className="panel panel-default"> 
            <h3 style={{padding: "20px"}}>Are you the artist of this song? </h3>
            <div className="col-sm-10"> 
              <div className="radio-inline"> 
                 <label> <input onChange={this.yesSelect} type="radio" name="optionsRadios" id="optionsRadios1"/> Yes </label> 
              </div>
              <div className="radio-inline"> 
                 <label> <input onChange={this.noSelect} type="radio" name="optionsRadios" id="optionsRadios2"/> No</label> 
             </div>
             </div> 
             <div>
                {this.state.authorIsSongOwner === "yes" ? <OwnSong showUploadForm={this.props.showUploadForm}/> : ''}
                {this.state.authorIsSongOwner === "no" ? <NotOwnSong showUploadForm={this.props.showUploadForm} changeArtist={this.props.changeArtist} /> : ''}
             </div>
       </section>
        );
      } 
}