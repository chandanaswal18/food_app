/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import data from '../appData.json';

const urlArray = [
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1429554513019-6c61c19ffb7e?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1496412705862-e0088f16f791?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1432139509613-5c4255815697?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?auto=format&fit=crop&w=500&q=60'
];

const onlySwiggyRestaurantList = data.map(el => el.restaurantList.filter(list => list.isExlusive === true)).flat(1);

const allRestaurantList = data.map(el => el.restaurantList).flat(1);

class FoodApp extends Component {
  constructor(props) {
    super(props);
    this.state = { data, selectedCategory: data[0].category, MaxItemCount: 5 };
  }

  onClickCategory = category => {
    if (/\d/.test(category)) {
      category = category.substring(0, category.indexOf(category.match(/\d/)));
    }
    this.setState({ selectedCategory: category });
    this.setState({ MaxItemCount: 5 });
  };

  viewMoreClick = () => {
    this.setState({ MaxItemCount: this.state.MaxItemCount + 6 });
  };

  renderCategories = () => {
    const categoryList = this.state.data.map(el => (
      <div
        className="left-panel-category"
        onClick={() => this.onClickCategory(el.category)}
        style={{
          color: el.category === this.state.selectedCategory ? '#fff' : '#282c3f',
          backgroundColor: el.category === this.state.selectedCategory ? '#e46d47' : '#fff'
        }}
      >
        {el.category}
        <div className="restaurant-count">{el.restaurantList.length} OPTIONS</div>
      </div>
    ));

    const SwiggyCategory = (
      <div className="left-panel-category" onClick={e => this.onClickCategory(e.currentTarget.textContent)}>
        Only on swiggy
        <div>
          <span className="restaurant-count">{onlySwiggyRestaurantList.length} OPTIONS</span>
        </div>
      </div>
    );

    const SeeAllCategory = (
      <div className="left-panel-category" onClick={e => this.onClickCategory(e.currentTarget.textContent)}>
        See All
        <div className="restaurant-count">{allRestaurantList.length} OPTIONS</div>
      </div>
    );

    categoryList.push(SwiggyCategory, SeeAllCategory);

    return categoryList;
  };

  renderRestaurantData = restaurants => {
    const restaurantsDisplay =
      this.state.selectedCategory === 'See All' ? restaurants : restaurants.slice(0, this.state.MaxItemCount);

    const restaurantList = restaurantsDisplay.map(restaurant => (
      <div className="restaurant-card">
        <img alt="image1" src={urlArray[Math.floor(Math.random() * urlArray.length)]} className="restaurant-image" />
        <div className="restaurant-card-info">
          <strong>{restaurant.name}</strong>
        </div>
        <div className="restaurant-card-info">{restaurant.food_types.join(', ')}</div>
        <div className="restaurant-extra-info">
          <div>rating {restaurant.ratings}</div>
          <div>{restaurant.delivery_time}</div>
          <div>{restaurant.price_for_two} for two</div>
        </div>
      </div>
    ));
    const viewMoreCard = (
      <div className="restaurant-card-view-more" onClick={this.viewMoreClick}>
        + {restaurants.length - this.state.MaxItemCount} More
      </div>
    );

    if (restaurants.length > this.state.MaxItemCount && this.state.selectedCategory !== 'See All') {
      restaurantList.push(viewMoreCard);
    }

    return restaurantList;
  };

  render() {
    let restaurantList = [];
    if (this.state.selectedCategory === 'Only on swiggy') {
      restaurantList = onlySwiggyRestaurantList;
    } else if (this.state.selectedCategory === 'See All') {
      restaurantList = allRestaurantList;
    } else {
      restaurantList = this.state.data.find(el => el.category === this.state.selectedCategory).restaurantList;
    }

    return (
      <div className="container">
        <div className="left-panel">{this.renderCategories()}</div>
        <div className="right-panel">
          <div className="right-panel-header">{this.state.selectedCategory}</div>
          <div className="restaurant-card-wrapper">{this.renderRestaurantData(restaurantList)}</div>
        </div>
      </div>
    );
  }
}

export default FoodApp;
