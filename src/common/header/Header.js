import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Fastfood from '@material-ui/icons/Fastfood';
import Search from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import './Header.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: true,
            userData: "",
            displayMenu: false,
            isModalOpen: false,//Modal State
            value: 1,//Tab Value
            //Login Tab Fields
            loginContactRequired: "disp-none",
            loginContact: "",
            loginPasswordRequired: "disp-none",
            loginPassword: "",
            //Signup Tab Fields
            firstnameRequired: "disp-none",
            firstname: "",
            lastname: "",
            emailRequired: "disp-none",
            email: "",
            registerPasswordRequired: "disp-none",
            registerPassword: "",
            contactRequired: "disp-none",
            contact: ""
        }
    }

    //Using Fetch with async and await to get json data
    async componentDidMount() {
        if (this.state.loggedIn) {
            const response = await fetch(`https://api.instagram.com/v1/users/self/?access_token=9204272757.f8594e7.25756c2b57804b6b8b1cb08b48e45566`);
            const json = await response.json();
            this.setState({ userData: json.data });
        }
    }

    inputSearchChangeHandler = (e) => {
        console.log(e.target.value);
    }

    onProfileIconClickHandler = () => {
        this.setState({ displayMenu: "disp-block" });
    }

    /**
     * Open Modal on Login Click.
     */
    openModalHandler = () => {
        this.setState({
            isModalOpen: true,
            value: 0,
            loginContactRequired: "dispNone",
            loginContact: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: ""
        });
        this.state.loginContact === "" ? this.setState({ loginContactRequired: "disp-block" }) : this.setState({ loginContactRequired: "disp-none" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "disp-block" }) : this.setState({ loginPasswordRequired: "disp-none" });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    closeModalHandler = () => {
        this.setState({ isModalOpen: false });
    }

    /**
     * Clear Session Storage on Logout.
     */
    logoutClickHandler = () => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        this.setState({
            loggedIn: false
        });
    }

    inputloginContactChangeHandler = (e) => {
        this.setState({ loginContact: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    /**
 * Use Later after integrating with Backend
 */
    loginClickHandler = () => {
        this.state.loginContact === "" ? this.setState({ loginContactRequired: "disp-block" }) : this.setState({ loginContactRequired: "disp-none" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "disp-block" }) : this.setState({ loginPasswordRequired: "disp-none" });

        /**
        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
    
                that.setState({
                    loggedIn: true,
                    isModalOpen: true
                });
    
                that.closeModalHandler();
            }
        });
    
        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.loginContact + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
        */
    }

    signupClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: "disp-block" }) : this.setState({ firstnameRequired: "disp-none" });
        this.state.email === "" ? this.setState({ emailRequired: "disp-block" }) : this.setState({ emailRequired: "disp-none" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "disp-block" }) : this.setState({ registerPasswordRequired: "disp-none" });
        this.state.contact === "" ? this.setState({ contactRequired: "disp-block" }) : this.setState({ contactRequired: "disp-none" });

        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    registrationSuccess: true,
                    value: 1
                });
            }
        });

        xhrSignup.open("POST", this.props.baseUrl + "signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }

    showMenu = () => {
        this.setState({ displayMenu: true });
    }

    hideMenu = () => {
        this.setState({ displayMenu: false });
    }

    render() {
        return (
            <div >
                <div>
                    <header className="header-bg">
                        <div className="header-logo">
                            {/** Application Icon*/}
                            <Fastfood className="searchIcon" />
                        </div>
                        <div>
                            <div className="right">
                                <div className="searchBox">
                                    {/** Search Bar*/}
                                    <Search className="searchIcon" />
                                    <Input id="search" type="text" placeholder="Search by Restaurant Name" onChange={this.inputSearchChangeHandler}>
                                    </Input>
                                </div>
                                <div className="profile-picture">
                                    {/** Login Button*/}
                                    <Button variant="contained" color="default" onClick={this.openModalHandler}>
                                        <AccountCircle /> LOGIN
                                    </Button>
                                    <span>
                                        <span>
                                            {/** User Profile Button*/}
                                            <Button variant="contained" color="default"
                                                aria-owns={this.state.displayMenu ? 'simple-menu' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.showMenu}>
                                                <AccountCircle /> FirstName
                                            </Button>
                                            {/** Menu for Logged in User*/}
                                            <Menu id="simple-menu" open={this.state.displayMenu} onClose={this.hideMenu}>
                                                {/**Check if this onclick method executing then remove Link Tag */}
                                                <MenuItem key="1" onClick={this.myAccountClickHandler}>
                                                    My Profile
                                                </MenuItem>
                                                <MenuItem key="2" onClick={this.logoutClickHandler}>
                                                    Logout
                                                </MenuItem>
                                            </Menu>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/** Modal Login and Register*/}
                    <Modal
                        ariaHideApp={false}
                        isOpen={this.state.isModalOpen}
                        contentLabel="Login"
                        onRequestClose={this.closeModalHandler}
                        style={customStyles}>
                        <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                            <Tab label="Login" />
                            <Tab label="Signup" />
                        </Tabs>

                        {this.state.value === 0 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="loginContact">Contact No.</InputLabel>
                                    <Input id="loginContact" type="text" onChange={this.inputloginContactChangeHandler} />
                                    <FormHelperText className={this.state.loginContactRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                    <FormHelperText className={this.state.loginPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                {this.state.loggedIn === true &&
                                    <FormControl>
                                        <span className="successText">
                                            Logged in successfully!
                                    </span>
                                    </FormControl>
                                }
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                            </TabContainer>
                        }

                        {this.state.value === 1 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                                    <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                    <FormHelperText className={this.state.firstnameRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl>
                                    <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                    <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <Input id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                    <FormHelperText className={this.state.emailRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                    <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                                    <FormHelperText className={this.state.registerPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                    <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                    <FormHelperText className={this.state.contactRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                {this.state.registrationSuccess === true &&
                                    <FormControl>
                                        <span className="successText">
                                            Registered successfully! Please login now!
                                      </span>
                                    </FormControl>
                                }
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                            </TabContainer>
                        }
                    </Modal>
                </div>
            </div >
        )
    }
}

export default Header;