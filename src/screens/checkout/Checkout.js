import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Checkout.css';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    snackbar: {
        margin: theme.spacing.unit,
    },
});

function getSteps() {
    return ['Delivery', 'Payment'];
}

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            value: 0,
            orderId: '',
            //Snackbar Message Item
            open: false,
            vertical: 'top',
            horizontal: 'center',
            placeOrderNotificationMessage: '',
            addresses: [
                {
                    "id": 4,
                    "flatBuilNo": "C-201, MHS CHS",
                    "locality": "Anpara",
                    "city": "Singrauli",
                    "zipcode": "231224",
                    "state": {
                        "id": 6,
                        "stateName": "Chandigarh"
                    }
                },
                {
                    "id": 5,
                    "flatBuilNo": "B-244, Kakri Colony",
                    "locality": "Kakri",
                    "city": "Dhanbad",
                    "zipcode": "231278",
                    "state": {
                        "id": 8,
                        "stateName": "Dadar and Nagar Haveli"
                    }
                }
            ],
            //New Address Fields
            flatRequired: "disp-none",
            flat: "",
            locality: "",
            cityRequired: "disp-none",
            city: "",
            stateRequired: "disp-none",
            state: "",
            zipcodeRequired: "disp-none",
            zipcode: ""
        }
    }

    // componentWillMount() {
    //     {/**API to fetch restaurant Details*/ }
    //     let xhr = new XMLHttpRequest();
    //     let that = this;
    //     xhr.addEventListener("readystatechange", function () {
    //         if (this.readyState === 4) {
    //             that.setState({
    //                 addresses: JSON.parse(this.responseText)
    //             });
    //         }
    //     });
    //     {/**Extracted Dynamically passed restaurantId from params */ }
    //     xhr.open("GET", this.props.baseUrl + "address/user");
    //     xhr.send();
    //states - API call
    // }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return < div >
                    <div>
                        <AppBar position="static">
                            <Tabs value={this.state.value} onChange={this.handleTabChange}>
                                <Tab label="EXISTING ADDRESS" />
                                <Tab label="NEW ADDRESS" />
                            </Tabs>
                        </AppBar>
                        {this.state.value === 0 && <TabContainer>Item One</TabContainer>}
                        {this.state.value === 1 && <TabContainer>

                            <FormControl required>
                                <InputLabel htmlFor="flat">Flat / Building No.</InputLabel>
                                <Input id="flat" type="text" flat={this.state.flat} onChange={this.inputflatChangeHandler} />
                                <FormHelperText className={this.state.flatRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl>
                                <InputLabel htmlFor="locality">Locality</InputLabel>
                                <Input id="locality" type="text" locality={this.state.locality} onChange={this.inputlocalityChangeHandler} />
                                <FormHelperText className={this.state.cityRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="city">City</InputLabel>
                                <Input id="city" type="text" city={this.state.city} onChange={this.inputcityChangeHandler} />
                                <FormHelperText className={this.state.cityRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="state">State</InputLabel>
                                <Input id="state" type="password" state={this.state.state} onChange={this.inputstateChangeHandler} />
                                <FormHelperText className={this.state.stateRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="zipcode">Zipcode</InputLabel>
                                <Input id="zipcode" type="text" zipcode={this.state.zipcode} onChange={this.inputzipcodeChangeHandler} />
                                <FormHelperText className={this.state.zipcodeRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>

                        </TabContainer>}
                    </div>
                </div >
            case 1:
                return <div>
                </div>
            default:
                return 'Unknown step';
        }
    };

    /**
     * Vertical Stepper Functions
     */

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    /**
     * Summary Details Functions
     */
    placeOrderClickHandler = () => {
        {/**API to place Order*/ }
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    orderId: JSON.parse(this.responseText)
                });
            }
        });
        xhr.open("POST", this.props.baseUrl + "order");
        let orderData = null;
        xhr.send(orderData);
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const { vertical, horizontal, open } = this.state;
        return (
            <div>
                <Header />
                <div>
                    <div className="delivery">
                        <div className={classes.root}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((label, index) => {
                                    return (
                                        <Step key={label}>
                                            <StepLabel>{label}</StepLabel>
                                            <StepContent>
                                                <Typography>{this.getStepContent(index)}</Typography>
                                                <div className={classes.actionsContainer}>
                                                    <div>
                                                        <Button
                                                            disabled={activeStep === 0}
                                                            onClick={this.handleBack}
                                                            className={classes.button}
                                                        >
                                                            Back
                                  </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={this.handleNext}
                                                            className={classes.button}
                                                        >
                                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </StepContent>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === steps.length && (
                                <Paper square elevation={0} className={classes.resetContainer}>
                                    <Typography>View the summary and place your order now!</Typography>
                                    <Button onClick={this.handleReset} className={classes.button}>
                                        CHANGE
                        </Button>
                                </Paper>
                            )}
                        </div>
                    </div>
                    <div className="summary">
                        <Card>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Summary
                                </Typography>
                                <Divider />
                                Net Amount
                                <Button variant="contained" color="primary" onClick={this.placeOrderClickHandler}>PLACE ORDER</Button>
                                <Snackbar
                                    anchorOrigin={{ vertical, horizontal }}
                                    open={open}
                                    onClose={this.handleClose}
                                    ContentProps={{
                                        'aria-describedby': 'message-id',
                                    }}
                                    message={<span id="message-id">{this.state.placeOrderNotificationMessage}</span>}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Checkout.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Checkout);