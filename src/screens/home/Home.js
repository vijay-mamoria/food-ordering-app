import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div className="Home-bg">
                <div className="Home-logo">
                    <Header />
                </div>
            </div>
        )
    }
}

export default Home;