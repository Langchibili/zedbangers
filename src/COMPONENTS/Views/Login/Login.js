import React from 'react';
import './Login.css';
import SignUp from '../SignUp/SignUp';
import Display from '../../Includes/Display/Display';
import { Link } from 'react-router-dom';
import api from "../../../Store/api";
import ExternalSiteAuthButtons from '../../Includes/ExternalSiteAuthButtons/ExternalSiteAuthButtons';


export default class Login extends React.Component{
        constructor(props){
          super(props);
          this.state = {
            showActivateLink: false,
            username: "",
            uErrorText:"",
            pErrorText: "",
            disabled: false,
            loginText: "Login"
          }
          this.createRefs = this.createRefs.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.LogUserIn = this.LogUserIn.bind(this);
          this.createRefs();
      }

      createRefs(){
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
      } 

      async LogUserIn(username,password){
        const apiResponse = await api.createItem("/login",{username: username, password: password});
        if(apiResponse){
          if(apiResponse.error){
            if(apiResponse.errorType === "username"){
              this.setState({
                disabled: false,
                loginText: "Login",
                uErrorText:apiResponse.error,
                pErrorText:""
              });
            }
            else if(apiResponse.errorType === "account"){
              this.setState({
                showActivateLink: true,
                username: username,
                disabled: true,
                loginText: "Login",
                uErrorText:"",
                pErrorText:"inactivated account"
              });
            }
            else{
                this.setState({
                  disabled: false,
                  loginText: "Login",
                  pErrorText:apiResponse.error,
                  uErrorText:""
                });
            }
          }
          else{
            window.location = "/";
          }
        }
        else{
          return;
        }
      }
      async handleSubmit(event){
        event.preventDefault();
        this.setState({
          disabled: true,
          loginText: "validating credentials..."
        });
        const username = this.usernameRef.current.value;
        const password = this.passwordRef.current.value;
        if(username.length === 0 || password.length === 0)
        {
          this.setState({
            disabled: false,
            loginText: "Login",
            uErrorText:"",
            pErrorText:""
          });
        }
        else{
          // log user in
          this.setState({
            disabled: true,
            loginText: "logging you in..."
          },async ()=>{
            await this.LogUserIn(username,password);
          });
        }
      }
      changeHeaderTheme = () =>{
        const header = document.getElementById("header");
        const pathArray  = window.location.pathname.split("/");
        if(pathArray[1] === "song"){
             header.className = header.className.replace("bg-white-only","bg-black lter");
        }
        else{
             header.className = header.className.replace("bg-black lter","bg-white-only");
        }
      }
      componentWillMount(){
        this.changeHeaderTheme();
      }
      componentDidMount(){
        this.props.logUrl();
      }
       render(){
         return (
          <section className="m-t-lg wrapper-md animated fadeInUp" aria-describedby="main-loader" aria-busy="false">
              <div className="container aside-xl">
                  <section className="m-b-lg">
                  <header className="wrapper text-center"> <strong>Sign in to upload</strong> </header>
                    <div className="row merged">
                            <h2 className="log-title">{this.state.loginText}</h2>
                             <ExternalSiteAuthButtons buttonPreText="LOGIN" />
                              <p>
                                Not on AMALEVELS Yet? <Link to="/" title="">Take the tour</Link> or <Link to="/signup" title="">Join now</Link>
                              </p>
                            <form method="post">
                              <div className="form-group">	
                                <input type="text" className="form-control rounded input-lg text-center no-border" id="input" ref={this.usernameRef} required="required"/>
                                <label className="control-label" htmlFor="input">Username</label><i className="mtrl-select"></i>
                                <p className="error text-center" style={{color:"red"}}>{this.state.uErrorText}</p>
                              </div>
                              <div className="form-group">	
                                <input type="password" className="form-control rounded input-lg text-center no-border" ref={this.passwordRef} required="required"/>
                                <label className="control-label" htmlFor="input">Password</label><i className="mtrl-select"></i>
                                <p className="error text-center" style={{color:"red"}}>{this.state.pErrorText}</p>
                                <Display isVisible={this.state.showActivateLink}>
                                  <Link to={"/account_verification/"+this.state.username}>Activate Account</Link>
                                </Display>
                              </div>
                              <div className="checkbox">
                                <label>
                                <input type="checkbox"  defaultChecked/><i className="check-box"></i>Always Remember Me.
                                </label>
                              </div>
                              <button className="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded" type="button" disabled={this.state.disabled} onClick={this.handleSubmit}><span>{this.state.loginText}</span></button>
                              <div className="text-center m-t m-b"> <a href="#" title="" className="forgot-pwd">Forgot Password?</a></div>
                              <div className="line line-dashed"></div>
                              <p className="text-muted text-center"><small>Do not have an account?</small></p>
                              <Link to="/signup" className="btn btn-lg btn-info btn-block rounded">Create an account</Link>
                            </form>
                    </div>
                  </section>
                </div>
          </section>
         );
       }
}

