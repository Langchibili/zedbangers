import React from "react";
import Posts from "../Lists/Posts";
import api from "../../../Store/api";

export default class PostsGenerator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            post_type: this.props.post_type,
            taxonomy: this.props.taxonomy,
            taxonomyValue: this.props.taxonomyValue,
            postsDisplaySize: this.props.postsDisplaySize,
            limit: this.props.limit,
            fields: this.props.fields? this.props.fields: "",
            posts: []
        }
    }
    
    getPostsForUser = async (username, post_type, taxonomy, taxonomyValue, fields, limit) =>{
       let posts;
       posts = await api.gePostsByTaxonomy("/posts", post_type, taxonomy, taxonomyValue,"", username, fields, limit);
       this.setState({
           posts: posts
       })
    }
    getAllPosts = async (post_type, taxonomy, taxonomyValue, fields, limit) =>{
       let posts;
       posts = await api.gePostsByTaxonomy("/posts", post_type, taxonomy, taxonomyValue,"", "", fields, limit);
       this.setState({
           posts: posts
       }, ()=>{ console.log(this.state.posts)})
    }
    async componentWillMount(){
        if(this.props.username){
            this.getPostsForUser(this.state.username,this.state.post_type,this.state.taxonomy,this.state.taxonomyValue,this.state.fields,this.state.limit);
        }
        else{
            this.getAllPosts(this.state.post_type,this.state.taxonomy,this.state.taxonomyValue,this.state.fields,this.state.limit);
        }
    }
    
    render(){
        return (<Posts loggedInUserId={this.props.UserInfo._id} UserInfo={this.props.UserInfo} postsDisplaySize={this.state.postsDisplaySize} posts={this.state.posts} type="thumbnail" hidePostMeta/>);
    }
}