import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loader(props){
    return(<div className="centered" style={{
           position: "fixed",
           top: "50%",
           left: "50%",
           transform: "translate(-50%, -50%)",
           textAlign: "center"
       }}>
       <CircularProgress disableShrink color={props.color || "secondary"}/>
         <h3>{props.loaderContent}</h3>
       </div>);
 }