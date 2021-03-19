import React from "react";
import Follow from "../Follow/Follow";
import api from "../../../Store/api";


export default class Follows extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            following: []
        }
    }
   async componentWillMount(){
        let response = await api.getItemByUsername("/users", this.props.loggedInUserName, "following");;
        const following = response? response.following : [];
        this.setState({
            following: following
        });
    }
   
    renderFollow = () =>{
        let followType = this.props.followType;
        let displayType = this.props.displayType;
        let LoggedInUserId = this.props.LoggedInUserId;
        const followinglist = this.state.following;
        
        return this.props.Follows.map(function(follow){
              if(LoggedInUserId === follow._id){
                  return;
              }
              else{
                let isFollowing;
                if(followinglist.includes(follow._id)){
                  isFollowing = true
                }
                else{
                  isFollowing = false;
                }
                return <Follow 
                     following={isFollowing} 
                     followType={followType} 
                     displayType={displayType} 
                     Follow={follow} key={follow._id} 
                     LoggedInUserId={LoggedInUserId}/>
               }
            });
    }
    render(){
        return (this.renderFollow());
    }
}