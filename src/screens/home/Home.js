import { GridListTile, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Home.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    gridListMain: {
        transform: 'translateZ(0)',
    },
    card: {
        maxWidth: 560,
        margin: 10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    title: {
        fontWeight: 'strong',
        color: 'red',
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class Home extends Component {

    constructor() {
        super();
        this.state = {
            restaurants: [
                {
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
                    "categories": "Chinese, Drinks, Indian, Italian, Rice, Snacks, Sweet Dish"
                },
                {
                    "id": 2,
                    "restaurantName": "KFC",
                    "photoUrl": "https://b.zmtcdn.com/data/pictures/4/18528394/6c3590212b3700b1b160422fd8478287.jpg?output-format=webp",
                    "userRating": 3.60392156862745,
                    "avgPrice": 200,
                    "numberUsersRated": 102,
                    "address": {
                        "id": 2,
                        "flatBuilNo": "202/C,Road No.-33, Adarsh Nagar",
                        "locality": "Prabhadevi",
                        "city": "Mumbai",
                        "zipcode": "400015",
                        "state": {
                            "id": 21,
                            "stateName": "Maharashtra"
                        }
                    },
                    "categories": "Chinese, Drinks, Indian, Italian, Rice, Snacks, Sweet Dish"
                },
                {
                    "id": 3,
                    "restaurantName": "Trump",
                    "photoUrl": "https://b.zmtcdn.com/data/pictures/4/18528394/6c3590212b3700b1b160422fd8478287.jpg?output-format=webp",
                    "userRating": 1.1,
                    "avgPrice": 450,
                    "numberUsersRated": 467,
                    "address": {
                        "id": 3,
                        "flatBuilNo": "502/32",
                        "locality": "Prabhadevi",
                        "city": "Mumbai",
                        "zipcode": "400015",
                        "state": {
                            "id": 21,
                            "stateName": "Maharashtra"
                        }
                    },
                    "categories": "Drinks"
                }
            ]
        }
    }

    //Using Fetch with async and await to get json data
    // componentWillMount() {
    //     {/**API to fetch restaurant Details*/ }
    //     let xhr = new XMLHttpRequest();
    //     let that = this;
    //     xhr.addEventListener("readystatechange", function () {
    //         if (this.readyState === 4) {
    //             that.setState({
    //                 restaurants: JSON.parse(this.responseText)
    //             });
    //         }
    //     });
    //     xhr.open("GET", this.props.baseUrl + "restaurant/");
    //     xhr.send();
    // }

    showRestaurantDetails = (restaurantId) => {
        this.props.history.push("/restaurant/" + restaurantId);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div className="main-body-container">
                    <GridList cellHeight={"auto"} className={classes.gridListMain} cols={3}>
                        {/**Check implementation of onClick for GridListTile. If we directly write method name then it executes immediately*/}
                        {this.state.restaurants.map(restaurant => (
                            <GridListTile onClick={() => this.showRestaurantDetails(restaurant.id)}>
                                <Card key={restaurant.id} className="image-post">
                                    <CardContent>
                                        <img src={restaurant.photoUrl} alt="RestaurantImage" />
                                        <Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {restaurant.restaurantName}
                                            </Typography>
                                            <p>{restaurant.categories}</p>
                                            <div>
                                                <span className="rating">{restaurant.userRating} ({restaurant.numberUsersRated})</span>
                                                <span>{restaurant.avgPrice * 2} for two</span>
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);