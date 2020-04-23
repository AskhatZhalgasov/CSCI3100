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
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            address: "",
            orders: []
        }
    }   
    componentDidMount() {
        if(document.cookie.includes("username")) { 
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        const username = ca[0].substring("username=".length, ca[0].length)
        const self = this
        Promise.all([
            fetch('/api/user-address', {
                method: 'POST',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify({username: username}),
            }).then(res => res.text()),
            fetch('/api/orders',
                {method: 'POST',
                headers:{'content-type': 'application/json'},
                body: JSON.stringify({username: username})
            }).then(res=>res.json())
        ]).then(([address, orders]) => {
            self.setState({address, orders: orders.orders})
        })
        // fetch('/api/user-address', {
        //     method: 'POST',
        //     headers:{'content-type': 'application/json'},
        //     body: JSON.stringify({username: username}),
        // }).then(res => res.text())
        // .then(res => {
        //     self.setState({address: res})
        // })
        // fetch('/api/orders',
        //     {method: 'POST',
        //     headers:{'content-type': 'application/json'},
        //     body: JSON.stringify({username: username})
        // }).then(res=>res.json())
        // .then(res=> {
        //     if(res.orders.length != 0) {
        //         self.setState({orders: res.orders})
        //     }
        // })
        }
    }
    render() {
        if(document.cookie.includes("username")) {
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        const username = ca[0].substring("username=".length, ca[0].length)
        const rows = this.state.orders
        console.log(rows)
        return (
            <div> 
              <PizzaAppBar />
              <Grid style={{marginTop: "24px"}} container spacing={3}>
              <Grid item xs={4} />
              <Grid item xs={4} >
              <Paper elevation={5}>
                <Typography variant="h5">
                    Username
                </Typography>
                <br/>
                <Typography variant="h6">
                    <b>{username}</b>     
                </Typography>
                <br/>
                <Typography variant="h5">
                    Address
                </Typography>
                <br/>
                <Typography variant="h6">
                    <b>{this.state.address}</b>
                </Typography>            
                <br/>              
            {this.state.orders.length == 0 ? <Typography variant="h6"> You haven't made any orders yet</Typography> :
              (<TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={styles.th}>No.</TableCell>
                  <TableCell style={styles.th} align="left">Total paid</TableCell>
                  <TableCell style={styles.th} align="left">Date</TableCell>                  
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="left">
                      {row.reduce((sum, x) => (sum + x.pizza.price * x.qt), 0) + " HKD"}
                    </TableCell>
                    <TableCell align="left">{row.date}</TableCell>                    
                  </TableRow>
                ))}
                </TableBody>
              </Table>                
              </TableContainer> )
            }
              </Paper>
              </Grid>       
              <Grid item xs={4} />
              </Grid>
            </div>
        )
        } else {
            return(
                <div>
                <PizzaAppBar />
                <Grid style={{marginTop: "24px", flexDirection: "column"}} container spacing={3}>
                    <Typography variant="h4">
                        You are not authorized to view this page. Please log in or sign up
                    </Typography>
                </Grid>
                </div>
            )
        }
    }
}