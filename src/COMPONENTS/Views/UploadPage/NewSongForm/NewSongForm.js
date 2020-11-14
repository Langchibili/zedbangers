import React from "react";
import "./NewSongForm.css";
import Uploader from "../../../Includes/Uploader/Uploader";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Radio from "@material-ui/core/Radio";



  function LyricRadioButtons(props) {
    const getSelectedLyricsType = props.getSelectedLyricsType;
    const [selectedValue, setSelectedValue] = React.useState("no");
  
    const handleChange = (event) => {
      setSelectedValue(event.target.value);
      getSelectedLyricsType(event.target.value);
    };
  
    return (
      <div>
         <Radio
            checked={selectedValue === "yes"}
            onChange={handleChange}
            value="yes"
            name="radio-button-demo"
            inputProps={{ 'aria-label': "yes"}}
              />
              <label> Yes </label>
        <Radio
            checked={selectedValue === "no"}
            onChange={handleChange}
            value="no"
            name="radio-button-demo"
            inputProps={{ "aria-label": "no" }}
        />
             <label>No</label> 
      </div>
    );
  }


function GenresSelector(props) {
   const addGenre = props.addGenre;
   const removeGenre = props.removeGenre;
   const genres = ["hip-hop", "rnb", "gospel", "rock", "pop", "folk", "gospel-hip-hop", "gospel-rnb", "afro-beats", "dance", "electric", "parody"]
    return (
      <div>
        <Autocomplete
          multiple
          style={{width: "100%"}}
          id="tags-outlined"
          options={genres}
          onChange={(event, value, reason)=>{
            addGenre(value[value.length-1]);
            if(reason === "remove-option"){
              removeGenre(value);
            }
            else if(reason === "clear"){
              removeGenre("clear");
            }
          }}
          getOptionLabel={(option) => option}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              fullWidth
              {...params}
              variant="outlined"
              margin = "normal"
              label="genres"
              placeholder="genres"
            />
          )}
        />
        
      </div>
    );
  };

function Fields(props) {
  return (
    <div style={{textAlign:"left"}}>
      <h5>Audio File</h5>
      <Uploader addAudio={props.addAudio} UploaderType="audio"/>
      <h5>Music Art</h5>
      <Uploader addPhoto={props.addPhoto} UploaderType="image"/>
      <GenresSelector addGenre={props.addGenre} removeGenre={props.removeGenre} genres={props.genres}/>
      <h5>Are The Lyrics Explicit? </h5>
      <LyricRadioButtons getSelectedLyricsType={props.getSelectedLyricsType}/>
    </div>
  );
}







export default class NewSongForm extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                isExplicit: false
            }
            this.getSelectedLyricsType = this.getSelectedLyricsType.bind(this);
        }
        changeHeaderTheme = () =>{
          const header = document.getElementById("header");
          const pathArray  = window.location.pathname.split("/");
          if(pathArray[1] === "song"){
               header.className = header.className.replace("bg-white-only","bg-black lter");
          }
          else{
               header.className = header.className.replace("bg-black lter","bg-white-only");
          }
        }
        componentWillMount(){
          this.changeHeaderTheme();
        }
        getSelectedLyricsType(value){
            if(value === "yes"){
                let updatedStated = {
                    isExplicit: true
                }
               
                this.setState(updatedStated,this.props.toggleLyricsType(true));
            }
            else{
                let updatedStated = {
                    isExplicit: false
                }
               
                this.setState(updatedStated,this.props.toggleLyricsType(false))
            }
        }

        render(){
            return(
                <div>
                    <Fields 
                     addAudio={this.props.addAudio}
                     addPhoto={this.props.addPhoto}
                     songOwner={this.props.songOwner}
                     addGenre={this.props.addGenre}
                     removeGenre={this.props.removeGenre} 
                     getSelectedLyricsType={this.getSelectedLyricsType}
                     />
                </div>
            );
        }
}
