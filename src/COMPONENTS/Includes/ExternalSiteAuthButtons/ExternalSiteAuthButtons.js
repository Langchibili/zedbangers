import React from "react";
import FacebookAuth from "./FacebookAuth";
import GoogleAuth from "./GoogleAuth";
import ThenetworkZambiaAuth from "./ThenetworkZambiaAuth";

export default class ExternalSiteAuthButtons extends React.Component{ 
  
  render(){
    return (
        <div>
              {/* <div>Continue With: </div>
              <hr/> */}
              {/* <div> <FacebookAuth /></div> <br /> */}
              <div> <GoogleAuth /></div> 
              <hr/>
        </div>
    );
  } 
}