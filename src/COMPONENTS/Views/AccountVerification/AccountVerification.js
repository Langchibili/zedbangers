import React from "react";
import "./AccountVerification.css";
import Display from "../../Includes/Display/Display";
import Loader from "../../Includes/Loader/Loader";
import api from "../../../Store/api";


export default class AccountVerification extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            showGetCodeBtn: true,
            feedBack: "",
            showReSendText: false,
            getCodeText: "GET CODE",
            showConfirmBthn: false,
            codeLength: 0,
            sendingText: "",
            error: ""
        }
        this.activationCodeRef = React.createRef();
    }
        
        
    handleGetCode = async (e)=>{
        e.preventDefault();
        const apiResponse = await api.createItem("/get_activation_code", {username: this.state.username});
        if(apiResponse){
            this.setState({
                sendingText: "sending text message, this can take upto 5 minutes, please be patient",
                error: ""
               }, ()=>{
                setTimeout(()=>{
                    this.setState({
                        sendingText: "",
                        feedBack: "code sent",
                        error: ""
                       }, ()=>{
                        this.toggleConfirmBtn();
                       });
                }, 30000);
               });
        }
        else{
            return;
        }

    }
    toggleConfirmBtn = ()=>{
       const code = this.activationCodeRef.current.value;
       if(code.length === 7 || code.length === 8){
           this.setState({
            codeLength: code.length
           }, ()=>{
            this.setState({
                showGetCodeBtn: false,
                showConfirmBthn: true
            });
           });
       }
       else{
        this.setState({
            codeLength: 0
           }, ()=>{
            this.setState({
                showGetCodeBtn: true,
                showConfirmBthn: false,
                getCodeText: "DIDN'T GET CODE? RESEND!",
                feedBack: "",
                error: "",
                sendingText: ""
            });
           });
       }  
    }
    
    async getUserData(){
     const apiResponse = await api.getItemByUsername("/users",this.props.match.params.username,"username password");
      if(apiResponse){this.setState({
        username:  apiResponse.username,
        password:  apiResponse.password
        });
      }
      else{
          return;
      }
        
    }

    logUserIn = async () => {
      const apiResponse = await api.createItem("/login",{username: this.state.username, password: this.state.password, type: "onAccountActivation"});
      if(apiResponse.hasOwnProperty("success")){
        window.location = "/";
      }
      else{
        console.log(this.state)
        this.setState({
            error: "invalid code",
            sendingText: "",
            feedBack: ""
        });
      }
    }

    handleSubmit = async (e)=>{
        e.preventDefault();
        const activationCode = this.activationCodeRef.current.value;
        const apiResponse = await api.createItem("/account_activation", {username: this.state.username, activation_code: activationCode});
        if(apiResponse){
          console.log(apiResponse);
            if(apiResponse.hasOwnProperty("success")){
                await this.logUserIn();
             }
             else{
                 this.setState({
                     error: "invalid code",
                     sendingText: "",
                     feedBack: ""
                 });
             }
        }
        else{
            return;
        }
        
    }
   componentDidMount(){
       this.props.logUrl();
       this.getUserData();
   }
   render(){
       return(
                <div classname="account-verification-wrap" style={{backgroundColor: '#cd0829', margin: '0 !important', padding: '0 !important'}}>
                  {/* HIDDEN PREHEADER TEXT */}
                  <div style={{display: 'none', fontSize: '1px', color: '#fefefe', lineHeight: '1px', fontFamily: '"Lato", Helvetica, Arial, sans-serif', maxHeight: '0px', maxWidth: '0px', opacity: 0, overflow: 'hidden'}}> We're thrilled to have you here! Get ready to dive into your new account. </div>
                  {/* LOGO */}
                  <table border={0} cellPadding={0} cellSpacing={0} width="100%"><tbody><tr>
                        <td bgcolor="#cd0829" align="center">
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{maxWidth: '600px'}}>
                            <tbody><tr>
                                <td align="center" valign="top" style={{padding: '40px 10px 40px 10px'}}> </td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#cd0829" align="center" style={{padding: '0px 10px 0px 10px'}}>
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{maxWidth: '600px'}}>
                            <tbody><tr>
                                <td bgcolor="#ffffff" align="center" valign="top" style={{padding: '40px 20px 20px 20px', borderRadius: '4px 4px 0px 0px', color: '#111111', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '48px', fontWeight: 400, letterSpacing: '4px', lineHeight: '48px'}}>
                                  <h1 style={{fontSize: '48px', fontWeight: 400, margin: 2}}>Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width={125} height={120} style={{display: 'block', border: '0px'}} />
                                </td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#cd0829" align="center" style={{padding: '0px 10px 0px 10px'}}>
                          {/* COPY */}
                          {/* COPY */}
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{maxWidth: '600px'}}>
                            <tbody><tr>
                                <td bgcolor="#ffffff" align="left" style={{padding: '20px 30px 40px 30px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px'}}>
                                  <p style={{margin: 0}}>We're excited to have you get started. First, you need to confirm your account. Just enter, the <strong>7</strong> or <strong>8 digit</strong> code we will send to your phone number then press comfirm code.</p>
                                </td>
                              </tr>
                              <tr>
                                <td bgcolor="#ffffff" align="left">
                                  <table width="100%" border={0} cellSpacing={0} cellPadding={0}>
                                    <tbody><tr>
                                        <td bgcolor="#ffffff" align="center" style={{padding: '20px 30px 60px 30px'}}>
                                          <table border={0} cellSpacing={0} cellPadding={0}>
                                            <tbody>
                                            <Display isVisible={this.state.showGetCodeBtn}> 
                                             <tr >
                                               <td align="center" style={{borderRadius: '3px'}} bgcolor="#cd0829"><a href="#" onClick={this.handleGetCode} style={{fontSize: '20px', fontFamily: 'Helvetica, Arial, sans-serif', color: '#ffffff', textDecoration: 'none', padding: '15px 25px', borderRadius: '2px', border: '1px solid #cd0829', display: 'inline-block'}}>{this.state.getCodeText}</a></td>
                                             </tr>
                                             </Display>
                                             <Display isVisible={this.state.showLoader}> 
                                               <Loader loaderContent={`sending code, please wait...+
                                                                     <span>this can take upto 5minutes depending on your internet connection</span>
                                                       `} />
                                             </Display>
                                               <tr>
                                                    <td align="center" style={{borderRadius: '3px'}}>
                                                      <input ref={this.activationCodeRef} onChange={this.toggleConfirmBtn} style={{border: "1px solid #cd0829", margin: ".4rem 0"}} type="tel" id="phone" name="phone"
                                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                        maxLength = "9"
                                                        required />
                                                    </td>
                                             </tr>
                                             <Display isVisible={this.state.showConfirmBthn}>
                                                <tr >
                                                    <td align="center" style={{borderRadius: '3px'}} bgcolor="#cd0829"><a href="#" onClick={this.handleSubmit} style={{fontSize: '20px', fontFamily: 'Helvetica, Arial, sans-serif', color: '#ffffff', textDecoration: 'none', padding: '15px 25px', borderRadius: '2px', border: '1px solid #cd0829', display: 'inline-block'}}>CONFIRM CODE</a></td>
                                                </tr>
                                             </Display>
                                                <span className="error" style={{color:"red"}}>{this.state.error}</span>
                                               <span className="feedback" style={{color:"green"}}>{this.state.feedBack}</span>
                                               <span className="feedback" style={{color:"blue"}}>{this.state.sendingText}</span>
                                            </tbody>
                                         </table>
                                        </td>

                                      </tr>
                                    </tbody></table>
                                </td>
                              </tr>
                                
                              <tr>
                                <td bgcolor="#ffffff" align="left" style={{padding: '0px 30px 0px 30px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px'}}>
                                  <p style={{margin: 0}}>If you don't receive a text message in the next 10 minutes, then please try again until you receive. </p>
                                </td>
                              </tr><tr>
                                {/* <td bgcolor="#ffffff" align="left" style={{padding: '20px 30px 20px 30px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px'}}>
                                  <p style={{margin: 0}}><a href="#" target="_blank" style={{color: '#FFA73B'}}>https://bit.li.utlddssdstueincx</a></p>
                                </td> */}
                              </tr>
                              <tr>
                                <td bgcolor="#ffffff" align="left" style={{padding: '0px 30px 20px 30px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px'}}>
                                  <p style={{margin: 0}}>If you have any questions, just email us @ amalevelz.gmail.com, we are always happy to help out.</p>
                                </td>
                              </tr>
                              <tr>
                                <td bgcolor="#ffffff" align="left" style={{padding: '0px 30px 40px 30px', borderRadius: '0px 0px 4px 4px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px'}}>
                                  <p style={{margin: 0}}>Cheers,<br />Amalevelz</p>
                                </td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#cd0829" align="center" style={{padding: '30px 10px 0px 10px'}}>
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{maxWidth: '600px'}}>
                            <tbody><tr>
                                <td bgcolor="#FFECD1" align="center" style={{padding: '30px 30px 30px 30px', borderRadius: '4px 4px 4px 4px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '18px', fontWeight: 400, lineHeight: '25px'}}>
                                  <h2 style={{fontSize: '20px', fontWeight: 400, color: '#111111', margin: 0}}>Need more help?</h2>
                                  <p style={{margin: 0}}><a href="#" target="_blank" style={{color: '#FFA73B'}}>We’re here to help you out</a></p>
                                </td>
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td bgcolor="#cd0829" align="center" style={{padding: '0px 10px 0px 10px'}}>
                          <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{maxWidth: '600px'}}>
                            <tbody><tr>
                                {/* <td bgcolor="#cd0829" align="left" style={{padding: '0px 30px 30px 30px', color: '#666666', fontFamily: '"Lato", Helvetica, Arial, sans-serif', fontSize: '14px', fontWeight: 400, lineHeight: '18px'}}> <br />
                                  <p style={{margin: 0}}>If these emails get annoying, please feel free to <a href="#" target="_blank" style={{color: '#111111', fontWeight: 700}}>unsubscribe</a>.</p>
                                </td> */}
                              </tr>
                            </tbody></table>
                        </td>
                      </tr>
                    </tbody></table>
                </div>          
       );
   }
}