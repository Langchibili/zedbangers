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
import ManagePostsEditFormPage from "./ManagePostsPage/ManagePostsEditFormPage";
import ManagePostsEditPage from "./ManagePostsPage/ManagePostsEditPage";
import ManagePostsDeletePage from "./ManagePostsPage/ManagePostsDeletePage";
import ManagePostsDeleteFinalPage from "./ManagePostsPage/ManagePostsDeleteFinalPage";
import SearchResultsPage from "./SearchResultsPage/SearchResultsPage";
import SinglePlayListPage from "./SinglePLayListPage/SinglePlayListPage";

export default class Views extends React.Component{
  changeHeaderTheme = () =>{
     const header = document.getElementById("header");
     const pathArray  = window.location.pathname.split("/");
     if(pathArray[1]){
          header.className = header.className.replace("bg-white-only","bg-black lter");
     }
     else{
          header.className = header.className.replace("bg-black lter","bg-white-only");
     }
   }
   shouldComponentUpdate(nextProp){
        const updateView = nextProp.updateView;
        return updateView;
   }  
   componentWillMount(){
        this.changeHeaderTheme();
   }
   componentDidUpdate(){
        this.props.logUrl();
   }
   render(){
    return ( 
         <Switch>
              {/*{this.renderUploadPages() }  the uploads routes */}
              <Route path="/logout" exact component={props => <Logout/>} /> {/* logout route */}
              <Route path="/profile/update" exact component={props => this.props.UserInfo? <UserUpdatePage UserInfo={this.props.UserInfo}/> : <NotFoundPage/>} /> {/* logout route */}
              <Route path="/posts/edit" exact component={props => this.props.UserInfo? <ManagePostsEditPage 
                           UserInfo={this.props.UserInfo} 
                           pauseAudio={this.props.pauseAudio}
                           nowPlayingTrackId={this.props.nowPlayingTrackId}
                           updateNowPlayingSongId={this.props.updateNowPlayingSongId}/> : <NotFoundPage/>} />  {/* ManagePostsEditPage page route */}
              <Route path="/posts/delete" exact component={props => this.props.UserInfo? <ManagePostsDeletePage 
                            UserInfo={this.props.UserInfo}
                            pauseAudio={this.props.pauseAudio}
                            nowPlayingTrackId={this.props.nowPlayingTrackId}
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId} /> : <NotFoundPage/>} />  {/* ManagePostsDeletePage page route */}
              {/* <Route path="/user/:username" exact component={props => <SingleUserPage  UserInfo={this.props.UserInfo} postId={props.match.params.id} />} /> */} {/* singleuser page route */}
              <Route path="/account_verification/:username" exact component={props => <AccountVerification  match={props.match} />} />  {/* AccountVerification page route */}
              <Route path="/signup" exact component={props => !this.props.UserInfo? <SignUp />: <div>You already have an account.</div>} /> {/* signup route */}
              <Route path="/login" exact component={props => !this.props.UserInfo? <Login /> : <div>You are already loged in.</div>} /> {/* login route */}
              <Route path="/upload/:post_type" exact component={props => <UploadPage UserInfo={this.props.UserInfo} post_type={props.match.params.post_type}/>} /> {/* upload page route */}
              <Route path="/search/:keyword" exact component={props => <SearchResultsPage 
                            keyword={props.match.params.keyword}
                            pauseAudio={this.props.pauseAudio}
                            nowPlayingTrackId={this.props.nowPlayingTrackId}
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}/>} /> {/* search route */}
              <Route path="/post/edit/:title/:id" exact component={props => this.props.UserInfo? <ManagePostsEditFormPage UserInfo={this.props.UserInfo} postId={props.match.params.id} /> : <NotFoundPage/>} />  {/* singlepost page route */}
              <Route path="/post/delete/:title/:id" exact component={props => this.props.UserInfo? <ManagePostsDeleteFinalPage UserInfo={this.props.UserInfo} postId={props.match.params.id} /> : <NotFoundPage/>} />  {/* singlepost page route */}
              <Route path="/song/:title/:id" exact component={props => <SinglePostPage 
                            nowPlayingTrackId={this.props.nowPlayingTrackId} 
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                            pauseAudio={this.props.pauseAudio}
                            updateDownload={this.props.updateDownload}
                            toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                            UserInfo={this.props.UserInfo}
                            postId={props.match.params.id} 
                            match={props.match} 
                            changeHeaderTheme={this.props.changeHeaderTheme}/>} />  {/* singlepost page route */}  
               <Route path="/playlist/:title/:id" exact component={props => <SinglePlayListPage 
                            nowPlayingTrackId={this.props.nowPlayingTrackId} 
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                            pauseAudio={this.props.pauseAudio}
                            updateDownload={this.props.updateDownload}
                            toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                            updateNowPlayingListId={this.props.updateNowPlayingListId}
                            UserInfo={this.props.UserInfo}
                            playListId={props.match.params.id} 
                            match={props.match} 
                            changeHeaderTheme={this.props.changeHeaderTheme}/>} />  {/* single playlist page route */}                                         
               <Route path="/user/:username" exact component={props => <SingleUserPage 
                            nowPlayingTrackId={this.props.nowPlayingTrackId} 
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                            updateNowPlayingListId={this.props.updateNowPlayingListId}
                            pauseAudio={this.props.pauseAudio}
                            updateDownload={this.props.updateDownload}
                            username={props.match.params.username}
                            toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                            UserInfo={this.props.UserInfo} />} />  {/* singleuserpage route */}
              <Route path="/" component={props => <HomePage
                           pauseAudio={this.props.pauseAudio}
                           nowPlayingTrackId={this.props.nowPlayingTrackId}
                           updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                           updateNowPlayingListId={this.props.updateNowPlayingListId}
                           updateDownload={this.props.updateDownload}
                           toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                           UserInfo={this.props.UserInfo}/>} /> {/* home route */}
              <Route component={props => <NotFoundPage/>} /> {/* 404 route */}
         </Switch>
      );
      } 
}