import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Details.css';

const styles = theme => ({
    snackbar: {
        margin: theme.spacing.unit,
    },
});

class Details extends Component {

    constructor() {
        super();
        this.state = {
            //Snackbar Message Item
            open: false,
            vertical: 'top',
            horizontal: 'center',
            cartNotificationMessage: '',
            cartItems: [],
            // restaurantDetails: '',
            restaurantDetails: {
                "id": 1,
                "restaurantName": "Dominoz",
                "photoUrl": "https://b.zmtcdn.com/data/pictures/4/18528394/6c3590212b3700b1b160422fd8478287.jpg?output-format=webp",
                "userRating": 4.2,
                "avgPrice": 250,
                "numberUsersRated": 99,
                "address": {
                    "id": 1,
                    "flatBuilNo": "501/31 Mahalaxmi SRA CHS",
                    "locality": "Prabhadevi",
                    "city": "Mumbai",
                    "zipcode": "400015",
                    "state": {
                        "id": 21,
                        "stateName": "Maharashtra"
                    }
                },
                "categories": [
                    {
                        "id": 6,
                        "categoryName": "Chinese",
                        "items": [
                            {
                                "id": 27,
                                "itemName": "fried rice",
                                "price": 206,
                                "type": "Veg"
                            },
                            {
                                "id": 25,
                                "itemName": "chillie chowmine",
                                "price": 210,
                                "type": "Non-Veg"
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "categoryName": "Drinks",
                        "items": [
                            {
                                "id": 8,
                                "itemName": "hot chocolate",
                                "price": 250,
                                "type": "Veg"
                            },
                            {
                                "id": 6,
                                "itemName": "tea",
                                "price": 20,
                                "type": "Veg"
                            },
                            {
                                "id": 11,
                                "itemName": "coke",
                                "price": 100,
                                "type": "Veg"
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "categoryName": "Indian",
                        "items": [
                            {
                                "id": 23,
                                "itemName": "butter paneer",
                                "price": 190,
                                "type": "Veg"
                            },
                            {
                                "id": 4,
                                "itemName": "chapati",
                                "price": 20,
                                "type": "Veg"
                            },
                            {
                                "id": 13,
                                "itemName": "pastry",
                                "price": 210,
                                "type": "Veg"
                            },
                            {
                                "id": 29,
                                "itemName": "veg biryani",
                                "price": 203,
                                "type": "Veg"
                            },
                            {
                                "id": 17,
                                "itemName": "naan",
                                "price": 30,
                                "type": "Veg"
                            },
                            {
                                "id": 30,
                                "itemName": "chicken biryani",
                                "price": 245,
                                "type": "Non-Veg"
                            },
                            {
                                "id": 21,
                                "itemName": "matar paneer",
                                "price": 270,
                                "type": "Veg"
                            },
                            {
                                "id": 15,
                                "itemName": "macroni",
                                "price": 130,
                                "type": "Veg"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "categoryName": "Italian",
                        "items": [
                            {
                                "id": 1,
                                "itemName": "pizza",
                                "price": 200,
                                "type": "Non-Veg"
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "categoryName": "Rice",
                        "items": [
                            {
                                "id": 27,
                                "itemName": "fried rice",
                                "price": 206,
                                "type": "Veg"
                            },
                            {
                                "id": 29,
                                "itemName": "veg biryani",
                                "price": 203,
                                "type": "Veg"
                            },
                            {
                                "id": 30,
                                "itemName": "chicken biryani",
                                "price": 245,
                                "type": "Non-Veg"
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "categoryName": "Snacks",
                        "items": [
                            {
                                "id": 13,
                                "itemName": "pastry",
                                "price": 210,
                                "type": "Veg"
                            },
                            {
                                "id": 15,
                                "itemName": "macroni",
                                "price": 130,
                                "type": "Veg"
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "categoryName": "Sweet Dish",
                        "items": [
                            {
                                "id": 13,
                                "itemName": "pastry",
                                "price": 210,
                                "type": "Veg"
                            },
                            {
                                "id": 8,
                                "itemName": "hot chocolate",
                                "price": 250,
                                "type": "Veg"
                            }
                        ]
                    }
                ]
            }
        }
    }

    // componentWillMount() {
    //     {/**API to fetch restaurant Details*/ }
    //     let xhr = new XMLHttpRequest();
    //     let that = this;
    //     xhr.addEventListener("readystatechange", function () {
    //         if (this.readyState === 4) {
    //             that.setState({
    //                 restaurantDetails: JSON.parse(this.responseText)
    //             });
    //         }
    //     });
    //     {/**Extracted Dynamically passed restaurantId from params */ }
    //     xhr.open("GET", this.props.baseUrl + "restaurant/" + this.props.match.params.restaurantId);
    //     xhr.send();
    // }

    onClickCheckoutButton = state => () => {
        this.setState({ open: true, ...state });
        this.props.history.push("/checkout");
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { vertical, horizontal, open } = this.state;
        let restaurantDetails = this.state.restaurantDetails;
        return (
            <div>
                <Header />
                <div>
                    <header className="details-header-bg">
                        <div>
                            <span>
                                <img className="restaurant-image" src={restaurantDetails.photoUrl} alt="RestaurantImage" />
                            </span>
                            <span>
                                {/**For adjacent state fields need to wrap them in some parent component */}
                                <Typography>{restaurantDetails.restaurantName}</Typography>
                                <Typography>{restaurantDetails.address.locality}</Typography>
                                <Typography>
                                    {restaurantDetails.categories.map(category => (
                                        <span key={"category" + category.id}>{category.categoryName}, </span>
                                    ))}
                                </Typography>
                                <Typography>{restaurantDetails.userRating}</Typography>
                                <Typography>AVERAGE RATING BY <br />{restaurantDetails.numberUsersRated} USERS</Typography>
                            </span>
                            <span>
                                {restaurantDetails.avgPrice} <br /> AVERAGE COST FOR TWO PEOPLE
                        </span>
                        </div>
                    </header>
                    <div>
                        <div className="menu-items">
                            {restaurantDetails.categories.map(category => (
                                <div key={"categoryItems" + category.id}>
                                    <h2>{category.categoryName}
                                        <Divider />
                                    </h2>
                                    {category.items.map(item => (
                                        <div key={"item" + item.id}>
                                            <span>{item.type}</span>
                                            <span>{item.itemName}</span>
                                            <span>{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="myCart">
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        My Cart
                              </Typography>
                                    TOTAL AMOUNT
                                <Button variant="contained" color="primary"
                                        onClick={this.onClickCheckoutButton({ vertical: 'bottom', horizontal: 'left' })}>
                                        CHECKOUT
                                </Button>
                                    <Snackbar
                                        anchorOrigin={{ vertical, horizontal }}
                                        open={open}
                                        onClose={this.handleClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{this.state.cartNotificationMessage}</span>}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default withStyles(styles)(Details);