import React from "react";
import Uploader from "../../Includes/Uploader/Uploader";
import api from "../../../Store/api";

export default class UserUpdatePage extends React.Component{
    constructor(props){
        super(props);
        // set intial user object
        this.state = {
            ...this.props.UserInfo,
            buttonState: {backgroundColor: "lightgrey",disabled:true},
            postingText: "update"
        }
        this.aboutUser = React.createRef();
     }
      
     setAboutInfo = ()=>{
          const aboutUser = this.aboutUser.current.value;
          const location = this.state.bio.location;
          this.setState({
            bio: {
                about: aboutUser,
                location: location
            },
            buttonState: {backgroundColor:"#cd0829",disabled:false}
          });
      }
     
      setFirstName = (e)=>{
          const firstName = e.target.value;
          const initialFirstName = this.state.first_name;
          const niceName = this.state.niceName;
          niceName.replace(initialFirstName, firstName)
          this.setState({
            first_name: firstName,
            niceName: niceName,
            buttonState: {backgroundColor:"#cd0829",disabled:false}
          });
      }
      setLastName = (e)=>{
          const lastName = e.target.value;
          const initiallastName = this.state.last_name;
          const niceName = this.state.niceName;
          niceName.replace(initiallastName, lastName)
          this.setState({
            last_name: lastName,
            niceName: niceName,
            buttonState: {backgroundColor:"#cd0829",disabled:false}
          });
    }

    setLocation= (e)=>{
        const location = e.target.value;
        const aboutUser = this.state.bio.about;
        this.setState({
          bio: {
              location: location,
              about: aboutUser
          }
        });
  } 

    addPhoto = (photoObject) =>{
        this.setState({
            picture_big: photoObject.cover,
            picture: photoObject
        })
     }


      handleSubmit = (e) =>{
          e.preventDefault();
          this.setState({
            postingText: "updating..."
          },async ()=>{
            let updateObject = Object.assign({}, this.state);
            delete updateObject.buttonState; // remove buttonstate property from state 
            delete updateObject.postingText; // remove postingText property from state 
            const userUpdated =  await api.updateItem("/users",updateObject, this.props.UserInfo._id);
            if(userUpdated){this.setState({postingText: "done",buttonState: {backgroundColor: "lightgrey",disabled:true}})}
          })
      } 

   render(){
    return (   
        <section className="panel panel-default"> 
        <header className="panel-heading font-bold">Update Profile</header>   
        <div className="panel-body"> 
        <form role="form">  
        <div className="form-group"><input type="text" className="form-control" placeholder={this.state.first_name} defaultValue={this.state.first_name} onChange={this.setFirstName} /> </div> 
        <div className="form-group"><input type="text" className="form-control" placeholder={this.state.last_name} defaultValue={this.state.last_name} onChange={this.setLastName} /></div>
        <div className="form-group"><input type="text" className="form-control" placeholder={this.state.bio.location? this.state.bio.location: "unset" } defaultValue={this.state.bio.location? this.state.bio.location: "unset" } onChange={this.setLocation} /></div>
        <h5>Change Profile Picture</h5>
        <Uploader addPhoto={this.addPhoto} UploaderType="image"/>
        <div><img src={this.state.picture_big} style={{maxWidth: 200, marginBottom: "10px"}}/></div>
        <div className="form-group">
        <textarea id="editor" onChange={this.setAboutInfo} ref={this.aboutUser} className="form-control" style={{overflow: 'scroll', height: '150px', maxHeight: '150px'}} defaultValue={this.state.bio.about} />
        </div>
        <br/>
        <button className="btn btn-sm btn-default" onClick={this.handleSubmit} disabled={this.state.buttonState.disabled} style={{backgroundColor: this.state.buttonState.backgroundColor, color:"white !important", fontWeight:"bold"}}>{this.state.postingText}</button>
        </form> 
        </div> 
       </section>
        );
      } 
}