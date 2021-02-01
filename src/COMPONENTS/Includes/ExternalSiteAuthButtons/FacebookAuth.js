import React from "react";
import FacebookLogin from 'react-facebook-login';
import api from "../../../Store/api";

export default class FacebookAuth extends React.Component{ 
    facebookResponse = async (response) => {
        console.log(response);
        return;
        if(!response.hasOwnProperty("accessToken") || response.hasOwnProperty("error")){
            return;
        }
        const userData = response.profileObj;
        const newUserObject = {
            username: "fb"+userData.givenName+response.googleId,
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
                externalSite: "facebook",
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
    return <FacebookLogin
    icon="fa fa-fw fa-facebook"
    textButton="CONTINUE WITH FACEBOOK"
    appId="791103928302S314"
    fields="name,email,picture"
    onClick={this.componentClicked}
    callback={this.facebookResponse} />;
  } 
}