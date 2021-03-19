import React from "react";
import PostsGenerator from "../PostsGenerator/PostsGenerator";
import LinkGenerator from "../LinkGenerator/LinkGenerator";

export default class PostsListingWrapper extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        taxonomyValue : this.props.match.params.taxonomyValue,
        post_type: this.props.match.params.post_type,
        username: this.props.match.params.username,
        taxonomy: this.props.match.params.taxonomy
      }
    }
    render(){
      console.log(this.props);
        return (
            <section className="w-f-md" id="bjax-target"> <section className="hbox stretch"> 
              <LinkGenerator 
                post_type={this.state.post_type}
                taxonomy={this.state.taxonomy}
              />
              <section> <section className="vbox"> <section className="scrollable padder-lg">
             <h2 className="font-thin m-b">Acoustic</h2>
             
             <div className="row row-sm">
              <PostsGenerator 
                UserInfo={this.props.UserInfo}
                post_type={this.state.post_type}
                username={this.state.username}
                taxonomy={this.state.taxonomy}
                taxonomyValue={this.state.taxonomyValue}
               />
                    
             </div> 
             
             <ul className="pagination pagination"> <li><a href="#"><i className="fa fa-chevron-left" /></a></li> <li className="active"><a href="#">1</a></li> <li><a href="#">2</a></li> <li><a href="#">3</a></li> <li><a href="#">4</a></li> <li><a href="#">5</a></li> <li><a href="#"><i className="fa fa-chevron-right" /></a></li> </ul> </section> </section> </section>
            </section></section>
            );
    }
}