import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class Review extends Component {

  getDate = (date) => new Date(date).toLocaleDateString();

  render() {
    return (
      <div className="review">
        <div>{this.props.review.created_by.username} at {this.getDate(this.props.review.created_at)}</div>
        <div className="rate"><StarRatings
          rating={this.props.review.rate}
          numberOfStars={5}
          starRatedColor="blue"
          starDimension="15px"
          starSpacing="3px"
          /></div>
        <div>{`Comment: ${this.props.review.text}`}</div>
      </div>
    );
  }

}

export default Review;
