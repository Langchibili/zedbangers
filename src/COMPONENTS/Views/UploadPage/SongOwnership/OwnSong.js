import React from "react";

export default class OwnSong extends React.Component{
    constructor(props){
        super(props);
        // set text as default, if this.props.initialPostObject is not set
        this.state = {
            copyrightAgreed: false,
            showSongWonershipForm: true
        }
    }
    handleChange = (e)=>{
        const copyrightAgreed = e.target.checked;
        if(copyrightAgreed){
            this.setState({
                copyrightAgreed: copyrightAgreed
            })
        }
    }
    showUploadForm = (e)=>{
        e.preventDefault();
        this.setState({
            showSongWonershipForm: false
        }, ()=>{
            this.props.showUploadForm(this.state.copyrightAgreed, this.state.showSongWonershipForm);
        })  
    }

    render(){
    return (   
        <section style={{padding:"20px"}} className="panel panel-default"> 
            <br/><p>By selecting the option "yes", you are claiming that you own this song, you are also agreeing to being subject for copyright, given you don't own the rights to this song. If it's not your song, any legal actions taken by the onwer agains't you is not our business as an online media plartform, so this is a contract between you and us stating that you have agreed to taking full responsibity for this song. Do you agree to this contract? </p>
            <div className="checkbox i-checks"> <label> <input onChange={this.handleChange} type="checkbox"/><i></i> I agree </label> </div>
            {this.state.copyrightAgreed? <a onClick={this.showUploadForm} href="#" className="btn btn-s-md btn-danger">NEXT</a> : <a onClick={this.showUploadForm} href="#" className="btn btn-s-md btn-default">NEXT</a>}
            <hr/>  
       </section>
        );
      } 
}