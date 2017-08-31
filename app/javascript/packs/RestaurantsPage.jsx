import React from 'react'
import RestaurantList from './RestaurantList'
import Map from './Map'
import Filters from './Filters'

class RestaurantsPage extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }

        this.filterByCuisine = this.filterByCuisine.bind(this);
        this.filterByRating = this.filterByRating.bind(this);
        this.filterByDeliveryTime = this.filterByDeliveryTime.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount');

        fetch('http://localhost:3000/restaurants.json')
            .then(response => response.json())
            .then((items) => this.setState(({data: items})));
    }

    filterByCuisine(val) {
        console.log('Filter Cuisine', val);
        this.setState({cuisineFilter: val})
    }

    filterByRating(val) {
        console.log('Filter Rating', val);
        this.setState({ratingFilter: val})
    }

    filterByDeliveryTime(val) {
        console.log('Filter Delivery Time', val);
        this.setState({deliveryTimeFilter: val})
    }

    render() {
        console.log('render', this.state);
        let restaurantFiltered = this.state.data.slice();

        if (this.state.cuisineFilter) {
            restaurantFiltered = restaurantFiltered.filter(res => res.cuisine_name.toLowerCase() == this.state.cuisineFilter.toLowerCase())
        }

        if (this.state.ratingFilter) {
            restaurantFiltered = restaurantFiltered.filter(res => res.rating == this.state.ratingFilter)
        }

        if (this.state.deliveryTimeFilter) {
            restaurantFiltered = restaurantFiltered.filter(res => res.max_delivery_time <= this.state.deliveryTimeFilter)
        }

        return (
            <div>
                <Filters filterCuisine={this.filterByCuisine}
                         filterRating={this.filterByRating}
                         filterDeliveryTime={this.filterByDeliveryTime}/>

                <div className="row">

                    <div className="col-sm-6 col-md-8">
                        <RestaurantList data={restaurantFiltered}/>
                    </div>

                    <div className="col-sm-6 col-md-8">
                        <Map/>
                    </div>

                </div>
            </div>
        )
    }
}


export default RestaurantsPage