import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import StarRatings from 'react-star-ratings';

class CreateReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      text: '',
      submit: false
    };
  }

  onChangeText = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  // check = () => (this.state.rating && this.state.text).toString();

  onSubmit = (event) => {
    event.preventDefault();
    this.state.rating && this.state.text && this.props.post({rate: this.state.rating, text: this.state.text});
  }

  render() {
    return (
      <Modal open={this.props.open} onClose={this.props.close} center>
        <h2>Create Review</h2>
        <form onSubmit={this.onSubmit}>
          <StarRatings
          rating={this.state.rating}
          starRatedColor="blue"
          starDimension="15px"
          starSpacing="3px"
          changeRating={e => this.setState({ rating: e  })}
          numberOfStars={5}
          name='rating'
          />
          <input className="form-control"
            type="text"
            name="text"
            value={this.state.text}
            onChange={this.onChangeText}
            required/>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
      </Modal>
    );
  }

}

export default CreateReview;
