import React from "react";
import { Redirect } from "react-router-dom";;

export default class HomeButton extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            gohome: false
        }
    }
    redirectHome = ()=>{
        if(this.state.gohome){
              return <Redirect to="/"/>
        }
      }
    handleButtonClick = (e)=>{
      e.preventDefault();
      this.setState({
          gohome: true
      })
    }
  render(){
    return ( 
        <div>
        <button onClick={this.handleButtonClick}>Home</button>
        {this.redirectHome()}
        </div>
    );
    } 
}