import React from "react";
import api from "../../../Store/api";
import Song from "../../Includes/Song/Song";
import Lists from "../../Includes/Lists/Lists";

export default class NotFoundPage extends React.Component{ 
   componentDidMount(){
    this.props.logUrl();
   }
   render(){
    return ( 
        <div className="row m-n"> 
        <div className="col-sm-4 col-sm-offset-4">
            <div className="text-center m-b-lg"> 
            <h1 className="h text-white animated fadeInDownBig">404</h1> 
            </div> 
            <div className="list-group auto m-b-sm m-b-lg"> 
            <a href="/" className="list-group-item"> 
            <i className="fa fa-chevron-right icon-muted"></i> 
            <i className="fa fa-fw fa-home icon-muted"></i> Goto homepage </a>
            <a href="#" className="list-group-item"> <i className="fa fa-chevron-right icon-muted"></i> 
            <i className="fa fa-fw fa-question icon-muted"></i> Send us a tip </a>
            <a href="#" className="list-group-item"> <i className="fa fa-chevron-right icon-muted"></i> 
            <span className="badge bg-info lt">0761801206</span> 
            <i className="fa fa-fw fa-phone icon-muted"></i> Call us </a> 
        </div> 
        </div>
        </div>
     );
  } 
}


