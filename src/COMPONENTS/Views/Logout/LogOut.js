import React from 'react';
import Loader from "../../Includes/Loader/Loader";
import api from "../../../Store/api";

export default class LogOut extends React.Component{
    constructor(props){
         super(props);
         this.state = {
            redirect: false
         }
    }
     
      logUserOut = async () => {
         const apiResponse = await api.getItems("/logout");
         if(apiResponse){
             this.setRedirect();
         }
      }

      componentDidMount(){
          this.logUserOut();
      }

      setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          window.location = "/";
        }
      }
      render () {
        return (
            <div>
                <Loader loaderContent="logging you out..."/>
                {this.renderRedirect()}
            </div>
        )
      }
}

