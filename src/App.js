import React, { Component } from 'react';

import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route } from 'react-router-dom';



class App extends Component {
  state = {
    show: true,
  };



  render() {
    return (
      <div className="App">
<Layout>

<Route path="/checkout" component={Checkout} />
<Route path="/orders" component={Orders} />
<Route path="/" exact component={BurgerBuilder} />

</Layout>

      </div>
    );
  }
}

export default App;
