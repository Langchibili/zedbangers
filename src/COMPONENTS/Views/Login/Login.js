import React from 'react';
import './Login.css';
import SignUp from '../SignUp/SignUp';
import Display from '../../Includes/Display/Display';
import { Link } from 'react-router-dom';
import api from "../../../Store/api";


export default class Login extends React.Component{
        constructor(props){
          super(props);
          this.state = {
            showActivateLink: false,
            username: "",
            uErrorText:"",
            pErrorText: "",
            disabled: false,
            loginText: "Login",
            showSingUp: false,
            showLogin: true
          }
          this.createRefs = this.createRefs.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.showLogin = this.showLogin.bind(this);
          this.showSingUp = this.showSingUp.bind(this);
          this.LogUserIn = this.LogUserIn.bind(this);
          this.createRefs();
      }

      createRefs(){
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
      } 

      hideLogin = () => {
        this.setState({
          showLogin: false
        })
      }
        
      showSingUp(e){
        e.preventDefault();
        this.setState({
          showSingUp: true,
          showLogin: false
        })
      }
      showLogin(e){
        e.preventDefault();
        this.setState({
          showSingUp: false,
          showLogin: true
        })
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
          loginText: "checking credentials..."
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
          await this.LogUserIn(username,password);
        }
      }
      
       render(){
         return (
          <div className="app" aria-describedby="main-loader" aria-busy="false">
              <div className="theme-layout">
                  <div className="container-fluid pdng0">
                    <div className="row merged">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="land-featurearea">
                          <div className="land-meta">
                            <h1>musicbase</h1>
                            <p>
                              musicbase is free to use for as long as you want.
                            </p>
                            <div className="friend-logo">
                            </div>
                            <a href="#" title="" className="folow-me">Follow Us on</a>
                          </div>	
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="login-reg-bg">
                        <Display isVisible={this.state.showLogin}>
                          <div className="log-reg-area sign">
                            <h2 className="log-title">{this.state.loginText}</h2>
                              <p>
                                Not on amalevelz Yet? <a href="#" title="">Take the tour</a> or <a onClick={this.showSingUp} href="#" title="">Join now</a>
                              </p>
                            <form method="post">
                              <div className="form-group">	
                                <input type="text" id="input" ref={this.usernameRef} required="required"/>
                                <label className="control-label" htmlFor="input">Username</label><i className="mtrl-select"></i>
                                <span className="error" style={{color:"red"}}>{this.state.uErrorText}</span>
                              </div>
                              <div className="form-group">	
                                <input type="password" ref={this.passwordRef} required="required"/>
                                <label className="control-label" htmlFor="input">Password</label><i className="mtrl-select"></i>
                                <span className="error" style={{color:"red"}}>{this.state.pErrorText}</span>
                                <Display isVisible={this.state.showActivateLink}>
                                  <Link to={"/account_verification/"+this.state.username}>Activate Account</Link>
                                </Display>
                              </div>
                              <div className="checkbox">
                                <label>
                                <input type="checkbox" defaultChecked/><i className="check-box"></i>Always Remember Me.
                                </label>
                              </div>
                              <a href="#" title="" className="forgot-pwd">Forgot Password?</a>
                              <div className="submit-btns">
                                <button className="mtr-btn signin" type="button" disabled={this.state.disabled} onClick={this.handleSubmit}><span>{this.state.loginText}</span></button>
                                <button onClick={this.showSingUp} className="mtr-btn" stye={{marginLeft: "10px"}} type="button"><span>Register</span></button>
                              </div>
                            </form>
                          </div>
                          </Display>
                          <Display isVisible={this.state.showSingUp}>
                            <SignUp showLogin={this.showLogin} hideLogin={this.hideLogin}/>
                          </Display>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          </div>
         );
       }
}

