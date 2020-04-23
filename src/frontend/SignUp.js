import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import { Redirect } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PizzaAppBar from './AppBar'
export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            confirm_password: "",
            address: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event, type) {
        this.setState({[type]: event.target.value});
    }
    handleSubmit(event) {
        if(this.state.password != this.state.confirm_password) {
            alert('passwords do not match')
            return
        }
        event.preventDefault();  
        let self = this
        //let history = useHistory();       
        const data = {username: this.state.username, password: this.state.password, address: this.state.address}
        fetch('/api/sign-up', {
          method: 'POST',
          headers:{'content-type': 'application/json'},
          body: JSON.stringify(data),
        }).then(res => res.text())
        .then(res => {   
          if(res == "correct") {
            console.log(res)
            if(self.props.history.location.state.from) {
              document.cookie = `username=${self.state.username};`
              self.props.history.push('/confirm', {order: self.props.location.state.order})
            } else {
              self.props.history.push('/login', {from: false})
            }
          }
        })
      }  
      render() {  
        console.log(this.props.history)
  return (
    <div>
    <PizzaAppBar />
    <Grid container style={{marginTop: "24px"}}>
    <Grid item xs={4} />
    <Grid item xs={4} >
    <Paper elevation={5}>
    <form onSubmit={this.handleSubmit} action="http://localhost:8080/api/sign-up" noValidate autoComplete="off" method="POST">
      <div>
      <Typography type="h4">Sign up here</Typography>
      </div>
      <div>
        <TextField value={this.state.username} onChange={e => this.handleChange(e, "username")} required id="standard-required" label="Username"/>        
        </div>
        <div>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          required
          autoComplete="current-password"
          value={this.state.password}
          onChange={e => this.handleChange(e, "password")}
        />      
        </div>
        <div>
        <TextField
          id="standard-password-input-confirm"
          label="Confirm Password"
          type="password"
          required
          autoComplete="current-password-confirm"
          value={this.state.confirm_password}
          onChange={e => this.handleChange(e, "confirm_password")}
        />  
        </div>        
        <div>
          <TextField
            id="address"
            label="Delivery Address"
            value={this.state.address}
            onChange={e => this.handleChange(e, "address")}
            />
        </div>
        <br/>
        <div>
        <Button type="submit" variant="contained" color="primary" disableElevation>
            Sign Up
        </Button>
        </div>
        <br/>
        <div>
        <Button variant="contained" color="primary" disableElevation onClick={(e) => this.props.history.push("/login", {from: false})}>
            Log in
        </Button>
        </div>
    </form>
    </Paper>
    </Grid>
    <Grid item xs={4} />
    </Grid>
    </div>
  )
}}