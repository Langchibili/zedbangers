import React from "react";
import { Redirect } from "react-router-dom";;

export default class BackBtn extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            goback: false,
            previousUrl: this.props.previousUrl
        }
    }
    goBack = ()=>{
        if(this.state.goback){
              return <Redirect to={this.state.previousUrl}/>
        }
      }
    handleButtonClick = (e)=>{
      e.preventDefault();
      this.setState({
        goback: true
      })
    }
  render(){
    return ( 
        <div>
        <button onClick={this.handleButtonClick}>Back</button>
        {this.goBack()}
        </div>
    );
    } 
}