import React from "react";
import { Link } from "react-router-dom";

export default class Embed extends React.Component{ 
    renderEmbed = (youtubeId)=>{
             return <div
                className="video"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%" /* 16:9 */,
                  paddingTop: 25,
                  height: 0
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                  }}
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                />
              </div>
      }
      renderPath(hasEmbeddedMusicVideo){
          if(hasEmbeddedMusicVideo) return '/post/';
          return '/embed/'
      }
      renderEmbedManageLink = ()=>{
        const edit = this.props.edit;
        const del = this.props.del;
        if(edit){
          return <Link to={this.props.post? this.renderPath(this.props.post.hasEmbeddedMusicVideo)+'edit/'+this.props.post.dashed_title+"/"+this.props.post._id : "#"} className="text-info">{this.props.post? "Edit"+this.props.post.title : ""}</Link>
        }
        else if(del){
            return <Link to={this.props.post? this.renderPath(this.props.post.hasEmbeddedMusicVideo)+'delete/'+this.props.post.dashed_title+"/"+this.props.post._id : "#"} className="text-danger">{this.props.post? "Delete"+this.props.post.title : ""}</Link>
        }
        else{
            return <Link to={this.props.post? this.renderPath(this.props.post.hasEmbeddedMusicVideo)+this.props.post.dashed_title+"/"+this.props.post._id : "#"} className="text-ellipsis">{this.props.post? this.props.post.title : ""}</Link>
        }
          
      }
  render(){
    return ( 
        <div className="col-xs-6 col-sm-4 col-md-3"> 
            <div className="item"> 
            <div className="pos-rlt"> 
            {this.renderEmbed(this.props.post.embed.youtubeId)}
            <div className="padder-v"> 
                <Link to={this.props.post? this.renderPath(this.props.post.hasEmbeddedMusicVideo)+this.props.post.title+"/"+this.props.post._id : "#"} className="text-ellipsis">{this.props.post? this.props.post.title : ""}</Link>
                <Link to={this.props.post? "/user/"+this.props.post.userName : "#"} className="text-ellipsis text-xs text-muted">{this.props.post? this.props.post.artist.artistName : ""}</Link>
                {this.renderEmbedManageLink()}
            </div> 
            </div> 
            </div>
       </div>
    );
    } 
}









