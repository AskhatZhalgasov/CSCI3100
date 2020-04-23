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
import Grid from '@material-ui/core/Grid';
import PizzaAppBar from './AppBar'
const styles ={
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap', 
  },
  chip: {
    marginTop: "10px",
  },
  th: {
    fontSize: "24px"
  },
  title: {
    textAlign: "left"
  },
  shopping_cart_button: {
    marginTop: "5px"
  },
  order_container: {
    //position: "absolute",
    //display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    //bottom: 0,
    width: "100%",
    paddingTop: "6px",
    paddingBottom: "6px",    
    textAlign: "left"
  },
}

export default class Order extends Component {  
  state = { pizza_data: null, order: [], confirmed: false, deliveryTime: 0 };  
  componentDidMount() {
    fetch('/api/pizzas')
      .then(res => res.json())
      .then(data => this.setState({pizza_data: data}))
  }
  addToShoppingCart(e, row) {
    if(this.state.order.filter(item => item.pizza.name == row.name).length == 0) {
      this.setState((state) =>({order: [...state.order, {pizza: row, qt: 1}]}))
    } else {      
      let items = this.state.order
      items.filter(item => item.pizza.name == row.name)[0].qt += 1
      this.setState({order: items})
    
    }
  }
  delFromShoppingCart(itemToDelete) {
    this.setState((state) => ({order: state.order.filter(item => item.pizza.name != itemToDelete.pizza.name)}))
  }
  displayShoppingCart = (order) => {
    console.log(order)
    return (
      <Paper elevation={3} style={styles.order_container}>
      <Typography variant="h4">Your shopping cart is:  {
        order.length == 0 ? (
          <span>empty</span>
        ) : (                    
          order.map(item => (
            <div>            
            <Chip style={styles.chip} onDelete={() => this.delFromShoppingCart(item)} label={item.pizza.name + " x" + item.qt} color="primary"/>            
            </div>
          ))
        )
      } </Typography>
      {order.length == 0 ? (<span></span>) : (<Typography variant="h6" style={{marginTop: "5px"}}>Total price: {order.reduce((sum, x) => (sum + x.pizza.price * x.qt), 0) + " HKD"}</Typography>)}
       {order.length == 0 ? (<span></span>) : (<Button variant="contained" style={styles.shopping_cart_button} color="secondary" onClick={(e) => this.handleConfirm(e)}>Next</Button>)}
      </Paper>
    )
  }
  displayName = (row) => row.name
  displayPrice = (row) => row.price + " HKD"
  handleConfirm(e) {
    e.preventDefault()
    if(document.cookie.includes("username")) {
      this.props.history.push("/confirm", {order: this.state.order})
    } else {
      this.props.history.push("/login", {from: true, order: this.state.order})
    }
  }

  render() {
    const { username } = this.state;    
    const rows = this.state.pizza_data
    const order = this.state.order
    if(this.state.pizza_data != null) {
      if(!this.state.confirmed){
    return (
      <div> 
        <PizzaAppBar />
         <Typography variant="h3" component="h2" style={styles.title} gutterBottom>Welcome to the PizzaNut. You can complete your order online here!</Typography>
         <Grid container spacing={3}>
           <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={styles.th}>Name</TableCell>
                  <TableCell style={styles.th} align="left">Image</TableCell>
                  <TableCell style={styles.th} align="left">Price</TableCell>
                  <TableCell style={styles.th} align="left">Ingredients</TableCell>                  
                  <TableCell style={styles.th} align="right">Add</TableCell>                  
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {this.displayName(row)}
                    </TableCell>
                    <TableCell align="left">
                      <img src="./public/pizza_1.jpeg" width="166px" height="200px"></img>
                    </TableCell>
                    <TableCell align="left"><span>{this.displayPrice(row)}</span></TableCell>
                    <TableCell align="left">{row.ingredients.map(ingredient => (<Chip key={ingredient} label={ingredient} style={styles.chip}></Chip>))}</TableCell>
                    <TableCell align="right"><IconButton onClick={(e) => this.addToShoppingCart(e, row)}><AddBoxIcon/></IconButton></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer> 
        </Grid>
        <Grid item xs={4}>
        {this.displayShoppingCart(order)}
        </Grid>       
        </Grid>         
      </div>
    )}
      else {
        return (
        <Typography variant="h3" component="h2" gutterBottom>Thank you! Your order will be delivered in {this.state.deliveryTime/60000} minutes</Typography>
        )
      }
  } 
    else {
      return (<h1>Loading</h1>);
    }
  }
}
