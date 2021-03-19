import React from "react";
import "./EmptyContent.css";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
//import gif from "../../../resources/icons/animasi-emptystate.gif";
export default class EmptyContent extends React.Component{
    
    renderEmptyContent= () => {
           return (
            <div className="gif-container">
                {/* <img src={gif} alt="Snow" style={{width:"100%"}} /> */}
                <div className="centered">{this.props.header}</div>
                <div className="bottom-right">
                 {this.props.hideButton || <Button variant="contained"color="secondary" startIcon={this.props.buttonIcon}><Link to="/follow">{this.props.buttonText}</Link></Button>}
                </div>
            </div>
            );
        }
    
    render(){
        return (this.renderEmptyContent());
    }
}