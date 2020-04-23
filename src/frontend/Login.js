import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import PizzaAppBar from './AppBar'
// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class Login extends Component {  
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            snackBarOpen: false,
            snackBar2Open: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event, type) {
        this.setState({[type]: event.target.value});
    }
    handleClose2 = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({snackBar2Open: false})
    };
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      this.setState({snackBarOpen: false})
    };
    handleSubmit(event) {
        event.preventDefault();         
        const data = this.state
        const self = this
        console.log(data)
        fetch('/api/login', {
          method: 'POST',
          headers:{'content-type': 'application/json'},
          body: JSON.stringify(data),
        }).then(res => res.text())
        .then(res => {
          if(res != "correct") {
              self.setState({snackBarOpen: "open"})
          } else {
              document.cookie = `username=${self.state.username};`
              if(self.props.location.state.from) {
                self.props.history.push("/confirm", {order: self.props.location.state.order})
              } else {
                self.props.history.push("/")
              }              
          }
        })
      }  
      componentDidMount() {
        console.log(this.props)
        if(this.props.location.state.from) {
          this.setState({snackBar2Open: true})
        }
      }
  render() {        
  return (
    <div>
    <PizzaAppBar />
    <Grid container style={{marginTop: "24px"}}>
      <Snackbar open={this.state.snackBarOpen} autoHideDuration={6000} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="error">
          Incorrect credentials! Please, try again.
        </Alert>
      </Snackbar>    
       <Snackbar open={this.state.snackBar2Open} autoHideDuration={3000} onClose={this.handleClose2}>
        <Alert onClose={this.handleClose2} severity="info">
          Please log in to complete your order
        </Alert>
      </Snackbar>
        <Grid item xs={4} />
        <Grid item xs={4} >
    <Paper elevation={5}>
    <form onSubmit={this.handleSubmit} action="http://localhost:8080/api/login" noValidate autoComplete="off" method="POST">
      <div>
        <Typography type="h4">Log in here</Typography>
        <TextField value={this.state.username} onChange={e => this.handleChange(e, "username")} required id="standard-required" label="Username"/>        
    </div>
    <div>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"        
          value={this.state.password}
          onChange={e => this.handleChange(e, "password")}
        />
        </div>
        <br/>
        <div>
        <Button type="submit" variant="contained" color="primary" disableElevation>
            Log in
        </Button>
        </div>
        <br/>        
        <div>
        <Button variant="contained" color="primary" disableElevation onClick={(e) => this.props.location.state.from ? this.props.history.push("/sign-up", {from: true, order: this.props.location.state.order}) : this.props.history.push("/sign-up") }>
          Sign up
        </Button>
        </div>

    </form>
    </Paper>
    </Grid>
    <Grid item xs={4} />
    </Grid>
    </div>
  )
  }
}