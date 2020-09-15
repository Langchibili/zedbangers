import React from "react";
import Header from "../Includes/Header/Header";
import Footer from "../Includes/Footer/Footer";
import Navigation from "../Includes/Navigation/Navigation";
import Views from "../Views/Views";
import SideBar from "../Includes/SideBar/SideBar";
import { BrowserRouter } from "react-router-dom";

export default class App extends React.Component{
   render(){
    return ( 
      <BrowserRouter>
       <section className="vbox">
          <Header />
          <section>
            <section className="hbox stretch">
              <Navigation />    
               <section id="content">
                <section className="hbox stretch">
                 <section>
                   <section className="vbox">
                       <Views />
                       <Footer />
                   </section>
                 </section>
                 <SideBar />
                </section>
              </section>
           </section>
          </section>
        </section>
      </BrowserRouter>
      );
      } 
}