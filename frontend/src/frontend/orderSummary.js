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

export default class Profile extends Component {  
  state = { username : null, pizzas_ordered : [], orderId : -1, confirmed: false, deliveryTime: 0 };  
  componentDidMount() {
    fetch('/api/pizzas')
      .then(res => res.json())
      .then(data => this.setState({pizza_data: data}))
  }

  calculateCost() {
      //calculate total cost from pizzas_ordered
      return 
  }

  processOrder() {
      //redirect function to be implemented
    redirect ("/process-order");
  }

  getUserInfo() {
    //redirect function to be implemented
    redirect ("/get-info");
  }

  sentToDelivery() {
      // sent to delivery service
      // assume we will sent the data through some API
  }
  
  doPayment() {
    //further improvement - to cypher this kind of information to avoid leaking, to be implemented in the future
    if(creditCardNumber.length == 19)
    {
      //correct payment data
      sendToDelivery()
    }
  }

  render() {
    const {creditCardNumber} = this.state.creditCardNumber
    const { username } = this.state;    
    const rows = this.state.pizzas_ordered
    const order = this.state.order
    if(this.state.pizzas_ordered != null) {
        return (
          {this.displayInfo()}
        
          // put button to do payment
        )
    }
  } else {
      return (<h1>Loading</h1>);
    }
  }
}
