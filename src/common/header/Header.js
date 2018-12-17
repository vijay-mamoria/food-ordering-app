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
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import Search from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import Modal from 'react-modal';
import './Header.css';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginLeft: '2px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    }
};

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});


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

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            userData: "",
            anchorEl: null,
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
            contact: "",
            showSnackBarMsg: false,
            snackBarMsg: "",
            loggedInName: "LOGIN",
            openMenu: false,
            anchorE2: null,
            //Validation
            isValidEmail: "disp-none",
            isValidPwd: "disp-none",
            isValidContact: "disp-none",
            isValidContactInLogIn: "disp-none",
            errorResp: "disp-none",
            errorResponse: "",
        }

        if (sessionStorage.getItem('access-token') != null) {
            this.state = {loggedIn:true, loggedInName: sessionStorage.getItem('loggedInName')}
          }
    }

    inputSearchChangeHandler = (e) => {
        this.props.searchHandler(e.target.value);

    }

    onProfileIconClickHandler = () => {
        this.setState({ displayMenu: "disp-block" });
    }

    openProfileDropDownHandler = (e) => {
        this.setState({ openMenu: !this.state.openMenu });
    }

    /**
     * Open Modal on Login Click.
     */
    openModalHandler = () => {
        this.setState({
            isModalOpen: true,
            value: 0,
            loginContactRequired: "disp-none",
            loginContact: "",
            loginPasswordRequired: "disp-none",
            loginPassword: "",
            firstnameRequired: "disp-none",
            firstname: "",
            lastname: "",
            emailRequired: "disp-none",
            email: "",
            registerPasswordRequired: "disp-none",
            registerPassword: "",
            contactRequired: "disp-none",
            contact: "",
            snackBarMsg: "",
            showSnackBarMsg: false,
            loggedInName: "LOGIN",
            isValidEmail: "disp-none",
            isValidPwd: "disp-none",
            isValidContact: "disp-none",
            isValidContactInLogIn: "disp-none",
            errorResp: "disp-none",
            errorResponse: "",


        });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
        this.setState({
            errorResp: "disp-none",
            errorResponse: ""
        });
    }

    closeModalHandler = () => {
        this.setState({ isModalOpen: false });
    }

    /**
     * Clear Session Storage on Logout.
     */
    logoutClickHandler = () => {
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem('loggedInName');
        this.setState({
            loggedIn: false,
            openMenu: false,
            loggedInName: "LOGIN",
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

    loginClickHandler = () => {
        this.setState({ isValidContactInLogIn: "disp-none" });

        if (this.state.loginContact === "" || this.state.loginPassword === "") {
            this.state.loginContact === "" ? this.setState({ loginContactRequired: "disp-block" }) : this.setState({ loginContactRequired: "disp-none" });
            this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "disp-block" }) : this.setState({ loginPasswordRequired: "disp-none" });
            return;
        }

        let contactPattern = /^[0-9]{10}$/;

        if (!this.state.loginContact.match(contactPattern)) {
            this.setState({ isValidContactInLogIn: "disp-block", loginContactRequired: "disp-none" });

            return;
        }
        let dataLogin = null;
        var data = {};
        data.contactNumber = this.state.loginContact;
        data.password = this.state.password;
        var json = JSON.stringify(data);
        console.log(json);
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && xhrLogin.status === 200) {
                if (this.responseText.startsWith("This contact number has not been registered!")) {
                    that.setState({
                        errorResp: "disp-block",
                        errorResponse: xhrLogin.responseText,
                    });
                    return;
                }
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));
                sessionStorage.setItem("loggedInName", JSON.parse(this.responseText).firstName);


                console.log(this.responseText);
                that.setState({
                    loggedIn: true,
                    isModalOpen: true,
                    showSnackBarMsg: true,
                    snackBarMsg: "Logged in successfully!",
                    loggedInName: JSON.parse(this.responseText).firstName
                    
                });
                
                //sessionStorage.setItem("loggedInUserName", this.state.loggedInName);
                that.closeModalHandler();
            }
            else {
                that.setState({
                    errorResp: "disp-block",
                    errorResponse: xhrLogin.responseText,
                });
            }
        });

        xhrLogin.open("POST", "http://localhost:8080/api/user/login?contactNumber=" + this.state.loginContact + "&password=" + this.state.loginPassword);
        //  xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa("contactNumber="+this.state.loginContact + "&password=" + this.state.loginPassword));
        //  xhrLogin.setRequestHeader("contactNumber",this.state.loginContact);
        //xhrLogin.setRequestHeader("password",this.state.loginPassword);

        xhrLogin.setRequestHeader("Content-Type", "application/json;charset=utf-8");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }

    signupClickHandler = () => {
        if (this.state.firstname === "" || this.state.email === "" || this.state.contact === "" || this.state.registerPassword === "") {
            this.state.firstname === "" ? this.setState({ firstnameRequired: "disp-block" }) : this.setState({ firstnameRequired: "disp-none" });
            this.state.email === "" ? this.setState({ emailRequired: "disp-block" }) : this.setState({ emailRequired: "disp-none" });
            this.state.contact === "" ? this.setState({ contactRequired: "disp-block" }) : this.setState({ contactRequired: "disp-none" });
            this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "disp-block" }) : this.setState({ registerPasswordRequired: "disp-none" });
            return;
        }
        this.setState({
            isValidEmail: "disp-none",
            isValidPwd: "disp-none",
            isValidContact: "disp-none",

        })
        let emailPattern = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
        //let emailPattern =/^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$/;
        // let passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[#@$%&*!^])(?=\S+$).{8,}/;
        let contactPattern = /^[0-9]{10}$/;

        if (!this.state.email.match(emailPattern)) {
            this.setState({ isValidEmail: "disp-block", emailRequired: "disp-none" });
            return;
        }

        if (!this.state.registerPassword.match(passwordPattern)) {
            this.setState({ isValidPwd: "disp-block", registerPasswordRequired: "disp-none" });
            return;
        }

        if (!this.state.contact.match(contactPattern)) {
            this.setState({ isValidContact: "disp-block", contactRequired: "disp-none" });
            return;
        }

        let dataSignup = JSON.stringify({
            "firstName": this.state.firstname,
            "lastName": this.state.lastname,
            "email": this.state.email,
            "contactNumber": this.state.contact,
            "password": this.state.registerPassword
        });

        let data = "firstName=" + this.state.firstname + "&" + "lastName=" + this.state.lastname + "&" + "email=" + this.state.email + "&" + "contactNumber=" + this.state.contact + "&" + "password=" + this.state.registerPassword;
        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status === 201) {
                console.log("Response Text : " + xhrSignup.responseText);
                that.setState({
                    registrationSuccess: true,
                    value: 0,
                    errorResp: "disp-none",
                    showSnackBarMsg: true,
                    snackBarMsg: "Registered successfully! Please login now!",
                });
            }
            else {
                that.setState({
                    errorResp: "disp-block",
                    errorResponse: xhrSignup.responseText,
                });
            }
        });

        xhrSignup.open("POST", "http://localhost:8080/api/user/signup?" + data, true);
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        //xhrSignup.setRequestHeader("Content-length", dataSignup.length);
        xhrSignup.send();
    }

    showMenu = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    }

    hideMenu = () => {
        this.setState({ anchorEl: null });
    }

    myProfileClickHandler = () => {
        this.props.history.push("/profile");
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ showSnackBarMsg: false });
    };

    render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;

        return (
            <div >
                <div className="header-bg">
                    <div className="header-logo">
                        {/** Application Icon*/}
                        <Fastfood />
                    </div>
                    {/** show only for home page */}
                    { this.props.showSearchBox && 
                    <div className="middle">
                        <div className="searchBox">
                            {/** Search Bar*/}
                            <Search className="searchIcon" />
                            <Input id="search" type="text" placeholder="Search by Restaurant Name" onChange={this.inputSearchChangeHandler}>
                            </Input>
                        </div>
                    </div>
                    }
                    {/** show only for home page */}
                    { this.props.showCategories && 
                    <div className="categories">
                        <span>
                            <span >
                                <FormatListBulleted className="formatListIcon" />
                                <label className="categoryLabel" variant="contained" color="default"
                                    aria-owns={anchorEl ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                >
                                    Categories
                                </label>
                            </span>
                            {/** Menu for Categories just a placeholder, the below code is disabled*/}
                            <Menu id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)} onClose={this.hideMenu}>
                                {/**Check if this onclick method executing then remove Link Tag */}
                                <MenuItem key="1" onClick={this.myAccountClickHandler}>
                                    My Profile
                                                </MenuItem>
                                <MenuItem key="2" onClick={this.logoutClickHandler}>
                                    Logout
                                                </MenuItem>
                            </Menu>
                        </span>
                    </div>
                    }
                    {/** Login Button*/}
                    {!this.state.loggedIn ?
                        <div className="login">
                            <Button style={{ "textTransform": "none" }} variant="contained" color="default" onClick={this.openModalHandler}>
                                <AccountCircle />LOGIN
                                    </Button>
                        </div>
                        :
                        <div className="login">
                            <Button
                                aria-haspopup="true" variant="text" onClick={this.openProfileDropDownHandler}
                                disableRipple
                                disableFocusRipple
                                style={{ "background": "transparent", "text-transform": "none", "outline": "none" }} >
                                <AccountCircle />{this.state.loggedInName}
                            </Button>
                            {this.state.openMenu ? (
                                <div className="user-profile-drop-down">

                                    <div>
                                        {/* <span className="my-account-dropdown-menu-item" onClick={this.myProfileClickHandler}>
                                        My Profile
                                         </span>*/}

                                        <Link to="/profile" className="my-account-dropdown-menu-item">
                                            My Profile
                                        </Link>
                                        <hr />
                                    </div>

                                    <div
                                        onClick={this.logoutClickHandler}
                                        className="logout-dropdown-menu-item"
                                    >
                                        Logout
                             </div>
                                </div>
                            ) : null}
                        </div>
                    }

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
                                <FormControl className="formControl" required>
                                    <InputLabel htmlFor="loginContact">Contact No.</InputLabel>
                                    <Input id="loginContact" type="text" onChange={this.inputloginContactChangeHandler} />
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.loginContactRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.isValidContactInLogIn}>
                                        <span className="red">Invalid Contact</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl className="formControl" required>
                                    <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                    <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.loginPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormHelperText style={{ "background-color": "transparent" }} className={this.state.errorResp}>
                                    <span className="red" style={{ "position": "absolute" }}>{this.state.errorResponse}</span>
                                </FormHelperText>
                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                            </TabContainer>
                        }

                        {this.state.value === 1 &&
                            <TabContainer>
                                <FormControl required>
                                    <InputLabel htmlFor="firstname">First Name</InputLabel>
                                    <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.firstnameRequired}>
                                        <span className="red" >required</span>
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
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.emailRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.isValidEmail}>
                                        <span className="red">Invalid Email</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                    <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.registerPasswordRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.isValidPwd}>
                                        <span style={{ "background-color": "transparent", "position": "absolute" }} className="red">Password must contain at least one capital letter, one small letter,
                                    one number, and one special character</span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />
                                <FormControl required>
                                    <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                    <Input id="contact" type="text" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.contactRequired}>
                                        <span className="red" >required</span>
                                    </FormHelperText>
                                    <FormHelperText style={{ "background-color": "transparent" }} className={this.state.isValidContact}>
                                        <span
                                            className="red" style={{ "position": "absolute" }}>Contact No. must contain only numbers and must be 10 digits long
                            </span>
                                    </FormHelperText>
                                </FormControl>
                                <br /><br />

                                <FormHelperText style={{ "background-color": "transparent" }} className={this.state.errorResp}>
                                    <span className="red" style={{ "position": "absolute" }}>{this.state.errorResponse}</span>
                                </FormHelperText>

                                <br /><br />
                                <Button variant="contained" color="primary" onClick={this.signupClickHandler}>SIGNUP</Button>
                            </TabContainer>
                        }
                    </Modal>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.showSnackBarMsg}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackBarMsg}</span>}
                    action={[

                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />

            </div >
        )
    }
}

export default withStyles(styles)(Header);