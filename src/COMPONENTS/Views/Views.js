import React from "react";
import { Route, Switch } from "react-router-dom";
import VideoAd from "../Includes/VideoAd/VideoAd";
import HomePage from "./HomePage/HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import SinglePostPage from "./SinglePostPage/SinglePostPage";
import SingleUserPage from "./SingleUserPage/SingleUserPage";
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
              <Route path="/song/:title/:id" exact component={props => <SinglePostPage  updateNowPlayingSongId={this.props.updateNowPlayingSongId} UserInfo={this.props.UserInfo} postId={props.match.params.id} changeHeaderTheme={this.props.changeHeaderTheme}/>} />  {/* singlepost page route */}
              <Route path="/user/:username" exact component={props => <SingleUserPage  UserInfo={this.props.UserInfo} postId={props.match.params.id} />} />  {/* singleuser page route */}
              
               <Route path="/" component={props => <VideoAd/>} />  
              {/*<Route path="/" component={props => <HomePage/>} />  home route */}
              <Route component={props => <NotFoundPage/>} /> {/* 404 route */}
         </Switch>
      );
      } 
}