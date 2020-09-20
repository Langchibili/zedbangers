import React from "react";
import api from "../../../Store/api";

export default class SinglePostPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           post: null,
           updatedOnce: false
       }
   }

   getPost = async () =>{
    const postId = this.props.postId;
    if(!postId){
      return
    }
    else{
     const post = await api.getItemById("/posts", postId, " ");
     this.setState({post: post});
    }
  }
   
  updateNowPlayingSong = (e) =>{
       e.preventDefault();
       this.props.updateNowPlayingSongId(this.state.post._id);
   }

   shouldComponentUpdate(){
       return this.state.updatedOnce? false : true;
   }

   componentWillMount(){
    this.getPost();
   }
   componentDidUpdate(){
    this.setState({ updatedOnce: true})
   }
   render(){
    console.log("single post page",this.props)
    return ( 
        <aside className="col-sm-5 no-padder" id="sidebar"> <section className="vbox animated fadeInUp"> <section className="scrollable"> 

            <div className="m-t-n-xxs item pos-rlt"> 
            
            <div className="top text-right"> 
            
            <span className="musicbar bg-success bg-empty inline m-r-lg m-t" style={{width: '25px', height: '30px'}}> 
            
            <span className="bar1 a3 lter" /> 
            
            <span className="bar2 a5 lt" /> 
            
            <span className="bar3 a1 bg" /> 
            
            <span className="bar4 a4 dk" /> 
            
            <span className="bar5 a2 dker" /> 
            </span> 
            </div> 
            
            <div className="bottom gd bg-info wrapper-lg"> 
            
            <span className="pull-right text-sm">101,400 
            <br />Followers
            </span> 
            
            <span className="h2 font-thin">Soph Ashe
            </span> 
            </div> <img className="img-full" src={this.state.post? this.state.post.thumbnail.medium : ""} alt="song thumnail" /> 
            </div> 
            <ul className="list-group list-group-lg no-radius no-border no-bg m-t-n-xxs m-b-none auto"> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#" className="m-r-sm"><i className="icon-plus" /></a> <a href="#"><i className="icon-close" /></a> 
            </div>  {this.state.post? <a onClick={this.updateNowPlayingSong} href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> : ''}
            
            <div className="clear text-ellipsis"> 
            
            <span>E.T.M
            </span> 
            
            <span className="text-muted"> -- 04:35
            </span> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Vestibulum id ligula porta
            </span> 
            
            <span className="text-muted"> -- 04:15
            </span> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Praesent commodo cursus magna
            </span> 
            
            <span className="text-muted"> -- 02:25
            </span> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Curabitur blandit tempus
            </span> 
            
            <span className="text-muted"> -- 05:00
            </span> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Faucibus dolor auctor
            </span> 
            
            <span className="text-muted"> -- 03:50
            </span> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Get lacinia odio sem nec elit cibus dolor auctor sed odio dui mollis ornare
            </span> 
            
            <span className="text-muted"> -- 04:05
            </span> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Faucibus dolor auctor
            </span> 
            
            <span className="text-muted"> -- 02:55
            </span> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Donec sed odio dui
            </span> 
            
            <span className="text-muted"> -- 04:35
            </span> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Urna mollis ornare vel eu leo
            </span> 
            
            <span className="text-muted"> -- 05:10
            </span> 
            </div> </li> 
            <li className="list-group-item"> 
            
            <div className="pull-right m-l"> <a href="#" className="m-r-sm"><i className="icon-cloud-download" /></a> <a href="#"><i className="icon-plus" /></a> 
            </div> <a href="#" className="jp-play-me m-r-sm pull-left"> <i className="icon-control-play text" /> <i className="icon-control-pause text-active" /> </a> 
            
            <div className="clear text-ellipsis"> 
            
            <span>Vivamus sagittis lacus vel augue
            </span> 
            
            <span className="text-muted"> -- 02:35
            </span> 
            </div> </li> 
            </ul> 
        </section> 
    </section>
    
 </aside>
  );
     } 
}