import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import PizzaAppBar from './AppBar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {Link} from "react-router-dom";
export default class ConfirmOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      payment_method: "cash",
      card_number: "",
      date: "",
      cvv: "",
      completed: false,
      time: 0
    }
  }
  handleChange(event, type) {
    this.setState({[type]: event.target.value});
  }
  finalizeOrder() {
    if(this.state.payment_method == "card" && (this.state.card_number.length != 16 || this.state.date.length != 5 || this.state.cvv.length != 3)) {
      alert("You have selected credit card as your payment method, but have not filled all the fields correctly. Please try again")
      return
    }
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    const username = ca[0].substring("username=".length, ca[0].length)
    const self = this
    fetch('/api/order', {
      method: 'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify({username: username, order: this.props.location.state.order }),
    }).then(res => res.text())
    .then(res => { 
      self.setState({completed: true, time: res})
    })
  }
    render() {
        if(document.cookie == undefined || document.cookie == "") {
            return (
                <div style={{padding: "24px"}}>
                    <Typography variant="h3">Only authorized users can access this page. If you logged out before confirming your order, you will need to make a new order <Link to="/">here</Link></Typography>
                </div>
            )
        }
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        const username = ca[0].substring("username=".length, ca[0].length)
        //console.log(this.props.location.state)
        const rows = this.props.location.state.order
        return (
            <div> 
              <PizzaAppBar />
              <Grid container style={{marginTop: "24px"}} spacing={3}>
              <Grid item xs={4} />
              <Grid item xs={4} >
              <Paper style={{textAlign: "left"}} elevation={5}>
                <Typography variant="h5">
                    Your order:
                </Typography>
                <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Pizza name</TableCell>
            <TableCell align="right">Price</TableCell>            
            <TableCell align="right">Quantity</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.pizza.name}
              </TableCell>
              <TableCell align="right">{row.pizza.price + " HKD"}</TableCell>              
              <TableCell align="right">{row.qt}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <br/>
    <Typography variant="h6">Total to pay: {rows.reduce((sum, x) => (sum + x.pizza.price * x.qt), 0) + " HKD"}</Typography>
    <br/>
    <Typography variant="h6">Pay with:</Typography>
    <div>
    <RadioGroup aria-label="payment" name="payment" value={this.state.payment_method} onChange={(e) => this.setState({payment_method: e.target.value})}>
          <FormControlLabel value="cash" control={<Radio />} label="Cash" />
          <FormControlLabel value="card" control={<Radio />} label="Credit card" />
      </RadioGroup>  
      {this.state.payment_method == "card" && (
        <div>
        <div>
        <TextField value={this.state.card_number} onChange={e => this.handleChange(e, "card_number")} id="credit_card" label="Credit card number"/>        
        </div>
        <TextField style={{marginRight: "5px"}} value={this.state.date} onChange={e => this.handleChange(e, "date")} id="date" label="Exp. date"/>        
        <TextField value={this.state.cvv} onChange={e => this.handleChange(e, "cvv")} id="cvv" label="CVV"/>        
        </div>
      )} 
      { this.state.completed 
      ? (<div><Typography variant="h6">Your order is completed and will be delivered in {this.state.time} minutes</Typography><br/><Button variant="contained" color="secondary" onClick={(e) => this.props.history.push("/")}>Make another order</Button></div>)
      :
    (<Button style={{margin: "8px"}} variant="contained" color="primary" onClick={() => this.finalizeOrder()}>Confirm</Button>)
      }
    </div>
                </Paper>
              </Grid>
              <Grid item xs={4} />
              </Grid>
            </div>
        )
    }
}