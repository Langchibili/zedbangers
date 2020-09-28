import React from 'react';
import './SignUp.css';
import CountryCodeSelect from './CountryCodeSelect';
import { Link, Redirect } from "react-router-dom";
import api from "../../../Store/api";
import Loader from '../../Includes/Loader/Loader';
import Display from '../../Includes/Display/Display';


export default class SignUp extends React.Component{
        constructor(props){
          super(props);
          this.state = {
            username: null,
            selectedSex: "male",
            uErrorText:"",
            pErrorText: "",
            nErrorText: "",
            disabled: false,
            loginText: "Login",
            generalErrors: "",
            showloader: false,
            showContent: true,
            redirectUser: false
          }
          this.handleSubmit = this.handleSubmit.bind(this);
          this.createRefs();
      }

      createRefs = () => {
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.countryRef = React.createRef();
        this.phoneNumberRef = React.createRef();
        this.termsAndConditionsRef = React.createRef();
       } 

       validateNumber = (number) =>{
            let newNum = number.toString();
            let numArray = newNum.split("");
            if(numArray.length != 9){
                return false;
            }
            else if(numArray[0] === "0"){
                return false;
            }
            else{
                return true;
            }
       }

       checkUsername = async (username) =>{
        const apiResponse = await api.getItemByUsername("/users",username);
        console.log(apiResponse);
        if(apiResponse){ 
          this.setState({
            username: username
          })
          return true;
        }
        else{
          return false;
        }
      }
        
        CheckPassword = (password) =>
        { 
        var decimal =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if(password.match(decimal)) { return true; } else { return false; }
        } 
        handleSexSelection = (e) =>{
              const selectedValue = e.target.value;
              this.setState({
                  selectedSex: selectedValue
              });
        }
        
        redirectUser(){
          if(this.state.redirectUser){
            const username =  this.usernameRef.current.value;
            return <Redirect to={"/account_verification/"+username}/>;
          }
          else{
            return
          }
        }

        handleSubmit = async (e) =>{
            e.preventDefault();
            let newUserObject;
            const firstName = this.firstNameRef.current.value;
            const lastName = this.lastNameRef.current.value;
            const username = this.usernameRef.current.value;
            const password = this.passwordRef.current.value;
            const number = this.phoneNumberRef.current.value;
            const country = this.countryRef.current.value;
            const termsAndConditionsChecked = this.termsAndConditionsRef.current.checked;
            const userSex = this.state.selectedSex;
            let contactNumber = '+'+country.toString()+number.toString();
             
            if(!firstName || !lastName || !username || !password || !number || !country){
              this.setState({
                generalErrors:"Please fill all the fields"
              });
            }
            else{
                if(await this.checkUsername(username)){
                  this.setState({
                    generalErrors:"",
                    nErrorText:"",
                    pErrorText: "",
                    uErrorText:"username taken"
                  });
                }
                else{
                  if(!this.CheckPassword(password)){
                    this.setState({
                      generalErrors:"",
                      uErrorText:"",
                      nErrorText:"",
                      pErrorText:"password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, example $Password1"
                    });
                  }
                  else{
                      this.setState({
                        uErrorText:"",
                        pErrorText:"",
                        nErrorText:""
                      });
                       
                      if(this.validateNumber(number)){
                        if(!termsAndConditionsChecked){
                            this.setState({
                              generalErrors:"Please accept the terms and conditions"
                            });
                          }
                          else{
                            this.setState({
                              generalErrors:"",
                              uErrorText:"",
                              pErrorText:"",
                              nErrorText:"",
                              disabled: true,
                              signupText: "Signing You Up..."
                            });
                            newUserObject = {
                                username: username,
                                password: password,
                                contactNumber: contactNumber,
                                first_name: firstName,
                                last_name: lastName,
                                sex:userSex  
                            }
                            const apiResponse = await api.createItem("/signup",newUserObject);
                            if(apiResponse)
                            {
                                if(apiResponse.hasOwnProperty("error")){
                                    this.setState({
                                        generalErrors:"sorry, your registration has failed, try again later"
                                    });
                                }
                                else{
                                  this.setState({
                                    showContent: false,
                                  },()=>{
                                    this.setState({
                                      showloader: true
                                    },()=>{
                                      setTimeout(() => {
                                        this.setState({
                                          redirectUser: true
                                        });
                                      }, 1000);
                                    });
                                  });
                                }
                            }
                            else{
                                this.setState({
                                    generalErrors:"sorry, your registration has failed, try again later"
                                });
                            }
                        }
                      }
                    else{
                        this.setState({
                            generalErrors:"",
                            nErrorText:"invalid format!",
                            uErrorText: "",
                            pErrorText: ""
                          });
                    }
                    
                  }
                }
              } 
        }
      
       render(){
         return (
          <section className="m-t-lg wrapper-md animated fadeInUp" aria-describedby="main-loader" aria-busy="false">
          <div className="container aside-xl">
             <Display isVisible={this.state.showloader} > <Loader loaderContent="Signing you up..." /></Display>
             <Display isVisible={this.state.showContent} >
             <h2 className="log-title">Register</h2>
             <form method="post">
                <div className="form-group">	
                <input ref={this.firstNameRef} className="form-control rounded input-lg text-center no-border" type="text" required="required"/>
                <label className="control-label" htmlFor="input">FirstName</label><i className="mtrl-select"></i>
                </div>
                <div className="form-group">	
                <input ref={this.lastNameRef} className="form-control rounded input-lg text-center no-border" type="text" required="required"/>
                <label className="control-label" htmlFor="input">LastName</label><i className="mtrl-select"></i>
                </div>
                <div className="form-group">	
                <input ref={this.usernameRef} className="form-control rounded input-lg text-center no-border" type="text" required="required"/>
                <label className="control-label" htmlFor="input">User Name</label><i className="mtrl-select"></i>
                <span className="error" style={{color:"red"}}>{this.state.uErrorText}</span>
                </div>
                <div className="form-group">	
                <input ref={this.passwordRef} className="form-control rounded input-lg text-center no-border" type="password" required="required"/>
                <label className="control-label" htmlFor="input">Password</label><i className="mtrl-select"></i>
                <span className="error" style={{color:"red"}}>{this.state.pErrorText}</span>
                </div>
                <div className="form-radio">
                <div className="radio">
                <label>
                    <input onChange={this.handleSexSelection} type="radio" name="radio" value="male" defaultChecked/><i className="check-box"></i>Male
                </label>
                </div>
                <div className="radio">
                <label>
                    <input onChange={this.handleSexSelection} type="radio" name="radio" value="female"/><i className="check-box"></i>Female
                </label>
                </div>
                <div className="radio">
                <label>
                    <input onChange={this.handleSexSelection} type="radio" name="radio" value="other"/><i className="check-box"></i>Other
                </label>
                </div>
                </div>
                <span>Choose Country</span> 
                {<CountryCodeSelect selectRef={this.countryRef}/>}
                <label htmlFor="phone" style={{display: "block", font: "1rem 'Fira Sans', sans-serif", margin: ".4rem 0"}}>Enter your phone number:</label>

                <input className="form-control rounded input-lg text-center no-border" ref={this.phoneNumberRef} style={{borderLeft:"1px solid grey",margin: ".4rem 0"}} type="tel" id="phone" name="phone"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    maxLength = "9"
                    required />

                <small> Format: 97#######</small>
                <p className="error text-center" style={{color:"red", display:"inline-block", marginTop:"5px"}}>{this.state.nErrorText}</p>
                <div className="checkbox i-checks m-b"> <label className="m-l"> <input ref={this.termsAndConditionsRef} type="checkbox" /><i></i> Agree the <a href="#">terms and policy</a> </label> </div>
                <p className="error text-center" style={{color:"red"}}>{this.state.generalErrors}</p>
                <div className="submit-btns">
                <button href="#" className="btn btn-lg btn-warning lt b-white b-2x btn-block btn-rounded" type="button" onClick={this.handleSubmit}><span>Register</span></button>
                </div>
                <div className="line line-dashed"></div>
                <p className="text-muted text-center"><small>Already have an account?</small></p>
                <Link to="/login" className="btn btn-lg btn-info btn-block rounded">signin</Link>
                {this.redirectUser()}
            </form>
             </Display>
            </div>
          </section>
         );
       }
}