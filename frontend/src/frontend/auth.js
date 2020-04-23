
import React, { Component } from 'react';
import './app.css';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


const styles ={

}

class Auth extends React.Component{
  state = {username: "", password: "", regUsername:"", regPassword:""}
  signIn() {
    fetch ("/signin", method: POST);
  }
  signUp() {
   fetch ("/signup", method: POST);
  }
  forgetPassword () {
    //redirect function to be implemented
    redirect ("/forget-password");
  }
  forgetUserName () {
    //redirect function to be implemented
    redirect ("/forget-username");
  }
  render() {
    return (
      <div>
      <p>sign up </p>
      <input value = {regUsername} onChange={this.setState({regUsername})}/>
      <input password value = {regPassword} onChange={this.setState({regPassword})} />
      <button onClick={this.signUp()}> Sign up </button>
      </div>

      <div>
      <p>login </p>
      <input value = {username} onChange={this.setState({username})}/>
      <input password value = {password} onChange={this.setState({password})} />
      <button onClick={this.signIn()}> Log in </button>
      </div>
      <button onClick={forgetUserName()}>Forgot Username </button>
      <button onClick={forgetPassword()}> Forgot Password </button>
    )
  }
}
