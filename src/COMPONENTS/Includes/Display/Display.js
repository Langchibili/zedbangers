import React from "react";

export default class Display extends React.Component{
    constructor(props){
        super(props);
        this.isVisible = this.isVisible.bind(this);
    }
    isVisible(){
        if(this.props.isVisible){
            return "block";
        }
        else{
            return "none";
        }
    }
    render(){
        return( 
            <div style={{display:this.isVisible()}} className={this.props.className}>{this.props.children}</div>
        );
    }
}