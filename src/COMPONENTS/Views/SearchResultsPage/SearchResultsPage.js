import React from "react";
import api from "../../../Store/api";
import Lists from "../../Includes/Lists/Lists";

export default class SearchResultsPage extends React.Component{ 
   constructor(props){
       super(props);
       this.state = {
           posts: [],
           users: []
       }
   }

   getPosts = async () =>{
    const keyword = this.props.keyword;
    const postsResult = await api.getItems("/search/post/"+keyword,"","","","","","");
    // const usersResult = await api.getItems("/search/user/"+keyword);
    this.setState({
        posts: postsResult,
        // users: usersResult
    }, ()=>{ console.log(this.state.posts)})
  }

   componentWillMount(){    
    this.getPosts();
   }

   render(){
    return ( 
        <section className="hbox stretch bg-black dker">
        <section className="col-sm-4 no-padder bg">
            <section className="vbox">
                <section className=" scrollable hover">
                {this.state.posts? 
                    this.state.posts.length > 0? <Lists list_type="ListWithImageType" 
                    items_type="song" items={this.state.posts} 
                    updateNowPlayingSongId={this.props.updateNowPlayingSongId}
                    updateDownload={this.props.updateDownload}
                    toggleOnFileIsDownloading={this.props.toggleOnFileIsDownloading}/>:
                    <div>Sorry, no results found for your search.</div>:
                    <div></div>
                }
            </section>
            </section>
        </section>
        </section>
     );
  } 
}