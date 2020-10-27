import React from "react";
import { Route, Switch } from "react-router-dom";
import VideoAd from "../Includes/VideoAd/VideoAd";
import HomePage from "./HomePage/HomePage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import SinglePostPage from "./SinglePostPage/SinglePostPage";
import SingleUserPage from "./SingleUserPage/SingleUserPage";
import UploadPage from "./UploadPage/UploadPage";
import AccountVerification from "./AccountVerification/AccountVerification";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login";
import Logout from "./Logout/LogOut";
import UserUpdatePage from "./UserUpdatePage/UserUpdatePage";

export default class Views extends React.Component{
    
   render(){
    return ( 
         <Switch>
              {/*{this.renderUploadPages() }  the uploads routes */}
              <Route path="/logout" exact component={props => <Logout/>} /> {/* logout route */}
              <Route path="/profile/update" exact component={props => this.props.UserInfo? <UserUpdatePage UserInfo={this.props.UserInfo}/> : <div></div>} /> {/* logout route */}
              <Route path="/upload/:post_type" exact component={props => <UploadPage UserInfo={this.props.UserInfo} post_type={props.match.params.post_type}/>} /> {/* upload page route */}
              <Route path="/user/:username" exact component={props => <SingleUserPage  UserInfo={this.props.UserInfo} postId={props.match.params.id} />} />  {/* singleuser page route */}
              <Route path="/account_verification/:username" exact component={props => <AccountVerification  match={props.match} />} />  {/* AccountVerification page route */}
              <Route path="/signup" exact component={props => <SignUp />} /> {/* signup route */}
              <Route path="/login" exact component={props => <Login />} /> {/* login route */}
              <Route path="/song/:title/:id" exact component={props => <SinglePostPage  
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                            updateDownload={this.props.updateDownload}
                            toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                            UserInfo={this.props.UserInfo}
                            postId={props.match.params.id} 
                            changeHeaderTheme={this.props.changeHeaderTheme}/>} />  {/* singlepost page route */}
               <Route path="/user/:username" exact component={props => <SingleUserPage  
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                            updateDownload={this.props.updateDownload}
                            username={props.match.params.username}
                            toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                            UserInfo={this.props.UserInfo} />} />  {/* singleuserpage route */}
              <Route path="/" component={props => <HomePage
                           updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                           updateDownload={this.props.updateDownload}
                           toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                           UserInfo={this.props.UserInfo}/>} /> {/* home route */}
              <Route component={props => <NotFoundPage/>} /> {/* 404 route */}
         </Switch>
      );
      } 
}