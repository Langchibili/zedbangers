import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import UploadPage from "./UploadPage/UploadPage";

export default class Views extends React.Component{
    UserInfo = {
       username: "langson",
       niceName: "Langson chibili",
       picture: {
           small: "image.jpg"
       },
       _id: "ahdkkkajlfjjffsssjal"
    }
   render(){
    return ( 
         <Switch>
              <Route path="/uploadsong" exact component={props => <UploadPage UserInfo={this.UserInfo} post_type="music"/>} /> {/* home route */}
              <Route path="/uploadvideo" exact component={props => <UploadPage UserInfo={this.UserInfo} post_type="video"/>} /> {/* home route */}
              <Route component={props => <HomePage/>} /> {/* home route */}
         </Switch>
      );
      } 
}