import { GridListTile, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Header from '../../common/header/Header';
import './Home.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        width: 500,
        height: 450,
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
            restaurants: [],
            filteredRestaurantList: []
        }
    }

    //Using Fetch with async and await to get json data
    async componentDidMount() {
        console.log( "BASEURL: " + this.props.baseUrl)
        const response = await fetch(this.props.baseUrl+'restaurant');
        const json = await response.json();
        this.setState({ restaurants: json });
        this.setState({ filteredRestaurantList: json });


    }


    showRestaurantDetails = (restaurantId) => {
        this.props.history.push("/restaurant/" + restaurantId);
    }

    searchText = (value) => {
        if (value === "") {
            this.setState({
                filteredRestaurantList: this.state.restaurants
            })
        }
        else {

            let xhr = new XMLHttpRequest();
            let that = this;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && xhr.status === 200) {
                    that.setState({
                        filteredRestaurantList: JSON.parse(this.responseText)
                    });
                }
                else {
                    that.setState({
                        filteredRestaurantList: []
                    });
                }
            });
            xhr.open("GET", this.props.baseUrl+"restaurant/name/" + value);
            xhr.send();

        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Header searchHandler={this.searchText}
                 showSearchBox={true}
                 showCategories={true}
                 />
                <div className="main-body-container">
                    <GridList cellHeight={"auto"} className={classes.gridListMain} cols={3}>
                        {/**Check implementation of onClick for GridListTile. If we directly write method name then it executes immediately*/}
                        {this.state.filteredRestaurantList.map(restaurant => (
                            <GridListTile key={restaurant.id} onClick={() => this.showRestaurantDetails(restaurant.id)}>
                                <Card key={restaurant.id} className="image-post">
                                    <CardContent>
                                        <img src={restaurant.photoUrl} alt="RestaurantImage" />
                                        <Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {restaurant.restaurantName}
                                            </Typography>
                                            <p>{restaurant.categories}</p>
                                            <div >
                                                <span className="rating" style={{ paddingLeft: '5px' }}><FontAwesome name='star' /></span>
                                                <span className="rating" style={{ paddingLeft: '5px' }}>{restaurant.userRating} ({restaurant.numberUsersRated})</span>
                                                <span style={{ float: 'right' }}><FontAwesome name='inr' />{restaurant.avgPrice} for two</span>
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