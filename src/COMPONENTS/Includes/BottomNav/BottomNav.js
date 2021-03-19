import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from "react-router-dom";
import "./BottomNav.css";
import { Home, CloudUpload } from '@material-ui/icons';
import BackButton from '../BackButton/BackButton';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className="bottom-nav">
      <div className="white-theme"><BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BackButton location={props.location}/>
        <Link to={props.isLoggedIn? "/upload/song": "/login"}><BottomNavigationAction label="Add Song" value="upload_song" icon={<CloudUpload />} /></Link>
        <Link to={props.isLoggedIn? "/upload/embed": "/login"}><BottomNavigationAction label="Add Video" value="upload_video" icon={<CloudUpload color="secondary"/>} /></Link>
        <Link to="/"><BottomNavigationAction label="home" value="home" icon={<Home />} /></Link>
      </BottomNavigation></div>
    </div>
  );
}
