import React, { Component } from 'react';
import notificator from './utils/notificator';
import Spinner from './components/Spinner';
import ProductList from './components/ProductList';
import ProductView from './components/ProductView';
import Auth from './components/Auth';
import CreateReview from "./components/CreateReview";
import './App.sass';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {

  state = {
    products: false,
    current_product: false,
    auth: false,
    token: false,
    user: false,
    reviews: false,
    open: false,
    loading: false,
    auth_modal_open: false,
    review_modal_open: false
  }

  componentDidMount() {
    fetch('http://smktesting.herokuapp.com/api/products/')
			.then(res => res.json())
			.then(products => {
        this.setState({
          products: products
        });})
			.catch(error => notificator({error: error}) );
  }

  signUp = (data) => {
    this.auth('http://smktesting.herokuapp.com/api/register/', data);
  }

  login = (data) => {
    this.auth('http://smktesting.herokuapp.com/api/login/', data);
  }

  auth = (url, data) => {
    fetch(url,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(data)
    })
      .then(response => response.status === 200 && response.json())
      .then(res =>{
        if (res.success) {
          notificator({success: ["Success"]});
          this.authSuccess(res, data);
        }
        else {
          notificator({error: [res.message]});
        }
      }).catch(error => notificator({error: error}));
  }

  authSuccess = (res, user) => {
    this.setState({
      user: user.username,
      token: res.token,
      auth: true,
      auth_modal_open: false
    });
  }

  postReview = (data) => {
    fetch(`http://smktesting.herokuapp.com/api/reviews/${this.state.current_product.id}`,{
      method:'POST',
      credentials: "same-origin",
      headers: {
       // "X-CSRFToken": this.state.token,
       "Accept": "application/json",
       "Content-Type": "application/json",
       "Authorization": this.state.token
   },
      body:JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data =>{
        console.log(data);
        // if (data.status === 200)

      }).catch(error => console.log('ERROR:',error))
  }

  createReview = (data) => {
    if(!this.state.auth)
      this.setState({
        auth_modal_open: true
      });
    else {
      this.setState({
        review_modal_open: true
      });
    }
  }

  closeModal = () => {
    this.setState({
      auth_modal_open: false,
      review_modal_open: false
    });
  }

  closeView = () => {
    this.setState({
      open: false
    });
  }

  choiseProduct = (item) => {
    if(this.state.current_product!==item) {
      this.setState({
        loading: true,
        current_product: item,
        open: true
      });
      fetch('http://smktesting.herokuapp.com/api/reviews/' + item.id)
        .then(response => response.json())
        .then(data =>
            this.setState({
              loading: false,
              reviews: data
            })
        ).catch(error => notificator({error: error}) );
    }
    else
      this.setState({
        open: true
      });
  }


  render() {
    return (
      <div className="container">
        <ToastContainer/>
        <CreateReview close={this.closeModal} post={this.postReview} open={this.state.review_modal_open}/>
        <Auth close={this.closeModal} signUp={this.signUp} login={this.login} open={this.state.auth_modal_open}/>
        {
          this.state.products ?
          <ProductList products={this.state.products} choise={this.choiseProduct}/>
          :
          <Spinner/>
        }
        {
          this.state.open &&
          <ProductView
            createPost={this.createReview}
            close={this.closeView}
            product={this.state.current_product}
            reviews={this.state.reviews}
            loading={this.state.loading}/>
        }
      </div>
    );
  }
}

export default App;
