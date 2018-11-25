import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Checkout.css';

class Checkout extends Component {
    render() {
        return (
            <div>
                <Header />
                <div>
                    <div className="delivery">
                    </div>
                    <div className="summary">
                    </div>
                </div>
            </div>
        )
    }
}

export default Checkout;