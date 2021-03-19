import React from "react";
import { Route, Switch } from "react-router-dom";
//import VideoAd from "../Includes/VideoAd/VideoAd";
import HomePage from "./HomePage/HomePage";
import NewsFeed from "./NewsFeed/NewsFeed";
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
import ManageEmbedsEditFormPage from "./ManageEmbedsEditPage/ManageEmbedsFormPage";
import ManageEmbedsEditPage from "./ManageEmbedsEditPage/ManageEmbedsEditPage";
import ManageEmbedsDeletePage from "./ManageEmbedsEditPage/ManageEmbedsDeletePage";
import ManageEmbedsDeleteFinalPage from "./ManageEmbedsEditPage/ManageEmbedsDeleteFinalPage";
import SearchResultsPage from "./SearchResultsPage/SearchResultsPage";
import SingleEmbedPage from "./SingleEmbedPage/SingleEmbedPage";
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
   
   
   render(){
    return ( 
         <Switch>
              {/*{this.renderUploadPages() }  the uploads routes */}
              <Route path="/logout" exact component={props => <Logout/>} /> {/* logout route */}
              <Route path="/profile/update" exact component={props => this.props.UserInfo? <UserUpdatePage logUrl={this.props.logUrl} UserInfo={this.props.UserInfo}/> : <NotFoundPage logUrl={this.props.logUrl}/>} /> {/* logout route */}
              <Route path="/posts/edit" exact component={props => this.props.UserInfo? <ManagePostsEditPage 
                           logUrl={this.props.logUrl}
                           UserInfo={this.props.UserInfo} 
                           pauseAudio={this.props.pauseAudio}
                           nowPlayingTrackId={this.props.nowPlayingTrackId}
                           updateNowPlayingSongId={this.props.updateNowPlayingSongId}/> : <NotFoundPage logUrl={this.props.logUrl}/>} />  {/* ManagePostsEditPage page route */}
              <Route path="/posts/delete" exact component={props => this.props.UserInfo? <ManagePostsDeletePage 
                            logUrl={this.props.logUrl}
                            UserInfo={this.props.UserInfo}
                            pauseAudio={this.props.pauseAudio}
                            nowPlayingTrackId={this.props.nowPlayingTrackId}
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId} /> : <NotFoundPage logUrl={this.props.logUrl}/>} />  {/* ManagePostsDeletePage page route */}
              {/* <Route path="/user/:username" exact component={props => <SingleUserPage  UserInfo={this.props.UserInfo} postId={props.match.params.id} />} /> */} {/* singleuser page route */}
              <Route path="/embeds/edit" exact component={props => this.props.UserInfo? <ManageEmbedsEditPage
                           logUrl={this.props.logUrl}
                           UserInfo={this.props.UserInfo} 
                           pauseAudio={this.props.pauseAudio}
                           nowPlayingTrackId={this.props.nowPlayingTrackId}
                           updateNowPlayingSongId={this.props.updateNowPlayingSongId}/> : <NotFoundPage logUrl={this.props.logUrl}/>} />  {/* ManageEmbedsEditPage page route */}
               <Route path="/embeds/delete" exact component={props => this.props.UserInfo? <ManageEmbedsDeletePage
                           logUrl={this.props.logUrl}
                           serInfo={this.props.UserInfo} 
                           pauseAudio={this.props.pauseAudio}
                           nowPlayingTrackId={this.props.nowPlayingTrackId}
                           updateNowPlayingSongId={this.props.updateNowPlayingSongId}/> : <NotFoundPage logUrl={this.props.logUrl}/>} />  {/* ManageEmbedsEditPage page route */}
              <Route path="/account_verification/:username" exact component={props => <AccountVerification  logUrl={this.props.logUrl} match={props.match} />} />  {/* AccountVerification page route */}
              <Route path="/account_verification/:username" exact component={props => <AccountVerification  logUrl={this.props.logUrl} match={props.match} />} />  {/* AccountVerification page route */}
              <Route path="/signup" exact component={props => !this.props.UserInfo? <SignUp logUrl={this.props.logUrl}/>: <div>You already have an account.</div>} /> {/* signup route */}
              <Route path="/login" exact component={props => !this.props.UserInfo? <Login logUrl={this.props.logUrl}/> : <div>You are already loged in.</div>} /> {/* login route */}
              <Route path="/upload/:post_type" exact component={props => <UploadPage logUrl={this.props.logUrl} UserInfo={this.props.UserInfo} post_type={props.match.params.post_type}/>} /> {/* upload page route */}
              <Route path="/search/:keyword" exact component={props => <SearchResultsPage 
                            logUrl={this.props.logUrl}
                            keyword={props.match.params.keyword}
                            pauseAudio={this.props.pauseAudio}
                            nowPlayingTrackId={this.props.nowPlayingTrackId}
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}/>} /> {/* search route */}
              <Route path="/post/edit/:title/:id" exact component={props => this.props.UserInfo? <ManagePostsEditFormPage logUrl={this.props.logUrl} UserInfo={this.props.UserInfo} postId={props.match.params.id} /> : <NotFoundPage/>} />  {/* singlepost page route */}
              <Route path="/post/delete/:title/:id" exact component={props => this.props.UserInfo? <ManagePostsDeleteFinalPage logUrl={this.props.logUrl} UserInfo={this.props.UserInfo} postId={props.match.params.id} /> : <NotFoundPage/>} />  {/* singlepost page route */}
              <Route path="/embed/edit/:title/:id" exact component={props => this.props.UserInfo? <ManageEmbedsEditFormPage logUrl={this.props.logUrl} UserInfo={this.props.UserInfo} postId={props.match.params.id} /> : <NotFoundPage/>} />  {/* singlepost page route */}
              <Route path="/embed/delete/:title/:id" exact component={props => this.props.UserInfo? <ManageEmbedsDeleteFinalPage logUrl={this.props.logUrl} UserInfo={this.props.UserInfo} postId={props.match.params.id} /> : <NotFoundPage/>} />  {/* singlepost page route */}
              <Route path="/song/:title/:id" exact component={props => <SinglePostPage 
                            logUrl={this.props.logUrl}
                            nowPlayingTrackId={this.props.nowPlayingTrackId} 
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                            pauseAudio={this.props.pauseAudio}
                            updateDownload={this.props.updateDownload}
                            toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                            UserInfo={this.props.UserInfo}
                            postId={props.match.params.id} 
                            match={props.match} 
                            />} />  {/* single song page route */}  
               <Route path="/embed/:title/:id" exact component={props => <SingleEmbedPage 
                            logUrl={this.props.logUrl}
                            nowPlayingTrackId={this.props.nowPlayingTrackId} 
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                            pauseAudio={this.props.pauseAudio}
                            updateDownload={this.props.updateDownload}
                            toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                            UserInfo={this.props.UserInfo}
                            postId={props.match.params.id} 
                            match={props.match} 
                            />} />  {/* single embed page route */}               
               <Route path="/playlist/:title/:id" exact component={props => <SinglePlayListPage 
                            logUrl={this.props.logUrl}
                            nowPlayingTrackId={this.props.nowPlayingTrackId} 
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                            pauseAudio={this.props.pauseAudio}
                            updateDownload={this.props.updateDownload}
                            toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                            updateNowPlayingListId={this.props.updateNowPlayingListId}
                            UserInfo={this.props.UserInfo}
                            playListId={props.match.params.id} 
                            match={props.match}/>} />  {/* single playlist page route */}                                         
               <Route path="/user/:username" exact component={props => <SingleUserPage 
                            logUrl={this.props.logUrl}
                            nowPlayingTrackId={this.props.nowPlayingTrackId} 
                            updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                            updateNowPlayingListId={this.props.updateNowPlayingListId}
                            pauseAudio={this.props.pauseAudio}
                            updateDownload={this.props.updateDownload}
                            username={props.match.params.username}
                            toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                            UserInfo={this.props.UserInfo} />} />  {/* singleuserpage route */}
               <Route path="/newsfeed" component={props => this.props.UserInfo? <NewsFeed
                         logUrl={this.props.logUrl}
                         pauseAudio={this.props.pauseAudio}
                         nowPlayingTrackId={this.props.nowPlayingTrackId}
                         updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                         updateNowPlayingListId={this.props.updateNowPlayingListId}
                         updateDownload={this.props.updateDownload}
                         toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                         UserInfo={this.props.UserInfo}/>: <Login logUrl={this.props.logUrl}/>} /> {/* newsfeed route */}
              <Route path="/" component={props => <HomePage
                           logUrl={this.props.logUrl}
                           pauseAudio={this.props.pauseAudio}
                           nowPlayingTrackId={this.props.nowPlayingTrackId}
                           updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                           updateNowPlayingListId={this.props.updateNowPlayingListId}
                           updateDownload={this.props.updateDownload}
                           toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}
                           UserInfo={this.props.UserInfo}/>} /> {/* home route */}
               
              <Route component={props => <NotFoundPage logUrl={this.props.logUrl}/>} /> {/* 404 route */}
         </Switch>
      );
      } 
}