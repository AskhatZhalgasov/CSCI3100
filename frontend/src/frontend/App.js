import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
import Order from './Order';
import SignUp from './SignUp';
import Login from './Login';
import ConfirmOrder from './ConfirmOrder';
import Profile from './Profile'
import PizzaAppBar from './AppBar'
export default function App() {
    return(
        <Router>
      <div>                                       
        <Switch>          
          <Route path="/login" component={Login} />                    
          <Route path="/sign-up" component={SignUp} />                                  
          <Route path="/confirm" component={ConfirmOrder} />
          <Route path="/profile" component={Profile} /> 
          <Route path="/dmzncjksadhf" component={PizzaAppBar} />   
          <Route path="/" component={Order} />                                            
        </Switch>
      </div>
    </Router>
    )
}
