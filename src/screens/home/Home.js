import { FormControl, GridListTile, Input, InputLabel, Typography } from '@material-ui/core';
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
            // restaurants: [],
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
    // async componentWillMount() {
    //     const response = await fetch(`http://localhost:8080/api/restaurant`);
    //     const json = await response.json();
    //     this.setState({ userImages: json.data });
    //     // Running a for loop to add likes icon to every item in the array
    //     var userImageLikes = this.state.userImages.slice(0)
    //     userImageLikes.map(element => {
    //         element.likesIcon = <FavoriteBorder />;
    //         element.commentsText = "";
    //     });
    //     this.setState({ userImages: userImageLikes })
    // }

    showRestaurantDetails = () => {

    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header />
                <div className="main-body-container">
                    <GridList cellHeight={"auto"} className={classes.gridListMain} cols={2}>
                        {this.state.restaurants.map(restaurant => (
                            <GridListTile onClick="this.showRestaurantDetails">
                                <Card key={restaurant.id} className="image-post">
                                    <CardContent>
                                        <img src={restaurant.photoUrl} alt="Restaurant_Image" />
                                        <Typography>
                                            <p>{restaurant.restaurantName}</p>
                                            <p>{restaurant.categories}</p>
                                            <div>
                                                <span className="rating">{restaurant.userRating} ({restaurant.numberUsersRated})</span>
                                                <span>{restaurant.avgPrice}</span>
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