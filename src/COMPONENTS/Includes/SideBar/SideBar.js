import React from "react";
import "./SideBar.css";

export default class SideBar extends React.Component{
   render(){
    return (
        <aside className="aside-md bg-light dk" id="sidebar"> 
        <section className="vbox animated fadeInRight ads-section"> 
        <video id="advideo2" ref={this.video} width="320" height="240" controls>
            <source src="/files/videos/Chris Brown, Young Thug - Go Crazy (Official Video)[via torchbrowser.com].mp4" type="video/mp4" />
            Your browser does not support this video.
        </video>
        <video id="advideo3" ref={this.video} width="320" height="240" controls>
            <source src="/files/videos/Chris Brown, Young Thug - Go Crazy (Official Video)[via torchbrowser.com].mp4" type="video/mp4" />
            Your browser does not support this video.
        </video>
        <video id="advideo4" ref={this.video} width="320" height="240" controls>
            <source src="/files/videos/Chris Brown, Young Thug - Go Crazy (Official Video)[via torchbrowser.com].mp4" type="video/mp4" />
            Your browser does not support this video.
        </video>
        {/* <section className="w-f-md scrollable hover"> 
        <h4 className="font-thin m-l-md m-t">Artists</h4> 
            <ul className="list-group no-bg no-borders auto m-t-n-xxs"> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="../../../41.77.4.164_80/flatfull.com/themes/musik/images/a1.png" alt="..." className="img-circle" /> <i className="on b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Chris Fox</a>
            </div> <small className="text-muted">New York</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="images/a2.png" alt="..." /> <i className="on b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Amanda Conlan</a>
            </div> <small className="text-muted">France</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="images/a3.png" alt="..." /> <i className="busy b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Dan Doorack</a>
            </div> <small className="text-muted">Hamburg</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="../../../41.77.4.164_80/flatfull.com/themes/musik/images/a4.png" alt="..." /> <i className="away b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Lauren Taylor</a>
            </div> <small className="text-muted">London</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="images/a5.png" alt="..." className="img-circle" /> <i className="on b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Chris Fox</a>
            </div> <small className="text-muted">Milan</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="../../../41.77.4.164_80/flatfull.com/themes/musik/images/a6.png" alt="..." /> <i className="on b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Amanda Conlan</a>
            </div> <small className="text-muted">Copenhagen</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="images/a7.png" alt="..." /> <i className="busy b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Dan Doorack</a>
            </div> <small className="text-muted">Barcelona</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="../../../41.77.4.164_80/flatfull.com/themes/musik/images/a8.png" alt="..." /> <i className="away b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Lauren Taylor</a>
            </div> <small className="text-muted">Tokyo</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="images/a9.png" alt="..." className="img-circle" /> <i className="on b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Chris Fox</a>
            </div> <small className="text-muted">UK</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="../../../41.77.4.164_80/flatfull.com/themes/musik/images/a1.png" alt="..." /> <i className="on b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Amanda Conlan</a>
            </div> <small className="text-muted">Africa</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="images/a2.png" alt="..." /> <i className="busy b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Dan Doorack</a>
            </div> <small className="text-muted">Paris</small> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <span className="pull-left thumb-xs m-t-xs avatar m-l-xs m-r-sm"> <img src="images/a3.png" alt="..." /> <i className="away b-light right sm" /> 
            </span> 
            
            <div className="clear"> 
            
            <div><a href="#">Lauren Taylor</a>
            </div> <small className="text-muted">Brussels</small> 
            </div> </li> 
            </ul> </section> <footer className="footer footer-md bg-black"> 
            
            <form className="" role="search"> 
            
            <div className="form-group clearfix m-b-none"> 
            
            <div className="input-group m-t m-b"> 
            
            <span className="input-group-btn"> <button type="submit" className="btn btn-sm bg-empty text-muted btn-icon"><i className="fa fa-search" /></button> 
            </span> 
            <input type="text" className="form-control input-sm text-white bg-empty b-b b-dark no-border" placeholder="Search members" /> 
            </div> 
            </div> 
            </form>
            </footer>  */}
            </section>
        </aside>
      );
         }
}