import React from "react";
import api from "../../../Store/api";
import Song from "../../Includes/Song/Song";

export default class ManagePostsDeleteFinalPage extends React.Component{
    constructor(props){
        super(props);
        // set text as default, if this.props.initialPostObject is not set
        this.state = {
              deletingText: "delete",
              deleted: false,
              post:null
        }
     }
     
     getPost = async ()=>{ 
        const post = await api.getItemById("/posts", this.props.postId);
        this.setState({
            post: post,
            deleted: false,
            deletingText: "delete"
        })
     }

    
     componentDidMount(){
        this.getPost();
     }

      handledDelete = (e) => {
             this.setState({deletingText: "deleting",deleted: false}, 
              async ()=>{
                const trashedPost = await api.createItem("/trash/posts",this.state.post); // trash it first
                if(trashedPost){
                  const deletedPost = await api.deleteItem("/posts/"+this.props.postId);  // delete it finally
                  if(deletedPost){this.setState({deleted: true})} 
                }
             })
     }
     deleteButtonStyles = {
        div: {
           display: "flex",
           width: "200px",
           justifyContent: 'space-between',
           textAlign: "center"
        },
        button: {
         backgroundColor: "red",
         pdding: "5px",
         borderRadius: "5px"
        }
     }
   render(){
    return (   
        this.state.deleted? <div>post deleted</div> : this.state.post? <ul><Song list_type ="ListWithImageType" song={this.state.post}/><div style={this.deleteButtonStyles.div}><button className="btn btn-sm btn-default">cancel</button><button onClick={this.handledDelete} className="btn btn-sm btn-danger">{this.state.deletingText}</button></div></ul>: <div>!oops, an error occured, try again.</div>
       )
      } 
}