import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Checkout from '../screens/checkout/Checkout';
import Details from '../screens/details/Details';
import Profile from '../screens/profile/Profile';
import Home from '../screens/home/Home';

class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = "http://localhost:8080/api/";
    }

    render() {
        return (
            <Router>
                <div>
                    {/**exact is needed */}
                    <Route exact path='/' render={(props) => <Home {...props} baseUrl={this.baseUrl} />} />
                    {/**Passing Restaurant ID Dynamically to Details page. It will be referred with same param name inside */}
                    <Route path='/restaurant/:restaurantId' render={(props) => <Details {...props} baseUrl={this.baseUrl} />} />
                    <Route path='/checkout' render={(props) => <Checkout {...props} baseUrl={this.baseUrl} />} />
                    <Route path='/profile' render={(props) => <Profile {...props} baseUrl={this.baseUrl} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;