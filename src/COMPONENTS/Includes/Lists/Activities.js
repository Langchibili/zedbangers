import React from "react";
import Activity from "../Activity/Activity";
import EmptyContent from "../EmptyContent/EmptyContent";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export default class Activities extends React.Component{
    
    renderActivities= () =>{
        if(!this.props.activities){
            return <div></div>
        }
        let displayType = this.props.displayType;
        if(this.props.activities.length === 0){
            return <EmptyContent header="Your activities are empty" buttonText="post something" buttonIcon={<CloudUploadIcon />}/>
        }
        return this.props.activities.map(function(activity){
            return <Activity displayType={displayType} activity={activity} key={activity._id}/>
        });
    }
    render(){
        return (this.renderActivities());
    }
}