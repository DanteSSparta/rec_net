import React from 'react';
import getImage from '../utils/getImage';

class ProductList extends React.Component {

  render() {
    return(
      <div>
        {this.props.products.length ?
          <ul className="products-list">
            {this.props.products.map((item, i) => (
              <li onClick={() => this.props.choise(item)} className="item" key={i}><img alt={item.title} height="90%" src={getImage(item.img)}/></li>
            ))}
          </ul>
          :<div>Not products</div>}
      </div>
    );
  }
}

export default ProductList;
