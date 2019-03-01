import React from 'react';

class ProductList extends React.Component {

  render() {
    return(
      <div>
        {this.props.products ?
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

export default ProductList;
