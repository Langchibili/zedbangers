import React from "react";
import "./Follow.css";
import { Link } from "react-router-dom";
import api from "../../../Store/api";

export default class Follow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            following: this.props.following,
            userId: this.props.LoggedInUserId
        }
    }


    handleFollow = async (e)=>{
       e.preventDefault();
       const followObject = {
           userId: this.props.LoggedInUserId,
           otherUserId: this.props.Follow._id
       }
       const res = await api.createItem("/user_following",followObject);
       if(res){
           this.setState({
               following: true
           })
       }
    }
    handleUnFollow = async (e)=>{
        e.preventDefault();
        const followObject = {
            userId: this.props.LoggedInUserId,
            otherUserId: this.props.Follow._id
        }
        const res = await api.deleteItem("/user_following",followObject);
        if(res){
            this.setState({
                following: false
            })
        }
     }
    renderFollow = () => {
       
        if( this.props.followType === "unfollowing" && this.props.displayType === "full"){
            return (<li>
                     <div className="nearly-pepls">
                        <figure>
                        <Link to={"/"+this.props.Follow.username}><img src={this.props.Follow.picture} alt="" /></Link>
                        </figure>
                        <div className="pepl-info">
                           <h4><Link to={"/"+this.props.Follow.username}>{this.props.Follow.niceName}</Link></h4>
                            <span>Author</span>
                            {this.state.following? <a href="#" onClick={this.handleUnFollow} title="" className="add-butn more-action" data-ripple="">unfollow</a> : <a href="#" onClick={this.handleFollow} title="" className="add-butn more-action" data-ripple="">follow</a>}
                        </div>
                    </div>
                 </li>);
        }
        else if(this.props.followType === "following" && this.props.displayType === "full"){
            return (<li>
                <div className="nearly-pepls">
                   <figure>
                   <Link to={"/"+this.props.Follow.username}><img src={this.props.Follow.picture} alt="" /></Link>
                   </figure>
                   <div className="pepl-info">
                      <h4><Link to={"/"+this.props.Follow.username}>{this.props.Follow.niceName}</Link></h4>
                       <span>Author</span>
                       {this.state.following? <a href="#" onClick={this.handleUnFollow} title="" className="add-butn more-action" data-ripple="">unfollow</a> : <a href="#" onClick={this.handleFollow} title="" className="add-butn more-action" data-ripple="">follow</a>}
                   </div>
               </div>
            </li>);
        }
        
        else if(this.props.followType === "follower" && this.props.displayType === "small"){
            return (
                <li>
                    <figure> <Link to={"/"+this.props.Follow.username}><img src={this.props.Follow.picture} alt="" /></Link></figure>
                    <div className="friend-meta">
                      <h4><Link to={"/"+this.props.Follow.username}>{this.props.Follow.niceName}</Link></h4>
                      {this.state.following? <a href="#" onClick={this.handleUnFollow} title="" className="underline" data-ripple="">unfollow</a> : <a href="#" onClick={this.handleFollow} title="" className="underline" data-ripple="">follow</a>}
                    </div>
                </li>);
        }
        else{
            return (
                <li>
                <figure> <Link to={"/"+this.props.Follow.username}><img src={this.props.Follow.picture} alt="" /></Link></figure>
                <div className="friend-meta">
                  <h4><Link to={"/"+this.props.Follow.username}>{this.props.Follow.niceName}</Link></h4>
                  {this.state.following? <a href="#" onClick={this.handleUnFollow} title="" className="underline" data-ripple="">unfollow</a> : <a href="#" onClick={this.handleFollow} title="" className="underline" data-ripple="">follow</a>}
                </div>
            </li>);
        }
    } 
    render(){
        return (this.renderFollow());
    }
}
/* import React from "react";
import "./Follow.css";
import { Link } from "react-router-dom";
import api from "../../../Store/api";

export default class Follow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            following: false
        }
        this.initialFollowing();
    }

    initialFollowing = () =>{
        if(this.props.followType === "following"){
            this.setState({
                following: true
            })
        }
    }

    handleFollow = async (e)=>{
       e.preventDefault();
       const followObject = {
           userId: this.props.LoggedInUserId,
           otherUserId: this.props.Follow._id
       }
       const res = await api.createItem("/user_following",followObject);
       if(res){
           this.setState({
               following: true
           })
       }
    }
    handleUnFollow = async (e)=>{
        e.preventDefault();
        const followObject = {
            userId: this.props.LoggedInUserId,
            otherUserId: this.props.Follow._id
        }
        const res = await api.deleteItem("/user_following",followObject);
        if(res){
            this.setState({
                following: false
            })
        }
     }
    renderFollow = () => {
        if((
            this.props.followType === "follower" || this.props.followType === "unfollowing") && this.props.displayType === "full"){
            return (<li>
                     <div className="nearly-pepls">
                        <figure>
                        <Link to={"/"+this.props.Follow.username}><img src={this.props.Follow.picture} alt="" /></Link>
                        </figure>
                        <div className="pepl-info">
                            <h4><Link to={"/"+this.props.Follow.username}>{this.props.Follow.niceName}</Link></h4>
                            <span>ftv model</span>
                            {this.state.following? <a href="#" onClick={this.handleUnFollow} title="" className="add-butn more-action" data-ripple="">unfollow</a> : <a href="#" onClick={this.handleFollow} title="" className="add-butn more-action" data-ripple="">follow</a>}
                        </div>
                    </div>
                 </li>);
        }
        else if(this.props.followType === "following" && this.props.displayType === "full"){
            return (
                <li>
                    <figure>
                        <Link to={"/"+this.props.Follow.username}><img src={this.props.Follow.picture} alt="" /></Link>
                    </figure>
                    <div className="friend-meta">
                      <h4><Link to={"/"+this.props.Follow.username}>{this.props.Follow.niceName}</Link></h4>
                      <span>Author</span>
                       <a href="#" onClick={this.handleUnFollow} title="" className="underline">follow</a>
                       <a href="#" title="" className="add-butn" data-ripple="">message</a>
                    </div>
                </li>);
        }
        
        else if(this.props.followType === "follower" && this.props.displayType === "small"){
            return (
                <li>
                    <figure>
                        <Link to={"/"+this.props.Follow.username}><img src={this.props.Follow.picture} alt="" /></Link>
                    </figure>
                    <div className="friend-meta">
                      <h4><Link to={"/"+this.props.Follow.username}>{this.props.Follow.niceName}</Link></h4>
                      <span>Author</span>
                       <a href="#" onClick={this.handleFollow} title="" className="underline">follow</a>
                       <a href="#" title="" className="add-butn" data-ripple="">message</a>
                    </div>
                </li>);
        }
        else{
            return (
                <li>
                <figure>
                <Link to={"/"+this.props.Follow.username}><img src={this.props.Follow.picture} alt="" /></Link>
                </figure>
                <div className="friend-meta">
                  <h4><Link to={"/"+this.props.Follow.username}>{this.props.Follow.niceName}</Link></h4>
                   <a href="#" onClick={this.handleUnFollow} title="" className="underline">unfollow</a>
                </div>
            </li>);
        }
    } 
    render(){
        return (this.renderFollow());
    }
} */