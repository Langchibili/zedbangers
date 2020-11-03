import React from "react";
import {Link} from  "react-router-dom";

export default class Navigation extends React.Component{
   render(){
        return (
                <aside className="bg-black dk aside hidden-print" id="nav"> <section className="vbox"> <section className="w-f-md scrollable"> 
                
                <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '166px'}}>
                
                <div className="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance={0} data-size="10px" data-railopacity="0.2" style={{overflow: 'hidden', width: 'auto', height: '166px'}}> {/* nav */} <nav className="nav-primary hidden-xs"> 
                <ul className="nav bg clearfix"> 
                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted"> Discover </li> 
                    <li> <Link to="/"> <i className="icon-disc icon text-success" /> 
                    
                    <span className="font-bold">What's new
                    </span> </Link> </li> 
                    {/* <li> <Link to="/genres"> <i className="icon-music-tone-alt icon text-info" /> 
                    
                    <span className="font-bold">Genres
                    </span> </Link> </li>  */}
                    {/* <li> <Link to="/events"> <i className="icon-drawer icon text-primary-lter" /> <b className="badge bg-primary pull-right">6</b> 
                    
                    <span className="font-bold">Events
                    </span> </Link> </li>  */}
                    <li> <Link to={this.props.isLoggedIn? "/upload/song" : "/signup"}> <i className="icon-list icon text-info-dker" /> 
                    
                    <span className="font-bold">upload
                    </span> </Link> </li> 
                    {this.props.isLoggedIn? "" : <li> <Link to="/signup"> <i className="icon-list icon text-info-dker" /><span className="font-bold">signup</span> </Link> </li> }
                    {this.props.isLoggedIn? "" : <li> <Link to="/login"> <i className="icon-list icon text-info-dker" /> <span className="font-bold">login</span> </Link> </li> }
                      {/* <li> <a href="video.html" data-target="#content" data-el="#bjax-el" data-replace="true"> <i className="icon-social-youtube icon text-primary" /> 
                    
                    <span className="font-bold">Video
                    </span> </a> </li>  */}
                    <li className="m-b hidden-nav-xs" /> 
                </ul> 
               { this.props.isLoggedIn? 
                 <ul className="nav" data-ride="collapse"> 
                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted"> manage posts </li> 
                    <li> <a href="#" className="auto"> 
                         
                    <span className="pull-right text-muted"> <i className="fa fa-angle-left text" /> <i className="fa fa-angle-down text-active" /> 
                    </span> <i className="icon-grid icon"> </i> 
                    
                    <span>Songs
                    </span> </a> 
                    <ul className="nav dk text-sm"> 
                    <li> <Link to="/posts/edit" className="auto"> <i className="fa fa-angle-right text-xs" /> 
                    
                    <span>edit song
                    </span> </Link> </li> 
                    <li> <Link to="/posts/delete" className="auto"> <i className="fa fa-angle-right text-xs" /> 
                    
                    <span>delete song
                    </span> </Link> </li> 
                    </ul> 
                    </li> 
                </ul> : ""
               }
                <ul className="nav" data-ride="collapse"> 
                    <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted"> about us </li> 
                    <li> <a href="#" className="auto"> 
                         
                    <span className="pull-right text-muted"> <i className="fa fa-angle-left text" /> <i className="fa fa-angle-down text-active" /> 
                    </span> <i className="icon-grid icon"> </i> 
                    
                    <span>More
                    </span> </a> 
                    <ul className="nav dk text-sm"> 
                    <li> <a href="profile.html" className="auto"> <i className="fa fa-angle-right text-xs" /> 
                    
                    <span>About us
                    </span> </a> </li> 
                    <li> <a href="blog.html" className="auto"> <i className="fa fa-angle-right text-xs" /> 
                    
                    <span>Blog
                    </span> </a> </li> 
                    <li> <a href="invoice.html" className="auto"> <i className="fa fa-angle-right text-xs" /> 
                    
                    <span>contact us 

                    </span> </a> </li> 
                    <li> <a href="gmap.html" className="auto"> <i className="fa fa-angle-right text-xs" /> 
                    
                    <span>help
                    </span> </a> </li> 
                    </ul> 
                    </li> 
                </ul>  
                 <ul className="nav text-sm"> 
                <li className="hidden-nav-xs padder m-t m-b-sm text-xs text-muted"> 
                
                <span className="pull-right"><a href="#"><i className="icon-plus i-lg" /></a>
                </span> Playlist </li> 
                <li> <a href="#"> <i className="icon-music-tone icon" /> 
                
                <span>Hip-Pop
                </span> </a> </li> 
                <li> <a href="#"> <i className="icon-playlist icon text-success-lter" /> <b className="badge bg-success dker pull-right">9</b> 
                
                <span>Jazz
                </span> </a> </li> 
                </ul> </nav> {/* / nav */} 
                </div>
                
                <div className="slimScrollBar" style={{background: 'rgb(0, 0, 0)', width: '10px', position: 'absolute', top: '-21px', opacity: '0.4', display: 'none', borderRadius: '7px', zIndex: 99, right: '0px', height: '54.3511px'}} />
                
                <div className="slimScrollRail" style={{width: '10px', height: '100%', position: 'absolute', top: '0px', display: 'none', borderRadius: '7px', background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: '0px'}} />
                </div> </section> <footer className="footer hidden-xs no-padder text-center-nav-xs"> 
                
                <div className="bg hidden-xs "> 
                
                <div className="dropdown dropup wrapper-sm clearfix"> <a href="#" className="dropdown-toggle" data-toggle="dropdown"> 
                
                <span className="thumb-sm avatar pull-left m-l-xs"> <img src="images/a3.png" className="dker" alt="..." /> <i className="on b-black" /> 
                </span> 
                
                <span className="hidden-nav-xs clear"> 
                
                <span className="block m-l"> <strong className="font-bold text-lt">John.Smith</strong> <b className="caret" /> 
                </span> 
                
                <span className="text-muted text-xs block m-l">Artist
                </span> 
                </span> </a> 
                <ul className="dropdown-menu animated fadeInRight aside text-left"> 
                <li> 
                
                <span className="arrow bottom hidden-nav-xs" /> <a href="#">Settings</a> </li> 
                <li> <a href="#">Profile</a> </li> 
                <li> <a href="#"> 
                
                <span className="badge bg-danger pull-right">3
                </span> Notifications </a> </li> 
                <li> <a href="#">Help</a> </li> 
                <li className="divider" /> 
                <li> <Link to="/logout" data-toggle="ajaxModal">Logout</Link> </li> 
                </ul> 
                </div> 
                </div> 
                </footer> 
                </section> 
                </aside>
              );
         }
}