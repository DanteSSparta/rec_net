import React, { Component } from 'react';
// import notificator from './utils/notificator';
import img1 from './static/img1.png';
import img2 from './static/img2.png';
import img3 from './static/img3.png';
import ProductList from './components/ProductList';
import './App.sass';

class App extends Component {

  state = {
    products: false,
    current_product: false,
    auth: false,
    user: false,
    reviews: false
  }

  searchImage = (name) => {
    console.log(name);
    switch (name) {
      case 'img1.png':
        return img1;
      case 'img2.png':
        return img2;
      case 'img3.png':
        return img3;
      default:
        return null;
    }
  }

  componentDidMount() {
    fetch('http://smktesting.herokuapp.com/api/products/')
			.then(res => {
				return res.json();
			})
			.then(products => {

        this.setState({
          products: products
        });
			});
			// .catch(error => notificator({error: error}) );
  }

  choiseProduct = (index) => {

  }


  render() {
    console.log(this.state);
    return (
      <div className="container">
        {this.state.products ?
          <ul className="products-list">
            {this.state.products.map((item, i) => (
              <li onClick={() => this.choiseProduct(item.id)} className="item" key={i}><img alt={item.title} height="90%" src={this.searchImage(item.img)}/></li>
            ))}
          </ul>
          :null}

      </div>
    );
  }
}

export default App;
