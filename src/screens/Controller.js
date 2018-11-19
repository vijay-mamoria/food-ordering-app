import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Checkout from '../screens/checkout/Checkout';
import Details from '../screens/details/Details';
import Home from '../screens/home/Home';

class Controller extends Component {

    constructor() {
        super();
        this.baseUrl = "https://api.instagram.com/v1/users/self/";
    }

    render() {
        return (
            <Router>
                <div>
                    <Route path='/' render={(props) => <Home {...props} />} />
                    <Route path='/checkout' render={(props) => <Checkout {...props} />} />
                    <Route path='/details' render={(props) => <Details {...props} />} />
                </div>
            </Router>
        )
    }
}

export default Controller;