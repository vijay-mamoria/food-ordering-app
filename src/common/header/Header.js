import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Fastfood from '@material-ui/icons/Fastfood';
import Search from '@material-ui/icons/Search';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: true,
            userData: "",
            displayMenu: "disp-block"
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
     * Clear Session Storage on Logout.
     */
    onLogoutClickHandler = () => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (
            <div >
                <div>
                    <header className="header-bg">
                        <div className="header-logo">
                            <Fastfood className="searchIcon" />
                        </div>
                    </header>
                    {
                        this.state.loggedIn &&
                        <div>
                            <div className="right">
                                <div className="searchBox">
                                    <Search className="searchIcon" />
                                    <Input id="search" type="text" placeholder="Search by Restaurant Name" onChange={this.inputSearchChangeHandler}>
                                    </Input>
                                </div>
                                <div className="profile-picture">
                                    <Button variant="contained" color="default" onClick={this.onProfileIconClickHandler}>
                                        <AccountCircle /> LOGIN
                                    </Button>
                                    <div className={this.state.displayMenu}>
                                        <Menu id="simple-menu" open={false}>
                                            {/**Check if this onclick method executing then remove Link Tag */}
                                            <MenuItem key="1" onClick={this.myAccountClickHandler}>
                                                <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">My Account</Link>
                                            </MenuItem>
                                            <MenuItem key="2" onClick={this.logoutClickHandler}>
                                                <Link style={{ textDecoration: 'none', color: 'black' }} to="/profile">Logout</Link>
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {/** Modal Code Starts
                    <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
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
                                        Login Successful!
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
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
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
                                        Registration Successful. Please Login!
                                      </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabContainer>
                    }
                </Modal>
                */}
                </div>
            </div >
        )
    }
}

export default Header;