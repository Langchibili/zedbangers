import React from "react";
import { Redirect } from "react-router-dom";

export default class ScrowDownBtn extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            godown: true,
            goup: false,
            scrow: false
        }
    }
    scrow = ()=>{
        if(this.state.scrow){
              return this.state.godown? <Redirect to={window.location.pathname+"#bottomDiv"}/>: <Redirect to={window.location.pathname+"#topDiv"}/>;
        }
      }
    handleGoDownButtonClick = (e)=>{
      e.preventDefault();
      this.setState({
          scrow: true,
          godown: false,
          goup: true
      },()=>{
        this.setState({
            scrow: false
        })
      })
    }
    handleGoUpButtonClick = (e)=>{
        e.preventDefault();
        this.setState({
            scrow: true,
            godown: true,
            goup: false
        },()=>{
            this.setState({
                scrow: false
            })
        })
      }
  render(){
    return ( 
        <div>
        {this.state.godown? <button onClick={this.handleGoDownButtonClick}>go down</button> : <button onClick={this.handleGoUpButtonClick}>go up</button>}
        {this.scrow()}
        </div>    
    );
    } 
}