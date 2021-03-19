import React from "react";
import "./ScrollUpBtn.css";
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here
 
export default class ScrollUpBtn extends React.Component {
    render() {
        return (
            <div className="scroll-down-button-wrapper">
                <ScrollUpButton />
            </div>
        );
    }
}