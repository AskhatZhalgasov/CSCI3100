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
  state = { username : null, order: [], confirmed: false, deliveryTime: 0 };  
  componentDidMount() {
    fetch('/api/pizzas')
      .then(res => res.json())
  }

  displayInfo() {
        //this function fetches data from the backend
        requestInfoFromBackend()
  }

  displayHistory() {
    //this function fetches history data from the backend
    requestHistoryFromBackend()
  }

  render() {
    const { username } = this.state;    
    const rows = this.state.pizza_data
    const order = this.state.order
    if(this.state.pizza_data != null) {
      if(!this.state.confirmed){
        return (
          {this.displayInfo()}
        )
    )}
  } else {
      return (<h1>Loading</h1>);
    }
  }
}
