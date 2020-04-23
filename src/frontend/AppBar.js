import React, { useState, Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
// function useForceUpdate(){
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => ++value); // update the state to force render
// }
export default class PizzaAppBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  var username = ca[0].substring("username=".length, ca[0].length)   
  return (
    <div>
      <AppBar position="static">
        <Toolbar>          
          <Typography variant="h6" style={{flexGrow: 1}}>
                {document.cookie.includes("username") ? <p><span>Welcome, </span> <span style={{textDecoration: "underline"}}><Link to="/profile">{username}</Link></span></p> : "Guest"}
          </Typography>
          {document.cookie.includes("username") ?
          <Button color="inherit" onClick={(e) => {document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); }); this.forceUpdate() }}>Log out</Button>
          :
          <div>
            <Button color="inherit"><Link style={{textDecoration: "none", }}   to={{
            pathname: "/login",        
            state: { from: false }
            }}>Log in</Link></Button>
            <Button color="inherit"><Link style={{textDecoration: "none", }} to={{
            pathname: "/sign-up",        
            state: { from: false }
            }}>Sign up</Link></Button>
          </div>
        }
        <Button color="inherit"><Link style={{textDecoration: "none", }} to="/">Order</Link></Button>                    
        </Toolbar>
      </AppBar>
    </div>
  );
      }
}