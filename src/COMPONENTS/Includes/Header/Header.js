import React from "react";
import "./Header.css";
import blankProfilePic from "../../../constants/blankprofile.png";
import musicwebapplogo from "../../../constants/musicwebapplogo.png";
import { Link, Redirect } from "react-router-dom";
import Display from "../Display/Display";

export default class Header extends React.Component{
    constructor(props){
          super(props);
          this.state = {
                keyword: null,
                searchRedirect: false,
                showSearchBar: false
          }
    }  
    showSearchBar = (e)=>{
          e.preventDefault();
          this.setState({
                showSearchBar: true
          })
    }
    hideSearchBar = (e)=>{
      e.preventDefault();
      this.setState({
            showSearchBar: false
      })
    }
    handleSearch = (e)=>{
         e.preventDefault();
         this.setState({
               searchRedirect: true
         })
    }
    getKeyWord = (e)=>{
         const keyword = e.target.value;
         this.setState({
               keyword: keyword
         })
    }
    searchRedirect = ()=>{
      if(this.state.searchRedirect){
            return <Redirect to={"/search/"+this.state.keyword}/>;
      }
    }
   render(){
         return (
            <header id="header" className="bg-white-only header header-md navbar navbar-fixed-top-xs"> 
            <Display isVisible={this.state.showSearchBar}>
                  <form className="navbar-form navbar-left input-s-lg m-t m-l-n-xs .xs-search-wrapper" role="search"> 
                  
                  <div className="form-group"> 
                  
                  <div className="input-group xs-search-bar"> 
                  
                  <span className="input-group-btn"> <button onClick={this.handleSearch} type="submit" className="btn btn-sm bg-white btn-icon rounded"><i className="fa fa-search" /></button> 
                  </span> 
                  <input type="text" onChange={this.getKeyWord} className="form-control input-sm no-border rounded" placeholder="Search songs, albums..." /> 
                  <span className="close-icon"> <a href="#" onClick={this.hideSearchBar}><i className="fa fa-times" /></a></span>
                  {this.searchRedirect()}
                  </div> 
                  </div> 
                  </form> 
            </Display>
            <Display isVisible={!this.state.showSearchBar}>
            <div className="navbar-header aside bg-info dk">
               <a className="btn btn-link visible-xs" data-toggle="class:nav-off-screen,open" data-target="#nav,html"> 
               <i className="icon-list" /> </a> 
               <div className="navbar-brand text-lt"> 
                  <i className="icon-earphones" /> 
                  <img src="images/logo.png" alt="." className="hide" /> 
                     <span className="hidden-nav-xs m-l-sm">{/*<img src={musicwebapplogo} style={{width:"200px",height:"200px"}}/>*/} <a href="/">AMALEVELS</a></span> 
                  <a href="#" className="hidden-md hidden-lg" onClick={this.showSearchBar} style={{marginLeft: "10px"}}><i className="fa fa-search" /></a>
               </div> 
            <a className="btn btn-link visible-xs" data-toggle="dropdown" data-target=".user"> <i className="icon-settings" /> </a> 
            </div> 
            <ul className="nav navbar-nav hidden-xs"> 
            <li> <a href="#nav,.navbar-header" data-toggle="class:nav-xs,nav-xs" className="text-muted"> <i className="fa fa-indent text" /> <i className="fa fa-dedent text-active" /> </a> </li> 
            </ul> 
            
            <form className="navbar-form navbar-left input-s-lg m-t m-l-n-xs hidden-xs" role="search"> 
            
            <div className="form-group"> 
            
            <div className="input-group"> 
            
            <span className="input-group-btn"> <button onClick={this.handleSearch} type="submit" className="btn btn-sm bg-white btn-icon rounded"><i className="fa fa-search" /></button> 
            </span> 
            <input type="text" onChange={this.getKeyWord} className="form-control input-sm no-border rounded" placeholder="Search songs, albums..." /> 
            {this.searchRedirect()}
            </div> 
            </div> 
            </form> 
            
            <div className="navbar-right "> 
            <ul className="nav navbar-nav m-n hidden-xs nav-user user"> 
            <li className="hidden-xs"> 
            {this.props.isLoggedIn? <a href="#" className="dropdown-toggle lt" data-toggle="dropdown"> 
            <i className="icon-bell" /> 
            
             <span className="badge badge-sm up bg-danger count" style={{display: 'inline-block'}}> 3
            </span> </a> : ""}
            
            <section className="dropdown-menu aside-xl animated fadeInUp"> <section className="panel bg-white"> 
            
            <div className="panel-heading b-light bg-light"> <strong>You have 
            
            <span className="count-err" style={{display: 'inline'}}> 3
            </span> notifications</strong> 
            </div> 
            
            <div className="list-group list-group-alt"><a href="#" className="media list-group-item" style={{display: 'block'}}>
            
            <span className="pull-left thumb-sm text-center"><i className="fa fa-envelope-o fa-2x text-success" />
            </span>
            
            <span className="media-body block m-b-none"> Your account is set up for uploading.
            <br /><small className="text-muted">moments ago</small>
            </span></a> <a href="#" className="media list-group-item"> 
            
            <span className="pull-left thumb-sm"> <img src="images/a0.png" alt="..." className="img-circle" /> 
            </span> 
            
            <span className="media-body block m-b-none"> You will be able to receive notifications soon
            <br /> <small className="text-muted">moments ago</small> 
            </span> 
            </a> <a href="#" className="media list-group-item"> 
            <span className="media-body block m-b-none"> Read about the next features
            <br /> <small className="text-muted">moments ago</small> 
            </span> </a> 
            </div> 
            
            <div className="panel-footer text-sm"> <a href="#" className="pull-right"><i className="fa fa-cog" /></a> <a href="#notes" data-toggle="class:show animated fadeInRight">See all the notifications</a> 
            </div> </section> </section> </li> 
            <li className="dropdown"> <a href="#" className="dropdown-toggle bg clear" data-toggle="dropdown"> 
            
            <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm"> <img src={this.props.isLoggedIn? this.props.UserInfo.picture.small : blankProfilePic} alt="..." /> 
            </span> {this.props.isLoggedIn? this.props.UserInfo.niceName : "Howdy There!"}<b className="caret" /> </a> 
            
            {this.props.isLoggedIn? 
           <ul className="dropdown-menu animated fadeInRight"> 
            <li> 
            <span className="arrow top" /> 
                <Link to="/profile/update">update profile</Link>
            </li> 
            <li> 
            <Link to={"/user/"+this.props.UserInfo.username}>view Profile</Link> 
            </li> 
            <li> 
            <a href="#"> 
            <span className="badge bg-danger pull-right">3
            </span> Notifications </a> </li> 
            <li> 
                  <a href="#">Help</a> 
            </li> 
            <li className="divider" /> 
            <li> <Link to="/logout">Logout</Link> </li></ul> : <ul className="dropdown-menu animated fadeInRight"> <li className="divider" /> 
            <li> <Link to="/login">Login</Link> </li><li> <Link to="/signup">Signup</Link> </li></ul>}
            </li> 
            </ul> 
            </div>
            </Display>
            </header>
           );
      } 
}