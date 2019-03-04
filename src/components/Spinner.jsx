import React, { Component } from "react";
import Loader from 'react-loader-spinner';

class Spinner extends Component {

   render() {
    return(
      <div className="spinner">
        <Loader type="Circles" color="#3c567b" height={100} width={100} />
        <div>Loading...</div>
      </div>
    );
   }
}

export default Spinner;
