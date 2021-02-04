import React from "react";
import GoogleLogin from 'react-google-login';
import api from "../../../Store/api";
import socialLoginIds from "../../../constants/social_login_ids";

export default class GoogleAuth extends React.Component{ 

  googleResponse = async (response) => {
    if(!response.hasOwnProperty("accessToken") || response.hasOwnProperty("error")){
        return;
    }
    const userData = response.profileObj;
    const newUserObject = {
        username: userData.givenName+response.googleId,
        first_name: userData.givenName,
        last_name: userData.familyName,
        niceName: userData.givenName + " "+ userData.familyName,
        bio: {
            email: userData.email
        },
        email: userData.email,
        sex: "unknown",
        authentication: {
             type: "external",
             externalSite: "google",
             externalSiteUSerId: response.googleId
        },
        picture: {
            cover: userData.imageUrl,
            thumbnail: userData.imageUrl 
        }
    }
    const apiResponse = await api.createItem("/signup",newUserObject);
    if(apiResponse.hasOwnProperty("success")){
        window.location = "/";
    }
    else{
        window.alert("couldn't sing you in, check your internet connection");
    }
  }
  render(){
    return <GoogleLogin
            clientId={socialLoginIds.googleClientIdLocalhost}
            buttonText="CONTINUE WITH GOOGLE"
            onSuccess={this.googleResponse}
            onFailure={this.googleResponse}
            cookiePolicy={'single_host_origin'}
            />;
  } 
}