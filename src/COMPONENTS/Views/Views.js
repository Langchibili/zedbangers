import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage/HomePage";

export default class Views extends React.Component{
   render(){
    return ( 
         <Switch>
              <Route component={props => <HomePage />} /> {/* home route */}
         </Switch>
      );
      } 
}