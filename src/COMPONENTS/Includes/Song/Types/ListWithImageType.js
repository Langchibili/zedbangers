import React from "react";

export default class ListWithImageType extends React.Component{ 
 updateNowPlayingSong = (e) =>{
        e.preventDefault();
        this.props.updateNowPlayingSongId(this.props.song._id);
  }
  render(){
    return ( 
        <li className="list-group-item clearfix">
            <a href="#" onClick={this.updateNowPlayingSong} className="jp-play-me pull-right m-t-sm m-l text-md"><i className="icon-control-play text"></i> <i className="icon-control-pause text-active"></i></a> 
            <a href="#" className="pull-left thumb-sm m-r"><img src="images/m0.jpg" alt="..." /> 
            </a> 
            <a className="clear" href="#">
                <span className="block text-ellipsis">Little Town</span> <small className="text-muted">by Soph Ashe</small> 
            </a> 
        </li>
    );
     } 
}