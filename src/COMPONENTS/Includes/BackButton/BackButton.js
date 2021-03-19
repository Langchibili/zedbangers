import React from "react";
import { Link } from "react-router-dom";
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { ArrowBackTwoTone } from '@material-ui/icons';

export default class BackButton extends React.Component{  
  constructor(props){
    super(props);
    this.state = {
      prevUrl: null
    }
  }
  
  // shouldComponentUpdate(nextProps, nextState){
  //   return this.state.prevUrl !== nextState.prevUrl
  // }
  componentDidUpdate(prevProps){
    if(prevProps.location === this.props.location){
      return 
    }
    else{
      this.setState({
          prevUrl: prevProps.location.pathname
      })
    }
  }
  render(){
    return ( 
      <Link to={this.state.prevUrl}><BottomNavigationAction label="Home" value="home" icon={<ArrowBackTwoTone color={this.state.prevUrl? "secondary" : ""} />} /></Link> 
      );
  } 
} 