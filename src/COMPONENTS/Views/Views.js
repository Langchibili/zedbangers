import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import SinglePostPage from "./SinglePostPage/SinglePostPage";
import UploadPage from "./UploadPage/UploadPage";

export default class Views extends React.Component{
    renderUploadPages = ()=>{
        if(this.props.UserInfo){
            return(
                <Route path="/upload/:post_type" exact component={props => <UploadPage UserInfo={this.props.UserInfo} post_type={props.match.params.post_type}/>} /> /* upload page route */
            );
        }
        else{
            window.location = "/signup.html";
        }
    }
   render(){
    return ( 
         <Switch>
              {this.renderUploadPages() } {/* the uploads routes */}
              <Route path="/song/:title/:id" exact component={props => <SinglePostPage  updateNowPlayingSongId={this.props.updateNowPlayingSongId} UserInfo={this.props.UserInfo} postId={props.match.params.id}/>} />  {/* singlepost page route */}
              <Route component={props => <HomePage/>} /> {/* home route */}
         </Switch>
      );
      } 
}