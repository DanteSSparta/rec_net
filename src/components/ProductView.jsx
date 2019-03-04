import React, { Component } from 'react';
import getImage from '../utils/getImage';
import Spinner from './Spinner';
import Review from './Review';

class ProductView extends Component {

  render() {
    return (
      <div>
        <div className="product-view">
          <h2>{this.props.product.title}</h2>
          <div className="product">
            <div className="image">
              <img alt="product" width="250px" src={getImage(this.props.product.img)}/>
            </div>
            <div className="description">
              <div className="title">Description</div>
              <div className="text">{this.props.product.text}</div>
            </div>
          </div>

          <div className="reviews">
            {
              this.props.loading ?
              <Spinner/>
              :
              this.props.reviews.map((item, i) => <Review key={i} review={item}/>)
            }
            <div className="create-reviews">
              <button onClick={this.props.createPost}>Create post</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default ProductView;
