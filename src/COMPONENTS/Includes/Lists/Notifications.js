import React from "react";
import Notification from "../../Includes/Notification/Notification";
import EmptyContent from "../EmptyContent/EmptyContent";

export default class Notifications extends React.Component{
    
    renderNotifications = () =>{
        let displayType = this.props.displayType;
        if(!this.props.notifications){
          return<div></div>;
        }
        if(this.props.notifications.length === 0){
            return <EmptyContent header="You have no notifications yet" hideButton/>
        }
        return this.props.notifications.map(function(notification){
            return <Notification displayType={displayType} notification={notification} key={notification._id}/>
        });
    }
    render(){
        return (this.renderNotifications());
    }
}