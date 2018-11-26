import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Step from '@material-ui/core/Step';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Checkout.css';

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
    return ['Select campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
        case 1:
            return 'An ad group contains one or more ads which target a shared set of keywords.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

class Checkout extends Component {

    constructor() {
        super();
        this.state = {
            activeStep: 0,
            //Snackbar Message Item
            open: false,
            vertical: 'top',
            horizontal: 'center',
            placeOrderNotificationMessage: '',
        }
    }

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
                    restaurantDetails: JSON.parse(this.responseText)
                });
            }
        });
        xhr.open("GET", this.props.baseUrl + "order");
        xhr.send();
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
                                                <Typography>{getStepContent(index)}</Typography>
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
                                    <Typography>All steps completed - you&quot;re finished</Typography>
                                    <Button onClick={this.handleReset} className={classes.button}>
                                        Reset
                        </Button>
                                </Paper>
                            )}
                        </div>
                    </div>
                    <div className="summary">
                        <Card>
                            <CardHeader>Summary</CardHeader>
                            <CardContent>
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